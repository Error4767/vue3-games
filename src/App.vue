<template>
  <div>
    <MineSweeper></MineSweeper>
    <JSXTest></JSXTest>
    <!-- <TeleportTest></TeleportTest>
    <scrollNum></scrollNum>
    <Calculator></Calculator>
    <CompositionApiTest></CompositionApiTest> -->
  </div>
</template>

<script>
import {
  defineComponent,
  computed,
  onMounted,
  onUnmounted
} from 'vue';

import MineSweeper from './MineSweeper.vue';

import JSXTest from './JSXTest.jsx';

//import TeleportTest from './TeleportTest.vue';

// import ScrollNum from "./components/content/ScrollNum.vue";
// import FileTree from "./components/common/FileTree.vue";
// import fileData from "./testData/fileTree.js";

// import CompositionApiTest from "./CompositionApiTest.vue";

// import Calculator from "./components/common/Calculator.vue";

export default defineComponent({
  components: {
    MineSweeper,
    // ScrollNum,
    // FileTree,
    // Calculator,
    // CompositionApiTest,
    JSXTest,
    //TeleportTest,
  },
  setup() {
    return {

    }
  }
})
</script>
  
<style scoped>
  
</style>