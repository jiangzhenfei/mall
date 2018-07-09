var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs')
//文件上传插件
var multiparty = require('multiparty'); 
//增加body-parser中间件
app.use( bodyParser.urlencoded( { extended: false } ) ); 
app.use(bodyParser.json()); 



app.use(express.static('static'));

let OptPool = require('./mysql-pool')

let opt_Pool = new OptPool();  //初始化连接池对象
let pool = opt_Pool.getPool(); //创建连接池

let user={};//用户
let goodsClassList = []//商品类别
let classId = 1;
let goodsId = 1;
let GoodsofClass = {}


//获取商品类别
app.get('/class/list', function( req, res ) {
    let arr = goodsClassList;
    let json = {
        response:arr,
        code:200,
        success:true
    }
    let result = JSON.stringify( json )
    res.send( result )
});

//获取商品list
app.get('/goods/list/:id', function( req, res ) {
    let id = req.params.id
    let arr = GoodsofClass[id] || []
    let json = {
        response:arr,
        code:200,
        success:true
    }
    let result = JSON.stringify( json )
    res.send( result )
});

//获取商品类别
app.post('/class/add', function( req, res ) {
    goodsClassList.push({
        name:req.body.name,
        id: classId++
    })
    let json = {
        code:200,
        success:true
    }
    let result = JSON.stringify( json )
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
    let json = {
        code:200,
        success:true
    }
    let result = JSON.stringify( json )
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
            var u={"error" :1,"message":'请上传5M以图片'};
            res.end(JSON.stringify(u));
            return false;
        }
        //获取路径
        var oldpath=files.image_cover[0]['path'];
        let json = {
            code:    200,
            url:     oldpath.split('/').slice(1).join('/'),//应为不需要static开头，使用了 app.use(express.static('static'));
            success: true
        }
        let result = JSON.stringify( json )
        res.send( result )
    });
});


var server = app.listen(3000, function () {
    var host = server.address().address
    var port = server.address().port
    console.log( server.address() )//{ address: '::', family: 'IPv6', port: 3000 }
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
   
});
