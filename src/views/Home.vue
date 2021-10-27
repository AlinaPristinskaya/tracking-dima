<template  >
  <!--  <div class="home" v-if="trackingInfo && trackingInfo.PointState === '0'">-->
  <div class="home" >
    <Header
      :estimate="trackingInfo.EstimateTime"
    />
    <Map
      :markers="markers"
      :center="center"
    />
  </div>
</template>

<script>
  // @ is an alias to /src

  import Header from "../components/Header";
  import Map from "../components/Map";
  import {mapGetters} from "vuex";

  export default {
    name: 'Home',
    data: () => ({
      step: 0,
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
      Map,
      Header,
    },
    created() {

    },
    mounted() {
      this.getTrackingInfo()
      setInterval(this.getTrackingInfo, 2000)

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
              /****/
              if (this.step != 0) {
                this.trackingInfo.latitude = +this.trackingInfo.latitude + this.step * 0.0003;
                this.trackingInfo.longitude = +this.trackingInfo.longitude + this.step * 0.0003;

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
              /**если позиция уже обозначена => не обновлять центр**/
              if(!this.center[0].position.lat && !this.center[0].position.lng) {
                this.center = [
                  {
                    position: {
                      lat: +this.trackingInfo.latitude,
                      lng: +this.trackingInfo.longitude,
                      url: null
                    }
                  }
                ]
              }

              this.step = this.step +1;
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

<style scoped lang="scss">
  [v-cloack] {
    display: none;
  }
</style>
