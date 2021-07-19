import React from 'react';

import { makeStyles } from '@material-ui/styles'
import { Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Fade from '@material-ui/core/Fade';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import images from '../assets/images';
import { BOARD_BREAKPOINT, MAX_TILE_SIZE, MAX_TILE_SPACING, TILE_SIZE, TILE_SPACING } from './constants';

const showTileNumbers = false;

const customValues = {
    2: '115',
    4: '32',
    8: ' ',
    16: '...53891',
    32: '337',
    64: '202',
    128: '43159026120653246532462835624672721010001',
    256: '56209783',
    512: '2√ √2',
    1024: '1 1',
    2048: '0',
};

const useStyles = makeStyles(({
    tile: {
        position: 'absolute',
        width: TILE_SIZE + 'vw',
        height: TILE_SIZE + 'vw',
        maxWidth: MAX_TILE_SIZE,
        maxHeight: MAX_TILE_SIZE,
        borderRadius: MAX_TILE_SPACING / 2 + 'px',
        overflow: 'hidden',
        fontSize: MAX_TILE_SIZE * .25,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'opacity .10s, top .25s, left .25s !important',
        '& span': {
            maxWidth: '100%',
            overflowWrap: 'break-word',
            lineHeight: 1,
        },
    }
}));

interface Props {
    value: number;
    row: number;
    col: number;
}

export default function GameTile({ value, row, col, ...rest }: Props) {

    const atMaxSize = useMediaQuery((theme: Theme) => theme.breakpoints.up(BOARD_BREAKPOINT), { noSsr: true });

    const size = atMaxSize ? MAX_TILE_SIZE : TILE_SIZE;
    const spacing = atMaxSize ? MAX_TILE_SPACING : TILE_SPACING;
    const unit = atMaxSize ? 'px' : 'vw';

    // @ts-ignore
    const imageUrl = images[`tile${value}`] ?? images['tile2048'];
    // @ts-ignore
    const text = value in customValues ? (customValues[value]) : value;

    const classes = useStyles();

    return (
        <Fade {...rest} timeout={100} >
            <Box
                className={classes.tile}
                top={row * size + (row + 1) * spacing + unit}
                left={col * size + (col + 1) * spacing + unit}
                bgcolor='primary.main'
            >
                {showTileNumbers ? (
                    <span>{text}</span>
                ) : (
                    <img src={imageUrl} width='100%' alt={text} />
                )}
            </Box>
        </Fade>
    )
}
