<template>
    <div class="app-container">
      <el-amap vid="amapDemo" :zoom="zoom" :center="center" class="amap-demo">
        <el-amap-marker vid="component-marker" :position="componentMarker.position" :content-render="componentMarker.contentRender" ></el-amap-marker>
        <el-amap-marker v-for="(marker, index) in markers" :key="'_'+marker.position" 
            :position="marker.position" :events="marker.events" :visible="marker.visible" 
            :draggable="marker.draggable" :vid="index"></el-amap-marker>
      </el-amap>
      <div class="toolbar">
        <el-button type="button" name="button" v-on:click="toggleVisible">toggle first marker</el-button>
        <el-button type="button" name="button" v-on:click="changePosition">change position</el-button>
        <el-button type="button" name="button" v-on:click="chnageDraggle">change draggle</el-button>
        <el-button type="button" name="button" v-on:click="addMarker">add marker</el-button>
        <el-button type="button" name="button" v-on:click="removeMarker">remove marker</el-button>
      </div>
    </div>
</template>
<style lang="scss" scoped>
    .amap-demo{
        height: 300px;
    }
</style>


<script>
const exampleComponents = {
    props: ['text'],
    template: `<div>text from  parent: {{text}}</div>`
}
export default {
    name: 'amap-page',
    data() {
        return {
            count: 1,
            slotStyle: {
            padding: '2px 8px',
            background: '#eee',
            color: '#333',
            border: '1px solid #aaa'
            },
            zoom: 14,
            center: [121.5273285, 31.21515044],
            markers: [
                {
                    position: [121.5273285, 31.21515044],
                    events: {
                    click: () => {
                        alert('click marker');
                    },
                    dragend: (e) => {
                        console.log('---event---: dragend')
                        this.markers[0].position = [e.lnglat.lng, e.lnglat.lat];
                    }
                    },
                    visible: true,
                    draggable: false,
                    template: '<span>1</span>',
                }
            ],
            renderMarker: {
            position: [121.5273285, 31.21715058],
            contentRender: (h, instance) => {
                // if use jsx you can write in this
                // return <div style={{background: '#80cbc4', whiteSpace: 'nowrap', border: 'solid #ddd 1px', color: '#f00'}} onClick={() => ...}>marker inner text</div>
                return h(
                'div',
                {
                    style: {background: '#80cbc4', whiteSpace: 'nowrap', border: 'solid #ddd 1px', color: '#f00'},
                    on: {
                    click: () => {
                        const position = this.renderMarker.position;
                        this.renderMarker.position = [position[0] + 0.002, position[1] - 0.002];
                    }
                    }
                },
                ['marker inner text']
                )
            }
            },
            componentMarker: {
            position: [121.5273285, 31.21315058],
            contentRender: (h, instance) => h(exampleComponents,{style: {backgroundColor: '#fff'}, props: {text: 'father is here'}}, ['xxxxxxx'])
            },
            slotMarker: {
            position: [121.5073285, 31.21715058]
            }
        };
    },
    methods: {
        onClick() {
            this.count += 1;
        },
        changePosition() {
            let position = this.markers[0].position;
            this.markers[0].position = [position[0] + 0.002, position[1] - 0.002];
        },
        chnageDraggle() {
            let draggable = this.markers[0].draggable;
            this.markers[0].draggable = !draggable;
        },
        toggleVisible() {
            let visableVar = this.markers[0].visible;
            this.markers[0].visible = !visableVar;
        },
        addMarker() {
            let marker = {
                position: [121.5273285 + (Math.random() - 0.5) * 0.02, 31.21515044 + (Math.random() - 0.5) * 0.02]
            };
            this.markers.push(marker);
        },
        removeMarker() {
            if (!this.markers.length) return;
            this.markers.splice(this.markers.length - 1, 1);
        }
    }
};
</script>