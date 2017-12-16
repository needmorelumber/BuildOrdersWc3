const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const User = mongoose.model('user');

module.exports = (() => {
  return {
    newUser(req, res) {
      let body = req.body;
      console.log(body)
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
          res.status(404).send({
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
            res.json({
              error: "field_missing"
            });
          } else if (userFound) {
            console.log(userFound)
            bcrypt.compare(loginInfo.password, userFound.password, (err, bcryptRes) => {
              if (bcryptRes === true) {
                console.log('matched and sending')
                res.json({
                  user: userFound
                });
              } else {
                console.log('didnt match')
                res.status(204).send({
                  Message: 'User Not Found'
                });
              }
            });
          } else {
            res.status(204).send({
              Message: 'User Not Found'
            });
          }
        });
    }
  }
})();