<template>
  <div class="map">
    <GmapMap
      :center="{lat:50,  lng:36,}"
      :zoom="10"
      style="width: 100%; min-height: 87%"
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

<style scoped>
.map{
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100vh;
}
</style>
