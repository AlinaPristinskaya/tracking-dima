<template>
  <div class="courier">
    <div class="courier__header">
      <span>ВАШ КУРЬЕР</span>
    </div>
    <div class="courier__container">
      <ul class="courier__description description">
        <template v-if="trackingInfo.Forwarder">
          <li>
            <span class="description__title"><i  style="width: 16px; height: 16px;" class="el-icon-user-solid"></i>Имя:</span>
            <span class="description__data">{{trackingInfo.Forwarder}}</span>
          </li>
        </template>
        <template v-if="trackingInfo.ForwarderPhone">
          <li>
        <span class="description__title">
          <span>
            <i class="el-icon-phone"></i>
          </span>Телефон:</span>
            <a href="tel:`${trackingInfo.ForwarderPhone}`" class="description__data">{{trackingInfo.ForwarderPhone}}</a>
          </li>
        </template>
        <template v-if="trackingInfo.Cargos">
          <li v-for="(product, index) in trackingInfo.Cargos" :key="index">
        <span class="description__title">
          <span>
            <i class="el-icon-s-goods"></i>
          </span>Товар:</span>
            <span class="description__data">{{product.CargoNameCode}} - {{product.CargoCount}} шт.</span>
          </li>
        </template>
        <template v-if="trackingInfo.Sum">
          <li>
        <span class="description__title">
          <span>
            <i class="el-icon-s-finance"></i>
          </span>Сумма:</span>
            <span class="description__data">{{trackingInfo.Sum}} грн.</span>
          </li>
        </template>


<!--        <li>-->
<!--        <span class="description__title"><span>-->
<!--          <i  style="width: 16px; height: 16px; " class="el-icon-s-data"></i>-->
<!--        </span>Рейтинг:</span>-->
<!--          <span class="description__data"> <el-rate v-model="value1"></el-rate></span>-->
<!--        </li>-->
<!--        <li>-->
<!--        <span class="description__title"><span>-->
<!--          <i class="el-icon-s-promotion"></i>-->
<!--        </span>Доставка</span>-->
<!--          <span class="description__data">93</span>-->
<!--        </li>-->
<!--        <li>-->
<!--        <span class="description__title"><span>-->
<!--          <i class="el-icon-info"></i>-->
<!--        </span>В IPOST c:</span>-->
<!--          <span class="description__data">14.10.2020</span>-->
<!--        </li>-->
      </ul>
      <div class="courier__foto">
        <img src="@/assets/img/foto.jpg" alt="фото">
      </div>
    </div>

<div class="link-back">
  <router-link :to="`/?hash=${this.$route.query.hash}`"><el-button size="small" round>Назад</el-button></router-link>
</div>
  </div>
</template>
<script>
  import {mapGetters} from "vuex";
  export default {
    name: "Courier",
    data: () => ({
      value1: 5,
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
    }),
    mounted () {
      this.getTrackingInfo();
    },
    methods: {
      getTrackingInfo() {

        const hash = this.$route.query.hash;
        if (hash) {
          this.$store.dispatch('getTracking', hash)
            .then(() => {});
        } else {
          this.is404 = true;
        }
      },
    },

    computed: {
      ...mapGetters([
        'trackingInfo',
      ]),
    }
  }
</script>

<style scoped lang="scss">
  .courier {
    width: 100%;
    padding: 10px;
    &__header {
      border-bottom: #fd0017 solid 2px;
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 10px;

    }
    &__container {
      display: flex;
      justify-content: space-between;
    }
    &__description {

    }
    &__foto {

    }
  }

  .description {
    width: 100%;
    padding-right: 10px;
    font-size: 14px;
    font-weight: 600;

    a {
      color: #2c3e50;
    }
    &__title {
      white-space: nowrap;
      margin-right: 15px;
    }
    li {
      display: flex;
      justify-content: space-between;
      margin-bottom: 5px;

    }

    &__title {
      i {
        margin-right: 10px;
      }
    }
    &__data {
    }
  }



</style>
