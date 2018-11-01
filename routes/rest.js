const projectDataController = require('../data/controllers/project');
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

module.exports = router;
