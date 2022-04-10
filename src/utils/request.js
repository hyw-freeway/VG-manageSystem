import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
//
let baseURL = '/api'
if(process.env.NODE_ENV === 'development'){
  baseURL = 'http://localhost:8082'
}else if (process.env.NODE_ENV === 'production'){
  baseURL = 'http://yhli.work/api'
}
// create an axios instance
axios.defaults.withCredentials=true;//让ajax携带cookie
const service = axios.create({
  // baseURL:"http://localhost:8082",
   baseURL, // url = base url + request url
   //withCredentials: true, // send cookies when cross-domain requests
  timeout: 500000 // request timeout
})
		//	设置
		// service.withCredentials = true;
		// service.defaults.withCredentials = true;

		// //	或者这样设置
		// service.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
		// service.defaults.crossDomain = true;
		// service.defaults.withCredentials = true;  //设置cross跨域 并设置访问权限 允许跨域携带cookie信息
		// service.defaults.headers.common['Authorization'] = ''; // 设置请求头为 Authorization



// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.common['Authorization'] = token
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data

    if (res === '尚未登录，请先登录'||res==="session失效，请重新登录") {
      Message({
        message: res || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
        confirmButtonText: 'Re-Login',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        localStorage.clear()
        location.reload()
        // store.dispatch('user/resetToken').then(() => {
        //   location.reload()
        // })
      })
    }

      return res
   // }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
