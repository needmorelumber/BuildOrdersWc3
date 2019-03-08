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
      return res.status(400);
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
    // TODO this needs actual validation library
    if (!newBuild.name
      || !newBuild.race
      || !newBuild.description
      || !newBuild.build_type) {
      return res.status(400).send({
        Message: 'Invalid',
      });
    }

    // TODO this needs actual validation library
    if (newBuild.name.length > 50
      || newBuild.description.length > 500
      || newBuild.analysis.length > 500) {
      return res.status(400).send({
        Message: 'Invalid',
      });
    }

    return newBuild.save(error => {
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
          }
        });
      } else {
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
        // TODO use findOneAndUpdate() here
        // https://mongoosejs.com/docs/api.html#model_Model.findOneAndUpdate
        // eslint-disable-next-line no-param-reassign
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

    // TODO this is not a great way to validate that the build belongs to this user.
    // Validate that by refining the filters on the .find to include the user ID.
    User.findById(userid, (err, user) => {
      if (!err && user) {
        BuildOrder.findByIdAndRemove(id, (error, build) => {
          if (!error && build) {
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
        res.status(400).json({ Message: 'invalid' });
      }
    });
  };

  // TODO deprecate away from minutes.
  buildController.addMinute = (req, res) => {
    const { body } = req;
    const { id } = body;
    const { timeline } = body;

    // TODO use real validation library
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
        currlistsecond = currlist.length > 1 ? currlist.length + 1 : 1;

        // TODO use map, or just remove this as I want to move away from timeline
        // concept for MVP and to simpler supply demarcated build orders.
        for (let i = 0; i < 60; i += 1) {
          newMinute.push({ second: currlistsecond, order: { second: currlistsecond } });
          currlistsecond += 1;
        }

        const newBuildList = currlist.concat(newMinute);

        // TODO use an update here
        // eslint-disable-next-line no-param-reassign
        build.build_list = newBuildList;
        build.save();
        res.json({ data: build.build_list });
      } else {
        res.json({ err });
      }
    });
  };

  // TODO deprecate away from minutes.
  buildController.removeMinute = (req, res) => {
    const { body } = req;
    const { id } = body;
    const { timeline } = body;
    if (timeline.length === 0) {
      return res
        .status(400)
        .send('Too Short');
    }

    BuildOrder.findById(id, (err, build) => {
      if (!err && build) {
        // eslint-disable-next-line no-param-reassign
        build.build_list = timeline.build_list.slice(0, timeline.build_list.length - 60);
        build.save();
        return res.json({ data: build.build_list });
      }
      return res.json({ err });
    });
    return res.json(400);
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
          BuildOrder.findById(buildToLike, (error, build) => {
            if (!error && build) {
              const addingLike = new Like({
                userId: userToLike,
                buildId: buildToLike,
              });
              addingLike.save();
              // eslint-disable-next-line no-param-reassign
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
