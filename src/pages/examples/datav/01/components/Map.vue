<script lang='ts' setup>
import * as Cesium from "cesium";
import { onMounted } from "vue";
import { useResize } from '~/composables/useResize';
const { autoBindRef, domSize } = useResize();
const { width, height } = toRefs(domSize)
const webKey = import.meta.env.VITE_TD_KEY
import { modifyMap  } from '~/utils'

onMounted(() => {
  //初始化cesium实例
  const viewer = new Cesium.Viewer('map', {
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
  // 最小缩放高度（米）
  viewer.scene.screenSpaceCameraController.minimumZoomDistance = 200;
  // 最大缩放高度（米）
  viewer.scene.screenSpaceCameraController.maximumZoomDistance = 5000000;
  (window as any).viewer = viewer;
  // 影像地图
  // viewer.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
  //   url: "http://t0.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk="+webKey,
  //         layer: "tdtBasicLayer",
  //         style: "default",
  //         format: "image/jpeg",
  //         tileMatrixSetID: "GoogleMapsCompatible"
  // }));
  // 影像地图标注
  // viewer.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
  //   url: "http://t0.tianditu.com/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg&tk="+webKey,
  //     layer: "tdtAnnoLayer",
  //     style: "default",
  //     format: "image/jpeg",
  //     tileMatrixSetID: "GoogleMapsCompatible"
  // }));
if (import.meta.env.VITE_TD_KEY) {
  // 矢量地图
  viewer.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
    url: "http://t0.tianditu.com/vec_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=vec&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk="+webKey,
    layer: "tdtVecBasicLayer",
    style: "default",
    format: "image/jpeg",
    tileMatrixSetID: "GoogleMapsCompatible"
  }));
  // 矢量地图标注
  viewer.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
  url: "http://t0.tianditu.com/cva_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cva&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg&tk="+webKey,
    layer: "tdtAnnoLayer",
    style: "default",
    format: "image/jpeg",
    tileMatrixSetID: "GoogleMapsCompatible"
  }));
  modifyMap(viewer, {
      //反色?
      invertColor: true,
      //滤色值
      filterRGB: [3,148,123],
  });
}

  /**
   * viewer.camera.position
      viewer.camera.heading
      viewer.camera.pitch
      viewer.camera.roll
    */
    viewer.camera.flyTo({
      destination: {
        "x": -1584114.2883945717,
        "y": 5331886.361413893,
        "z": 3134093.3347557406
      } as any,
      duration: 5
    })
  //   viewer.camera.setView({
  //     // destination: Cesium.Cartesian3.fromDegrees(116.435314, 40.960521, 1500),
  //     destination:  {
  //         "x": -1584114.2883945717,
  //         "y": 5331886.361413893,
  //         "z": 3134093.3347557406
  //     } as any,
  //     orientation: {
  //         // 指向
  //         heading: 6.283185307179581,
  //         // 视角
  //         pitch: -1.5688168484696687,
  //         roll: 0.0
  //     }
  // });

})
</script>

<template >
  <div class="w-full h-full overflow-hidden" id="map" :ref="autoBindRef" style="mask: url(#mapMask);">
  </div>
  <svg style="height: 0px;width: 0px;" :width="0" :height="0" v-if="width> 0 && height > 0">
      <!-- 边框 + 背景 -->
    <defs>
      <mask id="mapMask">
        <rect x="0" y="0" v-if="width > 0 && height > 0" :width="width" :height="height" fill="#000"></rect>
        <path fill-rule="evenodd" fill="#fff"
          stroke-width="8px"
          stroke="#000"
          :d="`
          M27,6
          L${400 - 27},6
          L${400 - 12},13
          L${400 + 200 + 2},13
          L${400 + 200 + 5},6
          L${width - 39},6
          L${width - 21},22
          L${width - 8},22
          L${width - 8},${120-8}

          L${width - 14},${120}
          L${width - 14},${height - 135}
          L${width - 8},${height - 135 + 10}
          L${width - 8},${height - 19}

          L${width - 21},${height - 8}
          L6,${height - 8}
          L6,27
          L27,6 Z
          `"/>
      </mask>
    </defs>
  </svg>
</template>

<style scoped lang='scss'>
</style>
