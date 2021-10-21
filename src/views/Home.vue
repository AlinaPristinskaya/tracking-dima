<template>
  <div class="home">
<Header/>
<Map/>
  </div>
</template>

<script>
// @ is an alias to /src

import Header from "../components/Header";
import Map from "../components/Map";
export default {
  name: 'Home',
  components: {
    Map,
    Header,
  }
}
</script>
