<template>
  <div class="home" v-if="trackingInfo && trackingInfo.PointState === '0'">
    <Header
      :estimate="trackingInfo.EstimateTime"
    />
    <Map
      v-if="!loading"
      :markers="markers"
      :center="center"
    />
  </div>
</template>

<script>

  import Header from "../components/Header";
  import Map from "../components/Map";
  import {mapGetters} from "vuex";

  export default {
    name: 'Home',
    data: () => ({
      loading: true,
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
      setInterval(this.getTrackingInfo, 15000)
    },
    methods: {
      getTrackingInfo() {

        const hash = this.$route.query.hash;
        if (hash) {
          this.$store.dispatch('getTracking', hash)
            .then(() => {
              //если заявка выполнена, переброс на другую страницу
              if (this.trackingInfo.PointState && this.trackingInfo.PointState !== "0") {
                this.$router.push({name: "deliveryDone"})
              }
              this.markers = [
                {
                  position: {
                    lat: +this.trackingInfo.clientlatitude,
                    lng: +this.trackingInfo.clientlongitude,
                  },
                },
                {
                  position: {
                    lat: +this.trackingInfo.latitude,
                    lng: +this.trackingInfo.longitude,
                  },
                },
              ]
              /**если позиция уже обозначена => не обновлять центр**/
              if (!this.center[0].position.lat && !this.center[0].position.lng) {
                this.center = [
                  {
                    position: {
                      lat: +this.trackingInfo.latitude,
                      lng: +this.trackingInfo.longitude,
                    }
                  }
                ]
              }
              this.loading = false
            });

        } else {
          this.$message({
            message: 'Немає замовлення',
            type: 'warning',
          });
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
