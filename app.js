const express = require('express');
const bodyParser = require('body-parser');
const passport=require('passport')
const cors = require('cors');
require('dotenv').config();
const app = express();
// require("./app/routes/student.routes") (app)
const users = require('./routes/student.routes');
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
