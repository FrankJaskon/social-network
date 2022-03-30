import React from 'react';
import { Box, Divider, Stack, Typography } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import BadgeAvatar from '../../avatar/badge-avatar';

const StyledStack = styled(Stack)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    maxHeight: '80px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '1rem',
}));

const ChatMessage: React.FC<any> = () => {
    return (
        <>
            <StyledStack>
                <BadgeAvatar altImg='user-photo' src='str' />
                <Stack spacing={.5} sx={{ flexGrow: 1, pl: 1 }}>
                    <Typography sx={{ fontWeight: 700 }}>
                        Username
                    </Typography>
                    <Typography variant='body2'>
                        Some text of a message
                    </Typography>
                </Stack>
                <Typography variant='body2' sx={{ textAlign: 'right' }}>24 Feb</Typography>
            </StyledStack>
            <Divider variant='fullWidth' />
        </>
    )
}

export default ChatMessage;