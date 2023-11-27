import init, { World, Direction, GameStatus } from "./wasm_.js";
import { random } from "./utils/random";

const CONFIG = {
  REWARD_COLOR: "orange",
  SNAKE_BODY_COLOR: "#000",
  SNAKE_HEAD_COLOR: "cyan",
  // 绘制尺寸
  CELL_SIZE: 20,
  // 尺寸
  WORLD_WIDTH: 15,
  // 间隔
  MOVE_INTERVAL: 200,
  // 失败位置颜色
  LOST_POSITION_COLOR: "red",
}

let loaded = {};

init().then(wasm=> {
  const { WORLD_WIDTH, CELL_SIZE, SNAKE_HEAD_COLOR, SNAKE_BODY_COLOR, REWARD_COLOR, MOVE_INTERVAL, LOST_POSITION_COLOR } = CONFIG;

  function initial(canvas) {
    const snakeIndex = random(WORLD_WIDTH * WORLD_WIDTH);
    const world = World.new(WORLD_WIDTH, snakeIndex);
    const worldWidth = world.width();
    
    const context = canvas.getContext("2d");

    canvas.width = worldWidth * CELL_SIZE;
    canvas.height = worldWidth * CELL_SIZE;

    function drawWorld() {
      context.beginPath();
      for(let i = 0; i <= worldWidth; i++) {
        context.moveTo(i * CELL_SIZE, 0);
        context.lineTo(i * CELL_SIZE, worldWidth * CELL_SIZE);
      }
      for(let i = 0; i <= worldWidth; i++) {
        context.moveTo(0, i * CELL_SIZE);
        context.lineTo(worldWidth * CELL_SIZE, i * CELL_SIZE);
      }
      context.stroke();
    }

    function getPosition(headIndex) {
      return [
        Math.floor(headIndex / worldWidth),
        headIndex % worldWidth,
      ]
    }

    function getSnakeCells() {
      const snakeCells = new Uint32Array(
        wasm.memory.buffer,
        world.snake_cells(),
        world.snake_length(),
      );
      return snakeCells;
    }

    function drawSnake() {
      getSnakeCells().forEach((bodyItemIndex, index) => {
        index === 0 ? (context.fillStyle = SNAKE_HEAD_COLOR) : (context.fillStyle = SNAKE_BODY_COLOR);
        const [row, col] = getPosition(bodyItemIndex);
        context.fillRect(col * CELL_SIZE, CELL_SIZE * row, CELL_SIZE, CELL_SIZE);
      })
    }

    function drawReward() {
      const rewardIndex = world.reward_cell();
      const [row, col] = getPosition(rewardIndex);
      context.fillStyle = REWARD_COLOR;
      context.fillRect(col * CELL_SIZE, CELL_SIZE * row, CELL_SIZE, CELL_SIZE);
    }


    function draw() {
      drawWorld();
      drawSnake();
      drawReward();
    }

    const clearContent = ()=> context.clearRect(0, 0, canvas.width, canvas.height);

    // 处理输入
    const handleKeyDown = (e)=> {
      const direction = ({
        "ArrowLeft": Direction.Left,
        "ArrowRight": Direction.Right,
        "ArrowUp": Direction.Up,
        "ArrowDown": Direction.Down,
      })?.[e.code];
      if(direction !== undefined) {
        world.change_snake_direction(direction);
      }
    }
    document.addEventListener("keydown", handleKeyDown);

    const intervalFn = ()=> {  
      const status = world.game_status();
      if(status === GameStatus.Lost) {
        const snake_cells = getSnakeCells();

        // 标记出失败位置
        const [row, col] = getPosition(snake_cells[0]);
        context.fillStyle = LOST_POSITION_COLOR;
        context.fillRect(col * CELL_SIZE, CELL_SIZE * row, CELL_SIZE, CELL_SIZE);
        clearInterval(interval);
        setTimeout(()=> {
          alert(`你失败了: 得分 ${snake_cells.length}`);
        });
        return;
      }
      if(status === GameStatus.Won) {
        clearInterval(interval);
        alert(`你胜利了: 得分 ${getSnakeCells().length}`);
        return;
      }
      clearContent();
      world.update();
      draw();
    };
    let interval = undefined;
  
    function run() {
      if(!interval) {
        interval = setInterval(intervalFn, MOVE_INTERVAL);
      }
    }
    function pause() {
      if(interval) {
        clearInterval(interval);
        interval = undefined;
      }
    }

    // 初始化画个白的底版
    drawWorld();

    // 清理
    return {
      run,
      pause,
      continueAction: run,
      clear: ()=> {
        pause();
        document.removeEventListener("keydown", handleKeyDown);
      }
    }
  }

  // 重置会重新创建 world
  const reset = (canvas = document.querySelector('.snake-world'))=> {
    loaded?.clear?.();
    const { run, pause, continueAction, clear } = initial(canvas);

    Object.assign(loaded, {
      run,
      pause,
      continueAction,
      clear,
    });
  }

  loaded.reset = reset;
  reset();
});

export {
  loaded,
}

document.querySelector(".start").onclick = ()=> {
  loaded?.reset();
  loaded?.run();
}
document.querySelector(".pause").onclick = ()=> {
  loaded?.pause();
}
document.querySelector(".continue").onclick = ()=> {
  loaded?.continueAction();
}
document.querySelector(".reset").onclick = ()=> {
  loaded?.reset();
}