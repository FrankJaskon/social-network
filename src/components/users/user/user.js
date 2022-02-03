import React from 'react';
import { Box, ListItem, ListItemText, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BadgeAvatar from '../../common/avatar/badge-avatar';
import FollowButton from '../../common/buttons/follow-button';

import s from './User.module.sass';

const User = ({ userData: { name, id, followed, status, photos: { small }}}) => {

    const navigate = useNavigate();
    const handleOnClick = (path) => {
        navigate(path);
    }

    return (
        <ListItem alignItems="flex-start" sx={{ my: 2, bgcolor: 'background.paper' }}>
                <Box
                    sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}
                    onClick={() => handleOnClick(`/profile/${id}`)}
                >
                    <BadgeAvatar src={small} alt='user-icon' sx={{ flexGrow: 1 }} />
                </Box>
            <Stack direction='row' sx={{ mx: 2, flexGrow: 1 }}>
                <ListItemText
                    primary={
                        <Typography
                            variant='h6'
                            component='span'
                            sx={{ cursor: 'pointer' }}
                            onClick={() => handleOnClick(`/profile/${id}`)}
                        >
                            {name}
                        </Typography>}
                    secondary={
                        <Typography
                            component="div"
                            variant="body2"
                            color="text.primary"
                        >
                            {status}
                        </Typography>
                    }
                />
                <FollowButton id={id} followed={followed} />
            </Stack>
        </ListItem>
    )
}

export default User;


