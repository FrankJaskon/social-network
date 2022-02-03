import { getPage, usersAPI } from '../components/api/api';
import { setLoadingError } from './profile-reducer';
import { RootStateType } from './redux-store';

const TOGGLE_FOLLOWING_STATUS = 'unfriendly-network/users/TOGGLE-FOLLOWING-STATUS',
      SET_USERS = 'unfriendly-network/users/SET-USERS',
      DELETE_USERS = 'unfriendly-network/users/DELETE-USERS',
      SET_TOTAL_PAGES_COUNT = 'unfriendly-network/users/SET-TOTAL-PAGES-COUNT',
      SET_CURRENT_PAGE = 'unfriendly-network/users/SET-CURRENT-PAGE',
      SET_PRELOADER = 'unfriendly-network/users/SET-PRELOADER',
      TOGGLE_IS_FOLLOWING_PROGRESS = 'unfriendly-network/users/TOGGLE-IS-FOLLOWING-PROGRESS',
      SET_SEARCH_PARAMS  = 'unfriendly-network/users/SET-SEARCH-PARAMS',
      REMOVE_SEARCH_PARAMS  = 'unfriendly-network/users/REMOVE-SEARCH-PARAMS';

const initialState = {
    usersList: [] as any[],
    usersNumber: 10 as number,
    totalPagesNumber: undefined as number | undefined,
    isFetching: false as boolean,
    usersFollowingInProgress: [] as any[],
    currentPage: 1 as number,
    term: '' as string,
    friend: '' as boolean | '',
};

type InitialStateType = typeof initialState;

const usersReducer = (state: InitialStateType = initialState, action: any): InitialStateType => {
    const type = action.type;

    switch(type) {
        case TOGGLE_FOLLOWING_STATUS:
            return {
                ...state,
                usersList: state.usersList.map(user => {
                    if (+action.payload.userId === +user.id) {
                        return {
                            ...user,
                            followed: action.payload.isFollowed
                        };
                    }
                    return user;
                })
            }
        case SET_USERS:
            return {
                ...state,
                usersList: [...action.payload.usersList]
            };
        case DELETE_USERS:
            return {
                ...state,
                usersList: []
            };
        case SET_TOTAL_PAGES_COUNT:
        case SET_CURRENT_PAGE:
        case SET_PRELOADER:
        case SET_SEARCH_PARAMS:
        case REMOVE_SEARCH_PARAMS:
            return {
                ...state,
                ...action.payload
            };
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                usersFollowingInProgress: action.payload.isInProgress
                    ? [...state.usersFollowingInProgress, action.payload.userId]
                    : [state.usersFollowingInProgress.filter(id => id !== action.payload.userId)]
            }
        default:
            return state;
    }
}

const initialSearchParams = {
    // currentPage: 1 as number,
    // usersNumber: 10 as number | undefined,
    term: '' as  string,
    friend: '' as boolean | '',
}

export const toggleFollowingStatus = (userId: number | null, isFollowed: boolean) => ({
    type: TOGGLE_FOLLOWING_STATUS, payload: { userId, isFollowed }
});
export const setUsers = (usersList: any) => ({type: SET_USERS, payload: { usersList }});
export const deleteUsers = () => ({type: DELETE_USERS});
export const setTotal = (totalPagesNumber: number) => ({type: SET_TOTAL_PAGES_COUNT, payload: {totalPagesNumber}});
export const setCurrentPage = (currentPage: number) => ({type: SET_CURRENT_PAGE, payload: {currentPage}});
export const setPreloadValue = (isFetching: boolean) => ({type: SET_PRELOADER, payload: {isFetching}});
export const setSearchParams = (
    // currentPage: number = initialState.currentPage,
    // usersNumber: number | undefined = initialState.usersNumber,
    term: string = initialState.term,
    friend: boolean | '' = initialState.friend
) => ({
    type: SET_SEARCH_PARAMS, payload: { term, friend }
});
export const removeSearchParams = () => ({type: REMOVE_SEARCH_PARAMS, payload: { ...initialSearchParams}});
export const toggleFollowingProgress = (value: boolean, userId: number | null) => (
    {
        type: TOGGLE_IS_FOLLOWING_PROGRESS,
        payload: { isInProgress: value, userId }
    }
);

export const showUsers= (
    page: number,
    // number: number | undefined = initialState.usersNumber,
    // term: string = initialState.term,
    // friend: boolean | '' = initialState.friend
) => {
    return async (dispatch: any, getState: () => RootStateType) => {
        const { currentPage, usersNumber, term, friend } = getState().users;

        dispatch(setPreloadValue(true));

        try {
            const {
                items, totalCount
            }: any = await getPage(`users?count=${usersNumber}&page=${page}&term=${term}&friend=${friend}`);

            dispatch(setUsers(items));
            dispatch(setTotal(totalCount));
            dispatch(setCurrentPage(page));
            setTimeout(() => {
                dispatch(setPreloadValue(false));
            }, 500);
        } catch(error) {
            type ErrorType = any;
            const { response: { status, data: { message }}}: ErrorType = error;
            dispatch(setLoadingError(status, message));
        }
    };
}

export const clearUserPage = () => {
    return (dispatch: any) => {
        dispatch(deleteUsers());
        dispatch(setCurrentPage(1));
        dispatch(setTotal(0));
    }
}

export const toggleSubscription = (userId: number | null, isFollowed: boolean) => {
    return async (dispatch: any) => {
        dispatch(toggleFollowingProgress(true, userId));
        const { resultCode }: any = isFollowed
            ? await usersAPI.postFollowing(`follow/${userId}`)
            : await usersAPI.deleteFollowing(`follow/${userId}`);
        dispatch(toggleFollowingProgress(false, userId));
        if (!resultCode) {
            dispatch(toggleFollowingStatus(userId, isFollowed))
        };
    };
}

export default usersReducer;