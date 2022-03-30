import React, { useState } from 'react';
import { Box, Drawer, Fab, Tooltip } from '@mui/material';
import { DrawerHeader } from '../../navigation-bars/navigation-bars';
import { styled, alpha } from '@mui/material/styles';
import ChatIcon from '@mui/icons-material/Chat';
import SpeakerNotesOffOutlinedIcon from '@mui/icons-material/SpeakerNotesOffOutlined';
import { AppBarProps as BoxProps } from '@mui/material/AppBar';
import { useSelector } from 'react-redux';
import { RootStateType } from '../../../redux/redux-store';
import ChatMessage from './chat-message';

const drawerWidth = 350;

interface MainBoxProps extends BoxProps {
    open?: boolean
}

const MainBox = styled(Box, { shouldForwardProp: (prop) => prop !== 'open' })
    <MainBoxProps>(({ theme, open }) => ({
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginRight: 0,
      ...(open && {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: drawerWidth,
      }),
    }),
);

const ChatWrapper: React.FC<any> = ({ children }: any) => {
    const { isAuth } = useSelector((state: RootStateType) => state.auth);

    const [open, setOpen] = useState(false);

    return (
        <>
            <MainBox open={open}>
                {children}
            </MainBox>
            <Drawer
                sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                },
                }}
                variant="persistent"
                anchor="right"
                open={open}
            >
                <DrawerHeader />
                <ChatMessage />
                <ChatMessage />
                <ChatMessage />
                <ChatMessage />
                <ChatMessage />
                <ChatMessage />
                <ChatMessage />
                <ChatMessage />
                <ChatMessage />
                <ChatMessage />
                <ChatMessage />
                <ChatMessage />
                <ChatMessage />
                <ChatMessage />
                <ChatMessage />
                <ChatMessage />
                <ChatMessage />
                <ChatMessage />
                <ChatMessage />
                <ChatMessage />
                <ChatMessage />
                <ChatMessage />
                <ChatMessage />
                <ChatMessage />
                <ChatMessage />
                <ChatMessage />
                <ChatMessage />
            </Drawer>
            <Tooltip title={open ? 'Close chat' : 'Open chat'}>
                <Fab
                    sx={{ position: 'fixed', bottom: 8, right: 8, zIndex: 10000 }}
                    color={isAuth ? 'primary' : 'inherit'}
                    aria-label="add"
                    onClick={isAuth ? () => setOpen(!open) : undefined}
                >
                    {
                        open
                        ? <SpeakerNotesOffOutlinedIcon />
                        : <ChatIcon color={isAuth ? 'inherit' : 'disabled'} />
                    }
                </Fab>
            </Tooltip>
        </>
    )
}

export default ChatWrapper;