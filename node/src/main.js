var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs')
//增加body-parser中间件
app.use( bodyParser.urlencoded( { extended: false } ) ); 
app.use(bodyParser.json()); 

var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

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
        img:   '/file/'+req.body.img || '/images/goods.jpg',//保存文件服务器返回给前端的图片路径
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
app.post('/upload', upload.single('image_cover'),function( req, res ) {
    console.log(req.file)
    let json = {
        code:200,
        url:req.file.filename,
        success:true
    }
    let result = JSON.stringify( json )
    res.send( result )
});

//文件读取
app.get('/file/:id', function( req, res ) {
    let id = req.params.id
    fs.readFile( `./uploads/${id}` ,'binary',function(err,filedata)  { //异步执行  'binary' 二进制流的文件
        if  (err)  {
            let json = {
                code:404,
                success:false
            }
            let result = JSON.stringify( json )
            res.send( result )
            return;
        }else{
            res.writeHead('200', {'Content-Type': 'image/jpeg'});    //写http头部信息
            res.end(filedata,'binary'); 
        }
    });
});



var server = app.listen(3000, function () {
    var host = server.address().address
    var port = server.address().port
    console.log( server.address() )//{ address: '::', family: 'IPv6', port: 3000 }
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
   
});
