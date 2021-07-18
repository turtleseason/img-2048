import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Stack from '@material-ui/core/Stack';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';

import ReplayIcon from '@material-ui/icons/Replay';
import CelebrationIcon from '@material-ui/icons/Celebration';

import GameBoard from './GameBoard';
import Logo from '../assets/logo.png'

export default function Game() {
    const [game, setGame] = useState(1);
    const [won, setWon] = useState(false);
    const [lose, setLose] = useState(false);

    const newGame = () => {
        setGame(game + 1);
        setWon(false);
        setLose(false);
    }

    return (
        <Stack spacing={2} sx={{ mt: 3 }}>
            <img src={Logo} alt="(Logo) 11532337202" width='450' />
            <Collapse in={won} timeout={1000} sx={{ alignSelf: 'center', transitionDelay: '500' }}>
                <Stack
                    role='status'
                    direction='row'
                    alignItems='center'
                    spacing={.5}
                    sx={{ color: 'primary.light' }}
                >
                    <Typography variant='h6' component='div'>
                        You won! congrat
                    </Typography>
                    <CelebrationIcon />
                </Stack>
            </Collapse>
            <GameBoard key={game} onWin={() => setWon(true)} onLose={() => setLose(true)} won={won} />
            <Collapse in={lose} timeout={1000} sx={{ transitionDelay: '500' }}>
                <Typography role='status' fontWeight='bold' component='div' color='primary.light'>
                    No more moves :(
                </Typography>
            </Collapse>
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
                <Grid item xs sx={{ mt: '-.3rem', '& p': { m: 0 } }}>
                    <p>Use the arrow keys to move the tiles. Merge matching tiles together to reach the 2048(?) tile!</p>
                </Grid>
            </Grid>
        </Stack>
    )
}