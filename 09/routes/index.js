/**
 * Created by wpc on 2017/6/16.
 */
var express = require('express');
var router = express.Router();
var dbControl = require('../lib/dbControl');



//引入模板并加载分类

router.get('/' ,dbControl.getType,function(req, res, next) {
    var typelist=res.locals.typelist;
    res.json(typelist)
});
module.exports = router;