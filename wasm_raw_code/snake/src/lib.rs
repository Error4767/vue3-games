use wasm_bindgen::prelude::*;
use wee_alloc::WeeAlloc;

#[global_allocator]
static ALLOC: WeeAlloc = WeeAlloc::INIT; 

#[wasm_bindgen(raw_module = "/src/utils/random.js")]
extern "C" {
    fn random(max: usize)-> usize;
}

#[wasm_bindgen]
struct World {
    width: usize,
    size: usize,
    snake: Snake,
    reward_cell: Option<usize>,
    next_cell: Option<SnakeCell>,
    status: Option<GameStatus>,
}

#[derive(Clone, Copy, PartialEq)]
pub struct SnakeCell (usize);
struct Snake {
    body: Vec<SnakeCell>,
    direction: Direction,
}

#[wasm_bindgen]
#[derive(Copy, Clone)]
pub enum GameStatus {
    Won,
    Lost,
    Played,
}

impl Snake {
    fn new(spawn_index: usize, size: usize)-> Self {
        let mut body = Vec::new();
        for i in 0..size {
            body.push(SnakeCell(spawn_index - i))
        }
        Snake {
            body,
            direction: Direction::Down,
        }
    }
}


#[wasm_bindgen]
#[derive(PartialEq)]
pub enum Direction {
    Up,
    Down,
    Left,
    Right,
}

#[wasm_bindgen]
impl World {
    pub fn new(width: usize, snake_index: usize) -> Self {
        let size = width * width;
        let snake = Snake::new(snake_index, 3);
        Self {
            width,
            size,
            reward_cell: Some(World::gen_reward_cell(size, &snake.body)),
            snake,
            next_cell: None,
            status: None,
        }
    }
    pub fn start_game(&mut self) {
        self.status = Some(GameStatus::Played);
    }
    pub fn game_status(&self) -> Option<GameStatus> {
        self.status
    }
    pub fn game_status_info(&self) -> String {
        match self.status {
            Some(GameStatus::Won)=> "You Won!".to_string(),
            Some(GameStatus::Lost)=> "You Lost!".to_string(),
            Some(GameStatus::Played)=> "You Playing".to_string(),
            None=> "None!".to_string(),
        }
    }
    fn gen_reward_cell(max: usize, snake_body: &Vec<SnakeCell>)-> usize {
        // 保证不产生在 snake body 中
        let mut reward_cell;
        loop {
            reward_cell = random(max);
            if !snake_body.contains(&SnakeCell(reward_cell)) {
                break;
            }
        }
        reward_cell
    }
    pub fn reward_cell(&self) -> Option<usize> {
        self.reward_cell
    }
    pub fn width(&self) -> usize {
        self.width
    }
    pub fn snake_head_index(&self)-> usize {
        self.snake.body[0].0
    }
    pub fn change_snake_direction(&mut self, direction: Direction) {
        let next_cell = self.gen_next_snake_cell(&direction);
        // 不能来回转头
        if self.snake.body[1].0 == next_cell.0 {
            return;
        }
        // 允许的话，设置到 next cell
        self.next_cell = Some(next_cell);
        self.snake.direction = direction;
    }
    pub fn snake_cells(&self) -> *const SnakeCell {
        self.snake.body.as_ptr()
    }
    pub fn snake_length(&self) -> usize {
        self.snake.body.len()
    }
    pub fn update(&mut self) {
        // let head_index = self.snake_head_index();
        // let (row, col) = self.index_to_cell(head_index);
        // let (row, col) = match self.snake.direction {
        //     Direction::Left=> (row, (col - 1) % self.width),
        //     Direction::Right=> (row, (col + 1) % self.width),
        //     Direction::Up => ((row - 1) % self.width, col),
        //     Direction::Down => ((row + 1) % self.width, col),
        // };
        // self.set_snake_head(self.cell_to_index(row, col));
        let temp = self.snake.body.clone();

        // 使用已经计算好的新Cell或者计算新的
        let next_cell = self.next_cell.take().unwrap_or_else(|| self.gen_next_snake_cell(&self.snake.direction));
        self.snake.body[0] = next_cell;
        let len = self.snake.body.len();
        for i in 1..len {
            self.snake.body[i] = SnakeCell(temp[i - 1].0);
        }
        // lost 检测
        if self.snake.body[1..self.snake.body.len()].contains(&self.snake.body[0]) {
            self.status = Some(GameStatus::Lost);
        }
        if self.reward_cell == Some(self.snake_head_index()) {
            if self.snake.body.len() < self.size {
                // 在生成一个
                self.reward_cell = Some(World::gen_reward_cell(self.size, &self.snake.body));
            }else {
                self.status = Some(GameStatus::Won);
            }
            // 添加, 这里位置没有什么讲究。下次 update 时该位置会被更新为前一次最后一个(所以直接设置一个重叠的，防止被看到即可)
            self.snake.body.push(SnakeCell(self.snake.body[1].0));
        }
    }
    fn gen_next_snake_cell(&self, direction: &Direction) -> SnakeCell {
        let snake_index = self.snake_head_index();
        let row = snake_index / self.width;
        match direction {
            Direction::Up => {
                // 顶部的位置
                let border_hold = snake_index - row * self.width;
                if snake_index == border_hold {
                    SnakeCell((self.size - self.width) + border_hold)
                }else {
                    SnakeCell(snake_index - self.width)
                }
            },
            Direction::Down => {
                // 底部的位置
                let border_hold = snake_index + ((self.width - row) * self.width);
                if snake_index + self.width == border_hold {
                    SnakeCell(border_hold - (row + 1) * self.width)
                }else {
                    SnakeCell(snake_index + self.width)
                }
            },
            Direction::Left => {
                // 左侧的位置
                let border_hold = row * self.width;
                if snake_index == border_hold {
                    SnakeCell(border_hold + self.width - 1)
                }else {
                    SnakeCell(snake_index - 1)
                }
            },
            Direction::Right => {
                // 右侧的位置
                let border_hold = (row + 1) * self.width;
                if snake_index + 1 == border_hold {
                    SnakeCell(border_hold - self.width)
                }else {
                    SnakeCell(snake_index + 1)
                }
            },
        }
    }
    fn set_snake_head(&mut self, index: usize) {
        self.snake.body[0].0 = index;
    }

    fn index_to_cell(&self, index: usize)-> (usize, usize) {
        (index / self.width, index % self.width)
    }
    fn cell_to_index(&self, row: usize, col: usize) -> usize {
        self.width * row + col
    }
}