<template>
  <div class="container">
    <div class="row" v-for="row in gameData" :key="JSON.stringify(row)">
      <Area
        v-for="item in row"
        :state="showState(item)"
        :key="JSON.stringify(item)"
        :aroundBoomNumber="item.aroundBoomNumber"
        @click.native="MineClearance(item)"
        @contextmenu.native='sign(item, $event)'
      />
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";

import isInvalid from "./scripts/isInvalid.js";

import Area from "./Area.vue";
import randomGameData from "./scripts/randomGameData.js";

// 从数组中删除元素以及执行胜利回调
function remove(area, arr, winCallback) {
  const index = arr.indexOf(area);
  if(index !== -1) {
    console.log('removed');
    arr.splice(index, 1);
    console.log(arr);
    if(arr.length === 0) {
      // 执行胜利回调
      winCallback();
    }
  }
}

function clickAction(area, motrix, notBoomAllAreas ,excludePositions = []) {
  // excludePositions用于在后面的递归中排除已经处理过的区域
  // notBoomAllAreas是总数组，用于判断胜利
  if (area.boom) {
    motrix.forEach(v => {
      v.forEach(v => {
        v.show = true;
      });
    });
    setTimeout(()=> alert("你输了"), 50);
  }
  let position = area.position;
  // 这里的排除四个角落的，只有连在一起的0才会进入递归
  [
    // 左边
    [position[0] - 1, position[1]],
    // 下边
    [position[0], position[1] - 1],
    // 中间
    [position[0], position[1]],
    // 上边
    [position[0], position[1] + 1],
    // 右边
    [position[0] + 1, position[1]],
  ].forEach(position => {
    if (isInvalid(position)) {
      return;
    }
    // 如果才添加数量
    if (motrix[position[0]] && motrix[position[0]][position[1]]) {
      
      const element = motrix[position[0]][position[1]];

      // 如果区域被处理过 不再处理
      if(excludePositions.includes(element.position)) {
        return;
      }
      if (element.boom) {
        // 如果是雷不做任何动作
        excludePositions.push(element.position);
      } else if (element.aroundBoomNumber > 0) {
        // 周围有地雷，显示数量
        element.show = true;
        // 从数组中删除
        remove(element, notBoomAllAreas, ()=> {
          alert('你赢了');
        });
        excludePositions.push(element.position);
      } else if(element.aroundBoomNumber === 0){
        // 周围无地雷
        excludePositions.push(element.position);
        element.show = true;
        remove(element, notBoomAllAreas, ()=> {
          alert('你赢了');
        });
        clickAction(element, motrix, notBoomAllAreas, excludePositions);
      }
    }
  });
}

export default {
  name: "MineClearance",
  components: {
    Area
  },
  setup() {
    const sourceGameData = randomGameData(10, 10, 10);
    console.log(sourceGameData);
    const gameData = reactive(sourceGameData);
    const notBoomAllAreas = gameData.flat().filter(area=> {
      return !area.boom;
    });
    return {
      areaNumber: 100,
      gameData,
      notBoomAllAreas,
      showState(area) {
        return area.show ? (area.boom ? 2 : 1) : (area.signed ? 3 : 0);
      },
      MineClearance(area) {
        if(!area.signed) {
          clickAction(area, gameData, notBoomAllAreas);
        }else {
          console.log('标记格子无法点击');
        }
      },
      sign(area, e) {
        e.preventDefault();
        area.signed = area.signed ? false : true;
      }
    };
  }
};
</script>
  
<style scoped>
.container {
  width: 502px;
  height: 502px;
  border: 1px solid #000;
  line-height: 0;
}
.row {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>