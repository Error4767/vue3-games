<template>
  <div class="tetris-container">
    <div style="font-size: 25px; padding: 10px;">
      Tetris (俄罗斯方块)
      <img src="../assets/icon/question-circle.svg" style="width: 25px; cursor: pointer;" title="使用 a s d 或 ← ↓ → 移动方块，r 或 空格 旋转方块" />
    </div>
    <div class="score">得分: {{ score }}</div>
    <div class="operations">
      <button class="operation-button" @click="startNoFocus">新开始</button>
      <button class="operation-button" @click="pauseNoFocus">暂停</button>
      <button class="operation-button" @click="continueActionNoFocus">继续</button>
      <button class="operation-button" @click="resetNoFocus">重置</button>
    </div>
    <div class="settings">
      行数：
      <input type="number" v-model="settings.rows" />
      列数：
      <input type="number" v-model="settings.columns" />
      下落时间(毫秒)：
      <input type="number" v-model="settings.downTime" />
    </div>
    <div class="settings">
      单个方块尺寸：
      <input type="text" v-model="squareSize" />
    </div>
    <ContentRender :coreState="coreState" :squareSize="squareSize"></ContentRender>
  </div>
</template>

<script setup>
import { onUnmounted, watch, ref } from "vue";
import ContentRender from "../components/common/Tetris/ContentRender.vue";

import normalMode from "../components/common/Tetris/mode/normalMode.js";

let {
  settings,
  coreState,
  score,
  failed,
  continue: continueAction,
  start,
  pause,
  reset,
  clear,
} = normalMode();

const squareSize = ref("1.5vw");

// 失败监测
watch(() => failed.value, () => {
  if (failed.value === true) {
    alert(`游戏结束，得分：${score.value}`);
  }
});

// 包装为消除焦点，否则空格快捷键可能会触发按钮
const noFocus = () => {
  document.activeElement.blur();
};
const startNoFocus = () => (start(), noFocus());
const pauseNoFocus = () => (pause(), noFocus());
const continueActionNoFocus = () => (continueAction(), noFocus());
const resetNoFocus = () => (reset(), noFocus());

// 卸载时清理
onUnmounted(() => clear());
</script>

<style scoped lang="postcss">
.tetris-container {
  display: flex;
  flex-direction: column;
  align-items: center;

  &>.score {
    font-size: 1.2rem;
    color: #000;
    margin: 5px;
  }

  &>.settings {
    display: flex;
    flex-direction: row;
    font-size: 1.1rem;
    margin: 5px;

    &>input {
      margin-right: 10px;
    }
  }

  &>.operations {
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-around;

    &>.operation-button {
      font-size: 1.15rem;
    }
  }
}</style>