const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const User = mongoose.model('user');

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
          res.status(404).send({
            Message: err
          });
          return;
        }
        if (userFound) {
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
            res.status(200).send({Message: "missing field sneaky"})
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
      if(session.user._id){
        const user = session.user;
        res.json({user: user});
        }
      else {
        res.json({user: false})
      }
      
    },
    logOut(req, res) {
      const user = req.session.user ? req.session.user : null
      req.session.user = {};
      res.json({loggedOut: true})
    }
  }
})();