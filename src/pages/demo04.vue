<script setup lang="ts">
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import axios from 'axios'
const mapRef = ref<HTMLDivElement>()

onMounted(() => {
    var map = L.map(mapRef.value!, {
        // preferCanvas: true,
        center: [-10, 40],
        maxZoom: 18,
        zoom: 3
    });
    new L.TileLayer('http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}', { subdomains: "1234" }).addTo(map);
    axios.get('/city/china.json').then(res => {
      L.geoJSON(res.data, {
          style: function (feature) {
              return { color: feature!.properties.color, weight: 3, 
              className: 'map-border' };
          },
          pointToLayer(_, latlng) {
            return L.marker(latlng);
          }
      }).bindPopup(function (layer) {
          return (layer as any).feature!.properties.name;
      }).addTo(map);
    })
  })

</script>

<template>
  <div class="map-container">
    <div ref="mapRef" class="map-instance"></div>
  </div>
</template>

<style scoped>
.map-container {
  width: 100vw;
  height: 100vh;
  background: #00002D;
  position: relative;
  .map-instance {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 0;
    overflow: hidden;
    /* pointer-events: none;
    touch-action: none; */
    width: 100%;
    height: 100%;
  }
}
</style>
