import React from 'react';
import Post from './post';
import { Divider, Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootStateType } from '../../../../redux/redux-store';

let uniqueId = 0;

const Posts: React.FC<void> = React.memo(() => {
    const { postsData, userId } = useSelector((state: RootStateType) => state.profile);

    const posts = postsData.map((p: any) => (
            <React.Fragment key={p.id + uniqueId++}>
                <Post userId={userId} text={p.message} counterLike={p.likesCount} pageId={p.pageId} />
                <Divider variant='fullWidth' sx={{ mb: 1 }} />
            </React.Fragment>
        )
    );

    return (
        <Stack>
            {posts}
        </Stack>
    )
});

export default Posts;