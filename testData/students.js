

const students= [{
    _id: '0',
    email: "masterdetective@123",
    firstName: "Sherlock",
    lastName: "Holmes",
    courses:['0','2'],
    hashedPassword: "$2a$16$7JKSiEmoP3GNDSalogqgPu0sUbwder7CAN/5wnvCWe6xCKAKwlTD."
  }, 
  {
      _id: '1',
      email: "lemon@2",
      firstName: "Elizabeth",
      lastName: "Lemon",
      courses:['0','1'],
      hashedPassword: "$2a$16$SsR2TGPD24nfBpyRlBzINeGU61AH0Yo/CbgfOlU1ajpjnPuiQaiDm"
  },
  {
      _id: '2',
      email: "theboywho@lived",
      firstName: "Harry",
      lastName: "Potter",
      courses:['1','2'],
      hashedPassword: "$2a$16$4o0WWtrq.ZefEmEbijNCGukCezqWTqz1VWlPm/xnaLM8d3WlS5pnK"
  }];

  

module.exports = {

async getStudentById(id){

    return students.find(function(elem) { return elem._id === id});
       
},

async getStudentByEmail(email){

  console.log(email);
  console.log('here');

    return students.find(function(elem) { return elem.email === email});
          
},

async getStudentCourses(id){

  const courseData = require('./courses');
    
    const student = await this.getStudentById(id);
    const enrolled = student.courses;  
    var toReturn = [];
    for(courseid in enrolled){
      const courseDetails = await courseData.getCoursesDetails(courseid);
      toReturn.push(courseDetails);
    }
    return toReturn;

}



}