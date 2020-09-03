<template>
  <div class='container'>
    <Area v-for='num in areaNumber' :state='0' :key='num' />
  </div>
</template>

<script>

import Area from './Area.vue';
import randomGameData from './scripts/randomGameData.js';

window.randomGameData = randomGameData;

export default {
  name: 'MineClearance',
  components: {
    Area
  },
  setup() {
    return {
      areaNumber: 100
    }
  }
}
</script>
  
<style scoped>
  .container {
    width: 502px;
    height: 502px;
    border: 1px solid #000;
    line-height: 0;
  }
</style>