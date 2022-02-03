import React, { useState } from 'react';
import { useFormik } from 'formik';
import { styled, alpha } from '@mui/material/styles';
import {
    Accordion, AccordionDetails, AccordionSummary, Button, Checkbox, FormControlLabel, Stack, TextField, Typography
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { saveUserInfoFormData } from '../../../../../redux/profile-reducer';

import s from '../UserAbout.module.sass';

const StyledStack = styled(Stack)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    padding: '3rem',
    borderRadius: '5px',
}));

const DataForm = React.memo(({ changeEditMode }) => {

    const dispatch = useDispatch();
    const {
        userId, fullName, lookingForAJob, lookingForAJobDescription, aboutMe, contacts
    } = useSelector((state) => state.profile);

    const newContacts = {};
    Object.keys(contacts).map(key => newContacts[key] = contacts[key] || '');

    const formik = useFormik({
        initialValues: {
            fullName,
            lookingForAJob,
            lookingForAJobDescription,
            aboutMe,
            contacts: { ...newContacts },
        },
        onSubmit: (values) => {
            dispatch(saveUserInfoFormData({ ...values, userId }));
            changeEditMode(false);
        },
    });

    const { handleSubmit, handleChange, handleBlur, values } = formik;

    const [isContactsOpen, setOpenedContacts] = useState(false);

    // const [expanded, setExpanded] = React.useState<string | false>(false);

    // const handleChange =
    // (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    //   setExpanded(isExpanded ? panel : false);
    // };
    const handleChangeAccordion = (panel) => (event, isExpanded) => {
        setOpenedContacts(isExpanded ? panel : false);
    };

    return (
        <StyledStack spacing={2} component='form' onSubmit={handleSubmit}>
            <TextField
                label='Full name'
                value={values.fullName || ''}
                onChange={handleChange}
                onBlur={handleBlur}
                name='fullName'
                id='fullName'
            />
            <FormControlLabel
                control={<Checkbox name='lookingForAJob' checked={values.lookingForAJob} onChange={handleChange} />}
                label={<label name='lookingForAJob'>
                    Looking for a job?
                </label>}
            />
            <TextField
                multiline
                label='My skills'
                value={values.lookingForAJobDescription || ''}
                onChange={handleChange}
                onBlur={handleBlur}
                name='skills'
                id='skills'
            />
            <TextField
                multiline
                label='About me:'
                value={values.aboutMe || ''}
                onChange={handleChange}
                onBlur={handleBlur}
                name='aboutMe'
                id='aboutMe'
            />
            {
                <Accordion
                    expanded={isContactsOpen === 'contacts'}
                    onChange={handleChangeAccordion('contacts')}
                    sx={{
                        background: 'none',
                        '&:before': {
                            display: 'none',
                        },
                        boxShadow: 'none',
                    }}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="contacts-content"
                        id="contacts-header"
                        sx={{ maxWidth: '8rem', p: 0 }}
                    >
                        <Typography>My contacts</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ p: 0 }}>
                        {
                            Object.keys(contacts).map(key => <TextField
                                key={key}
                                id={key}
                                value={values.contacts[key]}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                label={`${key}: `}
                                name={`contacts.${key}`}
                                fullWidth
                                sx={{ my: 1 }}
                            />)
                        }
                    </AccordionDetails>
              </Accordion>
            }
            <Stack direction='row' justifyContent='flex-start' spacing={2}>
                <Button variant='contained' sx={{ width: '10rem' }} type='submit' >
                    Save
                </Button>
                <Button variant='outlined' onClick={changeEditMode}>
                    Cancel
                </Button>
            </Stack>
        </StyledStack>
    )
});

export default DataForm;