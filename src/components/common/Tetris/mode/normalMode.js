import createContext from "../scripts/createContext";
import createNewItem from "../scripts/createNewItem";
import { toRotateMotrix, LEFT } from "../scripts/rotateMotrix.js";
import { hasOverlappingSquares, fixedSquare, checkAndRemove, motrixIsOverflow } from "../scripts/utils.js";

import { reactive, ref } from "vue";
import hotkeysjs from "hotkeys-js";

export default function normalMode(settings = reactive({
  rows: 20,
  columns: 10,
  downTime: 1000,
})) {
  // 创建上下文
  const coreState = reactive({
    context: createContext({
      rows: settings.rows,
      columns: settings.columns,
    }),
    motrix: [],
    motrixPosition: {
      row: 0,
      column: 0,
    }
  });
  // 分数
  const score = ref(0);
  // 是否失败
  const failed = ref(false);
  // 重置项
  const resetItem = () => {
    const newItem = createNewItem();
    coreState.motrixPosition.row = 0;
    coreState.motrixPosition.column = settings.columns / 2 - Math.floor(Math.max(...newItem.map(row => row.length)) / 2);
    coreState.motrix = newItem;
  }
  // 获取正常的参数, 参数是一个转换器用于做一定转换
  const getCurrentParams = (transformer = (v) => v) => {
    return transformer({
      ...coreState,
      motrixPosition: {
        ...coreState.motrixPosition,
      },
    })
  };

  // 下落动作
  const downAction = () => {
    // 如果溢出边界或下一个重叠，就固定
    if (
      motrixIsOverflow(getCurrentParams()) ||
      hasOverlappingSquares(getCurrentParams(params => {
        params.motrixPosition.row += 1;
        return params;
      }))
    ) {
      fixedSquare(getCurrentParams());

      const removed = checkAndRemove({
        context: coreState.context,
      });
      if (removed.length > 0) {
        // 每一行分别是 1, 1+2, 1+2+3, 1+2+3+4 分，以此类推
        score.value += removed.reduce((result, _, rowIndex) => result + rowIndex + 1, 0);
      }

      // 顶部有东西，失败
      if (coreState.context[0].some(item => !item.isEmpty)) {
        clearInterval(interval);
        interval = undefined;
        failed.value = true;
      } else {
        // 重置项
        resetItem();
        // 顶部有东西，结束
      }
    } else {
      coreState.motrixPosition.row += 1;
    };
  }

  // 键绑定
  const bindHotkeys = () => {
    const leftAction = () => {
      // 检测操作之后的是否符合要求
      if (!hasOverlappingSquares(getCurrentParams(params => {
        params.motrixPosition.column -= 1;
        return params;
      }))) {
        // 不重叠则允许移动
        coreState.motrixPosition.column -= 1;
      }
    };
    hotkeysjs("a", leftAction);
    hotkeysjs("left", leftAction);
    const rightAction = () => {
      // 检测操作之后的是否符合要求
      if (!hasOverlappingSquares(getCurrentParams(params => {
        params.motrixPosition.column += 1;
        return params;
      }))) {
        // 不重叠则允许移动
        coreState.motrixPosition.column += 1;
      }
    };
    hotkeysjs("d", rightAction);
    hotkeysjs("right", rightAction);
    hotkeysjs("s", downAction);
    hotkeysjs("down", downAction);
    const rotateAction = () => {
      const rotated = toRotateMotrix(coreState.motrix, LEFT);
      // 检测操作之后的是否符合要求
      if (!hasOverlappingSquares(getCurrentParams(params => {
        params.motrix = rotated;
        return params;
      }))) {
        // 不重叠则允许旋转
        coreState.motrix = rotated;
      }
    }
    hotkeysjs("space", rotateAction);
    hotkeysjs("r", rotateAction);
    return () => {
      hotkeysjs.unbind("a", leftAction);
      hotkeysjs.unbind("d", rightAction);
      hotkeysjs.unbind("s", downAction);
      hotkeysjs.unbind("left", leftAction);
      hotkeysjs.unbind("right", rightAction);
      hotkeysjs.unbind("down", downAction);
      hotkeysjs.unbind("r", rotateAction);
      hotkeysjs.unbind("space", rotateAction);
    }
  }
  // 绑定快捷键
  const unbind = bindHotkeys();

  // 计时器下落
  let interval = undefined;

  // 重置清空数据
  const reset = () => {
    failed.value = false;
    coreState.context = createContext({
      rows: settings.rows,
      columns: settings.columns,
    });
    coreState.motrix = [];
    coreState.motrixPosition = [0, 0];
    clearInterval(interval);
    interval = undefined;
  }
  const start = () => {
    reset();
    // 开始动一次
    resetItem();
    (!interval && (interval = setInterval(downAction, settings.downTime)))
  }
  const continueAction = () => (!interval && (interval = setInterval(downAction, settings.downTime)));
  const pause = () => {
    clearInterval(interval);
    interval = undefined;
  }
  // 用于组件销毁清理
  const clear = () => {
    unbind();
    reset();
  }

  return {
    settings,
    coreState,
    score,
    failed,
    start,
    continue: continueAction,
    pause,
    reset,
    clear,
  }
}