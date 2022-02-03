import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootStateType } from '../../../redux/redux-store';


export const redirectToAuth = (Component: any) => {
    const ContainerComponent = (props: any) => {
        const isAuth = useSelector((state: RootStateType) => state.auth.isAuth);

        return isAuth ? <Component {...props} /> : <Navigate to={'/login'} /> ;
    }
    return ContainerComponent;
};

export const redirectToProfile = (Component: any) => {
    const ContainerComponent = (props: any) => {
        const isAuth = useSelector((state: RootStateType) => state.auth.isAuth);

        return isAuth ? <Navigate to={'/profile'} /> : <Component {...props} />;
    }
    return ContainerComponent;
};