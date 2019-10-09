const students = require('./students');

const courses=[
    {
        _id:'0',
        courseCode:"c1",
        instructorID:"0",
        instructorName:"",
        active: true,
        assignments:[{
        _id:'0',
        title:"lab1",
        description:"today we will do lab 1"
    },
    {
        _id:'1',
        title:"lab2",
        description:"now we will see lab 2"
    }],
        enrolled: ['0','1']

    },
    {
        _id:'1',
        courseCode:"c2",
        instructorID:"0",
        instructorName:"john dunbar",
        active: true,
        assignments:[{
        _id:'1',
        title:"lab2",
        description:"now we will see lab 2"
    },
    {
        _id:'2',
        title:"lab3",
        description:"now we will see lab 2",
    }],
        enrolled: ['1','2']
        
    },
    {
        _id:'2',
        courseCode:"c3",
        instructorID:"1",
        instructorName:"jackie chang",
        active: true,
        assignments:[{
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
        description:"now we will see lab 2",
    }],

        enrolled: ['0','2']
        
    }
];

module.exports = {

async getAssignments(id){
   
   const course = await this.getCoursesDetails(id);
   return course.assignments;
},

async deactivateCourse(courseID, teacherID){

    let course = await this.getCoursesDetails(courseID);
    course.active = false;

},

async getStudentsTakingCourse(id){

    const course = await this.getCoursesDetails(id);
    const studentIds = course.enrolled;
    var toReturn = [];
    for(sid in studentIds){
        const student = await students.getStudentById(sid);
        toReturn.push(student);
    }
    return toReturn;



},

async getCoursesDetails(id){
       
    return courses.find(function(elem) { return elem._id === id});
},

async studentGrade(studentID,courseID){
    return 75 + parseInt(studentID);

}

  
};