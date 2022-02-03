import {getPage, profileAPI, putData} from '../components/api/api';
import {setResponseWarning} from './app-reducer';

const ADD_POST = 'unfriendly-network/profile/ADD-POST',
      SET_USER_PROFILE = 'unfriendly-network/profile/SET-USER-PROFILE',
      SET_PROFILE_STATUS = 'unfriendly-network/profile/SET-PROFILE-STATUS',
      SET_IS_PROFILE_LOADED = 'unfriendly-network/profile/SET-IS-PROFILE-LOADED',
      SET_IS_STATUS_LOADED = 'unfriendly-network/profile/SET-IS-STATUS-LOADED',
      SET_LOADING_ERROR = 'unfriendly-network/profile/SET-LOADING-ERROR',
      SET_IS_SUCCESS_RESPONSE = 'unfriendly-network/profile/SET-IS-SUCCESS-RESPONSE',
      SET_FOLLOWED = 'unfriendly-network/profile/SET-FOLLOWED',
      REMOVE_USER_DATA = 'unfriendly-network/profile/REMOVE-USER-DATA';

const initialState = {
    status: null as null | string,
    aboutMe: null as null | string,
    contacts: {} as any,
    lookingForAJob: false as boolean,
    lookingForAJobDescription: null as null | string,
    fullName: null as null | string,
    userId: null as null | number,
    photos: {
        small: {} as any,
        large: {} as any,
    },
    postsData: [] as any[],
    newPostBody: null as null | string,
    placeholderText: 'Enter your message' as string,
    isProfileLoaded: false as boolean,
    isStatusLoaded: false as boolean,
    loadingError: {
        code: null as null | string,
        message: null as null | string,
    },
    isSuccessResponse: false as boolean,
    followed: false as boolean,
};

type InitialStateType = typeof initialState;

const profileReducer = (state: InitialStateType = initialState, action: any): InitialStateType => {
    const type = action.type;

    switch(type) {
        case ADD_POST:
            const newPost = {
                id: 0,
                message: action.newPostBody,
                pageId: action.pageId,
                likesCount: 0
            }
            return {
                ...state,
                postsData: [...state.postsData, newPost],
                newPostBody: ''
            }
        case SET_USER_PROFILE:
            return {
                ...state,
                ...action.payload,
                contacts: {...action.payload.contacts},
                photos: {...action.payload.photos}
            }
        case SET_PROFILE_STATUS:
        case SET_IS_PROFILE_LOADED:
        case SET_IS_STATUS_LOADED:
        case SET_IS_SUCCESS_RESPONSE:
        case SET_FOLLOWED:
        case REMOVE_USER_DATA:
            return {
                ...state,
                ...action.payload
            }
        case SET_LOADING_ERROR:
            return {
                ...state,
                loadingError: {...state.loadingError, ...action.payload}
            }
        default:
            return state;
    }
}

export const setProfile = ({
    status, aboutMe, contacts, lookingForAJob,
    lookingForAJobDescription, fullName, userId, photos, error
}: any) => (
    {
        type: SET_USER_PROFILE,
        payload: {
            status, aboutMe, contacts, error,
            lookingForAJob, lookingForAJobDescription,
            fullName, userId, photos
        }
    }
);

export const addPost = (body: any, pageId: any) => ({type: ADD_POST, newPostBody: body, pageId});
export const changeUserStatus = (status: string) => ({type: SET_PROFILE_STATUS, payload: {status}});
export const setIsProfileLoaded = (isProfileLoaded: boolean) => ({type: SET_IS_PROFILE_LOADED, payload: {isProfileLoaded}});
export const setIsStatusLoaded = (isStatusLoaded: boolean) => ({type: SET_IS_STATUS_LOADED, payload: {isStatusLoaded}});
export const setLoadingError = (code: string, message: string) => ({type: SET_LOADING_ERROR, payload: {code, message}});
export const setIsSuccessResponse = (isSuccessResponse: boolean) => ({type: SET_IS_SUCCESS_RESPONSE, payload: {isSuccessResponse}});
export const setFollowed = (followed: boolean) => ({ type: SET_FOLLOWED, payload: { followed } });
export const removeUserData = () => ({ type: REMOVE_USER_DATA, payload: initialState });

export const showUserPage = (userId: number | null) => async (dispatch: any) => {
    dispatch(setIsProfileLoaded(false));
    dispatch(setIsStatusLoaded(false));
    dispatch(setLoadingError('', ''));
    try {
        const data = await getPage(`profile/${userId}`);
        dispatch(setProfile(data));
        const followed = await getPage(`follow/${userId}`);
        dispatch(setFollowed(followed));
    } catch({response: {status, data: {message}}}) {
        dispatch(setLoadingError(status as any, message as any));
    }
    await dispatch(setIsProfileLoaded(true));
    const data = await getPage(`profile/status/${userId}`)
        dispatch(changeUserStatus(data));
        dispatch(setIsStatusLoaded(true));
}

export const applyNewStatus = (body: any) => async (dispatch: any) => {
    const {resultCode, messages} = await putData(`profile/status/`, {status: body});
    if (!resultCode) {
        dispatch(changeUserStatus(body));
    } else dispatch(setResponseWarning(`Some error: ${messages[0]}`));
}

export const saveUserInfoFormData = (data: any, setErrors: any) => async (dispatch: any, getState: any) => {
    const id = getState().auth.id;
    const {resultCode, messages} = await putData(`profile`, data);
    if (!resultCode) {
        dispatch(setIsSuccessResponse(true));
        dispatch(showUserPage(id));
    } else setErrors({responseWarning: `Some error:${messages.join(' ')}`});
}

export const saveNewUserPhoto = (file: any) => async (dispatch: any, getState: any) => {
    const id = getState().auth.id;
    const {resultCode, messages} = await profileAPI.updateUserImg('/profile/photo', file);
    if (!resultCode) {
        dispatch(showUserPage(id));
    } else dispatch(setResponseWarning(`Some error: ${messages[0]}`));
}

export default profileReducer;