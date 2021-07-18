import React from 'react';
import Box from '@material-ui/core/Box';
import Fade from '@material-ui/core/Fade';
import images from '../assets/images';

const customValues = {
    2: '115',
    4: '32',
    8: ' ',
    16: '...53891',
    32: '337',
    64: '202',
    128: '43159026120653246532...',
    256: '56209783',
    512: '2√ √2',
    1024: '1 1',
    2048: '0',
};

const showTileNumbers = false;

const imageUrl = (value: number) => {
    // @ts-ignore
    return images[`tile${value}`] ?? images['tile2048'];
}

interface Props {
    value: number;
    row: number;
    column: number;
    size: number;
    spacing: number;
}

export default function GameTile({ value, row, column, size, spacing, ...rest }: Props) {
    // @ts-ignore
    const text = value in customValues ? (customValues[value]) : value;

    return (
        <Fade {...rest} timeout={100} >
            <Box
                position='absolute'
                top={row * size + (row + 1) * spacing}
                left={column * size + (column + 1) * spacing}
                width={size}
                height={size}
                borderRadius={`${spacing / 2}px`}
                overflow='hidden'
                bgcolor='primary.dark'
                fontSize={size * .25}
                display='flex'
                justifyContent='center'
                alignItems='center'
                sx={{
                    transition: 'opacity .10s, top .25s, left .25s !important',
                    '& span': { maxWidth: '100%', overflowWrap: 'break-word' }
                }}>
                {showTileNumbers ? (
                    <span>{text}</span>
                ) : (
                    <img
                        src={imageUrl(value)}
                        width='100%'
                        alt={text}
                    />
                )}
            </Box>
        </Fade>
    )
}
