import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {getIsMyPage, getUserStatus} from '../../../redux/profile-selectors';
import {validateTextFieldCreator} from '../../common/validators';
import {applyNewStatus} from '../../../redux/profile-reducer';
import {stopChangingOnEscape} from '../../common/helpers';
import { Box, ClickAwayListener, TextField, Typography } from '@mui/material';

import s from './Status.module.sass';


const maxLength = validateTextFieldCreator(300);

const ProfileStatus = React.memo(({status, isMyPage, applyNewStatus, setResponseWarning}) => {

    const [editMode, setEditMode] = useState(false);
    const [statusBody, setStatusBody] = useState(status);

    useEffect(() => {
        setStatusBody(status);
    }, [status]);

    const onClickEditMode = () => {
        if (isMyPage) setEditMode(true);
    }

    const onChangeInput = ({target}) => {
        setStatusBody(target.value);
    }

    const handleClickAway = () => {
        setEditMode(false);
      };

    const onSetNewStatus = (event) => {
        event.preventDefault();

        const error = maxLength(statusBody);
        if (!error) {
            if (statusBody !== status) {
                setEditMode(false);
                applyNewStatus(statusBody);
            } else setResponseWarning('Oops, some problem. New status cannot equal the old status');
        } else alert(error);
    }

    const InputProps = {
        sx: {
            m: 0,
            p: '.5rem 1rem',
            fontSize: 'inherit',
        }
    }

    return (
        // <form className={s.statusForm} onSubmit={onSetNewStatus}>
        <Box component='form' onSubmit={onSetNewStatus}>
                {
                editMode
                ?  <Box mr='200px'>
                    <ClickAwayListener onClickAway={handleClickAway}>
                        <TextField
                            autoFocus
                            fullWidth
                            multiline
                            name='status'
                            id='status'
                            value={statusBody}
                            onKeyDown={(e) => stopChangingOnEscape(e, editMode, setEditMode)}
                            onChange={onChangeInput}
                            InputProps={InputProps}
                        />
                    </ClickAwayListener>
                </Box>
                : <Typography
                    variant='body2'
                    onDoubleClick={onClickEditMode}
                >
                    {status ? status : 'User has no status'}
                </Typography>
                }
        </Box>
    )
});

const mapStateToProps = (state) => ({
    status: getUserStatus(state),
    isMyPage: getIsMyPage(state)
});

export default compose(
    connect(mapStateToProps, {applyNewStatus})
)(ProfileStatus);