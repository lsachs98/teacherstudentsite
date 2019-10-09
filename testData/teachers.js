
const teachers=[

    {
        _id:'0',
        email:"teacher@1",
        firstName:"john",
        lastName:"dunbar",
        courses:['0','1'],
        hashedPassword:"$2a$16$7JKSiEmoP3GNDSalogqgPu0sUbwder7CAN/5wnvCWe6xCKAKwlTD." 

    },

    {
        _id:'1',
        email:"teacher@2",
        firstName:"jackie",
        lastName:"chang",
        courses:['1','2'],
        hashedPassword:"5b8ea70016ea66b68aa8020768b70b0b" 
    }
];


module.exports = {
async getTeacherById(id){

    return teachers.find(function(elem) { return elem._id === id});
      
},

async getTeacherByEmail(email){

    return teachers.find(function(elem) { return elem.email === email});
          
},

async getCourses(id){

    const courseData = require('./courses');

    const teacher = await this.getTeacherById(id);
    const courseIds = teacher.courses;
    var toReturn = [];
    for(courseId in courseIds){
        const course = await courseData.getCoursesDetails(courseId);
        toReturn.push(course);
    }

    return toReturn;


}

}
