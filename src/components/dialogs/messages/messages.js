import React, { useState } from 'react';
// import DialogMessage from './message';
import AddMessage from './add-message';
import { useSelector } from 'react-redux';
// import { RootStateType } from '../../../redux/redux-store';
import CollapsedMessage from '../messages/message/collapsed-message';
import { Stack, Typography } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import OpenedMessage from './message/opened-message';

// import s from './Messages.module.sass';

const StyledStack = styled(Stack)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    // paddingTop: '40rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    padding: '.5rem',
}));

const DialogMessages = () => {
    const { messagesData, placeholderText, newMessageBody, activeDialogId } = useSelector((state) => state.dialogs);

    const [ isMyId, setMyId ] = useState(true);

    return (
        <>
            {
                activeDialogId !== undefined
                ? <StyledStack spacing={1}>
                    <OpenedMessage isMyId={isMyId} />
                    <OpenedMessage />
                    <OpenedMessage isMyId={isMyId} />
                    <OpenedMessage />
                    <OpenedMessage isMyId={isMyId} />
                    <OpenedMessage />
                    <OpenedMessage />
                    <OpenedMessage isMyId={isMyId} />
                    <OpenedMessage isMyId={isMyId} />
                    <OpenedMessage />
                    <OpenedMessage />
                    <OpenedMessage isMyId={isMyId} />
                </StyledStack>
                : <>
                    <CollapsedMessage id={1} />
                    <CollapsedMessage id={2} />
                    <CollapsedMessage id={3} />
                </>
            }
            {/* <AddMessage
                placeholder={placeholderText}
                newMessageBody={newMessageBody}
                addMessage={() => {}}
            /> */}
        </>
    )
}

export default DialogMessages;