export const Directions = {
    Left: 'ArrowLeft',
    Right: 'ArrowRight',
    Up: 'ArrowUp',
    Down: 'ArrowDown,'
} as const;
export type Direction = typeof Directions[keyof typeof Directions];