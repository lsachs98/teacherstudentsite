const teacher = require("./data/teacher");
const student = require("./data/student");
const course = require("./data/courses")
const submissions = require("./data/submissions");
const assign = require("./data/assignments")
const getcourses = require("./data/courses")
var ObjectId = require('mongodb').ObjectID

// const connection = require("./data/mongoConnection");
const main = async () => {
    try{
        firstName = "Yuchen"
        lastName = "Zeng"
        courses = ["cs555"]
        password = "test"
        email = "zlaomamin@gmail.com"
        hashedPassword ="ajsldjakj"
        title ="web programming"
        description = "abcd"
        studentID="123"
        courseID="course"
        username="username"
        courseCode="cs555"
        syllabus="CS555 syllabus"
        meetingTimes="Friday"
        instructorId= "5cdb06d4af36161682733359"
        assignmentID="assignmentID"
        console.log(await student.addStudent(username, password, firstName, lastName, courses, email))
        console.log(await student.getStudentByEmail(email))
        console.log(await student.getStudentCourses(ObjectId("5cdae2f95e09e914d822a3fb")))
        console.log(await assign.getAssignmentDetails(ObjectId("5cdafcfb8473b51626ed7082")))
        await assign.addAssignments(ObjectId("5cdaf2fbd221041558fcd3c0"), title,description)
        await course.addCourses(courseCode,ObjectId(instructorId), syllabus,meetingTimes)
        // await assign.addAssignments(ObjectId("5cdaf2fbd221041558fcd3c0"),title,description)
        await teacher.addTeacher(firstName, lastName, courses, email, hashedPassword)
        // teacher1 =  await teacher.getTeacherbyEmail("ffff")
        teacher1 =  await teacher.getTeacherbyEmail("zlaomamin@gmail.com")
        // console.log(teacher1)
        // var tid = ObjectId('5cdaa97bf92e5c129083e5d3');
        // courses = await teacher.getCourses(tid)
        // console.log(courses)
        // var asid = ObjectId('5cdabadbead85113952b68b9');
        // studentassid=ObjectId('5cdabb3c95528513a7a96ea9')
        // studentass =  await submissions.submissionDetails(studentassid)
        // console.log(studentass)
        // grade = await getcourses.studentGrade('123','course')
        // console.log(grade)
        ass = await submissions.getSubmission(ObjectId("5cdae2f95e09e914d822a3fb"),ObjectId("5cdb00b827a5881650a2e35b"))
        console.log(ass)
        ass = await submissions.submissionDetails(ObjectId("5cdb00b827a5881650a2e35c"))
        console.log(ass)
        ass = await submissions.studentAssignment(ObjectId("5cdafce22a9c2a1625ab0638"))
        console.log(ass)
}
catch(error){
    console.log(error)
}
    }
main()