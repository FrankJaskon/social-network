import React from 'react';

import UploadUserPhoto from '../../../common/upload-form';

import s from './UserImg.module.sass';

const UserImg = ({ isMyPage, src, saveNewUserPhoto }) => {
    return <div className={ s.userPhotoWrapper }>
        {isMyPage
        ? <>
            <div className={ s.imgWrapper }>
                <img src={ src }  alt='user-img'></img>
            </div>
            <UploadUserPhoto saveNewUserPhoto={ saveNewUserPhoto } />
        </>
        : <div className={s.imgWrapper}>
            <img src={ src }  alt='user-img'></img>
        </div>}
    </div>
}

export default UserImg;