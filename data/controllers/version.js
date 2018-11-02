const Model = require('../models/version');

module.exports = {
    getVersions(req) {
        return Model.find({projectName: req.query.projectName});
    },
    createVersion(versionInfo) {
        return new Model(versionInfo).save(); 
    },
    closeVersion(projectName, version) {
        console.log('close version', {projectName, version});
        return Model.updateOne({projectName, version}, {
            $set: {status: 'closed'}
        }); 
    }
}
