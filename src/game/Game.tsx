import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Stack from '@material-ui/core/Stack';
import Typography from '@material-ui/core/Typography';

import ReplayIcon from '@material-ui/icons/Replay';

import GameBoard from './GameBoard';

export default function Game() {
    const [game, setGame] = useState(1);
    const [won, setWon] = useState(false);
    const [lose, setLose] = useState(false);

    const newGame = () => {
        setGame(game + 1);
        setWon(false);
    }

    return (
        <Stack spacing={2}>
            {won &&
                <Typography variant='h5' fontWeight='bold' component='div' sx={{ mt: 1.5 }}>
                    You won! congrat
                </Typography>}
            <GameBoard key={game} onWin={() => setWon(true)} onLose={() => setLose(true)} />
            {lose &&
                <Typography fontWeight='bold' component='div'>
                    No more moves :(
                </Typography>}
            <p>(Click on the board to make the arrow keys work)</p>
            <Grid container direction='row' justifyContent='space-between' maxWidth='450px'>
                <Grid item flexShrink={0} pr='1rem'>
                    <Button
                        onClick={newGame}
                        variant='contained'
                        endIcon={<ReplayIcon />}
                    >
                        New game
                    </Button>
                </Grid>
                <Grid item xs>
                    <span>Use the arrow keys to move the tiles. Merge matching tiles together to reach the 2048(?) tile!</span>
                </Grid>
            </Grid>
        </Stack>
    )
}