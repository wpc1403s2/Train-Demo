/**
 * Created by wpc on 2017/6/16.
 */
//数据库处理模块
var mysql = require('../config/mysql');
var db = mysql();
var dbContrl = {
    getType:function(req,res,next){
        var newsType = req.query.newsType;
        db.query('SELECT * FROM `news` WHERE `newsType` = ?',[newsType],function (error,rows,fields) {
            console.log(rows);
            res.locals.typelist = rows;
            next();
        });
    },
    //查询所有关键字新闻
    getAll: function(req, res, next) {
       /* var where="";
        if(req.query.keywords!==""){
            where = "where `main_title` like'%" + req.query.keywords + "%'";
        }*/
        var sql = 'select * from `news` ';
        db.query(sql, function(err, rows, fields) {
            res.locals.news = rows;
            next();
        });

    },
    readOne: function(req, res, next) {
        var newsId = req.query.newsId;
        var sql = 'select * from `news` where `id`=' + newsId;
        db.query(sql, function(err, rows, fields) {
            res.locals.news = rows;
            next();
        });
    },
    //删除一条新闻
    deleteOne: function(req, res, next) {
        var newsId = req.body.newsId;
        db.query("DELETE FROM `news` WHERE `news`.`id`=?", [newsId], function (err, rows) {
            if (err) {
                res.locals.flag = 0;
                console.log(res.locals.flag)
            } else {
                res.locals.flag = 1;
                console.log(res.locals.flag)
            }

            next();
        });
    },
    //更新
    editOne: function(req, res, next) {
        var newsId = req.body.newsId,
            newsType = req.body.newsType,
            newsTitle = req.body.newsTitle,
            newsImg = req.body.newsImg,
            newsSrc = req.body.newsSrc,
            newsTime = req.body.newsTime;

        var modSql = 'UPDATE news SET newsTitle = ?,newsType = ?, newsImg=? ,newsSrc=? , newsTime=?  WHERE id = ?';
        var modSqlParams = [newsTitle, newsType, newsImg, newsSrc, newsTime, newsId];
        db.query(modSql,modSqlParams, function(err, rows, fields) {
            if (err) {
                res.locals.flag = 0;
            } else {
                res.locals.flag = 1;
            }
            next();
        });
    },
    //添加
    add: function(req, res, next) {
        var newsTitle  =req.body.newsTitle,
            newsType =req.body.newsType,
            newsImg =req.body.newsImg,
            newsSrc =req.body.newsSrc,
            newsTime =req.body.newsTime;

        var modSql = "INSERT INTO `news` (`newsTitle`,`newsType`,`newsImg`,`newsSrc`,`newsTime`) VALUES (?,?,?,?,?)";
        var modSqlParams = [newsTitle, newsType, newsImg, newsSrc, newsTime];
        db.query(modSql,modSqlParams, function(err, rows, fields) {
            res.locals.news = rows;
            next();
        });


    },
}

module.exports = dbContrl;