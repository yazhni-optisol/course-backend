const express = require('express');
const bodyParser = require('body-parser');
const passport=require('passport')
const cors = require('cors');
require('dotenv').config();
const app = express();
const users = require('./routes/user.routes');
const students = require('./routes/student.routes');
const questions=require('./routes/question.routes')
const lecture=require('./routes/lecture.routes')
const instructor=require('./routes/instructor.routes')
const course=require('./routes/course.routes')
const answer=require('./routes/answer.routes')

require('./keys/passport')(passport);


const corsOptions = {
  origin: 'http://localhost:8081',
};
// middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(passport.initialize());



const db = require('./models/index');
app.use('/api/users', users);
app.use('/api/users', students);
app.use('/api/questions', questions);
app.use('/api/lecture', lecture);
app.use('/api/instructor', instructor);
app.use('/api/course', course);
app.use('/api/answer', answer);


// const { db } = require('./models/user');
// db.sequelize.sync();
// drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Student Management' });
});

// set port, listen for requests
db.sequelize.sync().then(() => {
  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
}, (err) => {
  console.log(22222,err)
});
