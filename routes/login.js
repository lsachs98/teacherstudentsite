//compare passwords
//if it's valid, add the user type req.session.user = user object
//if not redirect to login
const express = require('express');
const router = express.Router();
const teachers = require('../testData/teachers');
const students = require('../testData/students')
const bcrypt = require('bcrypt');
const path = require('path');

router.get('/', async (req, res) => {
    if (typeof req.session.user !== 'undefined' && req.session.user.userType === 'student')
    	res.redirect('/studenthome');

    else if (typeof req.session.user !== 'undefined' && req.session.user.userType === 'teacher')
        res.redirect('/teacherhome');
        //go to private
    else
    	res.render('login', {title: 'Login'});
        // go to sign-in
});

router.post('/login', async (req, res) => {

    const email = req.body.email;
    const userRole = req.body.userRole;

    console.log(email);

    var user = undefined;

    if(userRole == 'teacher'){
        
        user = await teachers.getTeacherByEmail(email);
    }

    else{
        
        user = await students.getStudentByEmail(email);

    }

    if (!user) {
        res.statusCode = 401;
    	res.render('login', { title: 'Login', message: "Invalid username or password!"});
    }
             
    else{
    		const pass = req.body.password;
    		const confirm_pass = await bcrypt.compare(pass, user.hashedPassword);
            user.userType = userRole;

    		if (confirm_pass) {

        		req.session.user = user;

                if(user.userType === 'teacher')
                    res.redirect('teacherhome');

                else
                    res.redirect('studenthome');

        
    		} else {
                res.statusCode = 401;
    			res.render('login', {title: 'Login', message: "Invalid username/password!"});
        
    		}
		}
});

router.get("/logout", async (req, res) => {

    if (typeof req.session.user !== 'undefined'){    

       
                    req.session.destroy(() => 
                            res.render('logout', {title: 'Logout'})
                            );
       
    }

    else{

        res.statusCode = 401;
        res.render('login', {title: 'Login', message: "Unauthenticated User"});
    }
});

module.exports = router;