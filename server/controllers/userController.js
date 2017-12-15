const mongoose = require('mongoose');
const user = mongoose.model('user');

module.exports = (() => {
  return {
    newUser(req, res) {
      console.log(req.body);
    },
    loginUser(req, res) {
      console.log(req.body)
    }
  }
})();