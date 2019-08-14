import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/pages/HelloWorld';
import face from '@/pages/Face';
import Index from '@/pages/Index';
import Home from '@/pages/home/Home';
import Loginregister from '@/pages/loginregister';
import notetools from '@/pages/notetools/index';
import zTable from '@/pages/zTable/index';
import markdown from '@/pages/markdown/Index';
import vues from '@/pages/vue/index';
import map from '@/pages/map/index';
import mark from '@/pages/map/mark';

Vue.use(Router);

export default new Router({
    mode: 'history',
    history: true,
    hashbang: false, //将路径格式化为#!开头
    transitionOnLoad: true, //初次加载是否启用场景切换
    saveScrollPosition: false, //在启用html5 history模式的时候生效，用于后退操作的时候记住之前的滚动条位置
    routes: [{
            path: '/login',
            name: 'login',
            component: Loginregister
        }, {
            path: '/ha',
            name: 'ha',
            component: Index,
            children: [{
                    path: 'home',
                    name: 'home',
                    component: Home
                }, {
                    path: 'three',
                    name: 'HelloWorld',
                    component: HelloWorld
                },
                {
                    path: 'face',
                    name: 'face',
                    component: face
                },
                {
                    path: 'notetools',
                    name: 'notetools',
                    component: notetools

                },
                {
                    path: 'ztable',
                    name: 'ztable',
                    component: zTable

                },
                {
                    path: 'markdown',
                    name: 'markdown',
                    component: markdown

                },
                {
                    path: 'vue',
                    name: 'vue',
                    component: vues

                },
                {
                    path: 'map',
                    name: 'map',
                    component: map

                },
                {
                    path: 'mark',
                    name: 'mark',
                    component: mark

                },
                {
                    path: '/',
                    redirect: '/ha/home'
                }
            ]
        },
        {
            path: '*',
            redirect: '/login'
        }
    ],
    scrollBehavior(to, from, savedPosition) { //这个功能只在 HTML5 history 模式下可用
        if (savedPosition) {
            // return savedPosition
            return {
                x: 0,
                y: 0
            }
        } else {
            return {
                x: 0,
                y: 0
            }
        }
    }
})