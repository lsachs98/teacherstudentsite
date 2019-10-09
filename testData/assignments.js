var assignments=[
    {
        _id:'0',
        title:"lab1",
        description:"today we will do lab 1"
    },
    {
        _id:'1',
        title:"lab2",
        description:"now we will see lab 2"
    },
    {
        _id:'2',
        title:"lab3",
        description:"now we will see lab 3"
    }
];
module.exports = {

async getAssignmentDetails(id){

    return assignments.find(function(elem) { return elem._id === id});

},

async addAssignments(courseID, title,description) {

    const courseData = require('./courses');
    const subData = require('./submissions');

        if (!courseID || !title || !description)
                throw "You must provide all parameters";


        let newAssignment = {
            _id: ''+ (assignments.length + 1) + '',
            title: title,
            description: description
        };
        assignments.push(newAssignment);

        const studentsToAssign = await courseData.getStudentsTakingCourse(courseID);

        for(var i = 0; i < studentsToAssign.length; i++){

            const added = await subData.addSubmission({
                studentID: studentsToAssign[i]._id,
                courseID: courseID,
                assignmentID: newAssignment._id,
                title: title,
                email: studentsToAssign[i].email,
                grade: undefined
            })


        }

        return newAssignment;

}

}

