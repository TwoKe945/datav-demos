
<template>
  <div id="cesiumContainer"></div>
</template>


<script setup>
import * as Cesium from "cesium";
import { onMounted } from "vue";

onMounted(() => {
  //初始化cesium实例
  const viewer = new Cesium.Viewer("cesiumContainer", {
    // imageryProvider: new Cesium.UrlTemplateImageryProvider({
    //   url: 'http://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
    //   minimumLevel: 3,
    //   maximumLevel: 18
    // }),
    animation: false,                                //隐藏动画控件
    baseLayerPicker: false,                          //隐藏图层选择                      
    fullscreenButton: false,                         //隐藏全屏
    geocoder: false,                                 //隐藏查找控件
    homeButton: false,                               //隐藏视角返回初始位置按钮
    timeline: false,                                 //隐藏时间线控件
    navigationHelpButton: false,                     //隐藏帮助
    navigationInstructionsInitiallyVisible: false,   //隐藏导航说明
    sceneModePicker: false,                          //隐藏视角模式3D 2D CV
    // sceneMode: 1,
    creditContainer: document.createElement("div")
  });
  viewer.scene.morphToColumbusView(1);

  Cesium.GeoJsonDataSource.load('/city/china.json', {
  clampToGround: false, // Disable clamping if using explicit heights
  stroke: Cesium.Color.WHITE,
  fill: Cesium.Color.BLUE.withAlpha(0.5),
  strokeWidth: 2,
  markerSymbol: '?',
  // Extrude polygons based on a 'height' property in the GeoJSON
  heightProperty: 'height', // GeoJSON feature property name for extrusion
}).then(dataSource => {
  viewer.dataSources.add(dataSource);

  // Style entities after loading
  const entities = dataSource.entities.values;
  entities.forEach(entity => {
    if (entity.polygon) {
      console.log(entity.properties)
      entity.polygon.extrudedHeight = entity.properties.height || 200; // Use the 'height' property
    entity.polygon.material = new Cesium.ColorMaterialProperty(
      Cesium.Color.fromRandom({ alpha: 0.7 })
    );
    }
  });
}).catch(error => {
  console.error('Error loading GeoJSON:', error);
})
});
</script>

<style>
#cesiumContainer {
  width: 100%;
  height: 100vh;
}
</style>
