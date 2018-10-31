const {exec} = require('child_process');
var express = require('express');
var router = express.Router();

router.get('/hello', function(req, res, next) {
    exec('ls /home/', (err, stdout, stderr) => {
        if (err) {
            console.log(err);
            res.send(err);
            return;
        }
        res.send(stdout);
    });
});

router.get('/*', function(req, res, next) {
  req.vueOptions.head.styles = [{style: 'stylesheets/index.css'}] 
  req.vueOptions.head.scripts= [{src: 'http://code.jquery.com/jquery-3.3.1.min.js'}] 
  res.renderVue('index.vue', { title: 'Express' }, req.vueOptions);
});

module.exports = router;
