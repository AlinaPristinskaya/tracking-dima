<template>
  <div class="img" >
    <img src="@/../src/assets/img/foxtrot.jpg" alt="">
  </div>
</template>

<script>
  export default {
    name: "DeliveryDone"
  }
</script>

<style scoped lang="scss">
.img {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
</style>
