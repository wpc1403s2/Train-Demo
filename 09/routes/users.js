/**
 * Created by wpc on 2017/6/16.
 */
var express = require('express');
var router = express.Router();
var dbControl = require('../lib/dbControl');

/* 获取所有新闻列表 */
router.get('/getnews', dbControl.getAll, function(req, res, next) {
    res.send(res.locals.news.reverse());
});

/*确定更新*/
router.post('/update', dbControl.editOne, function(req, res, next) {
    res.json({
        success: res.locals.flag
    });
});
/*读取一条新闻*/
router.get('/curnews', dbControl.readOne, function (req, res, next) {
    res.send(res.locals.news);

})
/*删除*/
router.post('/del', dbControl.deleteOne, function(req, res, next) {
    res.json({
        success: res.locals.flag
    });
    /*res.json(res.locals.news);*/

});

/*添加*/
router.post('/insert',dbControl.add, function(req, res, next) {
    res.send(res.locals.news);
});
module.exports = router;