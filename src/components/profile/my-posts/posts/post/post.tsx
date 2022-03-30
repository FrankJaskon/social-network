import React from 'react';
import { Stack, Typography } from '@mui/material';
import BadgeAvatar from '../../../../common/avatar/badge-avatar';
import { styled, alpha } from '@mui/material/styles';

const StyledStack = styled(Stack)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    padding: '1rem 3rem',
    borderRadius: '5px',
}));

const Post = ({userId, pageId, text, counterLike, userPhoto}: any) => {

    const isShowCondition = userId === pageId;

    return isShowCondition
        ? (
            <StyledStack direction='row'>
                <BadgeAvatar altImg='user-icon' src={userPhoto} />
                <Stack sx={{ flexGrow: 1, ml: 2 }}>
                    <Typography color='secondary'>User name</Typography>
                    <Typography>{text}</Typography>
                    {/* <div className={s.post__like}>like: {counterLike}</div> */}
                </Stack>
            </StyledStack>
        )
    : null
}

export default Post;