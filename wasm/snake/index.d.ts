/* tslint:disable */
/* eslint-disable */
/**
*/
export enum Direction {
  Up = 0,
  Down = 1,
  Left = 2,
  Right = 3,
}
/**
*/
export enum GameStatus {
  Won = 0,
  Lost = 1,
  Played = 2,
}
/**
*/
export class World {
  free(): void;
/**
* @param {number} width
* @param {number} snake_index
* @returns {World}
*/
  static new(width: number, snake_index: number): World;
/**
*/
  start_game(): void;
/**
* @returns {GameStatus | undefined}
*/
  game_status(): GameStatus | undefined;
/**
* @returns {string}
*/
  game_status_info(): string;
/**
* @returns {number | undefined}
*/
  reward_cell(): number | undefined;
/**
* @returns {number}
*/
  width(): number;
/**
* @returns {number}
*/
  snake_head_index(): number;
/**
* @param {Direction} direction
*/
  change_snake_direction(direction: Direction): void;
/**
* @returns {number}
*/
  snake_cells(): number;
/**
* @returns {number}
*/
  snake_length(): number;
/**
*/
  update(): void;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_world_free: (a: number) => void;
  readonly world_new: (a: number, b: number) => number;
  readonly world_start_game: (a: number) => void;
  readonly world_game_status: (a: number) => number;
  readonly world_game_status_info: (a: number, b: number) => void;
  readonly world_reward_cell: (a: number, b: number) => void;
  readonly world_width: (a: number) => number;
  readonly world_snake_head_index: (a: number) => number;
  readonly world_change_snake_direction: (a: number, b: number) => void;
  readonly world_snake_cells: (a: number) => number;
  readonly world_snake_length: (a: number) => number;
  readonly world_update: (a: number) => void;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {SyncInitInput} module
*
* @returns {InitOutput}
*/
export function initSync(module: SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
