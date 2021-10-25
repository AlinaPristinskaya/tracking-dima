<template  >
<!--  <div class="home" v-if="trackingInfo && trackingInfo.PointState === '0'">-->
    <div class="home" >
    <Header
      :estimate="trackingInfo.EstimateTime"
    />
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
<!--    <Map-->
<!--      :markers="markers"-->
<!--      :center="center"-->
<!--    />-->
  </div>
</template>

<script>
  // @ is an alias to /src

  import Header from "../components/Header";
  // import Map from "../components/Map";
  import {mapGetters} from "vuex";
  let marker;
  export default {
    name: 'Home',
    data: () => ({
      step: 0,
      // marker: null,
      center: [{
        position: {
          lat: 0,
          lng: 0,
        }
      }],
      estimate: '',
      markers: [
        {
          position: {
            lat: 0,
            lng: 0,
            icon: {
              url: require('@/assets/img/market-point.png')
            }
          },
        },

      ],
    }),
    components: {
      // Map,
      Header,
    },
    created() {

    },
    mounted() {
     this.getTrackingInfo()
      setInterval(this.getTrackingInfo, 5000)
      console.log('trackingInfo', this.trackingInfo)
    },
    methods: {
      getTrackingInfo() {
        const hash = this.$route.query.hash;
        const test = true;
        // if (hash) {
        if (test) {
          this.$store.dispatch('getTracking', hash)
            .then(() => {
              //если заявка выполнена, переброс на другую страницу
              // if (this.trackingInfo.PointState !== "0") {
              //   this.$router.push({name: "deliveryDone"})
              // }
              console.log('this.trackingInfo', this.trackingInfo);
              if (this.step != 0) {
                // this.trackingInfo.clientlatitude = +this.trackingInfo.clientlatitude + this.step * 0.0003;
                // this.trackingInfo.clientlongitude = +this.trackingInfo.clientlongitude + this.step * 0.0003;
                this.trackingInfo.latitude = +this.trackingInfo.latitude + this.step * 0.0003;
                this.trackingInfo.longitude = +this.trackingInfo.longitude + this.step * 0.0003;
                console.log('this.trackingInfo.clientlatitude', this.trackingInfo.clientlatitude)
              }
              this.markers = [
                {
                  position: {
                    lat: +this.trackingInfo.clientlatitude,
                    lng: +this.trackingInfo.clientlongitude,

                    icon: {
                      url: require('@/assets/img/market-point.png')
                    }
                  },
                },
                {
                  position: {
                    lat: +this.trackingInfo.latitude,
                    lng: +this.trackingInfo.longitude,
                    icon: {
                      url: require('@/assets/img/marker-truck.png')
                    }
                  },
                },
              ]

              console.log('this.$refs.mapRef', this.$refs.mapRef);
              console.log('this.$refs', this.$refs);
              this.$refs.mapRef.$mapPromise.then(() => {
                const slidingMarker = {
                  position: {
                    lat: +this.trackingInfo.latitude,
                    lng: +this.trackingInfo.longitude,
                  },
                  title: 'test',
                  icon: {
                    url: require('@/assets/img/marker-truck.png')
                  },
                  map: this.$refs.mapRef.mapObject,
                  duration: 5000,
                }
                if (this.step == 0) {
                  this.initSlidingMarker(slidingMarker);
                  console.log('initialised marker', marker);
                } else {
                  // setTimeout(function() {
                    console.log('this.marker', marker);
                    marker.setEasing('linear');

                    marker.setPosition({
                      lat: +this.trackingInfo.latitude,
                      lng: +this.trackingInfo.longitude,
                    });
                  marker.setDuration(50000);
                  // }, 5000);

                  console.log('this.marker.getDuration()', marker.getDuration())

                }
                this.step = this.step +1;
              })

              this.center = [
                {
                  position: {
                    lat: +this.trackingInfo.latitude,
                    lng: +this.trackingInfo.longitude,
                    url: null
                  }
                }
              ]
            });

        } else {
          this.is404 = true;
        }
      },
      /**Анимация маркера**/
      initSlidingMarker(marker2) {
        const SlidingMarker = require('marker-animate-unobtrusive')
        SlidingMarker.initializeGlobally();
        marker = new SlidingMarker(marker2);
      },
    },

    computed: {
      ...mapGetters([
        'trackingInfo',
      ]),
    },
  }
</script>

<style scoped lang="scss">
  [v-cloack] {
    display: none;
  }
</style>
