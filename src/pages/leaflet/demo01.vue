<script lang='ts' setup>
import * as L from 'leaflet';
import 'proj4';
import 'proj4leaflet'
import 'leaflet.chinatmsproviders'
import 'leaflet/dist/leaflet.css'
import './leaflet.mapCorrection'
import axios from 'axios'

var map: L.Map | null = null;


onMounted(async () => {
  const center = L.latLng(29.55551542,106.56525968);
  map = L.map('map', {
    center: center,
    minZoom: 14,
    maxZoom: 18,
    maxBounds: [
      [29.524251414809964,106.45588874816896],
      [ 29.5922668634766,106.62068367004396]
    ],
    zoomControl:false,
    attributionControl:false
  }).setView(center, 14);
  L.tileLayer.chinaProvider('GaoDe.Normal.Map', {
    corrdType : 'gcj02',
    bounds: [
      [29.52432610011491,106.45588874816896],
      [29.592341498518802,106.62068367004396]
    ],
    className: 'default-map'
  }).addTo(map);
  L.tileLayer(`${location.origin}/tile/500103/water/{z}/{x}/{y}.png`, {
    bounds: [
      [29.524251414809964,106.45588874816896],
      [ 29.5922668634766,106.62068367004396]
    ]
  }).addTo(map);
  let resp;
  resp = await axios.get('/geojson/roads/500103.json') as any
  L.geoJSON(resp.data, {
      style: function (_feature) {
          return {color: 'rgba(255,164,0, .5)', weight: 1};
      }
  }).addTo(map);
  resp = await axios.get('/geojson/roadways/500103.json') as any
  L.geoJSON(resp.data, {
      style: function (_feature) {
          return {color: 'rgba(255,0,0, .5)', weight: 2,};
      }
  }).addTo(map);
  // resp = await axios.get('/geojson/water/500103.json') as any
  // L.geoJSON(resp.data, {
  //     pointToLayer(geoJsonPoint, latlng) {
  //       console.log(geoJsonPoint, latlng);
  //       return L.marker(latlng);
  //     },
  //     style: function (_feature) {
  //       return {
  //         fillColor: 'rgba(0,0,255)',
  //         weight: 0,
  //         opacity: 0
  //       };
  //     },
  // }).addTo(map);


  resp = await axios.get('/geojson/500103.json') as any
  L.geoJSON(resp.data, {
      style: function (_feature) {
          return {
            fillOpacity: 0, // 区域填充颜色的透明
            dashArray: [10,10],
            offset: [0, 0],
            weight: 1
          };
      }
  }).addTo(map);
  
  resp = await axios.get('/geojson/bounds/500103_revert.geojson') as any
  L.geoJSON(resp.data, {
      style: function (_feature) {
          return {
            fillColor: "rgba(64,65,104)", // 区域填充颜色
            fillOpacity: .8, // 区域填充颜色的透明
            weight: 0,
            opacity: 0
          };
      }
  }).addTo(map);
})

function handleClick() {
  console.log(map!.getBounds());
}
</script>

<template >
  <div class="bg-[#404168] color-white w-[100vw] h-[100vh] relative">
    <div id="map" class="w-full h-full" style="background-color: #404168;" ></div>
    <div class="absolute top-0 right-0 m-2 z-99999">
      <el-button @click="handleClick">获取当前范围</el-button>
    </div>
    <svg class="absolute bottom-0" width="0" height="0">
      <defs>
        <filter id="x-rays" x="-10%" y="-10%" width="120%" height="120%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
	<feColorMatrix type="matrix" values="1 0 0 0 0
1 0 0 0 0
1 0 0 0 0
0 0 0 1 0" in="SourceGraphic" result="colormatrix"/>
	<feComponentTransfer in="colormatrix" result="componentTransfer">
    		<feFuncR type="table" tableValues="0.98 0.3 0.25"/>
		<feFuncG type="table" tableValues="1 0.44 0.24"/>
		<feFuncB type="table" tableValues="0.91 0.62 0.39"/>
		<feFuncA type="table" tableValues="0 1"/>
  	</feComponentTransfer>
	<feBlend mode="normal" in="componentTransfer" in2="SourceGraphic" result="blend"/>
</filter>
      </defs>
    </svg>
  </div>
</template>

<style lang='scss'>
.default-map img.leaflet-tile.leaflet-tile-loaded {

  filter: url(#x-rays);

}
</style>
