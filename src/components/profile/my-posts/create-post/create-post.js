import React from 'react';
import { Formik } from 'formik';
import { styled, alpha } from '@mui/material/styles';
import { Button, Divider, Stack, TextField } from '@mui/material';

import s from './CreatePost.module.sass';

const StyledStack = styled(Stack)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    padding: '3rem',
    borderRadius: '5px',
}));

const CreatePost = React.memo(({userId, isAuth, isMyPage, placeholderText, addPost}) => {

    const isDisabled = isAuth ? false : true;

    return <Formik initialValues={{
                newPostBody: '',
            }}
            onSubmit={({newPostBody}, actions) => {
                addPost(newPostBody, userId);
                actions.resetForm();
        }} >
        {
            ({values,
                errors,
                touched,
                handleChange,
                handleSubmit}) => (
                        <StyledStack component='form' onSubmit={handleSubmit} spacing={2}>
                            <TextField
                                multiline
                                placeholder={
                                    isAuth
                                    ? placeholderText
                                    : 'You cannot post any comments if you are not logged in.'
                                }
                                value={values.newPostBody}
                                id='newPostBody'
                                name='newPostBody'
                                onChange={handleChange}
                                disabled={isDisabled}
                                fullWidth
                            />
                        <Divider variant='fullWidth' />
                        <Button
                            disabled={isDisabled}
                            variant='contained'
                            sx={{ width: '6rem' }}
                            type='submit'
                        >
                            Send
                        </Button>
                    </StyledStack>
                )
        }
    </Formik>
});

export default CreatePost;