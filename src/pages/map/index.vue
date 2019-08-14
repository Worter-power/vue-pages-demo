<template>
    <div class="app-container app-map">
        <!-- https://elemefe.github.io/vue-amap/#/zh-cn/base/amap -->
        <div class="map">
            <el-amap vid="amapDemo" ref="map"
                :zoom="zoom" 
                :amap-manager="amapManager" 
                :plugin="plugin" 
                :events="events" 
                :center="center" 
                :mapStyle="mapStyle">
            </el-amap>
        </div>
        <div class="ctr">
            <div class="toolbar">
                <el-button @click="getMap()">get map</el-button>
            </div>
        </div>
    </div>
</template>
<script>
// NPM 方式
import { AMapManager } from 'vue-amap';
// CDN 方式
// let amapManager = new VueAMap.AMapManager();
export default {
    data: function() {
        return {
            amapManager: AMapManager,
            zoom: 13,
            mapStyle: 'normal', // 目前支持normal（默认样式）、dark（深色样式）、light（浅色样式）、fresh(osm清新风格样式)四种
            center: [121.59996, 31.197646],
            events: {
                init: (o) => {
                    console.log(o.getCenter())
                    console.log(this.$refs.map.$$getInstance())
                    o.getCity(result => {
                        console.log(result)
                    })
                },
                'moveend': () => {
                },
                'zoomchange': () => {
                },
                'click': (e) => {
                    alert('map clicked');
                }
            },
            plugin: ['ToolBar', {
                pName: 'MapType',
                defaultType: 0,
                events: {
                    init(o) {
                        console.log(o);
                    }
                }
            }]
        };
    },

    methods: {
        getMap() {
            // amap vue component
            console.log(this.$refs.map.$$getInstance());
            // gaode map instance
            console.log(this.$refs.map.$$getCenter());
        }
    }
};
</script>
<style lang="scss" scoped>
.app-map{
    .map{
        position: absolute;
        width: 80%;
        left: 0;
        top: 0;
        bottom: 0;
    }
    .ctr{
        position: absolute;
        left: 80%;
        top: 0;
        bottom: 0;
        right: 0;
    }
}
</style>
