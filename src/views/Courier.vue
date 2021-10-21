<template>
  <div class="courier">
    <div class="courier__header">
      <span>ВАШ КУРЬЕР</span>
    </div>
    <div class="courier__container">
      <ul class="courier__description description">
        <li>
          <span class="description__title"><i  style="width: 16px; height: 16px;" class="el-icon-user-solid"></i>Имя:</span>
          <span class="description__data">Владислав Куценко</span>
        </li>
        <li>
        <span class="description__title">
          <span>
            <i class="el-icon-phone"></i>
          </span>Телефон:</span>
          <a href="tel: +380667984792" class="description__data">+380667984792</a>
        </li>
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
  <router-link to="/"><el-button size="small" round>Назад</el-button></router-link>
</div>
  </div>
</template>

<script>
  export default {
    name: "Courier",
    data: () => ({
      value1: 5,
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'] // same as { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }
    }),
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
