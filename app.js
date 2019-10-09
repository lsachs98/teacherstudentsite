const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const staticCSS = express.static(path.join(__dirname));
const mainRouter = require('./routes');
const handlebbs = require('express-handlebars');
const session = require('express-session');
const app = express();

app.engine('handlebars', handlebbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use("/", staticCSS);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(session({
  name: 'AuthCookie',
  secret: 'some secret string!',
  resave: false,
  saveUninitialized: true
}));

app.use((req,res,next) => {
    console.log(new Date().toUTCString());
    console.log(req.method);
    console.log(req.originalUrl);
    if (typeof req.session.user !== 'undefined')
        console.log("User is authenticated")
   else
    console.log("user is not authenticated")
    next();
});

mainRouter(app);

app.listen(3000, () => {
    console.log(`Server listening on port 3000`);
    console.log(`Routes running on http://localhost:3000`);

      
});