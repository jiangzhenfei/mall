import axios from '@/services/axios'
import * as Cookie from '../utils/local'


export const login = () => {
   return new Promise(function(resolve,reject){
        setTimeout(()=>{
            resolve('fei')
        },2000)
    })
}
