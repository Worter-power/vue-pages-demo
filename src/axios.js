import axios from "axios";
import Qs from 'qs';
import { Notification } from 'element-ui';

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.interceptors.request.use(
    config => {
        // 在发送请求之前做些什么
        // if(config.method === 'post'){
        //     config.data = Qs.stringify(config.data)
        // }
        const token = localStorage.getItem('userToken');
        if (token) {
            config.headers.common['Authorization'] = 'harry ' + token;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default (method = 'get', url, params = {}) => {
    params._ = new Date().getTime();
    method = method.toLocaleLowerCase();
    if (method == 'get') {
        return new Promise((resove, reject) => {
            axios.get(url, { params }).then(res => {
                if (res.data.code == 'ok') {
                    resove(res.data)
                } else {
                    Notification.info({
                        title: '信息',
                        message: res.data.msg
                    });
                    reject(res.data)
                }
            }).then(err => {
                reject(err)
            })
        })
    } else if (method == 'post') {
        return new Promise((resove, reject) => {
            axios.post(url, params).then(res => {
                if (res.data.code == 'ok') {
                    resove(res.data)
                } else {
                    Notification.error({
                        title: '信息',
                        message: res.data.msg
                    });
                    reject(res.data)
                }
            }).then(err => {
                reject(err)
            })
        })
    }
}