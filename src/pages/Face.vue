<template>
    <div>
        123
    </div>
</template>

<script>
var AipFaceClient = require("../../aip-node-sdk/src/index.js").face;
var HttpClient = require("../../aip-node-sdk/src/index.js").HttpClient;
export default {
    data(){
        return {

        }
    },
    created(){
        this.init();
    },
    methods: { 
        init(){
            // // 设置APPID/AK/SK
            var APP_ID = "16283081";
            var API_KEY = "a7rmAbwl78ns82uLW8Qr2ojm";
            var SECRET_KEY = "zuKZnBdDZW4rVjcWMqagVw6n9UnbYG8G";

            // // 新建一个对象，建议只保存一个对象调用服务接口
            var client = new AipFaceClient(APP_ID, API_KEY, SECRET_KEY);
            // 设置request库的一些参数，例如代理服务地址，超时时间等
            // request参数请参考 https://github.com/request/request#requestoptions-callback
            HttpClient.setRequestOptions({timeout: 5000});

            // 也可以设置拦截每次请求（设置拦截后，调用的setRequestOptions设置的参数将不生效）,
            // 可以按需修改request参数（无论是否修改，必须返回函数调用参数）
            // request参数请参考 https://github.com/request/request#requestoptions-callback
            HttpClient.setRequestInterceptor(function(requestOptions) {
                // 查看参数
                console.log(requestOptions)
                // 修改参数
                requestOptions.timeout = 5000;
                // 返回参数
                return requestOptions;
            });
        }
    }
}
</script>

