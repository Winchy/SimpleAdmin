const {exec} = require('child_process');
var express = require('express');
var router = express.Router();

router.get('/*', function(req, res, next) {
  req.vueOptions.head.styles = [{style: '/simple_admin/stylesheets/index.css'}] 
  req.vueOptions.head.scripts= [{src: 'http://code.jquery.com/jquery-3.3.1.min.js'}] 
  res.renderVue('index.vue', { title: 'Express' }, req.vueOptions);
});

module.exports = router;
