<template>
  <div class="home">
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
    mounted() {
      this.getTrackingInfo()
      setInterval(this.getTrackingInfo, 1000)
    },
    methods: {
      getTrackingInfo() {
        const hash = this.$route.query.hash;
        if (hash) {
          this.$store.dispatch('getTracking', hash)
            .then(() => {
              if (this.trackingInfo.PointState !== "0") {
                this.$router.push({name: "deliveryDone"})
              }
              this.markers = [
                {
                  position: {
                    lat: +this.trackingInfo.clientlatitude,
                    lng: +this.trackingInfo.clientlatitude,
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
    },
    /**Анимация маркера**/
    // initSlideingMarker() {
    //   const SlideingMarker = require('marker-animate-unobtrusive')
    //   SlideingMarker.initializeGlobally();
    // },
    computed: {
      ...mapGetters([
        'trackingInfo',
      ]),
    },
  }
</script>
