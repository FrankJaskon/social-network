import React, { useState } from 'react';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootStateType } from '../../../../redux/redux-store';
import { toggleSubscription } from '../../../../redux/users-reducer';

interface FollowButtonProps {
    id: number | null
    followed?: boolean
}

const FollowButton = (props: FollowButtonProps) => {

    const { id, followed } = props;

    const dispatch = useDispatch();
    const { followed: userFollowed } = useSelector((state: RootStateType) => state.profile);
    const { usersFollowingInProgress } = useSelector((state: RootStateType) => state.users);
    const { isAuth } = useSelector((state: RootStateType) => state.auth);

    const [newFollowed, setNewFollowed] = useState<boolean>(followed ? followed : userFollowed);

    const isDisabled = usersFollowingInProgress.some(userId => userId === id) || !isAuth;


    const clickOnSubscription = (): void => {
        dispatch(toggleSubscription(id, !newFollowed));
        setNewFollowed(!newFollowed);
    }

    return (
            <Button
                disabled={isDisabled}
                variant='contained'
                size='small'
                sx={{ height: '25px', alignSelf: 'center' }}
                onClick={clickOnSubscription}
                >
                {newFollowed ? 'Unfollow' : 'Follow'}
            </Button>
    )
}

export default FollowButton;


