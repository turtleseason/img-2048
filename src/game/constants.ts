export const PUZZLE_SIZE = 4;
export const BASE_VALUE = 2;

// Maximum board size:
// These are fixed values, measured in pixels.
export const MAX_TILE_SIZE = 110;
export const MAX_TILE_SPACING = 10;
export const MAX_BOARD_SIZE = PUZZLE_SIZE * MAX_TILE_SIZE + (PUZZLE_SIZE + 1) * MAX_TILE_SPACING;

// Proportional board size:
// These are percentage values of the screen width, measured in viewport units (vw).
// They apply on narrow screens, when boardSize * screen width <= maxBoardSize.
const margins = 3.5;
const p = MAX_TILE_SPACING / MAX_TILE_SIZE;

export const BOARD_SIZE = 100 - (2 * margins);
export const TILE_SIZE = BOARD_SIZE / (PUZZLE_SIZE + p * (PUZZLE_SIZE + 1));
export const TILE_SPACING = TILE_SIZE * p;

// TILE_SIZE --
//   PUZZLE_SIZE * TILE_SIZE + (PUZZLE_SIZE + 1) * TILE_SPACING = BOARD_SIZE
//   TILE_SPACING = TILE_SIZE * p
// Therefore:
//   PUZZLE_SIZE * TILE_SIZE + (PUZZLE_SIZE + 1) * p * TILE_SIZE = BOARD_SIZE
//   TILE_SIZE * (PUZZLE_SIZE + p * (PUZZLE_SIZE + 1)) = BOARD_SIZE
//   TILE_SIZE = BOARD_SIZE / (PUZZLE_SIZE + p * (PUZZLE_SIZE + 1))

export const BOARD_BREAKPOINT = MAX_BOARD_SIZE / (BOARD_SIZE / 100);