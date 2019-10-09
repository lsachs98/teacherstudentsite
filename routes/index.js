const studentRoutes = require('./student');
const teacherRoutes = require('./teacher');
const loginRoutes = require('./login');

module.exports = app => {
    app.use('/', studentRoutes);
    app.use('/', loginRoutes);
    app.use('/', teacherRoutes);
    app.use('*', (req, res) => {
        res.status(404).json({error: 'Not found'});
    });
};

