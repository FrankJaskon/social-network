import React from 'react';
import { Box, Divider, Stack, Typography } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import BadgeAvatar from '../../../../common/avatar/badge-avatar';
import ClearIcon from '@mui/icons-material/Clear';

const StyledStack = styled(Stack)(({ theme }) => ({
    backgroundColor: theme.palette.action.selected,
    borderRadius: '1rem',
    borderTopLeftRadius: 0,
    maxHeight: '80px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '1rem',
}));

const OpenedMessage: React.FC<void> = (props: any) => {
    const {isMyId, ...restProps} = props;
    return (
        <StyledStack {...restProps} sx={{
            flexDirection: isMyId ? 'row-reverse' : 'row',
            alignSelf: isMyId ? 'flex-end' : 'flex-start',
            textAlign: isMyId ? 'right' : 'left',
            borderTopRightRadius: isMyId ? '0' : '1rem',
            borderTopLeftRadius: isMyId ? '1rem' : '0',
        }}>
            <BadgeAvatar altImg='user-photo' src='str' />
            <Stack spacing={.5} sx={{ flexGrow: 1, px: 1 }}>
                <Typography sx={{ fontWeight: 700 }}>
                    Username
                </Typography>
                <Typography variant='body2'>
                    Last message
                </Typography>
            </Stack>
            {/* <Stack sx={{ textAlign: 'right' }}>
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
            </Stack> */}
        </StyledStack>
    )
}

export default OpenedMessage;