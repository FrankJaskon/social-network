import React, { useState } from 'react';
import { Button, ButtonProps } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootStateType } from '../../../../redux/redux-store';
import { toggleSubscription } from '../../../../redux/users-reducer';


interface FollowButtonProps extends ButtonProps {
    userId: number | null
    followed?: boolean
}

const FollowButton = (props: FollowButtonProps) => {
    const { userId, followed, ...rest } = props;
    const dispatch = useDispatch();
    const { followed: userFollowed } = useSelector((state: RootStateType) => state.profile);
    const { usersFollowingInProgress } = useSelector((state: RootStateType) => state.users);
    const { isAuth } = useSelector((state: RootStateType) => state.auth);

    const [newFollowed, setNewFollowed] = useState<boolean>(followed ? followed : userFollowed);

    const isDisabled = usersFollowingInProgress.some(id => id === userId) || !isAuth;

    const clickOnSubscription = (): void => {
        dispatch(toggleSubscription(userId, !newFollowed));
        setNewFollowed(!newFollowed);
    }

    return (
            <Button
                disabled={isDisabled}
                variant='contained'
                size='small'
                sx={{ height: '25px', alignSelf: 'center' }}
                onClick={clickOnSubscription}
                {...rest}
            >
                {newFollowed ? 'Unfollow' : 'Follow'}
            </Button>
    )
}

export default FollowButton;


