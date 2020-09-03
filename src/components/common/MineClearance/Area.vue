<template>
  <div class="wrapper">
    <div v-if="state===0">
      {{aroundBoomNumber}}
    </div>
    <div v-else-if="state===1">
      <img class="icon" src="./boom.jpg" alt="boom" />
    </div>
    <div v-else-if="state===2">
      <img class="icon" src="./banner.png" alt="banner" />
    </div>
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
</style>