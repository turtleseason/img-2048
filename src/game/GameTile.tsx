import React from 'react';
import Box from '@material-ui/core/Box';
import './temp.css';
import { CSSTransition } from 'react-transition-group';

// const customValues = {
//     2: 115,
//     4: 32,
//     8: ' ',
//     16: '...53891',
//     32: 337,
//     64: 202,
//     128: '10211953503511126540...',
//     256: '56209783',
//     512: 'ɘ e',
//     1024: '1',
//     2048: '0',
// };

interface Props {
    value: number;
    row: number;
    column: number;
    size: number;
    spacing: number;
}

const GameTile = ({ value, row, column, size, spacing, ...rest }: Props) => {
    const nodeRef = React.useRef(null);

    return (
        <CSSTransition
            {...rest}
            nodeRef={nodeRef}
            classNames='fade'
            appear
            timeout={100}
        >
            <Box
                ref={nodeRef}
                position='absolute'
                top={row * size + (row + 1) * spacing}
                left={column * size + (column + 1) * spacing}
                width={size}

                height={size}
                borderRadius={`${spacing / 2}px`}
                bgcolor='primary.light'
                fontSize={size * .33}
                display='flex'
                justifyContent='center'
                alignItems='end'
                sx={{
                    backgroundImage: `url('/assets/tile${value}.png')`,
                    backgroundSize: 'cover',
                    transition: 'opacity .10s, top .25s, left .25s'
                }}>
                {/* {// @ts-ignore
                value in customValues ? (customValues[value]) : value} */}
            </Box>
        </CSSTransition>
    )
}

export default GameTile;