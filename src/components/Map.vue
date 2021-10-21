<template>
  <div class="map">
    <GmapMap
      :center="{lat:50.0346779120274,  lng:36.23298630169105,}"
      :zoom="10"
      style="width: 100%;
      min-height: calc(100vh - 100px);
      position: absolute;
      top: 100px;
      left: 0;
"
      ref="mapRef"
    >
      <GmapMarker
        class="marker"
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @click="center=m.position"
        :icon="{ url: require('@/assets/img/marker1.png')}"
      />
    </GmapMap>

  </div>
</template>

<script>
  export default {
    name: "Map",
    data: () => ({
      coordinates: {
        lat:0,
        lng:0
      },
      markers: [
        {
          position: {
            lat: 50.0346779120274,
            lng: 36.23298630169105,
          },
          title: 'Kharkiv'
        },

      ],
      currentPlace: null


    }),
  }
</script>

<style lang="scss">
.map{
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100vh;
}
  .marker {
    width: 10px;
    height: 10px;
    img {
      width: 10px;
      height: 10px;
    }
  }
</style>
