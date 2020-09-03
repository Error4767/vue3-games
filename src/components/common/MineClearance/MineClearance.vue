<template>
  <div class='container'>
    <div class='row' v-for='row in gameData' :key='JSON.stringify(row)'>
      <Area v-for='item in row' :state='item.boom ? 1 : 0' :key='JSON.stringify(item)' :aroundBoomNumber='item.aroundBoomNumber'/>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue';
import Area from './Area.vue';
import randomGameData from './scripts/randomGameData.js';

export default {
  name: 'MineClearance',
  components: {
    Area
  },
  setup() {
    const sourceGameData = randomGameData(10, 10, 10);
    console.log(sourceGameData);
    const gameData = reactive(sourceGameData);
    return {
      areaNumber: 100,
      gameData
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
  .row {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
</style>