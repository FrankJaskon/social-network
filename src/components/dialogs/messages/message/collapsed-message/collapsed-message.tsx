import React from 'react';
import { useDispatch } from 'react-redux';
import { Box, Divider, Stack, Typography } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import BadgeAvatar from '../../../../common/avatar/badge-avatar';
import ClearIcon from '@mui/icons-material/Clear';
import { setActiveDialogId } from '../../../../../redux/dialogs-reducer';

const StyledStack = styled(Stack)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    maxHeight: '80px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '2rem',
}));

const CollapsedMessage: React.FC<any> = (props) => {
    const { id } = props;

    const dispatch = useDispatch();

    const onActiveDialog = () => {
        console.log(`You do clicked, ID is ${id}`);

        dispatch(setActiveDialogId(id))}
    ;

    return (
        <>
            <StyledStack {...props} onClick={onActiveDialog}>
                <BadgeAvatar altImg='user-photo' src='str' />
                <Stack spacing={.5} sx={{ flexGrow: 1, pl: 1 }}>
                    <Typography sx={{ fontWeight: 700 }}>
                        Username
                    </Typography>
                    <Typography variant='body2'>
                        Last message
                    </Typography>
                </Stack>
                <Stack sx={{ textAlign: 'right' }}>
                    <Typography variant='body2'>24 Feb</Typography>
                    <Stack
                        direction='row'
                        sx={{ justifyContent: 'space-between', width: '60px' }}
                    >
                        <Typography
                            color='white'
                            variant='body2'
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: '50%',
                                width: '24px',
                                height: '24px',
                                background: '#000',
                            }}
                        >
                            1
                        </Typography>
                        <ClearIcon />
                    </Stack>
                </Stack>
            </StyledStack>
            <Divider variant='fullWidth' />
        </>
    )
}

export default CollapsedMessage;