<template>
    <div class="app-container app-vues">
        <h1>vue 2.6+ 新特性尝试</h1>
        <p>1.在 2.6.0 中，我们为具名插槽和作用域插槽引入了一个新的统一的语法 (即 v-slot 指令)。</p>
        <pre v-highlight>
            <code>在向具名插槽提供内容的时候，我们可以在一个 template 元素上使用 v-slot 指令，并以 v-slot 的参数的形式提供其名称：</code>
        </pre>
        <a1>
            <template v-slot:header>
                <h1>Here might be a page title</h1>
            </template>
                
            <p>A paragraph for the main content.</p>
            <p>And another one.</p>

            <template v-slot:footer>
                <p>Here's some contact info</p>
            </template>
        </a1>
        <a1>
            <template v-slot:header>
                <h1>Here might be a page title</h1>
            </template>
                
            <template v-slot:default>
                <p>A paragraph for the main content.</p>
                <p>And another one.</p>
            </template>

            <template v-slot:footer>
                <p>Here's some contact info</p>
            </template>
        </a1>

        <!-- 组件作用域 -->
        <pre v-highlight>
            <code>组件作用域</code>
        </pre>
        <a1>
            <template v-slot:header="slotProps">
                <h1>{{slotProps.header.name + ' ' + msg}}</h1>
            </template>
                
            <template v-slot:default>
                <p>A paragraph for the main content.</p>
                <p>And another one.</p>
            </template>

            <template v-slot:footer>
                <p>Here's some contact info</p>
            </template>
        </a1>
        <pre v-highlight>
            <code>render:</code>
        </pre>
        <a2 :level="1">
            渲染函数
        </a2>
    </div>
</template>
<script>
import a1 from './a.vue';
import a2 from './a2.js';
export default {
    components: {
        a1,
        a2: a2
    },
    data(){
        return {
            msg: '这是根组件的消息'
        }
    }
}
</script>
<style lang="scss" scoped>
.app-vues{
    padding: 10px;
}
</style>
