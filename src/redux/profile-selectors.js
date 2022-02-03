import { createSelector } from 'reselect';
import {getMyId} from './auth-selectors';

export const getProfile = ({profile}) => {
    return profile;
}

export const getPageId = ({profile: {userId}}) => {
    return userId;
}

export const getUserStatus = ({profile: {status}}) => {
    return status;
}

export const getIsProfileLoaded = ({profile: {isProfileLoaded}}) => {
    return isProfileLoaded;
}

export const getIsStatusLoaded = ({profile: {isStatusLoaded}}) => {
    return isStatusLoaded;
}

export const getLoadingError = ({profile: {loadingError}}) => {
    return loadingError;
}

export const getIsSuccessResponse = ({profile: {isSuccessResponse}}) => {
    return isSuccessResponse;
}

export const getIsPageLoaded  = createSelector(getIsProfileLoaded, getIsStatusLoaded,
    (isProfileLoaded, isStatusLoaded) => {
        if (isProfileLoaded && isStatusLoaded) return true;
        else return false;
});

export const getIsMyPage = createSelector(getMyId, getPageId,
    (myId, userId) => {
        if (myId === userId) return true;
        else return false;
});

export const getIsCaptcha = ({auth: {isCaptcha}}) => {
    return isCaptcha;
}

export const getCaptcha = ({auth: {captcha}}) => {
    return captcha;
}