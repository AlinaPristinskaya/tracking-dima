<template>
  <div class="map">

    <GmapMap
      :center="{lat:50.0346779120274,  lng:36.23298630169105,}"
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
        :icon="m.position.icon"
        @mousemove="infoWinOpen=true"
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
  import {mapGetters} from "vuex";

  export default {
    name: "Map",
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
      markers: [
        {
          position: {
            lat: 50.0346779120274,
            lng: 36.23298630169105,
            icon: {
         url: require('@/assets/img/marker1.png')
            }
          },

        },
        {
          position: {
            lat: 50,
            lng: 36,
          },
        },
      ],
      currentPlace: null
    }),
    mounted () {
      // setInterval( this.getTrackingInfo, 1000)
      this.getTrackingInfo();
    },
    methods: {
      getTrackingInfo() {
        const hash = this.$route.query.hash;
        if (hash) {
          this.$store.dispatch('getTracking', hash)
            .then((response) => {
              console.log('resp!!!!', response)
              console.log('trackingInfo data!!!!', this.trackingInfo)
              const trackingInfo = [{"Code":"073e43d5a81a0dd7ae0eda456a4c793f","latitude":"50.43033","longitude":"30.35214","EstimateTime":"2016-04-27 15:11:15","CarName":"353173064429820","ClientName":"ФОП Бондарчук Оксана Михайлівн","Address":"смт. Немішаєве вул. заводская, буд. 50, корп.  а"}, {"Code":"073e43d5a81a0dd7ae0eda456a4c793f","latitude":"40.43033","longitude":"36.35214","CarName":"353173064429820","ClientName":"ФОП Бондарчук Оксана Михайлівн","Address":"смт. Немішаєве вул. заводская, буд. 50, корп.  а"}];
              this.markers = trackingInfo.map(info => {
                return {
                  position: {
                    lat: info.latitude,
                    lng: info.longitude,
                    icon: {
                      url: require('@/assets/img/marker1.png')
                    }
                  },
                }
              })
              this.estimate = trackingInfo.map(est=> {
             return est.EstimateTime

              })
              console.log('this.markers', this.markers)
              console.log('EstimateTime', this.estimate)
            });
        } else {
          this.is404 = true;
        }
      },
    },
    computed: {
      ...mapGetters([
        'trackingInfo',
      ]),
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
