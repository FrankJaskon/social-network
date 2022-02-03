import React from 'react';
import Posts from './posts'
import CreatePost from './create-post';

import s from './MyPosts.module.sass';

const MyPosts = (props) => {
    const {userId, isAuth, isMyPage, postsData, newPostBody, placeholderText, addPost} = props;
    return (
        <>
            <CreatePost
                userId={userId}
                newPostBody={newPostBody}
                placeholderText={placeholderText}
                addPost={addPost}
                isAuth={isAuth}
                isMyPage={isMyPage} />
            {
                postsData.length > 0
                && <div className={s.posts}>
                    <Posts />
                </div>
            }
        </>
    )
}

export default MyPosts;