const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const User = mongoose.model('user');
const build_order = mongoose.model('build_order');


module.exports = (() => {
  return {
    newUser(req, res) {
      let body = req.body;
      if(!body.credentials.username || !body.credentials.eMail || !body.credentials.password || !body.credentials.confirmPassword) {
          // Calling api directly... 
          res.status(404).send({
            Message: 'Intentionally getting past front end'
          });
          return;
        }
      User.findOne({
      eMail: body.credentials.eMail
      }, (err, userFound) => {
        if (err) {
          res.status(500).send('Database Error');
          return;
        }
        if (userFound) {
          // Indicates that the E-mail is already in use
          res.status(200).send({
            Message: 'Invalid E-mail'
          });
          return;
        } else {
          var userToSave = new User(body.credentials);
          const saltrounds = 9;
          bcrypt.hash(body.credentials.password, saltrounds, (err, hash) => {
            if (err) {
            console.log(err)
            } else {
              userToSave.password = hash;
              userToSave.save((err) => {
                if (err) {
                  console.log(err)
                } else {
                  req.session.user = userToSave;
                  userToSave.password = null;
                  res.json({
                    user: userToSave
                  });
                }
              });

            }
          });
        }

      });
    },
    loginUser(req, res) {
      let loginInfo=req.body.credentials;
        User.findOne({
          eMail: loginInfo.eMail
          }, (err, userFound) => {
          if (!loginInfo.eMail || !loginInfo.password) {
            res.status(404).send({Message: "missing field sneaky"})
          } else if (userFound) {
            bcrypt.compare(loginInfo.password, userFound.password, (err, bcryptRes) => {
              if (bcryptRes === true) {
                userFound.password = null;
                req.session.user = userFound;
                res.json({
                  user: userFound
                });
              } else {
                res.status(200).send({
                  Message: 'Credentials Failed, please try again.'
                });
              }
            });
          } else {
            res.status(200).send({
              Message: 'User Not Found'
            });
          }
        });
    },
    getCurrentUserCookie(req, res) {
      const session = req.session;
      if(session.user){
        if(session.user._id){
        const user = session.user;
        build_order.find({ownerId: user._id},(err,builds)=>{
          if(!err){
          user.userBuilds = builds;
          res.json({user:user})
          }
        })
        }else{
          res.json({user: false})
        }
        }
      else {
        res.json({user: false})
      }
      
    },
    logOut(req, res) {
      const user = req.session.user ? req.session.user : null
      req.session.user = {};
      res.json({loggedOut: true})
    },
    deleteUser(req, res){
      const user = req.session.user;
      const id = req.body.id;
      if(user._id === id) {
        User.findOne({_id: user._id}, (err, userFromdb) => {
          bcrypt.compare(req.body.password, userFromdb.password, (err, bcryptRes) => {
            if (bcryptRes === true) {
              // Loop all owned builds and remove
              userFromdb.ownedTimelineIds.forEach((id)=>{
                build_order.findByIdAndRemove(id,(err, build)=>{
                  if(err){
                    res.status(200).json({Message: 'Database Error, try again later'})
                  }
                })
              })
              // Remove the user
              User.findByIdAndRemove(id, (err,user) => {
                if(!err)
                  res.status(200).json({removed: true})
                else
                  res.status(200).json({Message: 'Database Error, try again later'})
              })
            } else {
              res.status(200).json({Message: 'Password does not match'})
            }
          });
        })
      }
    },
    changeUsername(req, res) {
      const id = req.body.id;
      const newUsername = req.body.username;
      User.findById(id, (err, user) => {
        if (err) res.status(200).json({Message: 'Database Error, try again later'});
        user.username = newUsername;
        user.save((err, updated) => {
          req.session.user = updated;
          build_order.find({ownerId: user._id},(err,builds)=>{
          if(!err){
          req.session.user.userBuilds = builds;
          res.status(200).json({user:user})
          }
        })
      })
      })
    }
  }
})(); 