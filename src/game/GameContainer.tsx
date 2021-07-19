import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Stack from '@material-ui/core/Stack';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';

import ReplayIcon from '@material-ui/icons/Replay';
import CelebrationIcon from '@material-ui/icons/Celebration';

import { BOARD_SIZE, MAX_BOARD_SIZE } from './constants';
import GameBoard from './GameBoard';
import Logo from '../assets/logo.png'
import ConfirmationDialog from '../common/ConfirmationDialog';

export default function Game() {
    const [game, setGame] = useState(1);
    const [won, setWon] = useState(false);
    const [lose, setLose] = useState(false);
    const [showDialog, setShowDialog] = useState(false);

    const newGame = () => {
        setGame(game + 1);
        setWon(false);
        setLose(false);
    }

    const handleRestart = () => {
        if (lose) {
            newGame();
        } else {
            setShowDialog(true);
        }
    }

    const handleDialogClose = (confirmed: boolean) => {
        setShowDialog(false);
        if (confirmed) {
            newGame();
        }
    }

    return (
        <>
            <ConfirmationDialog
                open={showDialog}
                message='Are you sure you want to restart?'
                onCancel={() => handleDialogClose(false)}
                onConfirm={() => handleDialogClose(true)}
            />

            <Stack spacing={2} width={BOARD_SIZE + 'vw'} maxWidth={MAX_BOARD_SIZE} sx={{ my: 3 }} >
                <img src={Logo} alt="(Logo) 11532337202" />
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

                <Grid container direction='row' justifyContent='space-between'>
                    <Grid
                        item
                        xs={12} sm='auto'
                        flexShrink={0}
                        pr={2} pb={2}
                        display='flex'
                        justifyContent='center'
                        alignItems='start'
                    >
                        <Button
                            onClick={handleRestart}
                            variant='contained'
                            endIcon={<ReplayIcon />}
                            sx={{ mt: '.3rem', }}
                        >
                            New game
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm sx={{ '& p': { m: 0 } }}>
                        <p>Use the arrow keys or swipe on the board to move the tiles. Merge matching tiles together to reach the 2048(?) tile!</p>
                    </Grid>
                </Grid>
            </Stack>
        </>
    )
}