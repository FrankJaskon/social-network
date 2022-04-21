import React,  { useEffect } from 'react';
import User from './user';
import Preloader from '../common/preloader';
import { compose } from 'redux';
import { connect, useDispatch, useSelector } from 'react-redux';
import HOC from '../common/hoc';
import { setLoadingError } from '../../redux/profile-reducer';
import { setResponseWarning } from '../../redux/app-reducer';
import { getResponseWarning } from '../../redux/app-selectors';
import { getLoadingError } from '../../redux/profile-selectors';
import { showUsers, clearUserPage, setSearchParams, removeSearchParams } from '../../redux/users-reducer';
import { RootStateType } from '../../redux/redux-store';
import { Container, Pagination, Stack, Typography, Box, List, Divider, Tab, Tabs, InputBase } from '@mui/material';
import BreadcrumbsWithHomeIcon from '../common/breadcrumb';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { styled, alpha } from '@mui/material/styles';
import SearchInput from '../common/search-input';
import ChatWrapper from '../common/chat-wrapper';
interface UserListProps {
    value: string
    users: any
    activeTab: string
}

const UserList = ({ value, users, activeTab }: UserListProps) => {
    const dispatch = useDispatch();

    const {
        currentPage, totalPagesNumber, usersNumber, term
    } = useSelector((state: RootStateType) => state.users);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        dispatch(showUsers(value));
    };

    const getCountOfPages = () => totalPagesNumber ? Math.ceil(totalPagesNumber / usersNumber) : 0;

    if (users.length === 0) {
        return (
            <Typography variant='h5' sx={{ m: 3, display: 'flex', alignItems: 'center' }}>
                <SentimentVeryDissatisfiedIcon sx={{ width: '100px', height: '100px', color: 'primary.dark' }}/>
                {term
                    ? 'No people matching this filter'
                    : value === 'Friends' ? 'Unfortunately your friend list is empty.' : 'User has not been found.'
                }
            </Typography>
        )
    }

    return (
        <>
            <Container maxWidth='lg'>
                <List sx={{ width: '100%' }}>
                   {users.map((u: any, num: number, array: any) => (
                        <React.Fragment key={u.id}>
                            <User
                                key={u.id}
                                userData={u}
                            />
                            <Divider variant="fullWidth" component="li" sx={{ mt: -2 }} />
                        </React.Fragment>
                    ))}
                </List>
            </Container>
            {getCountOfPages() > 1
            && <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Pagination
                    boundaryCount={1}
                    siblingCount={4}
                    count={getCountOfPages()}
                    page={currentPage}
                    hideNextButton={currentPage === getCountOfPages()}
                    hidePrevButton={currentPage === 1}
                    onChange={handleChange}
                    showFirstButton={currentPage > 10}
                    showLastButton={getCountOfPages() - currentPage > 10}
                    variant="outlined"
                    shape="rounded"
                    sx={{ alignSelf: 'center', my: 3 }}
                />
            </Box>}
        </>
    )
}

const TabWrapper = styled(Tab)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.common.black,
    '&:hover': {
        color: theme.palette.primary.dark,
    }
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    // color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '36ch',
            '&:focus': {
            width: '60ch',
            },
        },
    },
}));

const Users = () => {
    const dispatch = useDispatch();

    const { usersList, currentPage, isFetching, friend, term } = useSelector((state: RootStateType) => state.users);
	const { isAuth } = useSelector((state: RootStateType) => state.auth);

    const [activeTab, setActiveTab] = React.useState('Users');

    const onClickTab = (event: React.SyntheticEvent, newValue: string) => {
        setActiveTab(newValue);
        if (newValue === 'Friends') {
            dispatch(setSearchParams(undefined, true));
        } else {
            dispatch(setSearchParams(undefined, undefined));
        }
        dispatch(showUsers());
    };

    const handleSearchChange = (event: any) => {
        const term = event.target.value;
        dispatch(setSearchParams(term, friend));
        dispatch(showUsers());
    }

    useEffect((): any => {
        dispatch(showUsers(currentPage));
        return () => {
            dispatch(clearUserPage());
            dispatch(removeSearchParams());
        };
    }, []);

    // const getIsDisabledSearch = () => usersList.length && usersList.length < 2 ? true : false;

    return (
        <Container>
            <ChatWrapper>
                <Container sx={{ mb: 2 }}>
                    <Stack spacing={2}>
                        <Stack
                            direction='row'
                            sx={{ alignItems: 'center' }}
                        >
                            <BreadcrumbsWithHomeIcon sx={{ flexGrow: 1, '&:hover': { color: 'primary.dark' } }} />
                            <SearchInput
                                placeholder='Search from users'
                                onSubmit={handleSearchChange}
                                StyledComponent={StyledInputBase}
                                // disabled={getIsDisabledSearch()}
                            />
                        </Stack>
                    </Stack>
                </Container>
                <Container>
                    <Tabs
                        value={activeTab}
                        variant='fullWidth'
                        onChange={onClickTab}
                        centered
                        sx={{ my: 3 }}
                    >
                        <TabWrapper
                            value='Users'
                            label='All users'
                            sx={activeTab !== 'Users' ? { bgcolor: '#e0e0e0' } : {}}
                        />
                        <TabWrapper
                            disabled={!isAuth}
                            value='Friends'
                            label='Friends'
                            sx={activeTab !== 'Friends' ? { bgcolor: '#e0e0e0' } : {}}
                        />
                    </Tabs>
                </Container>
                {isFetching ? <Preloader />
                    : <>
                        {activeTab === 'Users' && <UserList
                            value='Users'
                            activeTab={activeTab}
                            users={usersList}
                        />}
                        {activeTab === 'Friends' && <UserList
                            value='Friends'
                            activeTab={activeTab}
                            users={usersList}
                        />}
                    </>
                }
            </ChatWrapper>
        </Container>
    )
}

const mapStateToProps = (state: RootStateType) => ({
    loadingError: getLoadingError(state),
    responseWarning: getResponseWarning(state)
});


export default compose(
    connect(mapStateToProps, {setLoadingError, setResponseWarning}),
    HOC.showPageErrorWrapperComponent
)(Users);