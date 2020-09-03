<template>
  <div>
    <MineClearance></MineClearance>
    <scrollNum></scrollNum>
    <Calculator></Calculator>
    <CompositionApiTest></CompositionApiTest>
  </div>
</template>

<script>
import {defineComponent, ref, reactive, computed, onMounted, onUnmounted} from 'vue';

import ScrollNum from './components/content/ScrollNum.vue';
import FileTree from './components/common/FileTree.vue';
import fileData from './testData/fileTree.js';
import MineClearance from './components/common/MineClearance/MineClearance.vue';

import CompositionApiTest from './CompositionApiTest.vue';

import Calculator from './components/common/Calculator.vue';

  export default defineComponent({
    components: {
      ScrollNum,
      FileTree,
      Calculator,
      CompositionApiTest,
      MineClearance
    },
    setup() {
      return {};
    }
  })
</script>
  
<style scoped>
  
</style>