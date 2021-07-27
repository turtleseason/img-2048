import React, { useCallback, useEffect, useState } from 'react';

import Paper from '@material-ui/core/Paper';
import { TransitionGroup } from 'react-transition-group';
import { useSwipeable } from 'react-swipeable';

import { BASE_VALUE, PUZZLE_SIZE, BOARD_SIZE, MAX_BOARD_SIZE, MAX_TILE_SPACING } from './constants';
import { useMountEffect } from '../hooks/useMountEffect';
import { Tile } from '../types/tile';
import { Direction, Directions } from '../types/direction';
import images from '../assets/images';
import {
    arrowKeys, colFromIndex, rowFromIndex, getNextValue,
    getOpenPosition, hasPossibleMoves, move
} from './GameLogic';
import GameTile from './GameTile';
import { useTheme } from '@material-ui/core/styles';

const prefetchImages = () => {
    for (const image in images) {
        // @ts-ignore
        new Image().src = images[image];
    }
}

interface Props {
    onWin: () => void;
    onLose: () => void;
    won: boolean;
}

export default function GameBoard({ onWin, onLose, won }: Props) {
    const [tiles, setTiles] = useState<(Tile | null)[]>(new Array(PUZZLE_SIZE ** 2).fill(null));
    const [nextId, setNextId] = useState(1);
    const [canMove, setCanMove] = useState(false);

    const spawnTile = useCallback((tiles: (Tile | null)[]) => {
        const pos = getOpenPosition(tiles);

        const newTiles = tiles.slice();
        if (pos >= 0) {
            newTiles[pos] = new Tile(nextId, getNextValue());
            setNextId(nextId + 1);
        }
        else {
            console.error('spawnTiles: Tried to add tile to full board');
        }
        return newTiles;
    }, [nextId]);

    const handleMove = useCallback((direction: Direction) => {
        if (!canMove) {
            return;
        }

        setCanMove(false);
        const result = move(direction, tiles.slice());
        setTiles(result.tiles);

        if (result.highestMerge === BASE_VALUE ** 11) {
            onWin();
        }

        if (result.moved) {
            setTimeout(() => {
                const newTiles = spawnTile(result.tiles);
                setTiles(newTiles);
                setCanMove(true);

                if (!hasPossibleMoves(newTiles)) {
                    onLose();
                }
            }, 150);
        } else {
            setCanMove(true);
        }
    }, [canMove, onLose, onWin, spawnTile, tiles]);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key in arrowKeys) {
            e.preventDefault();
            handleMove(arrowKeys[e.key as keyof typeof arrowKeys]);
        }
    }, [handleMove]);

    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => handleMove(Directions.Left),
        onSwipedRight: () => handleMove(Directions.Right),
        onSwipedUp: () => handleMove(Directions.Up),
        onSwipedDown: () => handleMove(Directions.Down),
        preventDefaultTouchmoveEvent: true,
    });

    useMountEffect(() => {
        prefetchImages();
        setTiles(spawnTile(new Array(PUZZLE_SIZE ** 2).fill(null)));
        setCanMove(true);
    });

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    const theme = useTheme();

    return (
        <Paper
            elevation={2}
            sx={{
                alignSelf: 'center',
                width: BOARD_SIZE + 'vw',
                height: BOARD_SIZE + 'vw',
                maxWidth: MAX_BOARD_SIZE,
                maxHeight: MAX_BOARD_SIZE,
                bgcolor: theme.palette.mode === 'dark' ? 'grey.900' : 'primary.light',
                position: 'relative',
                borderRadius: MAX_TILE_SPACING + 'px',
                touchAction: 'none',
                ...(won && { boxShadow: '0 0 10px 4px #c5e1a5' })
            }}
            {...swipeHandlers}
        >
            <TransitionGroup component={null}>
                {
                    // Sort tiles by ID when rendering to keep them in a consistent order (to avoid messing up CSS transitions),
                    // but also keep track of the original index from 'tiles' which is needed to set the row/column position
                    tiles.map((tile, index) => ({ tile, index }))
                        .filter(x => !!x.tile)
                        .sort((a, b) => a.tile!.id - b.tile!.id)
                        .map(({ tile, index }) => tile ? (
                            <GameTile
                                key={tile.id}
                                row={rowFromIndex(index)}
                                col={colFromIndex(index)}
                                value={tile.value}
                            />
                        ) : null)}
            </TransitionGroup>
        </Paper>
    )
}