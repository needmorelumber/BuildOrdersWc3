const mongoose = require('mongoose');
const build_order = mongoose.model('build_order');
const User = mongoose.model('user');
const Like = mongoose.model('likes');

const parseError = (err, res) => {
    switch (err.name) {
        case('ValidationError'):
            res.json({error: err.errors})
    }

}

module.exports = (() => {
    var buildController = {};
    buildController.getBuildPage = (req, res) => {
        var perPage = 11;
        var page = req.params.page;
        var totalBuilds = 11;
        build_order.find((err, builds) => {
            if (!err) {
                totalBuilds = builds.length
            }
        })
        build_order
            .find({})
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .exec((err, builds) => {
                if (!err) {
                    res.json({builds, totalBuilds: totalBuilds});
                    // console.log(builds)
                } else {
                    res
                        .status(404)
                        .send('Could not load builds from database')
                }
            })
    }
    buildController.allBuilds = (req, res) => {
        build_order.find((err, builds) => {
            if (!err) {
                setTimeout(() => {
                    res.json(builds);
                }, 2000)

            } else {
                res
                    .status(404)
                    .send('Could not load builds from database')
            }
        })
    }
    buildController.getById = (req, res) => {
        const id = req.body.id;
        if (!id) {
            res.status(400)
        }
        build_order.findById(id, (err, build) => {
            if (!err && build) {
                res
                    .status(200)
                    .json({build});
            } else {
                res
                    .status(200)
                    .json(false)
            }
        })
    }
    buildController.newBuild = (req, res) => {
        if (req.body) {
            // console.log(req.body)
        }
        const newBuild = new build_order(req.body);
        newBuild.save((error) => {
            if (!error) {
                let sessUser = req.session.user
                let id = sessUser._id
                sessUser
                    .ownedTimelineIds
                    .push(newBuild._id)
                User.findById(id, (err, user) => {
                    if (!err && user) {
                        user
                            .ownedTimelineIds
                            .push(newBuild._id);
                        user.save();
                        res.json({data: true});
                    } else {
                        //    console.log(err)
                    }
                })

            } else {
                // console.log(error)
                parseError(error, res);
            }
        })
    }
    buildController.updateBuild = (req, res) => {
        const body = req.body;
        const id = body.id
        const timeline = body.timeline;
        build_order.findById(id, (err, build) => {
            if (!err && build) {
                build.build_list = timeline;
                build.save();
                res.json({data: build.build_list})
            } else {
                res.json({err})
            }
        })

    }
    buildController.addMinute = (req, res) => {
        const body = req.body;
        const id = body.id
        const timeline = body.timeline;
        if (timeline.length >= 2700) {
            res
                .status(200)
                .send('Too Long')
        }
        build_order.findById(id, (err, build) => {
            if (!err && build) {
                var newMinute = [];
                var currlist = timeline.build_list;
                var currlistsecond;
                if (currlist.length > 1) {
                    currlistsecond = currlist.length + 1;
                } else {
                    currlistsecond = 1;
                }
                for (let i = 0; i < 60; i++) {
                    newMinute.push({second: currlistsecond, order: {}})
                    currlistsecond++
                }
                var newBuildList = currlist.concat(newMinute);
                build.build_list = newBuildList;
                build.save();
                res.json({data: build.build_list})
            } else {
                res.json({err})
            }
        })

    }
    buildController.likeBuild = (req, res) => {
        const body = req.body;
        const buildToLike = req.body.id;
        const userToLike = req.session.user._id;
        Like.find({
            'buildId': buildToLike,
            'userId': userToLike
        }, (err, like) => {
            if (!err) {
                if (like.length < 1) {
                    build_order.findById(buildToLike, (err, build) => {
                        if (!err && build) {
                            const addingLike = new Like({
                                userId: userToLike,
                                buildId: buildToLike
                            })
                            addingLike.save();
                            build.likes += 1;
                            build.save();
                            res.status(200).send('Liked')
                        } else {
                            res
                                .status(400)
                                .send('Database Error');
                        }
                    } 
                    )
                }
                else
                res
                    .status(200)
                    .send('Already Liked')
                }
        return
        })
    }

return buildController;})();