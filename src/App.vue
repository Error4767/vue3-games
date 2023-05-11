<template>
  <div>
    <MineSweeper></MineSweeper>
  </div>
</template>

<script>
import {
  defineComponent,
} from 'vue';

import MineSweeper from './GUIConfigured/MineSweeper.vue';

export default defineComponent({
  components: {
    MineSweeper,
  },
  setup() {
    return {

    }
  }
})
</script>
  
<style scoped>
  
</style>