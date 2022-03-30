import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import BadgeAvatar from '../../common/avatar/badge-avatar';
import { styled, alpha } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { setActiveDialogId } from '../../../redux/dialogs-reducer';

const StyledBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    flexDirection: 'row',
    padding: '.5rem',
    borderRadius: '5px',
}));


const DialogItem = (props: any) => {
    const { id } = props;

    const dispatch = useDispatch();

    const onActiveDialog = () => {
        console.log(`You do clicked, ID is ${id}`);

        dispatch(setActiveDialogId(id))}
    ;

    return (
        <StyledBox onClick={onActiveDialog}>
           <BadgeAvatar altImg='user-photo' src='str' />
           <Stack spacing={.5} sx={{ pl: 1 }}>
                <Typography sx={{ fontWeight: 700 }}>
                    Username
                </Typography>
                <Typography variant='body2'>
                    Some status
                </Typography>
            </Stack>
        </StyledBox>
    )
}

export default DialogItem;