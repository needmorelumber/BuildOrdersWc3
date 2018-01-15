const buildController = require('./../controllers/buildController'),
      userController = require('./../controllers/userController'),
      express = require('express'),
      routes  = express.Router(),
      Mongoosse = require('mongoose');

/////// API ////////

routes.get('/builds_by_page/:page', (req, res) => {
    buildController.getBuildPage(req, res);
})
routes.get('/all_builds', (req, res) => {
    buildController.allBuilds(req, res);
})
routes.post('/new_build', (req, res) => {
    buildController.newBuild(req, res);
})
routes.post('/update_build', (req, res) => {
    buildController.updateBuild(req, res);
})
routes.post('/add_minute', (req, res) => {
buildController.addMinute(req, res);
})
routes.post('/get_by_id', (req, res) => {
    buildController.getById(req, res);
})
routes.post('/new_user', (req, res) => {
    userController.newUser(req, res);
})
routes.post('/login', (req, res) => {
    userController.loginUser(req, res)
})
routes.get('/get_user', (req, res) => {
    userController.getCurrentUserCookie(req, res)
})    
routes.get('/logout', (req, res) => {
    userController.logOut(req, res)
})
module.exports = routes;