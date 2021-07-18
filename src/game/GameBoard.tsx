import React, { useCallback, useEffect, useState } from 'react';

import Paper from '@material-ui/core/Paper';
import { TransitionGroup } from 'react-transition-group';

import { useMountEffect } from '../hooks/useMountEffect';
import { Tile } from '../types/tile';
import images from '../assets/images';
import {
    BASE_VALUE, PUZZLE_SIZE, arrowKeys, colFromIndex, rowFromIndex,
    getNextValue, getOpenPosition, hasPossibleMoves, move
} from './GameLogic';
import GameTile from './GameTile';

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

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key in arrowKeys) {
            e.preventDefault();

            if (canMove) {
                setCanMove(false);
                const result = move(arrowKeys[e.key as keyof typeof arrowKeys], tiles.slice());
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
            }
        }
    }, [canMove, onLose, onWin, spawnTile, tiles]);

    useMountEffect(() => {
        prefetchImages();
        setTiles(spawnTile(new Array(PUZZLE_SIZE ** 2).fill(null)));
        setCanMove(true);
    });

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    const tileSize = 100;
    const tileSpacing = 10;

    return (
        <Paper
            elevation={2}
            sx={{
                width: PUZZLE_SIZE * (tileSize + tileSpacing) + tileSpacing,
                height: PUZZLE_SIZE * (tileSize + tileSpacing) + tileSpacing,
                bgcolor: 'grey.800',
                position: 'relative',
                borderRadius: `${tileSpacing}px`,
                ...(won && { boxShadow: '0 0 10px 4px #c5e1a5' })
            }}
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
                                size={tileSize}
                                spacing={tileSpacing}
                                row={rowFromIndex(index)}
                                column={colFromIndex(index)}
                                value={tile.value}
                            />
                        ) : null)}
            </TransitionGroup>
        </Paper>
    )
}