import React from 'react';
import { Button, Chip, Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootStateType } from '../../../../../redux/redux-store';

interface ContactType {
    contactKey: string
    contactValue: string
}
const Contact = ({ contactKey, contactValue }: ContactType) => {
    return (
        <Button href={contactValue} target='_blank' rel='noreferrer' variant='outlined' size='small' sx={{ m: .25 }}>
            {contactKey}
        </Button>
    )
}

const transformToChip = (string: string | null) => {
    return (
        string && <Stack direction='row' flexWrap='wrap'>
            {
                string.split(',').map((skill: string) => (
                    <Chip
                        variant='outlined'
                        key={skill}
                        label={skill}
                        sx={{ borderRadius: '5px', m: .25 }}
                    />
                ))
            }
        </Stack>
    )
}

const transformToContact = (contacts: any) => {
    if (!contacts || Object.values(contacts).filter(item => item).length === 0) {
        return null;
    }
    return (
        <Stack direction='row' alignItems='center' spacing={1}>
            <Typography
                flexShrink='0'
                noWrap
                alignSelf='flex-start'
            >
                See also:
            </Typography>
            <Stack direction='row' flexWrap='wrap'>
                {
                    Object.keys(contacts).map(contact => {
                    if (contacts[contact]) {
                        return <Contact key={contact} contactKey={contact} contactValue={contacts[contact]} />;
                    } else {
                        return null;
                    }
                }
            )}
            </Stack>
        </Stack>
    );
}

const ProfileData = () => {

    const { lookingForAJobDescription, aboutMe, contacts } = useSelector((state: RootStateType) => state.profile);

    return (
        <Stack mr={9} mt={2} spacing={2}>
            {transformToChip(lookingForAJobDescription)}
            <Typography sx={{ pr: 10 }}>{aboutMe}</Typography>
            {transformToContact(contacts)}
        </Stack>
    )
}

export default ProfileData;