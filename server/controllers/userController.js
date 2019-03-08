const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = mongoose.model('user');
const BuildOrder = mongoose.model('build_order');


module.exports = (() => ({
  newUser(req, res) {
    const { body } = req;

    // TODO Use real validation library
    if (!body.credentials.username
      || !body.credentials.eMail
      || !body.credentials.password
      || !body.credentials.confirmPassword) {
      // Calling api directly...
      return res.status(404).send({
        Message: 'Intentionally getting past front end',
      });
    }

    return User.findOne({
      eMail: body.credentials.eMail,
    }, (err, userFound) => {
      if (err) {
        return res.status(500).send('Database Error');
      }
      if (userFound) {
        // Indicates that the E-mail is already in use
        return res.status(200).send({
          Message: 'Invalid E-mail',
        });
      }

      const userToSave = new User(body.credentials);
      const saltrounds = 9;
      // This could use async / await or then'ing
      bcrypt.hash(body.credentials.password, saltrounds, (bcryptErr, hash) => {
        if (!bcryptErr) {
          userToSave.password = hash;
          userToSave.save(userSaveErr => {
            if (!userSaveErr) {
              req.session.user = userToSave;
              userToSave.password = null;
              res.json({
                user: userToSave,
              });
            }
          });
        }
      });
      return null;
    });
  },

  loginUser(req, res) {
    const loginInfo = req.body.credentials;
    User.findOne({
      eMail: loginInfo.eMail,
    }, (err, userFound) => {
      // TODO use real validation here
      if (!loginInfo.eMail || !loginInfo.password) {
        res.status(404).send({ Message: 'missing field sneaky' });
      } else if (userFound) {
        bcrypt.compare(loginInfo.password, userFound.password, (bcryptErr, bcryptRes) => {
          if (bcryptRes === true) {
            req.session.user = userFound;
            res.json({
              user: { ...userFound, password: null },
            });
          } else {
            res.status(400).send({
              Message: 'Credentials Failed, please try again.',
            });
          }
        });
      } else {
        res.status(404).send({
          Message: 'User Not Found',
        });
      }
    });
  },

  getCurrentUserCookie(req, res) {
    const { session } = req;
    // this would benefit from just using try / catch to be frank
    if (session.user) {
      if (session.user._id) {
        const { user } = session;
        BuildOrder.find({ ownerId: user._id }, (err, builds) => {
          if (!err) {
            user.userBuilds = builds;
            res.json({ user });
          }
        });
      } else {
        res.json({ user: false });
      }
    } else {
      res.json({ user: false });
    }
  },

  logOut(req, res) {
    req.session.user = {};
    res.json({ loggedOut: true });
  },

  deleteUser(req, res) {
    const { user } = req.session;
    const { id } = req.body;
    if (user._id === id) {
      User.findOne({ _id: user._id }, (err, userFromdb) => {
        bcrypt.compare(req.body.password, userFromdb.password, (bcryptErr, bcryptRes) => {
          if (bcryptRes === true) {
            // Loop all owned builds and remove
            userFromdb.ownedTimelineIds.forEach(buildId => {
              BuildOrder.findByIdAndRemove(buildId, removeError => (removeError
                ? res.status(500).json({ Message: 'Database Error, try again later' })
                : null
              ));
            });
            // Remove the user
            return User.findByIdAndRemove(id, findError => (!findError
              ? res.status(200).json({ removed: true })
              : res.status(200).json({ Message: 'Database Error, try again later' })));
          }
          return res.status(200).json({ Message: 'Password does not match' });
        });
      });
    }
  },
  changeUsername(req, res) {
    const { id } = req.body;
    const newUsername = req.body.username;
    User.findById(id, (err, user) => {
      if (err) res.status(200).json({ Message: 'Database Error, try again later' });
      // eslint-disable-next-line no-param-reassign
      user.username = newUsername;
      user.save((saveErr, updated) => {
        req.session.user = updated;
        BuildOrder.find({ ownerId: user._id }, (findErr, builds) => {
          if (!findErr) {
            req.session.user.userBuilds = builds;
            return res.status(200).json({ user });
          }
          return null;
        });
      });
    });
  },
}))();
