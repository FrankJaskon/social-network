import React from 'react';
import BreadcrumbsWithHomeIcon from '../common/breadcrumb';
import { Button, Container, Divider, Stack, Switch, Typography } from '@mui/material';
import ChatWrapper from '../common/chat-wrapper';
import { styled, alpha } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { RootStateType } from '../../redux/redux-store';
import { deleteAuthLogin } from '../../redux/auth-reducer';
import { useNavigate } from 'react-router-dom';
import { toggleTheme } from '../../redux/app-reducer';

const StyledStack = styled(Stack)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '2rem',
}));

const Settings: React.FC<void> = () => {
    const dispatch = useDispatch();
    const { isAuth } = useSelector((state: RootStateType) => state.auth);
    const { isLightTheme } = useSelector((state: RootStateType) => state.app);

    const navigate = useNavigate();

    const onToggleTheme = () => {
        dispatch(toggleTheme(!isLightTheme));
    }

    const handleLogout = () => {
        dispatch(deleteAuthLogin());
    }

    const handleLogin = () => {
        navigate('/login');
    }

    return (
        <Container>
            <ChatWrapper>
                <Container sx={{ mb: 2 }}>
                    <BreadcrumbsWithHomeIcon
                        sx={{
                            flexGrow: 1,
                            '&:hover': { color: 'primary.dark' },
                            height: '39px',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    />
                </Container>
                <Container>
                    <Stack>
                        <StyledStack>
                            <Typography sx={{ flexGrow: 1 }}>
                                {
                                    isLightTheme
                                    ? 'Light theme'
                                    : 'Dark theme'
                                }
                            </Typography>
                            <Switch
                                checked={isLightTheme}
                                onChange={onToggleTheme}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        </StyledStack>
                        <Divider variant='fullWidth' />
                        <StyledStack>
                            <Typography sx={{ flexGrow: 1 }}>
                                {
                                    isAuth
                                    ? 'Exit your user profile'
                                    : 'Enter your user profile'
                                }
                            </Typography>
                                {
                                    isAuth
                                    ? <Button onClick={handleLogout}>
                                        Log out
                                    </Button>
                                    : <Button onClick={handleLogin}>
                                        Log in
                                    </Button>
                                }
                        </StyledStack>
                        <Divider variant='fullWidth' />
                    </Stack>
                </Container>
            </ChatWrapper>
        </Container>
    )
}

export default Settings;