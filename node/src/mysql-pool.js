var mysql = require('mysql'); //调用MySQL模块

//创建一个用于创建连接池的对象
function OptPool(){
    this.flag = true; //是否连接通过
    this.pool = mysql.createPool({
        host:'localhost',
        user:'root',
        password:'fei',
        database:'goods',
        port:'3306'
    });
    this.getPool = function(){
        if(this.flag){
            //监听connection事件
            this.pool.on('connection',function(connection){
                connection.query('SET SESSION auto increment increme')
               this.flag = false;
            });
        }
        return this.pool;
    }
}
module.exports = OptPool;
