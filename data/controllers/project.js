const model = require('../models/project');

module.exports = {
    getProjects(req) {
        return model.find();
    },
    
    createProject(req, callback) {
        let {localRes, localScripts, devRes, devScripts, productRes, productScripts, name, svnRoot} = req.body;

        console.log({localRes, localScripts, devRes, devScripts, productRes, productScripts, name, svnRoot});

        return new model({
            name,
            localRes,
            localScripts,
            devRes,
            devScripts,
            productRes,
            productScripts,
            svnRoot
        }).save((err, result)=> {
            callback(err, result);
        });
    }
    
}
