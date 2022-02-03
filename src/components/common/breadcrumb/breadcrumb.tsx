import React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import GrainIcon from '@mui/icons-material/Grain';
import { SxProps, Theme } from '@mui/material';
import { useLocation } from 'react-router-dom';

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
	event.preventDefault();
	console.info('You clicked a breadcrumb.');
}

const routes = [
	{
		path: '/profile',
		title: 'Profile'
  	},
	{
		path: '/users',
		title: 'Users'
  	},
	{
		path: '/settings',
		title: 'Settings'
  	},
	{
		path: '/login',
		title: 'Login'
  	},
]

const BreadcrumbsWithHomeIcon = (props: any) => {
	const location = useLocation();

	const { pathname } = location;

  	return (
		<Breadcrumbs aria-label='breadcrumb' {...props}>
			<Link
				key='home'
				underline='hover'
				sx={{ display: 'flex', alignItems: 'center' }}
				color='inherit'
				href='/'
			>
				<HomeIcon sx={{ mr: 0.5 }} fontSize='inherit' />
				Home
			</Link>
			{routes.map(({ path, title }) => {
				switch(pathname) {
					case path:
						return (
							<Typography
								key={title}
								sx={{ display: 'flex', alignItems: 'center' }}
								color='text.primary'
							>
								{title}
							</Typography>
						)
					default:
						return undefined;
				}
			})}
		</Breadcrumbs>
  	);
}

export default BreadcrumbsWithHomeIcon;