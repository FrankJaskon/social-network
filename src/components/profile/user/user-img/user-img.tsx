import { Avatar, Stack } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootStateType } from '../../../../redux/redux-store';

import UploadUserPhoto from '../../../common/upload-form';

import s from './UserImg.module.sass';

const UserImg = ({ onClick }: any) => {
    const mainId = useSelector((state: RootStateType) => state.auth.userId);
    const { photos, userId } = useSelector((state: RootStateType) => state.profile);

    // const isMyPage = mainId === userId ? true : false;

    return (
            <Avatar
                onClick={onClick}
                variant='square'
                alt='user-photo'
                src={photos.large}
                sx={{ width: '200px', height: '250px' }} />
    //         {/* <div className={ s.imgWrapper }>
    //             <img src={ photos.large }  alt='user-img'></img>
    //         </div> */}
    //         {/* {
    //             isMyPage && <UploadUserPhoto />
    //         } */}
    )
}

export default UserImg;