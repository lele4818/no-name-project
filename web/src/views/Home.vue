<template>
  <div class="home">
    this is home
  </div>
</template>

<script>
import { getHomeInfo } from '@/api/home';

export default {
  name: 'Home',
  mounted() {
    getHomeInfo().then((res) => {
      console.log(res)
    });
  }
}
</script>

<style lang="less">

</style>