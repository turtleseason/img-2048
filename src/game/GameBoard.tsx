import React, { useCallback, useState } from 'react';

import Box from '@material-ui/core/Box';
import { useMountEffect } from '../hooks/useMountEffect';
import { Tile } from '../types/tile';
import { arrowKeys, BASE_VALUE, colFromIndex, getNextValue, getOpenPosition, move, PUZZLE_SIZE, rowFromIndex } from './GameLogic';
import GameTile from './GameTile';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const prefetchImages = () => {
    for (const i of [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048]) {
        new Image().src = `/assets/tile${i}.png`;
    }
}

interface Props {
    onWin: () => void;
    onLose: () => void;
}

export default function GameBoard({ onWin, onLose }: Props) {
    const [tiles, setTiles] = useState<(Tile | null)[]>(new Array(PUZZLE_SIZE ** 2).fill(null));
    const [nextId, setNextId] = useState(1);
    const [canMove, setCanMove] = useState(false);

    const spawnTile = (tiles: (Tile | null)[]) => {
        const pos = getOpenPosition(tiles);

        const newTiles = tiles.slice();
        if (pos >= 0) {
            newTiles[pos] = new Tile(nextId, getNextValue());
            setNextId(nextId + 1);
        }
        else {
            onLose();
        }
        return newTiles;
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
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
                    }, 150);
                } else {
                    setCanMove(true);
                }
            }
        }
    };

    useMountEffect(() => {
        prefetchImages();
        setTiles(spawnTile(new Array(PUZZLE_SIZE ** 2).fill(null)));
        setCanMove(true);
    });

    const tileSize = 100;
    const tileSpacing = 10;

    return (
        <Box
            onKeyDown={handleKeyDown}
            tabIndex={-1}
            width={PUZZLE_SIZE * (tileSize + tileSpacing) + tileSpacing}
            height={PUZZLE_SIZE * (tileSize + tileSpacing) + tileSpacing}
            bgcolor='primary.dark'
            padding={tileSpacing}
            position='relative'
            borderRadius={`${tileSpacing}px`}
        >
            <TransitionGroup component={null}>
                {
                    // Sort tiles by ID when rendering to keep them in a consistent order (to avoid messing up CSS transitions),
                    // but also keep track of the original index from 'tiles' which is needed to set the row/column position
                    tiles.map((tile, index) => ({ index, tile }))
                        .sort((a, b) => (a.tile && b.tile) ? a.tile.id - b.tile.id : (a.tile ? 1 : 0))
                        .map(({ tile, index }) => tile ? (
                            <CSSTransition
                                classNames='fade'
                                appear
                                timeout={100}
                                key={tile.id}
                            >
                                <GameTile
                                    size={tileSize}
                                    spacing={tileSpacing}
                                    row={rowFromIndex(index)}
                                    column={colFromIndex(index)}
                                    value={tile.value}
                                    keyStr={tile.id}
                                />
                            </CSSTransition>
                        ) : null)}
            </TransitionGroup>
        </Box>
    )
}