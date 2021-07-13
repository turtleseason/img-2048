import React, { useState } from 'react';

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

export default function SettingsDrawer({ isOpen, setOpen, openImageDialog }) {
    const [checked, setChecked] = useState(false);

    return (
        <Drawer
            anchor='left'
            open={isOpen}
            onClose={() => setOpen(false)}
        >
            <List
                subheader={(<ListSubheader>Settings</ListSubheader>)}
                sx={{ mx: '.5rem' }}
            >
                <ListItem divider={true}>
                    <ListItemIcon>
                        <BrightnessMediumIcon />
                    </ListItemIcon>
                    <ListItemText id='switch-setting' primary='Setting' />
                    <Switch
                        edge='end'
                        checked={checked}
                        onChange={() => setChecked(!checked)}
                        inputProps={{ 'aria-labelledby': 'switch-setting' }}
                    />
                </ListItem>

                <ListItemButton
                    sx={{ pr: '1.5rem' }}
                    onClick={() => { 
                        setOpen(false);
                        openImageDialog(true);
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