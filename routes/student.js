const express = require('express');
const router = express.Router();
const teachers = require('../testData/teachers');
const students = require('../testData/students');
const courses = require('../testData/courses');
const submissions = require('../testData/submissions');
const assignments = require('../testData/assignments');
const path = require('path');

router.get('/studenthome', async (req, res) => {

    if (typeof req.session.user !== 'undefined' && req.session.user.userType === 'student'){

        const studentID = req.session.user._id;

        const student = await students.getStudentById(studentID);
 
        if (student){

            const studentCourses = await students.getStudentCourses(studentID);

            const ungradedSubmissions = [];

            for(var i = 0; i < studentCourses.length; i++){

                var course = studentCourses[i];

                const submissionsPerCourse = await submissions.getAllSubmissions(course._id, studentID);

                for(var j = 0; j < submissionsPerCourse.length; j++){

                    var submission = submissionsPerCourse[j];
                    if(submission.grade === undefined)
                        ungradedSubmissions.push({_id: submission._id, title: submission.title, courseCode: course.courseCode});
                }

            }

        	res.render('student',
                {       
                    title: 'Student',
                    firstName: student.firstName,
                    lastName: student.lastName,
                    email: student.email,
                    courses: studentCourses,
                    assignments: ungradedSubmissions

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

router.get('/studentsubmission/:id', async (req, res) => {
    if (typeof req.session.user !== 'undefined' && typeof req.session.user.userType !== 'undefined' && req.session.user.userType === 'student' ){
        
        const student = await students.getStudentById(req.session.user._id);

        if (student){

            const submission = await submissions.getSubmissionDetails(req.params.id);

            if(submission){

                    const assignment = await assignments.getAssignmentDetails(submission.assignmentID);

                    if(assignment){

                        if(submission.grade !== 'undefined')
                            res.render('assignment', {title: 'Submission', assignmentTitle: assignment.title, description: assignment.description, grade: submission.grade}); //LATER COMMENTS
                   
                        else
                            res.render('assignment', {title: 'Submission', assignmentTitle: assignment.title, description: assignment.description}); 
                   

                    }

                    else{
                        res.statusCode = 404;
                        res.render('error', {title: 'Error', errorMessage: 'Assignment not found'})
            
                    }    
                            
            } else{
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


router.get('/studentcourse/:id', async (req, res) => {

    if (typeof req.session.user !== 'undefined' && typeof req.session.user.userType !== 'undefined' && req.session.user.userType === 'student' ){
        
        const student = await students.getStudentById(req.session.user._id);

        if (student){

            const studentCourses = await students.getStudentCourses(student._id);

            if(studentCourses.find(function(elem) { return elem._id === req.params.id})) {

                const course = await courses.getCoursesDetails(req.params.id);
                
            
                if(course){

                    const assignments = await submissions.getAllSubmissions(course._id,req.params.id);
                    const grade = await courses.studentGrade(student._id, course._id)
                    res.render('studentCourses', {title: 'Course Page', courseCode: course.courseCode, instructorName: course.instructorName, grade: grade});  

                }                         
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
module.exports = router;