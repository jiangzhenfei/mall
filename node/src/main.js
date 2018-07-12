var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs')
//文件上传插件
var multiparty = require('multiparty'); 

//增加body-parser中间件 通过req.body获取post上传登body数据
app.use( bodyParser.urlencoded( { extended: false } ) ); 
app.use(bodyParser.json()); 

//增加cookie中间件 通过eq.cookies获取cookies
const cookieParser = require('cookie-parser');
app.use(cookieParser());

//返回前端的格式化方法
var Response = require('./response')
//token过期封装
var token = require('./token')
//app.use(token());

//localhost:8080/images/goods.png 就是访问/static/images/goods.png
app.use(express.static('static'));

//数据库连接池
let OptPool = require('./mysql-pool')
let opt_Pool = new OptPool();  //初始化连接池对象
let pool = opt_Pool.getPool(); //创建连接池


/**
 * 保存数据，假数据，商品类别，商品列表的变量
 * 目前都是假数据
 */
const user={};//用户
const goodsClassList = []//商品类别
let classId = 1;
let goodsId = 1;
const GoodsofClass = {}


//获取商品类别
app.get('/class/list', function( req, res ) {
    let arr = goodsClassList;
    //Response.status402(res) //将外部的code变成402，一般402就是延时
    //console.log(req.cookies)// { user: 'fei', dnt: 'a793d4ab-d3c2-46b2-8468-c9a1d441d326' }
    let result = Response.success( arr )
    res.send( result )
});

//获取商品list
app.get('/goods/list/:id', function( req, res ) {
    let id = req.params.id
    let arr = GoodsofClass[id] || []
    let result = Response.success( arr )
    res.send( result )
});

//新增商品类别
app.post('/class/add', function( req, res ) {
    goodsClassList.push({
        name:req.body.name,
        id: classId++
    })
    let result = Response.success( )
    res.send( result )
});

app.post('/goods/add/:id', function( req, res ) {
    let id = req.params.id
    !GoodsofClass[id] && (GoodsofClass[id] = []);
    GoodsofClass[id].push({
        name:  req.body.name,
        desc:  req.body.desc || '',
        money: req.body.money,
        store: req.body.store,
        img:   req.body.img || '/images/goods.jpg',//保存文件服务器返回给前端的图片路径
        id:    goodsId++
    })
    let result = Response.success( )
    res.send( result )
});

//上传文件将文件路径返回前端使得前端保存
app.post('/upload', function( req, res ) {
    var form = new multiparty.Form();//新建表单
    //设置编辑
    form.encoding = 'utf-8';
    //设置图片存储路径
    form.uploadDir = "static/images/";
    form.keepExtensions = true;   //保留后缀
    form.maxFieldsSize = 2*1024*1024; //内存大小
    form.maxFilesSize= 5*1024*1024;//文件字节大小限制，超出会报错err
    //表单解析
    form.parse(req, function(err,fields,files) {
        //报错处理
        if(err){
            res.send(Response.error( '请上传5M以图片' ))
            return false;
        }
        //获取路径
        var oldpath=files.image_cover[0]['path'];
        let json = {
            url: oldpath.split('/').slice(1).join('/'),//应为不需要static开头，使用了 app.use(express.static('static'));
        }
        let result = Response.success(json )
        res.send( result )
    });
});


var server = app.listen(3000, function () {
    var host = server.address().address
    var port = server.address().port
    console.log( server.address() )//{ address: '::', family: 'IPv6', port: 3000 }
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
   
});
