const mongoose = require('mongoose');

const BuildOrder = mongoose.model('build_order');
const User = mongoose.model('user');
const Like = mongoose.model('likes');

const parseError = (err, res) => {
  switch (err.name) {
    case ('ValidationError'):
      res.json({ error: err.errors });
      break;
    default:
      res.json({ error: 'something went wrong' });
  }
};

module.exports = (() => {
  const buildController = {};
  buildController.allBuilds = (req, res) => BuildOrder.find((err, builds) => (!err
    ? res.json(builds)
    : res
      .status(404)
      .send('Could not load builds from database')));


  buildController.buildsforUser = (req, res) => BuildOrder.find({ userId: req.session.user._id },
    (err, builds) => (!err
      ? res.json(builds)
      : res
        .status(404)
        .send('Could not load builds from database')));

  buildController.getById = (req, res) => {
    const { id } = req.body;
    if (!id) {
      res.status(400);
    }
    return BuildOrder.findById(id, (err, build) => (
      !err && build
        ? res
          .status(200)
          .json({ build })
        : res
          .status(404)
          .send('Could not load build from database')));
  };

  buildController.newBuild = (req, res) => {
    const newBuild = new BuildOrder(req.body);
    if (!newBuild.name || !newBuild.race || !newBuild.description || !newBuild.build_type) {
      res.status(200).send({
        Message: 'Invalid',
      });
    }
    if (newBuild.name.length > 50 || newBuild.description.length > 500 || newBuild.analysis.length > 500) {
      res.status(200).send({
        Message: 'Invalid',
      });
    }
    newBuild.save(error => {
      if (!error) {
        const sessUser = req.session.user;
        const id = sessUser._id;
        sessUser.ownedTimelineIds.push(newBuild._id);
        User.findById(id, (err, user) => {
          if (!err && user) {
            user
              .ownedTimelineIds
              .push(newBuild._id);
            user.save();
            res.json({ data: true });
          } else {
            //    console.log(err)
          }
        });
      } else {
        // console.log(error)
        parseError(error, res);
      }
    });
  };
  buildController.updateBuild = (req, res) => {
    const { body } = req;
    const { id } = body;
    const { timeline } = body;
    BuildOrder.findById(id, (err, build) => {
      if (!err && build) {
        build.build_list = timeline;
        build.save();
        res.json({ data: build.build_list });
      } else {
        res.json({ err });
      }
    });
  };
  buildController.deleteBuild = (req, res) => {
    const { body } = req;
    const { id } = body;
    const userid = req.session.user._id;
    User.findById(userid, (err, user) => {
      if (!err && user) {
        console.log('user owns id');
        BuildOrder.findByIdAndRemove(id, (err, build) => {
          if (!err && build) {
            const spliceindex = user.ownedTimelineIds.indexOf(id);
            user.ownedTimelineIds.splice(spliceindex, 1);
            user.save();
            build.save();
            res.status(200).json({ deleted: true });
          } else {
            res.status(200).json({ deleted: false });
          }
        });
      } else {
        res.status(200).json({ Message: 'invalid' });
      }
    });
  };
  buildController.addMinute = (req, res) => {
    const { body } = req;
    const { id } = body;
    const { timeline } = body;
    if (timeline.length >= 2700) {
      res
        .status(200)
        .send('Too Long');
    }
    BuildOrder.findById(id, (err, build) => {
      if (!err && build) {
        const newMinute = [];
        const currlist = timeline.build_list;
        let currlistsecond;
        if (currlist.length > 1) {
          currlistsecond = currlist.length + 1;
        } else {
          currlistsecond = 1;
        }
        for (let i = 0; i < 60; i++) {
          newMinute.push({ second: currlistsecond, order: { second: currlistsecond } });
          currlistsecond++;
        }
        const newBuildList = currlist.concat(newMinute);
        build.build_list = newBuildList;
        build.save();
        res.json({ data: build.build_list });
      } else {
        res.json({ err });
      }
    });
  };
  buildController.removeMinute = (req, res) => {
    const { body } = req;
    const { id } = body;
    const { timeline } = body;
    if (timeline.length == 0) {
      res
        .status(200)
        .send('Too Short');
    }
    BuildOrder.findById(id, (err, build) => {
      if (!err && build) {
        const currlist = timeline.build_list;
        build.build_list = timeline.build_list.slice(0, timeline.build_list.length - 60);
        build.save();
        res.json({ data: build.build_list });
      } else {
        res.json({ err });
      }
    });
  };
  buildController.updateOrderInBuild = (req, res) => {
    // Here we check the index of the order and validate that we are seeing the same order,
    // Then we will update that order and save to database assuming no issues...
    const { body } = req;
    const { id } = body;
    const orderIndex = body.index;
    const { timeline } = body;
    BuildOrder.findById(id, (err, build) => {
      if (!err && build) {
        console.log(`below me is the index sent back from the body for the buildlist of${id}this id`);
        console.log(build.build_list[orderIndex]);
        build.build_list = timeline;
        build.save();
        res.json({ data: build.build_list });
      } else {
        res.json({ err });
      }
    });
  };
  buildController.likeBuild = (req, res) => {
    const { body } = req;
    const buildToLike = body.id;
    const userToLike = req.session.user._id;
    const { index } = body;
    Like.find({
      buildId: buildToLike,
      userId: userToLike,
    }, (err, like) => {
      if (!err) {
        if (like.length < 1) {
          BuildOrder.findById(buildToLike, (err, build) => {
            if (!err && build) {
              const addingLike = new Like({
                userId: userToLike,
                buildId: buildToLike,
              });
              addingLike.save();
              build.likes += 1;
              build.save();
              res.status(200).send({ build, index });
            } else {
              res
                .status(400)
                .send('Database Error');
            }
          });
        } else {
          res
            .status(200)
            .send('Already Liked');
        }
      }
    });
  };

  return buildController;
})();
