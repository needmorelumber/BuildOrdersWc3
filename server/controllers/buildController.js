const mongoose = require('mongoose');
const build_order = mongoose.model('build_order');


const parseError = (err, res) => {
    switch(err.name){
        case('ValidationError'):
            res.json({error: err.errors})
    }
    
}

module.exports = (() => {
var buildController = {};
    buildController.allBuilds = (req, res) => {
         build_order.find((err, builds) => {
             if (!err) {
                 res.json(builds);
             }
         })
    }
    buildController.getById = (req, res) => {
        const id = req.body.id;
        if(!id){res.status(400)}
        build_order.findById(id, (err, build) => {
            if(!err && build) {
                res.status(200).json( {build} );
            }
        })
    }
    buildController.newBuild = (req, res) => {
        const newBuild = new build_order(req.body);
        newBuild.save((error) => {
            if(!error) {
                res.json({data: true});
            } else {
                console.log(error)
                parseError(error, res);
            }
        })
    }
    buildController.updateBuild = (req, res) => {
        const body = req.body;
        const id = body.id
        const timeline = body.timeline;
        build_order.findById(id, (err, build) => {
            if(!err && build) {
                build.build_list = timeline;
                build.save();
                res.json({data: build.build_list})
            } else {
                res.json({err})
            }
        })

    }
    
return buildController;
})();