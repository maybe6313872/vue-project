<template>
  <div class="home">
    <span class="txt">123</span>
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import { add } from '@/api/app'
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  mounted() {
    add()
  }
}
</script>

<style lang="scss">
.home {
  background: yellow;
  .txt {
    color: #f00;
  }
}
</style>
