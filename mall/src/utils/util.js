import iView from 'iview';
import * as Cookie from './local'

export default{
    install(Vue,options){
        Vue.prototype.showMessage = ( actionName, message ) => {
            iView.Notice.error( { title: actionName + '失败! ',desc: message ? "原因: " + message: "" } ); 
        }
        Vue.prototype.showSuccess = ( actionName,) => {
            iView.Notice.success( { title: actionName + '成功! '} ); 
        }
        //判断是否是对象
        Vue.prototype.isObject = ( data ) => {
            return Object.prototype.toString.call( data ) === '[object Object]'
        }
        //获取后端错误信息在哪
        Vue.prototype.getErrorMessage = ( err ) => {
            if( Vue.prototype.isObject( err.data ) ){
                return err.data.messages || err.data.message
            }
            return err.data
        }
        //发送请求，一般用于get请求
        Vue.prototype.doService = ( actionName, service, callback, status ) => {
            status = typeof( status ) == 'undefined' ? function(){} : status;
            status('loading');
            if( typeof service == "function" ){
                service().then( ( e ) => {
                    status( 'success' );
                    callback( e )
                },( err ) => {
                    //http异常
                    console.log( err )
                    status('error');
                    Vue.prototype.showMessage( actionName, Vue.prototype.getErrorMessage( err ) );
                });
            }else{
                status( 'loading' );
                service.then( ( e ) => {
                    status('success');
                    callback( e );
                }, ( e ) => {
                    //http异常
                    console.log( err )
                    status('error');
                    Vue.prototype.showMessage( actionName, Vue.prototype.getErrorMessage( err ) );
                });
            }
        }
        Vue.prototype.isLogin = () =>{
            if( Cookie.getCookie( 'user' ) ){
                return true
            }
            return false;
        } 
        //发送请求，一般用于post请求
        Vue.prototype.doServiceAndCallback = ( actionName, service, callback, status ) => {
            status = typeof( status ) == 'undefined' ? function(){} : status;
            status('loading');
            if( typeof service == "function" ){
                service().then( ( e ) => {
                    status( 'success' );
                    Vue.prototype.showSuccess( actionName )
                    callback( e )
                },( err ) => {
                    //http异常
                    console.log( err )
                    status('error');
                    Vue.prototype.showMessage( actionName, Vue.prototype.getErrorMessage( err ) );
                });
            }else{
                status( 'loading' );
                service.then( ( e ) => {
                    status('success');
                    Vue.prototype.showSuccess( actionName )
                    callback( e );
                }, ( e ) => {
                    //http异常
                    console.log( err )
                    status('error');
                    Vue.prototype.showMessage(actionName, Vue.prototype.getErrorMessage( err ) );
                });
            }
        }
    }
}
