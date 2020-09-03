<template>
  <div class="container" @click="methods.add">{{state.count}}</div>
  <div class="container" @click="methods.add2">{{state2.count}}</div>
</template>

<script>
import { ref, reactive, watch, watchEffect, readonly, shallowReactive, shallowReadonly, isProxy, isReactive, isReadonly, toRaw, toRef, toRefs, markRaw } from 'vue';

window.vue = { reactive, watch, watchEffect, readonly, shallowReactive, shallowReadonly, isProxy, isReactive, isReadonly, toRaw, toRef, toRefs, markRaw };

export default {
  setup() {
    const state = reactive({
      count: 10
    });
    const state2 = reactive({
      count: 5
    });
    watch([()=> state.count, state2], function(){ console.log(arguments)});
    const methods = {
      add() {
        state.count++;
      },
      add2() {
        state2.count++;
      }
    }
    return {
      state,
      state2,
      methods
    };
  }
}
</script>
  
<style scoped>
.container {
  margin-top: 20px;
  z-index: 1000;
  color: red;
}
</style>