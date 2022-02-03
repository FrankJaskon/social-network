import React from 'react';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import { Box, Toolbar, IconButton, Typography, Button, AppBar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

// const AppBar = styled(MuiAppBar, {
// 	shouldForwardProp: (prop) => prop !== 'open',
//   })<MuiAppBarProps>(({ theme, open }) => ({
// 	zIndex: theme.zIndex.drawer + 1,
// 	transition: theme.transitions.create(['width', 'margin'], {
// 	  easing: theme.transitions.easing.sharp,
// 	  duration: theme.transitions.duration.leavingScreen,
// 	}),
// 	...(open && {
// 	  marginLeft: drawerWidth,
// 	  width: `calc(100% - ${drawerWidth}px)`,
// 	  transition: theme.transitions.create(['width', 'margin'], {
// 		easing: theme.transitions.easing.sharp,
// 		duration: theme.transitions.duration.enteringScreen,
// 	  }),
// 	}),
// }));

const Header = () => {
	const [open, setOpen] = React.useState(false);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	  const handleDrawerClose = () => {
		setOpen(false);
	};

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar>
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}
					>
					<MenuIcon />
					</IconButton>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						News
					</Typography>
					<Button color="inherit">Login</Button>
				</Toolbar>
            </AppBar>
        </Box>
    );
}

export default Header;

{/* <AppBar position="fixed" open={open}>
<Toolbar>
  <IconButton
	color="inherit"
	aria-label="open drawer"
	onClick={handleDrawerOpen}
	edge="start"
	sx={{
	  marginRight: '36px',
	  ...(open && { display: 'none' }),
	}}
  >
	<MenuIcon />
  </IconButton>
  <Typography variant="h6" noWrap component="div">
	Mini variant drawer
  </Typography>
</Toolbar>
</AppBar> */}