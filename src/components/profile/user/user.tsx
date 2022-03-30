import React from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import ProfileData from './user-about/profile-data';
import ModalAvatar from './user-img/modal-avatar';
import { styled, alpha } from '@mui/material/styles';
import ProfileStatus from '../status';
import { useSelector } from 'react-redux';
import { RootStateType } from '../../../redux/redux-store';
import FollowButton from '../../common/buttons/follow-button';

const StyledBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: theme.palette.background.paper,
    padding: '3rem',
    borderRadius: '5px',
    [theme.breakpoints.down('lg')]: {
        display: 'block',
    },
}));

interface UserProps {
    changeEditMode: React.MouseEventHandler<HTMLButtonElement>
}

const User = ({ changeEditMode }: UserProps) => {
    const { fullName, lookingForAJob, userId } = useSelector((state: RootStateType) => state.profile);
    const { userId: authId } = useSelector((state: RootStateType) => state.auth);

    const getIsMyPage = () => userId === authId;

    return (
        <StyledBox>
            <Box mr={6}>
                <ModalAvatar />
            </Box>
            <Box sx={{ flexGrow: 1 }}>
                <div>
                    <Stack direction='row'>
                        <Stack direction='row' sx={{ flexGrow: 1 }}>
                            <Typography variant='h4'>
                                {fullName}
                            </Typography>
                            <Typography variant='body2' color='secondary' sx={{ pl: .5 }}>
                                {lookingForAJob ? 'looking for a job' : ''}
                            </Typography>
                        </Stack>
                        {getIsMyPage()
                            ? <Button variant='outlined' onClick={changeEditMode}>Edit profile</Button>
                            : <FollowButton userId={userId} variant='outlined' size='medium' sx={{ height: 'auto' }}/>
                        }
                    </Stack>
                    <ProfileStatus />
                </div>
                <ProfileData />
            </Box>
        </StyledBox>
    )
}

export default User;