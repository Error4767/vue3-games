<template>
  <div>
    <MineClearance :areaSize="areaSize" :settings="settings" :key="key"></MineClearance>
    <br />
    <div class="control">
      <div>
        尺寸:
        <input type="number" v-model='settings.length'/>
        x
        <input type="number" v-model='settings.width'/>
      </div>
      <div>
        地雷数量:
        <input type="number" v-model='settings.boomNumber'/>
      </div>
      <div>
        每个格子宽度(css单位): <input type="text" v-model='areaSize'>
      </div>
    </div>
    <button @click="reset">重置</button>
  </div>
</template>

<script>
import {
  ref,
  reactive,
} from "vue";

import MineClearance from "../components/common/MineClearance/MineClearance.vue";

export default {
  components: {
    MineClearance
  },
  setup() {
    const settings = reactive({
      length: 10,
      width: 10,
      boomNumber: 10
    });
    // 设置key用于刷新
    const key = ref(Math.random());
    const areaSize = ref('45px');
    function reset() {
      key.value = Math.random();
    }
    return {
      settings,
      key,
      reset,
      areaSize
    };
  }
};
</script>
  
<style scoped>
.control {
  color: #66ccff;
}
</style>