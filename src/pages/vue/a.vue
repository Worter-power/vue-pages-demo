<template>
    <div>
        <header>
            <slot name="header" :header="header"></slot>
        </header>
        <main>
            <slot></slot>
        </main>
        <footer>
            <slot name="footer"></slot>
        </footer>
    </div>
</template>

<script>
export default {
    data() {
        return {
            slotProps: {},
            header: {
                name: '我是子组件头部'
            }
        }
    }
}
</script>
