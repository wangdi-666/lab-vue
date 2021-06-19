import axios from 'axios';
import router from '@/router';
import store from '@/store/index';
import qs from 'qs';

axios.defaults.baseURL = 'http://localhost:64110';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.headers.get['content-type'] = 'application/json;charset=UTF-8';

// 创建axios实例
var instance = axios.create({});
/** 
 * 请求拦截器 
 * 每次请求前，如果存在token则在请求头中携带token 
 */
instance.interceptors.request.use(
    config => {
        
        let token =  store.state.user.user?store.state.user.user.token:'';
		if (!token) {
			router.push({path: '/login'})
		}
        return config;
        
    },
    error => Promise.error(error))

// 响应拦截器
instance.interceptors.response.use(
    res => {
		if (res.status === 200) {
			if (res.data.code == 400 && res.data.msg == '未登录') {
				router.push({path: '/login'})
			}else{
				return Promise.resolve(res)
			}
		} else {
			console.log('未登录');
			return Promise.reject(res)
		}
	},
    error => {// 请求失败
         return Promise.reject(error.response);
    });

//路由导航
router.beforeEach((to, from, next) => {
	 let token =  store.state.user.user?store.state.user.user.token:'';
    if (to.path == '/login') {
        next();
        return;
    }
    if (token) {
        if (to.path == '/') {
            next({
                path: '/home'
            });
            return;
        }
        next();
    } else {
        next({
            path: '/login'
        });
    }
    next();
})

export default instance;

