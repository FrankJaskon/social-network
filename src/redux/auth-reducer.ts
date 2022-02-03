import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import {getPage, loginAPI} from '../components/api/api';
import { removeUserData } from './profile-reducer';
import { RootStateType } from './redux-store';

const SET_AUTH_DATA: 'unfriendly-network/auth/SET-AUTH-DATA' = 'unfriendly-network/auth/SET-AUTH-DATA',
    SET_CAPTCHA: 'unfriendly-network/auth/SET-CAPTCHA' = 'unfriendly-network/auth/SET-CAPTCHA',
    REMOVE_AUTH_DATA: 'unfriendly-network/auth/REMOVE-AUTH-DATA' = 'unfriendly-network/auth/REMOVE-AUTH-DATA',
    SET_USER: 'unfriendly-network/auth/SET-USER' = 'unfriendly-network/auth/SET-USER';

const initialState = {
    userId: null as number | null,
    login: null as string | null,
    email: null as string | null,
    isAuth: false as boolean,
    captcha: '' as string | null,
    isCaptcha: false as boolean,
    status: null as null | string,
    aboutMe: null as null | string,
    contacts: {} as any,
    lookingForAJob: false as boolean,
    lookingForAJobDescription: null as null | string,
    fullName: null as null | string,
    photos: {
        small: {} as any,
        large: {} as any,
    },
};

type initialStateType = typeof initialState;

const authReducer = (state: initialStateType = initialState, action: ActionsType): initialStateType => {
    const type = action.type;

    switch (type) {
        case SET_AUTH_DATA:
        case SET_CAPTCHA:
        case REMOVE_AUTH_DATA:
        case SET_USER:
            return {
            ...state,
            ...action.payload
        }
        default:
            return state;
    }
}

interface AuthDataType {
    id: number | null
    login: string | null
    email: string | null
}

export const setAuthData = ({ id, login, email }: AuthDataType, isAuth: boolean) => (
    { type: SET_AUTH_DATA, payload: { id, email, login: login || 'Guest', isAuth }}
);

export const setIsCaptcha = (captcha: string) => (
    { type: SET_CAPTCHA, payload: { captcha, isCaptcha: captcha?.length ? true : false }}
);

export const removeAuthData = () => ({ type: REMOVE_AUTH_DATA, payload: initialState });

export const setUser = ({
    status, aboutMe, contacts, lookingForAJob,
    lookingForAJobDescription, fullName, userId, photos, error
}: any) => (
    {
        type: SET_USER,
        payload: {
            status, aboutMe, contacts, error,
            lookingForAJob, lookingForAJobDescription,
            fullName, userId, photos
        }
    }
);

type ActionsType = ReturnType<typeof setAuthData>
    | ReturnType<typeof setIsCaptcha>
    | ReturnType<typeof removeAuthData>
    | ReturnType<typeof setUser>;

type QueryAuthType = ReturnType<typeof queryAuth>;

export const queryAuth = () => async (dispatch: Dispatch<ActionsType>) => {

    const { data, resultCode }: any = await loginAPI.getLoginData(`auth/me`);

    if (!resultCode) {
        dispatch(setAuthData(data, true));
        try {
            const userData = await getPage(`profile/${data.id}`);
            dispatch(setUser(userData));
        } catch(error) {
            console.error(`Something went wrong: ${error}`);
        }
    }
    else {
        dispatch(setAuthData(data, false));
    }
}

type SetUserAuthType = ThunkAction<Promise<QueryAuthType | void>,
    RootStateType,
    unknown,
    ActionsType>;

export const setUserAuth = (loginData: any): SetUserAuthType => async (dispatch) => {

    const { resultCode }: any = await loginAPI.postLoginData(`/auth/login`, loginData);

    if (!resultCode) {
        dispatch(setIsCaptcha(''));
        dispatch(queryAuth());
    } else if (resultCode === 10) {
        const {url} = await loginAPI.getLoginData(`/security/get-captcha-url`);
        dispatch(setIsCaptcha(url));
    }
}

type DeleteAuthLoginType = ThunkAction<Promise<void>,
    RootStateType,
    unknown,
    ActionsType | RemoveUserDataType>;

type RemoveUserDataType = ReturnType<typeof removeUserData>;

export const deleteAuthLogin = (): DeleteAuthLoginType => async (dispatch) => {
    try {
        await loginAPI.deleteLoginData(`/auth/login`);
        dispatch(removeAuthData());
        dispatch(removeUserData())
    }
    catch(error) {
        console.error(`Something is wrong. Error: ${error}`);
    }
}

export default authReducer;