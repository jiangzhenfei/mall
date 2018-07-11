
/**
 * 返回前端的数据格式
 */
const Response = {
    success:function( data ){
        let json = {
            response: data || null,
            code:     200,
            success:  true
        }
        return JSON.stringify( json )
    },
    error:function( message ){
        let json = {
            response: null,
            code:     200,
            success:  false,
            message: message || '未知错误'
        }
        return JSON.stringify( json )
    },
    //返回前端的状态码
    status402:function(res){
        res.status(402); 
    }
}

module.exports = Response