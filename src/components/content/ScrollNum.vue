<template>
  <div class="container">
    <div class="left-button button"  v-on:click='lessOne'>-</div>
    <div class="number-scroll" :style='state.style'>
      <div class="number">{{state.number + 1}}</div>
      <div class="number">{{state.number}}</div>
      <div class="number">{{state.number - 1}}</div>
    </div>
    <div class="right-button button"  v-on:click='plusOne'>+</div>
  </div>
</template>

<script>
import { reactive } from "vue";
export default {
  setup() {
    const state = reactive({
      number: 0,
      style: {
        transition: 'none',
        transform: 'translateY(0px)'
      }
    });

    function animation(cb, direzione) {
      //cb是动画结束的回调
      //direzione控制向上还是向下
      state.style.transition = 'all 0.2s linear';
      direzione === 'down' ? state.style.transform = 'translateY(35px)' : (direzione === 'up' ? state.style.transform = 'translateY(-35px)' : null);
      setTimeout(()=> {
        state.style.transition = 'none';
        state.style.transform = 'translateY(0px)';
        cb();
      }, 200);
    }

    function plusOne() {
      animation(()=> {
        state.number++;
      }, 'down');
    }
    function lessOne() {
      animation(()=> {
        state.number--;
      }, 'up');
    }
    return {
      state,
      plusOne,
      lessOne
    };
  }
};
</script>
  
<style scoped>
.container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: #fff;
  height: 40px;
  background-color: #000;
  width: 180px;
  overflow: hidden;
  cursor: pointer;
}
.number-scroll {
  width: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 26px;
}
.button {
  font-size: 26px;
  line-height: 40px;
  width: 40px;
  height: 40px;
  text-align: center;
}
</style>