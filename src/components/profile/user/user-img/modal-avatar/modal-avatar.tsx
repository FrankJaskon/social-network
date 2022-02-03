import React, { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { Avatar, Container, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { RootStateType } from '../../../../../redux/redux-store';
import { useDispatch, useSelector } from 'react-redux';
import { PhotoCamera } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { saveNewUserPhoto } from '../../../../../redux/profile-reducer';
import FollowButton from '../../../../common/buttons/follow-button';

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	bgcolor: 'background.paper',
	borderRadius: '5px',
	p: '5px',
};

const Input = styled('input')({
	display: 'none',
  });

function ModalAvatar() {
	const dispatch = useDispatch();

	const [open, setOpen] = useState(false);
	const { photos, userId } = useSelector((state: RootStateType) => state.profile);
	const { userId: authId } = useSelector((state: RootStateType) => state.auth);

	const handleOpen = () => setOpen(true);

	const handleClose = () => {
		setOpen(false);
		setFile(null);
	};

    const [file, setFile] = useState<FormData | null>(null);

    const clearInput = ({ target }: any) => {
        target.value = '';
    }

    const getFile = ({target : { files }}: any): void => {
        const formData = new FormData();
        formData.append('image', files[0]);
        setFile(formData);
    }

    const onSubmit = () => {
        dispatch(saveNewUserPhoto(file));
        setFile(null);
    }

	const getIsMyPage = (pageId: number | null, authId: number | null): boolean => pageId === authId ? true : false;

	return (
		<div>
			<Avatar
				onClick={handleOpen}
				variant='square'
				alt='user-photo'
				src={photos.large}
				sx={{ width: '200px', height: '250px', cursor: 'pointer' }} />
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={open}>
					<Box sx={style}>
						<Avatar
							variant='square'
							alt='user-photo'
							src={photos.large}
							sx={{ width: '300px', height: '300px' }} />
						{
							getIsMyPage(userId, authId)
							? <Stack direction='row' alignItems='center' justifyContent='center'>
								<Tooltip
									placement='bottom'
									describeChild
									title={file ? 'Click to set the new photo' : ''}
								>
									<Typography
										component='span'
										sx={file ? { color: 'primary.dark',
											cursor: 'pointer',
											'&:hover': {
												textDecoration: 'underline',
											},
											}
											: undefined
										}
										onClick={file ? onSubmit : undefined}
									>
										Change user photo
									</Typography>
								</Tooltip>
								<label htmlFor="icon-button-file">
									<Input
										accept="image/*"
										id="icon-button-file"
										type="file"
										onChange={getFile}
										onClick={clearInput}
									/>
									<Tooltip
										placement='bottom'
										describeChild
										title='Choose your photo (.img, .png)'
									>
										<IconButton color="primary" aria-label="upload picture" component="span">
											<PhotoCamera />
										</IconButton>
									</Tooltip>
								</label>
							</Stack>
							: <Container disableGutters sx={{ p: 1, textAlign: 'right' }}>
								<FollowButton id={userId} />
							</Container>
						}
					</Box>
				</Fade>
			</Modal>
		</div>
	);
}

export default ModalAvatar;