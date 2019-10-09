var submissions=[
    {
        _id:'0',
        studentID: '0',
        courseID: '0',
        assignmentID: '0',
        title: 'lab1course1student1',
        email: 'blah',
        grade: undefined
    },
    {
        _id:'1',
        studentID: '1',
        courseID: '0',
        assignmentID: '0',
        title: 'lab1course1student2',
        email: 'blah',
        grade: undefined
    },
    {
        _id:'2',
        studentID: '0',
        courseID: '0',
        assignmentID: '1',
        title: 'lab2course1student1',
        email: 'blah',
        grade: undefined
    },
    {
        _id:'3',
        studentID: '1',
        courseID: '0',
        assignmentID: '1',
        title: 'lab2course1student2',
        email: 'blah',
        grade: undefined
    },
    {
        _id:'4',
        studentID: '1',
        courseID: '1',
        assignmentID: '1',
        title: 'lab2course2student1',
        email: 'blah',
        grade: undefined
    },
    {
        _id:'5',
        studentID: '2',
        courseID: '1',
        assignmentID: '1',
        title: 'lab3course2student2',
        email: 'blah',
        grade: undefined
    },
    {
        _id:'6',
        studentID: '1',
        courseID: '1',
        assignmentID: '2',
        title: 'lab3course2student2',
        email: 'blah',
        grade: undefined
    },
    {
        _id:'7',
        studentID: '2',
        courseID: '1',
        assignmentID: '2',
        title: 'lab3course2student3',
        email: 'blah',
        grade: undefined
    },
    {
       _id:'8',
        studentID: '0',
        courseID: '2',
        assignmentID: '0',
        title: 'lab1course2student1',
        email: 'blah',
        grade: undefined
    },
    {
       _id:'9',
        studentID: '2',
        courseID: '2',
        assignmentID: '0',
        title: 'lab1course3student3',
        email: 'blah',
        grade: undefined
    },
    {
        _id:'10',
        studentID: '0',
        courseID: '2',
        assignmentID: '2',
        title: 'lab3course3student1',
        email: 'blah',
        grade: undefined
    },
    {
        _id:'11',
        studentID: '2',
        courseID: '2',
        assignmentID: '2',
        title: 'lab3course3student3',
        email: 'blah',
        grade: undefined
    }
];

module.exports = {

async addSubmission(submission){


        submission._id = '' + (submissions.length + 1);
        submissions.push(submission);
},

async getSubmissionDetails(id){

    return submissions.find(function(elem) { return elem._id === id});

},

async getAllSubmissions(courseID, studentID){


    return submissions.filter(function(elem) { return (elem.courseID === courseID && elem.studentID === studentID)});

},

async assignGrade(submissionID, grade){

    let submission = await this.getSubmissionDetails(submissionID);
    submission.grade = grade;
    return submission;
 
}

}

