<template>
  <div class="map">

    <GmapMap
      :center="center[0].position"
      :zoom="10"
      style="width: 100%;
      min-height: calc(100vh - 100px);
      position: absolute;
      top: 100px;
      left: 0;"
      ref="mapRef"
    >
      <GmapMarker
        class="marker"
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="false"
        @click="center=m.position"
        :icon="m.position.icon ? m.position.icon : null"
      />
      <!--tooltip-->
<!--      <gmap-info-window-->
<!--        :options="infoOptions"-->
<!--        :position="infoWindowPos"-->
<!--        :opened="infoWinOpen"-->
<!--      >-->
<!--        <div v-html="infoContent"></div>-->
<!--      </gmap-info-window>-->
    </GmapMap>

  </div>
</template>

<script>
  // import {mapGetters} from "vuex";

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

      //настройки для tooltip к маркеру.
      // infoContent: 'hello',
      // infoOptions: {
      //   pixelOffset: {
      //     width: 0,
      //     height: -35
      //   },
      //   },
      // infoWindowPos: {
      //   lat: 50.0346779120274,
      //   lng: 36.23298630169105,
      // },
      // infoWinOpen: true,
      estimate: "",
      // markers: [
      //   {
      //     position: {
      //       lat: 50.0346779120274,
      //       lng: 36.23298630169105,
      //       icon: {
      //    url: require('@/assets/img/marker1.png')
      //       }
      //     },
      //
      //   },
      //   {
      //     position: {
      //       lat: 50,
      //       lng: 36,
      //     },
      //   },
      // ],
      currentPlace: null
    }),

    mounted () {
    },
    methods: {

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
