<template>
  <div class="wrapper" :style="{
    width: size,
    height: size,
    fontSize: size
    }">
    <span v-if="state===0"></span>
    <span class="number" v-else-if="state===1">{{aroundBoomNumber}}</span>
    <img v-else-if="state===2" class="icon" src="./boom.jpg" alt="boom" />
    <img v-else-if="state===3" class="icon" src="./banner.png" alt="banner" />
  </div>
</template>

<script>
export default {
  name: "Area",
  props: {
    // 格子大小，宽和高
    size: {
      type: String,
      default: '45px'
    },
    // 格子状态,0是默认（不显示），1是显示数字，2是显示炸弹，3是显示旗帜标记
    state: {
      type: Number,
      default: 0
    },
    // 当state为1时候显示的数字
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
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border: 1px solid #000;
}

.icon {
  width: 100%;
  height: 100%;
}

.number {
  font-size: 0.55em;
  color: #000;
}
</style>