<template>
    <div class="app-container">
        <el-row>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="8">
                <h1>欢迎来到我的世界！</h1>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="8">
                <el-calendar v-model="value"></el-calendar>
            </el-col>
        </el-row>
    </div>
</template>