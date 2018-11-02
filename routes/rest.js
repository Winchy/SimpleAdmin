const projectDataController = require('../data/controllers/project');
const versionDataController = require('../data/controllers/version');
const { exec } = require('child_process'); 
const express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('hello');
}); 

router.get('/projects', function(req, res, next) {
    projectDataController.getProjects(req).then(function(projects) {
    console.log(projects);
        res.json(projects);
    });
}); 

router.post('/projects/create', function(req, res, next) {
    projectDataController.createProject(req, function(err, result){
        res.json(result || {});
    });
}); 

router.post('/projects/delete', function(req, res, next) {
    console.log('about to delete project ' + req.body.projectName);
    projectDataController.deleteProject(req).then(result => {
        res.json(result || {});
    });
}); 

router.get('/versions', function(req, res, next) {
    versionDataController.getVersions(req).then(function(versions) {
        res.json(versions);
    });    
});

router.post('/versions/create', function(req, res, next) {
    var projectName = req.body['project[name]'];
    var svnRoot = req.body['project[svnRoot]'];
    var newBranch = svnRoot + '/branches/v' + req.body.newVersion;
    var oldBranch = svnRoot + '/branches/v' + req.body.version;
    var trunk = svnRoot + '/trunk';
    var svncmd = req.body.version && `svn copy -m 'new branch' ${oldBranch} ${newBranch}` || `svn copy -m 'new branch' ${trunk} ${newBranch}`;
    console.log(svncmd);
    exec(svncmd, (error, stdout, stderr) => {
        if (error) {
            res.json({error});
            return;
        }
        else if (stderr) {
            res.json({stderr});
            return;
        }
        else {
            versionDataController.createVersion({
                projectName: projectName,
                version: req.body.newVersion,
                status: 'open',
                branchUrl: newBranch,
                createTime: new Date()
            }).then( result => {
                console.log('-------', req.body.version);
                if (req.body.version) {
                    versionDataController.closeVersion(projectName, req.body.version).then( result => {
                        console.log(result);
                    });
                }
                res.json({stdout});
            });
        }
    });
})

module.exports = router;
