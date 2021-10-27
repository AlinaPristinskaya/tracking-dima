<template>
  <div class="map">

    <GmapMap
      :center="center[0].position"
      :zoom="17"
      style="width: 100%;
      min-height: calc(100vh - 100px);
      position: absolute;
      top: 100px;
      left: 0;"
      ref="mapRef"
    >
<!--      <GmapMarker-->
<!--        class="marker"-->
<!--        :key="index"-->
<!--        v-for="(m, index) in mark"-->
<!--        :position="m.position"-->
<!--        :clickable="true"-->
<!--        :draggable="false"-->
<!--        :icon="m.position.icon ? m.position.icon : null"-->
<!--      />-->

    </GmapMap>

  </div>
</template>

<script>

  export default {
    name: "Map",
    props: {
      markers: {
        type: Array,
      },
      center: {
        type: Array,
      }
  }
  ,
    data: () => ({
      mark: {},

    }),

    mounted () {
    this.getslider()

    },
    methods: {
      getslider() {
        this.$refs.mapRef.$mapPromise.then(() => {
          this.initSlidingMarker(this.$refs.mapRef.$mapObject)
        })
      },
      initSlidingMarker(map){

        const SlidingMarker = require('marker-animate-unobtrusive')
        SlidingMarker.initializeGlobally()
        this.mark = new SlidingMarker({
          map: map,
          position: this.markers[1].position,
          icon:  require('@/assets/img/marker-truck.png'),
          duration: 2000
        });

        new SlidingMarker({
          map: map,
          position: this.markers[0].position,

        });
      }
    },
    watch: {
      markers: function (marker) {
        if(this.mark.position) {
          this.mark.setEasing('linear');

          this.mark.setPosition({
            lat: marker[1].position.lat,
            lng: marker[1].position.lng,
          });
        }
      }
    },
    computed: {

    },

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
