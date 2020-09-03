<template>
  <div class="wrapper">
    <span v-if="state===0">
      
    </span>
    <span class='number' v-else-if='state===1'>
      {{aroundBoomNumber}}
    </span>
    <img v-else-if="state===2" class="icon" src="./boom.jpg" alt="boom" />
    <img v-else-if="state===3" class="icon" src="./banner.png" alt="banner" />
  </div>
</template>

<script>
export default {
  name: "Area",
  props: {
    state: {
      type: Number,
      default: 0
    },
    aroundBoomNumber: {
      type: Number,
      default: 0
    }
  },
  setup() {
    return {};
  }
};
</script>
  
<style scoped>
.wrapper {
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 1px solid #000;
  line-height: 48px;
}

.icon {
  width: 100%;
  height: 100%;
}

.number {
  font-size: 26px;
  color: #66ccff;
}
</style>