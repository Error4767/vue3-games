<template>
  <div class="container">
    <div style="font-size: 25px; padding: 10px;">
      Snake (贪吃蛇)
      <img src="../assets/icon/question-circle.svg" style="width: 25px; cursor: pointer;" title="使用 a s d 或 ← ↓ → 移动" />
    </div>
    <div style="margin-bottom: 10px;">
      <div>
        地图宽度
        <input type="number" v-model='worldWidth'/>
      </div>
      <div>
        移动间隔
        <input type="number" v-model='moveInterval'/>ms
      </div>
      <div>
        每个格子宽度: <input type="text" v-model='cellSize'>px
      </div>
    </div>
    <div class="operations">
      <button class="start" @click="operations.start">新开始</button>
      <button class="pause" @click="operations.pause">暂停</button>
      <button class="continue" @click="operations.continueAction">继续</button>
      <button class="reset" @click="operations.reset">重置</button>
    </div>
    <canvas ref="snakeWorld" class="snake-world"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { initial } from "@/components/common/Snake/scripts/index";

const snakeWorld = ref();
const worldWidth = ref(20);
const cellSize = ref(30);
const moveInterval = ref(333);

let loadedRawOperations = {};
// 操作
const operations = {
    start: ()=> {
    loadedRawOperations?.reset();
    loadedRawOperations?.run();
  },
  pause: ()=> {
    loadedRawOperations?.pause();
  },
  continueAction: ()=> {
    loadedRawOperations?.continueAction();
  },
  reset: ()=> {
    loadedRawOperations?.reset();
  }
}
onMounted(()=> {
  initial(snakeWorld.value, ()=> ({
    WORLD_WIDTH: worldWidth.value,
    CELL_SIZE: cellSize.value,
    MOVE_INTERVAL: moveInterval.value,
  })).then(loaded=> {
    loadedRawOperations = loaded;
  })
});
// 卸载清理
onUnmounted(()=> {
  loadedRawOperations?.clear();
})
</script>

<style scoped>
.container {
  top: 0;
  left: 0;
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.operations {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  &>.start,&>.pause,&>.continue,&>.reset {
    font-size: 1.15rem;
  }
}
</style>
