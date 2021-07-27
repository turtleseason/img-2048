import React from 'react';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemButton from '@material-ui/core/ListItemButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Switch from '@material-ui/core/Switch';

import BrightnessMediumIcon from '@material-ui/icons/BrightnessMedium';
import ImageIcon from '@material-ui/icons/Image';

interface Props {
    isOpen: boolean;
    setOpen: (isOpen: boolean) => void;
    setImageDialogOpen: (isOpen: boolean) => void;
    darkMode: boolean;
    setDarkMode: (on: boolean) => void;
}

export default function SettingsDrawer({ isOpen, setOpen, setImageDialogOpen, darkMode, setDarkMode }: Props) {
    return (
        <Drawer
            anchor='left'
            open={isOpen}
            onClose={() => setOpen(false)}
        >
            <List
                subheader={(<ListSubheader sx={{ backgroundColor: 'transparent' }}>Settings</ListSubheader>)}
                sx={{ mx: '.5rem' }}
            >
                <ListItem divider={true} >
                    <ListItemIcon>
                        <BrightnessMediumIcon />
                    </ListItemIcon>
                    <ListItemText id='switch-setting' primary='Light mode' />
                    <Switch
                        edge='end'
                        checked={!darkMode}
                        onChange={() => setDarkMode(!darkMode)}
                        inputProps={{ 'aria-labelledby': 'switch-setting' }}
                    />
                </ListItem>

                <ListItemButton
                    sx={{ pr: '1.5rem' }}
                    onClick={() => {
                        setOpen(false);
                        setImageDialogOpen(true);
                    }}
                >
                    <ListItemIcon>
                        <ImageIcon />
                    </ListItemIcon>
                    <ListItemText>
                        Use custom images...
                    </ListItemText>
                </ListItemButton>
            </List>
        </Drawer>
    )
}