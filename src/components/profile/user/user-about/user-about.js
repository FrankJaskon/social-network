import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import CustomButton from '../../../common/buttons/submit';
import {stopChangingOnEscape} from '../../../common/helpers';
import ProfileData from './profile-data';
import ProfileDataForm from './profile-data-form';

import s from './UserAbout.module.sass';

const UserAbout = (props) => {

    const {
        saveUserInfoFormData, setIsSuccessResponse,
        isSuccessResponse, lookingForAJob, lookingForAJobDescription
    } = props;

    const { userId: pageId } = useSelector((state) => state.profile);
    const { userId } = useSelector((state) => state.auth);

    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        if (isSuccessResponse) {
            setIsEditMode(false)
            setIsSuccessResponse(false);

        };
    }, [isSuccessResponse, setIsSuccessResponse]);

    const onEscapeSetEditModeFalse = (event) => {
        stopChangingOnEscape(event, isEditMode, setIsEditMode);
    }

    const saveUserInfoFormDataWithId = (data, setErrors) => {
        saveUserInfoFormData({...data, userId : props.userId}, setErrors);
    }

    return !isEditMode
                ? <ProfileData lookingForAJob={lookingForAJob}
                    lookingForAJobDescription={lookingForAJobDescription}
                    setIsEditMode={setIsEditMode}
                    title='Professional info'>
                        {userId === pageId && <CustomButton text='Change data'
                            wrapClassName={s.wrapperStyle}
                            callbackOnClick={() => setIsEditMode(true)} />}
                </ProfileData>
                : <ProfileDataForm {...props}
                    saveUserInfoFormDataWithId={saveUserInfoFormDataWithId}
                    onEscapeSetEditModeFalse={onEscapeSetEditModeFalse}
                    setIsEditMode={setIsEditMode} />
}

export default UserAbout;