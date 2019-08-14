<template>
    <div class="app-container">
        <div class="app-container-header">
            <el-menu
                :default-active="activeIndex2"
                class="el-menu-demo"
                mode="horizontal"
                router
                background-color="#222"
                text-color="#fff"
                active-text-color="#ffd04b">
                <el-menu-item index="/ha">首页</el-menu-item>
                <el-menu-item index="/three" disabled>账号管理</el-menu-item>
                <el-submenu index="2">
                    <template slot="title">我的工作台</template>
                    <el-menu-item index="/ha/three">THREE(three.js)</el-menu-item>
                    <el-menu-item index="/ha/face">FACE(人脸识别)</el-menu-item>
                    <el-menu-item index="/ha/notetools">富文本Notetools</el-menu-item>
                    <el-menu-item index="/ha/markdown">基于Vue的markdown编辑器</el-menu-item>
                    <el-menu-item index="/ha/ztable">智能建表</el-menu-item>
                    <el-submenu index="2-2">
                        <template slot="title">高德地图组件</template>
                        <el-menu-item index="/ha/map">地图</el-menu-item>
                        <el-menu-item index="/ha/mark">点坐标</el-menu-item>
                        <el-menu-item><a href="https://elemefe.github.io/vue-amap/#/zh-cn/introduction/install" target="_blank">更多...</a></el-menu-item>
                    </el-submenu>
                    <el-submenu index="2-3">
                        <template slot="title">VUE 2.6特性</template>
                        <el-menu-item index="/ha/vue">v-slot</el-menu-item>
                        <el-menu-item index="2-4-2">Form</el-menu-item>
                        <el-menu-item index="2-4-3">Messages</el-menu-item>
                    </el-submenu>
                    <el-submenu index="2-4">
                        <template slot="title">组件库</template>
                        <el-menu-item index="2-4-1">Base</el-menu-item>
                        <el-menu-item index="2-4-2">Form</el-menu-item>
                        <el-menu-item index="2-4-3">Messages</el-menu-item>
                    </el-submenu>
                </el-submenu>
                <el-menu-item index="3" disabled>消息中心</el-menu-item>
                <el-menu-item style="float: right;"  index="3">
                    <template slot="title">关于我</template>
                </el-menu-item>
            </el-menu>
        </div>
        <div class="app-container-body">
            <router-view></router-view>
        </div>
        <div class="app-container-footer">

        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            value: new Date(),
            activeIndex2: ''
        }
    }
}
</script>

