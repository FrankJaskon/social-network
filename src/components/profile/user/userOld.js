import React from 'react';
import UserAbout from './user-about';
import ProfileData from './user-about/profile-data';
import UserNameWithStatus from './user-about/user-name-with-status';
import UserImg from './user-img';

import s from './User.module.sass';

const User = ({setIsSuccessResponse, isSuccessResponse, setResponseWarning, saveNewUserPhoto, responseWarning,
    saveUserInfoFormData, userId, aboutMe, contacts, lookingForAJob,
    lookingForAJobDescription, fullName, photo, isMyPage
}) => {
    return (
        <div className={s.user}>
            <div className={s.userHeader}>
                <UserImg
                    src={photo}
                    isMyPage={isMyPage}
                    saveNewUserPhoto={saveNewUserPhoto} />
                <div className={s.infoPartOfUserHeader}>
                    <UserNameWithStatus fullName={fullName} setResponseWarning={setResponseWarning} />
                    <ProfileData aboutMe={aboutMe}
                        contacts={contacts}
                        wrapperInfoClassName={s.wrapperInfoStyle}
                        itemInfoClass={s.userItemAbout}
                        contactsWrapperInfoClass={s.contactsWrapperInfoClass} />
                </div>
            </div>
            <UserAbout
                saveUserInfoFormData={saveUserInfoFormData}
                fullName={fullName}
                lookingForAJob={lookingForAJob}
                lookingForAJobDescription={lookingForAJobDescription}
                aboutMe={aboutMe}
                contacts={contacts}
                isMyPage={isMyPage}
                userId={userId}
                responseWarning={responseWarning}
                isSuccessResponse={isSuccessResponse}
                setIsSuccessResponse={setIsSuccessResponse} />
        </div>
    )
}

export default User;