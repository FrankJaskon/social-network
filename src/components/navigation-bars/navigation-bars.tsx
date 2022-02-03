import React, { useEffect } from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';
import { Box, CssBaseline, Toolbar, IconButton, Typography,
	Divider, List, ListItem, ListItemIcon, ListItemText,
	Tooltip, Avatar, MenuItem, Menu, useMediaQuery, Container, Stack, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { useDispatch, useSelector } from 'react-redux';
import { RootStateType } from '../../redux/redux-store';
import { deleteAuthLogin } from '../../redux/auth-reducer';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ForumIcon from '@mui/icons-material/Forum';
import GroupIcon from '@mui/icons-material/Group';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import SettingsIcon from '@mui/icons-material/Settings';

import s from './Sidebar.module.sass';

const drawerWidth = 180;

const openedMixin = (theme: Theme): CSSObject => ({
	width: drawerWidth,
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: 'hidden',
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up('sm')]: {
		width: `calc(${theme.spacing(7)} + 1px)`,
	},
});

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
	open?: boolean;
}

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		// width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
	({ theme, open }) => ({
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: 'nowrap',
		boxSizing: 'border-box',
		...(open && {
			...openedMixin(theme),
			'& .MuiDrawer-paper': openedMixin(theme),
		}),
		...(!open && {
			...closedMixin(theme),
			'& .MuiDrawer-paper': closedMixin(theme),
		}),
	}),
);


const NavigationBars = ({ children }: any) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));

	const [open, setOpen] = React.useState(true);
	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

	useEffect(() => setOpen(!isMobile), [isMobile]);

	const navigate = useNavigate();

	const { photos: { small: smallImg }, userId } = useSelector((state: RootStateType) => state.auth);
	const username = useSelector((state: RootStateType) => state.auth.fullName)?.split(' ')[0];
	const dispatch = useDispatch();

	const settings = [
		{ title: 'Profile', handleOnClick: () => {
			navigate('./');
		} },
		{ title: 'Account settings', handleOnClick: () => {navigate('./settings')} },
		{ title: 'Logout', handleOnClick: () => {
			dispatch(deleteAuthLogin());
		} }
	];

	const pages = [
		{ title: 'Profile', icon: <AccountCircleIcon />, link: './profile'},
		{ title: 'Messages', icon: <ForumIcon />, link: './dialogs'},
		{ title: 'Users', icon: <GroupAddIcon />, link: './users'},
	];

	const additionalPages = [
		{ title: 'Settings', icon: <SettingsIcon />, link: './settings'},
	];

	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const handleToggleOpen = () => {
		setOpen(!open);
	};

	const handleOnClickSignIn = () => {
		navigate('./login');
	}

	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<AppBar position="fixed" open={open}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleToggleOpen}
						edge="start"
						sx={{ marginRight: '36px' }}
					>
						{open ? <MenuOpenIcon /> : <MenuIcon />}
					</IconButton>
					<Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
						{`${'Unfriendly'.toUpperCase()} social network`}
					</Typography>
					{userId
						? <>
							<Typography variant="body1" noWrap component="div" sx={{ mr: 1 }}>
								{username}
							</Typography>
							<Box sx={{ flexGrow: 0 }}>
								<Tooltip title="Open settings">
								<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
									<Avatar alt="user avatar" src={ smallImg } />
								</IconButton>
								</Tooltip>
								<Menu
									sx={{ mt: '45px' }}
									id="menu-appbar"
									anchorEl={anchorElUser}
									anchorOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									keepMounted
									transformOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									open={Boolean(anchorElUser)}
									onClose={handleCloseUserMenu}
								>
								{settings.map(( { title, handleOnClick } ) => (
									<MenuItem key={title} onClick={ () => {
										handleCloseUserMenu();
										handleOnClick();
									}}>
										<Typography textAlign="center">{title}</Typography>
									</MenuItem>
								))}
								</Menu>
							</Box>
						</>
						: <Stack direction='row' spacing={1}>
							<Button
								variant="text"
								color='inherit'
								size='small'
								sx={{ textTransform: 'capitalize', p: 0 }}
								href='https://social-network.samuraijs.com'
								target='_blank'
							>
								Sign up
							</Button>
							<Button variant="contained" size='small' onClick={handleOnClickSignIn}>
								Sign in
							</Button>
						</Stack>
					}
				</Toolbar>
			</AppBar>
			<Drawer variant="permanent" open={open}>
				<DrawerHeader />
				<Divider />
				<List>
					{pages.map(({ title, icon, link }) => (
						<ListItem button key={title} onClick={() => navigate(link)}>
							<ListItemIcon>
								{ icon }
							</ListItemIcon>
							<ListItemText primary={title} />
						</ListItem>
					))}
				</List>
				<Divider />
				<List>
					{additionalPages.map(({ title, icon, link }) => (
						<ListItem button key={title} onClick={() => navigate(link)}>
							<ListItemIcon>
								{ icon }
							</ListItemIcon>
							<ListItemText primary={title} />
						</ListItem>
					))}
				</List>
			</Drawer>
			<Box sx={{ flexGrow: 1, p: '24px 12px', minHeight: '100vh' }}>
				<DrawerHeader />
				{ children }
			</Box>
		</Box>
	);
}

export default NavigationBars;