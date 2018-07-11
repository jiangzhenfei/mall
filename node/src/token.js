var Response = require('./response')
let token = function(time){
    let token = true;
    let timer;
    let restetToken = function(){
        //多久过期
        timer = setTimeout(()=>{
            token = false
        },time || 5000)
    }
    restetToken()

    return function( request, response, next){
        console.log(token)
        if(!token){
            clearTimeout( timer )
            Response.status402(response)
        }else{
            clearTimeout( timer )
            restetToken()//c重置
        }
        next()
    }
}

module.exports = token

