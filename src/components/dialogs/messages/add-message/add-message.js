import React from 'react';
import CustomButton from '../../../common/buttons/submit';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import { styled, alpha } from '@mui/material/styles';
import {validateTextFieldCreator} from '../../../common/validators';
import { Box, Button, Stack, Typography } from '@mui/material';

import s from './AddMessage.module.sass';

const validateTextField = validateTextFieldCreator(50);

const StyledStack = styled(Stack)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    height: '55px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '.5rem',
}));

const StyledTextField = styled(Typography)(({ theme }) => ({
    backgroundColor: theme.palette.action.selected,
    height: '40px',
    padding: '.5rem 1rem',
    margin: '2px',
    borderRadius: '.5rem',
    flexGrow: 1,
}));

const AddMessage = () => {
    return (
        <StyledStack>
            <StyledTextField variant='body2'>
                SomeTextField
            </StyledTextField>
            <Button variant='contained'>Submit</Button>
        </StyledStack>
    )
}

export default AddMessage;