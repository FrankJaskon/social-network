import React from 'react';
import { Box, Typography } from '@mui/material';
import ProfileStatus from '../../../status';

interface UserNameWithStatusProps {
    fullName: string
    setResponseWarning: any
}

const UserNameWithStatus = ({fullName, setResponseWarning}: UserNameWithStatusProps) => {
    return (
        <Box mx={1} >
            <Typography variant='h6'>
                {fullName}
            </Typography>
            {/* <ProfileStatus setResponseWarning={setResponseWarning}/> */}
        </Box>
    )
}

export default UserNameWithStatus;