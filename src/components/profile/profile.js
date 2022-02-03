import React, { useEffect, useState } from 'react';
import MyPosts from './my-posts';
import User from './user';
import { compose } from 'redux';
import { connect } from 'react-redux';
import HOC from '../common/hoc';
import { getIsAuth, getMyId } from '../../redux/auth-selectors';
import { setResponseWarning } from '../../redux/app-reducer';
import { getResponseWarning } from '../../redux/app-selectors';
import { getIsMyPage, getIsPageLoaded, getLoadingError,
    getProfile, getIsSuccessResponse } from '../../redux/profile-selectors';
import { setIsSuccessResponse, addPost, showUserPage, setLoadingError,
    saveUserInfoFormData } from '../../redux/profile-reducer';
import Preloader from '../common/preloader';
import { useParams } from 'react-router-dom';
import { redirectToAuth } from '../common/hoc/newHoc';
import { Container, Stack } from '@mui/material';
import ChatWrapper from '../common/chat-wrapper';
import ProfileDataForm from './user/user-about/profile-data-form';

const Profile = ({ setIsSuccessResponse,
    isSuccessResponse, saveNewUserPhoto, responseWarning,
    setResponseWarning, profile: { postsData, newPostBody,
    placeholderText, aboutMe, contacts, lookingForAJob,
    lookingForAJobDescription, fullName, userId, photos: { large }},
    addPost, isAuth, isLoaded, isMyPage, showUserPage,
    saveUserInfoFormData, id }) => {

    const { userId : urlId } = useParams();

    const pageId = urlId ? urlId : id;

    useEffect(() => {
        if (pageId) showUserPage(pageId);
        return () => setResponseWarning('');
    }, [pageId, showUserPage, setResponseWarning]);

    const [isEditMode, setEditMode] = useState(false);

    const handleOnClick = () => {
        setEditMode(!isEditMode);
    }

    return  (
    <Container>
        <ChatWrapper>
            {!isLoaded
                    ? <Preloader />
                    : <Stack spacing={3}>
                        <User
                            changeEditMode={handleOnClick}
                            aboutMe={aboutMe}
                            contacts={contacts}
                            lookingForAJob={lookingForAJob}
                            lookingForAJobDescription={lookingForAJobDescription}
                            fullName={fullName}
                            photo={large}
                            userId={userId}
                            saveUserInfoFormData={saveUserInfoFormData}
                            setResponseWarning={setResponseWarning}
                            responseWarning={responseWarning}
                            isSuccessResponse={isSuccessResponse}
                            setIsSuccessResponse={setIsSuccessResponse}
                        />
                        {isEditMode && <ProfileDataForm changeEditMode={handleOnClick} />}
                        <MyPosts
                            userId={userId}
                            postsData={postsData}
                            newPostBody={newPostBody}
                            placeholderText={placeholderText}
                            addPost={addPost}
                            isAuth={isAuth}
                            isMyPage={isMyPage}
                        />
                    </Stack>
                }
        </ChatWrapper>
    </Container>
    )
};

const mapStateToProps = (state) => ({
    profile: getProfile(state),
    isAuth: getIsAuth(state),
    id: getMyId(state),
    isLoaded: getIsPageLoaded(state),
    isMyPage: getIsMyPage(state),
    loadingError: getLoadingError(state),
    responseWarning: getResponseWarning(state),
    isSuccessResponse: getIsSuccessResponse(state)
});


export default compose(
    connect(mapStateToProps, {setIsSuccessResponse, addPost, showUserPage, setLoadingError,
        saveUserInfoFormData, setResponseWarning}),
    HOC.showPageErrorWrapperComponent,
    redirectToAuth,
)(Profile);

// setLoadingError is only used for HOC.showPageErrorWrapperComponent