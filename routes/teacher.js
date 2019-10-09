const express = require('express');
const router = express.Router();
const teachers = require('../testData/teachers');
const students = require('../testData/students');
const courses = require('../testData/courses');
const submissions = require('../testData/submissions');
const assignments = require('../testData/assignments');
const path = require('path');

router.get('/teacherhome', async (req, res) => {

    if (typeof req.session.user !== 'undefined' && typeof req.session.user.userType !== 'undefined' && req.session.user.userType === 'teacher' ){
        
        const teacher = await teachers.getTeacherById(req.session.user._id);

        if(teacher){

            const coursesTaught = await teachers.getCourses(teacher._id);

            res.render('teacher', {
                Title: 'Teacher Home', 
                firstName: teacher.firstName,
                lastName: teacher.lastName,
                email: teacher.email,
                coursesTaught: coursesTaught
            });

        }

        else{
            res.statusCode = 401;
            res.render('login', {title: 'Login', message: "Unauthenticated User"});
        }
    } else {
        res.statusCode = 401;
        res.render('login', { title: 'Login', message: "Unauthenticated User"});
    }
});

//get submission

router.post('/deactivateCourse/:id', async (req, res) => {

    if (typeof req.session.user !== 'undefined' && typeof req.session.user.userType !== 'undefined' && req.session.user.userType === 'teacher' ){
        
        const teacher = await teachers.getTeacherById(req.session.user._id);
        const course = await courses.getCoursesDetails(req.params.id);

        if(!course)
            res.render('error', {errorMessage: "invalid course ID"});

        else{

                if(teacher && course.instructorID === teacher._id){

                        courses.deactivateCourse(course._id, teacher._id);
                        res.redirect('/teachercourse/' + course._id);

                }
                else {
                        res.statusCode = 401;
                        res.render('error', { errorMessage: "You are not authorized to deactivate this course"});
                    }

        }



    }

    else {
        res.statusCode = 401;
        res.render('error', { errorMessage: "You are not authorized to deactivate this course"});
    }


});

router.get('/teachercourse/:id', async (req, res) => { //go to a teacher's course page

    if (typeof req.session.user !== 'undefined' && typeof req.session.user.userType !== 'undefined' && req.session.user.userType === 'teacher' ){
        const teacher = await teachers.getTeacherById(req.session.user._id);
        if (teacher){

            const course = await courses.getCoursesDetails(req.params.id);

            if(course){
                const students = await courses.getStudentsTakingCourse(req.params.id);

                for(var i = 0; i < students.length; i++)
                    students[i].courseID = req.params.id;

                res.render('teacherCourses',
                {       
                   title: 'Course Page',
                   active: course.active,
                   courseID: req.params.id,
                   students: students

                });
            }
            else{
                res.statusCode = 404;
                res.render('error', {title: 'Error', errorMessage: 'Course not found'})
            }
        }
            
        else{
            res.statusCode = 401;
            res.render('login', {title: 'Login', message: "Unauthenticated User"});
        }
    } else {
        res.statusCode = 401;
        res.render('login', { title: 'Login', message: "Unauthenticated User"});
    }
});

router.get('/teacher/submission/:id', async (req, res) => {

    if (typeof req.session.user !== 'undefined' && typeof req.session.user.userType !== 'undefined' && req.session.user.userType === 'teacher' ){
        const teacher = await teachers.getTeacherById(req.session.user._id);

        if (teacher){

            const submission = await submissions.getSubmissionDetails(req.params.id);
            const assignment = await assignments.getAssignmentDetails(submission.assignmentID);

            const course = await courses.getCoursesDetails(submission.courseID);

            var gradeable = course.active;


            if(submission && assignment){

                if(typeof submission.grade !== 'undefined') {

                    res.render('assignment', 
                        {title: 'Submission', 
                        assignmentTitle: assignment.title, 
                        description: assignment.description,  
                        grade: submission.grade,
                        gradeable: false,
                        submissionID: submission._id
                                        }); 
                } else
                        res.render('assignment', 
                        {title: 'Submission', 
                        assignmentTitle: assignment.title, 
                        description: assignment.description,
                        gradeable: gradeable,
                        submissionID: submission._id
                                        });

                 
            }

            else{
                res.statusCode = 404;
                res.render('error', {title: 'Error', errorMessage: 'Submission not found'})
            }
        }
            
        else{
            res.statusCode = 401;
            res.render('login', {title: 'Login', message: "Unauthenticated User"});
        }
    } else {
        res.statusCode = 401;
        res.render('login', { title: 'Login', message: "Unauthenticated User"});
    }
});

router.get('/teacherassignment/:id', async (req, res) => {

    if (typeof req.session.user !== 'undefined' && typeof req.session.user.userType !== 'undefined' && req.session.user.userType === 'teacher' ){
        const teacher = await teachers.getTeacherById(req.session.user._id);

        if (teacher){

            const assignment = await assignments.getAssignmentDetails(req.params.id);

            if(assignment){
                
                    res.render('assignment', 
                        {title: 'Assignment', 
                        assignmentTitle: assignment.title, 
                        description: assignment.description
                    }); 
                    //DON'T FORGET COMMENTS

                 
            }

            else{
                res.statusCode = 404;
                res.render('error', {title: 'Error', errorMessage: 'Assignment not found'});
            }
        }
            
        else{
            res.statusCode = 401;
            res.render('login', {title: 'Login', message: "Unauthenticated User"});
        }
    } else {
        res.statusCode = 401;
        res.render('login', { title: 'Login', message: "Unauthenticated User"});
    }
});

router.post('/createAssignment/:id', async(req, res) => {

     if (typeof req.session.user !== 'undefined' && typeof req.session.user.userType !== 'undefined' && req.session.user.userType === 'teacher' ){
            
            const teacher = await teachers.getTeacherById(req.session.user._id);

            if(teacher){

                 const courseID = req.params.id;
                 const course = await courses.getCoursesDetails(courseID);

                 if(course.active && course.instructorID == teacher._id){

                        const assignment = await assignments.addAssignments(course._id, req.body.title, req.body.description);
                        res.redirect('/teacherassignment/' + assignment._id);

                 } else{
                    
                    res.statusCode = 401;
                    res.render('error', {title: 'Error', errorMessage: 'You are not authorized to create an assignment for this course'});
                }



             } else {
                    res.statusCode = 401;
                    res.render('login', { title: 'Login', message: "Unauthenticated User"});
            }

         } else {
            res.statusCode = 401;
            res.render('login', { title: 'Login', message: "Unauthenticated User"});

     }

});

router.post('/gradeSubmission/:id', async(req,res) => {

         if (typeof req.session.user !== 'undefined' && typeof req.session.user.userType !== 'undefined' && req.session.user.userType === 'teacher' ){

                const teacher = await teachers.getTeacherById(req.session.user._id);

                if(teacher){

                    const submission = await submissions.getSubmissionDetails(req.params.id);

                    if(submission){

                            const course = await courses.getCoursesDetails(submission.courseID);

                            if(teacher._id == course.instructorID){
                                
                                const submission = await submissions.assignGrade(req.params.id, req.body.grade);
                                res.redirect('/teacher/submission/' + req.params.id);
                                console.log(submission);


                            } else{
                                res.statusCode = 401;
                                res.render('error', {title: 'Error', errorMessage: 'You are not authorized to grade this assignment'});
                            }


                    } else{
                        res.statusCode = 404;
                        res.render('error', {title: 'Error', errorMessage: 'Assignment not found'});
                    }


                } else {
                    res.statusCode = 401;
                    res.render('login', { title: 'Login', message: "Unauthenticated User"});
            }

         } else {
            res.statusCode = 401;
            res.render('login', { title: 'Login', message: "Unauthenticated User"});
    }

});

router.get('/teacher/viewStudent/:courseID/:studentID', async(req, res) => {

         if (typeof req.session.user !== 'undefined' && typeof req.session.user.userType !== 'undefined' && req.session.user.userType === 'teacher' ){

                const teacher = await teachers.getTeacherById(req.session.user._id);

                if(teacher){

                    const student = await students.getStudentById(req.params.studentID);
                    const course = await courses.getCoursesDetails(req.params.courseID);
                    const submissionArr = await submissions.getAllSubmissions(req.params.courseID, req.params.studentID);


                    if(student && course){

                            res.render('studentsView', {
                                Title: 'Student Course Status', 
                                firstName: student.firstName, 
                                lastName: student.lastName, 
                                submissions: submissionArr
                            });


                    }

                    else{
                        res.statusCode = 404;
                        res.render('error', {title: 'Error', errorMessage: 'Student or class not found'})
                    }


                }

         }

});

module.exports = router;