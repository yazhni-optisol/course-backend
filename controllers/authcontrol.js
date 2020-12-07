// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
// const passport = require('passport'),
//   { secretOrKey } = require('../keys/private'),
//  { User, Instructor, Information } = require('../models');

// //==========================================================================

 //const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
// exports.signup=  async (req, res) => {
//     let { name, email, password,password2, gender, role } = req.body;
//     let errors = [];
//     // validation of signup
//     if (!name) {
//       errors.push({ name: "required" });
//     }
    
//     if (!email) {
//       errors.push({ email: "required" });
//     }
//     if (!emailRegexp.test(email)) {
//       errors.push({ email: "invalid" });
//     }
//     if (!password) {
//       errors.push({ password: "required" });
//     }
//     if (!password2) {
//       errors.push({
//        password_confirmation: "required",
//       });
//     }
//     if (password != password2) {
//       errors.push({ password: "mismatch" });
//     }
//     if (errors.length > 0) {
//       return res.status(422).json({ errors: errors });
//        }
//     const user = await User.findOne({ where: { 
//       email: req.body.email,
//       role:req.body.role
//   }  });
//     if (user)
//         return res.status(400).json({ email: 'Email already registered!' });

//     let newUser = new User({ name, email, gender, role });

//     bcrypt.genSalt(10, (err, salt) => {
//         bcrypt.hash(password, salt, async (err, hash) => {
//             if (err) throw err;
//             newUser.password = hash;
//             newUser = await newUser.save();
//             res.json(newUser);
//         });
//     });

//     if (role === 'Instructor') {
//         let newInst = new Instructor({ uid: newUser.id });
//         newInst = await newInst.save();
//     } else {
//         let newStd = new Information({ uid: newUser.id });
//         newStd = await newStd.save();
//     }
// };
// //==========================================================================
// //@route    POST: api/users/login
// //@desc     Login user and generate token
// //@access   Public

// exports.signin= async (req, res) => {
//     const { email, role, password } = req.body;
//     let errors = [];
//      //validation
//      if (!email) {
//        errors.push({ email: "required" });
//      }
//      if (!emailRegexp.test(email)) {
//        errors.push({ email: "invalid email" });
//      }
//      if (!password) {
//        errors.push({ passowrd: "required" });
//      }
//      if (errors.length > 0) {
//       return res.status(422).json({ errors: errors });
//      }

//      if (!role) {
//       errors.push({ passowrd: "required" });
//     }
//     const user = await User.findOne({  where: { 
//       email: req.body.email,
//       role:req.body.role
//   } });
//     if (!user) return res.status(404).json({ email: 'User not found!' });

//     const matched = await bcrypt.compare(password, user.password);
//     if (!matched)
//         return res.status(400).json({ password: 'password incorrect!' });

//     const payload = {
//         id: user.id,
//         name: user.name,
//         email: user.email,
//         gender: user.gender,
//         role: user.role,
//         profilePic: user.profilePic,
//     };
//     jwt.sign(payload, secretOrKey, { expiresIn: 3600 }, (err, token) => {
//         res.json({
//             success: true,
//             token: 'Bearer ' + token,
//         });
//     });
// };
// //==========================================================================
// //@route    POST: api/users/current
// //@desc     Return Current user
// //@access   Private

// exports.current=
//     passport.authenticate('jwt', { session: false }),
//     (req, res) => {
//         res.json(req.user);
//     },

// // ============================================================================
// //@route    POST: /api/users/delete/:uid
// //@desc     Deletes the specified course
// //@access   Private && Instructor
// exports.delete=
//     passport.authenticate('jwt', { session: false }),
//     async (req, res) => {
//         let user = await User.findById(req.params.uid);

//         if (!user) {
//             res.status(404).json({ user: 'User not found!' });
//             return;
//         }

//         if (toString(user.id) !== toString(req.user.id)) {
//             res.status(404).json({ user: 'Unauthorized action!' });
//             return;
//         }

//         await User.findByIdAndDelete(user.id);
//         res.json(user);
//     }
