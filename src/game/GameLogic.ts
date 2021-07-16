// Static game methods

import { Direction, Directions } from "../types/direction";
import { Tile } from "../types/tile";
import { count, randomInt } from "../util";

export const PUZZLE_SIZE = 4;
export const BASE_VALUE = 2;

export const arrowKeys = {
    'ArrowLeft': Directions.Left,
    'ArrowRight': Directions.Right,
    'ArrowUp': Directions.Up,
    'ArrowDown': Directions.Down,
}

export const indexFromCoords = (col: number, row: number) => {
    return col + (row * PUZZLE_SIZE);
}

export const rowFromIndex = (index: number) => {
    return Math.floor(index / PUZZLE_SIZE);
}

export const colFromIndex = (index: number) => {
    return index % PUZZLE_SIZE;
}

// Gets the next value for a tile with the given value.
// When called with no arguments, returns a value for a new tile.
export const getNextValue = (value?: any) => {
    if (value === undefined) {
        return Math.random() < .95 ? BASE_VALUE : BASE_VALUE ** 2;
    }
    return value * BASE_VALUE;
}

// Returns the index of a random empty position on the board, or -1 if the board is full.
export const getOpenPosition = (tiles: (Tile | null)[]): number => {
    const tileCount = count(tiles);

    const openSpacesCount = PUZZLE_SIZE ** 2 - tileCount;
    if (openSpacesCount <= 0) {
        return -1;
    }

    const selectedSpace = randomInt(openSpacesCount);

    let index = -1;
    for (let i = 0; i <= selectedSpace; i++) {
        index = tiles.indexOf(null, index + 1);
    }
    return index;
}

// Moves all tiles on the board.
// Returns the new board state and some information about what happened during the move:
//      tiles: The new board state.
//      moved: True if any tiles changed position, false if no tiles moved.
//      highestMerge: If any tiles merged during the moved, this returns the highest new tile value;
//                    if there were no merges, this is -1.
export const move = (direction: Direction, tiles: (Tile | null)[]) => {
    let result = tiles.slice();

    // Rotate the board so that we can always move left
    if (direction === Directions.Up) {
        result = rotateLeft(result, 1);
    } else if (direction === Directions.Right) {
        result = rotateLeft(result, 2);
    } else if (direction === Directions.Down) {
        result = rotateLeft(result, 3);
    }

    const moveResults = moveLeft(result);

    if (direction === Directions.Up) {
        result = rotateLeft(result, 3);
    } else if (direction === Directions.Right) {
        result = rotateLeft(result, 2);
    } else if (direction === Directions.Down) {
        result = rotateLeft(result, 1);
    }

    return { ...moveResults, tiles: result };
}

// Treats "tiles" as a (square) nested array of size PUZZLE_SIZE
// and returns a new array with the contents rotated 90 degrees to the left. 
const rotateLeft = (tiles: any[], rotations: number = 1) => {
    if (rotations < 0) {
        throw Error('rotateLeft: "rotations" must be non-negative');
    }

    const result = new Array(PUZZLE_SIZE ** 2);
    for (let i = 0; i < PUZZLE_SIZE ** 2; i++) {
        let newCol = colFromIndex(i);
        let newRow = rowFromIndex(i);

        for (let r = 0; r < rotations; r++) {
            const temp = newRow;

            newRow = PUZZLE_SIZE - 1 - newCol;
            newCol = temp;
        }

        result[indexFromCoords(newCol, newRow)] = tiles[i];
    }
    return result;
}

// (Mutates tiles)
const moveLeft = (tiles: (Tile | null)[]) => {
    let moved = false;
    let highestMerge = -1;

    for (let index = 0; index < PUZZLE_SIZE ** 2; index++) {
        let tile = tiles[index];
        const column = colFromIndex(index);

        for (let i = 1; i < PUZZLE_SIZE - column; i++) {
            const nextTile = tiles[index + i];

            if (nextTile && !tile) {
                // Move tile into the open space
                tiles[index] = nextTile;
                tiles[index + i] = null;

                moved = true;
                // Continue checking tiles in case you need to merge
                tile = nextTile;
            } else if (nextTile) {
                // Merge tiles if values match
                if (nextTile.value === tile!.value) {
                    nextTile.value = getNextValue(nextTile.value);
                    tiles[index] = nextTile;
                    tiles[index + i] = null;

                    moved = true;
                    highestMerge = Math.max(highestMerge, nextTile.value);
                }
                break;
            }
        }
    }

    return { moved, highestMerge };
}

export const hasPossibleMoves = (tiles: (Tile | null)[]) => {
    for (let i = 0; i < PUZZLE_SIZE ** 2; i++) {
        if (!tiles[i]) {
            return true;
        }

        for (const neighbor of neighbors(i)) {
            if (!tiles[neighbor] || tiles[neighbor]!.value === tiles[i]!.value) {
                return true;
            }
        }
    }
    return false;
}

// Returns indices of all adjacent tiles (top, left, bottom, right) within board bounds.
const neighbors = (index: number) => {
    const col = colFromIndex(index);
    const row = rowFromIndex(index);

    const neighbors = [];
    if (col > 0) neighbors.push(indexFromCoords(col - 1, row));
    if (row > 0) neighbors.push(indexFromCoords(col, row - 1));
    if (col < PUZZLE_SIZE - 1) neighbors.push(indexFromCoords(col + 1, row));
    if (row < PUZZLE_SIZE - 1) neighbors.push(indexFromCoords(col, row + 1));

    return neighbors;
}
