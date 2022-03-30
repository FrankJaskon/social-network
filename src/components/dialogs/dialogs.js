import React from 'react';
import { Box, Container, Divider, Stack, Typography } from '@mui/material';
import BreadcrumbsWithHomeIcon from '../common/breadcrumb';
import { styled, alpha } from '@mui/material/styles';
import DialogItem from './dialog-item';
import CollapsedMessage from './messages/message/collapsed-message';
import DialogMessages from './messages';
import AddMessage from './messages/add-message';
import ChatWrapper from '../common/chat-wrapper';
import { useSelector } from 'react-redux';

const StyledBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    padding: '1rem 3rem 0',
    borderRadius: '5px',
}));

const ScrolledStack = styled(Stack)(({ theme }) => ({
    overflow: 'auto',
    maxHeight: 'calc(100vh - 250px)',
}));


const Dialogs = ({dialogs, addMessage}) => {
    const { activeDialogId, dialogsData } = useSelector((state) => state.dialogs);

    const dialogsList = dialogsData.map(d => <DialogItem key={d.id} name={d.name} id={d.id}/>);

    return (
        <ChatWrapper>
            <Container>
                <Container sx={{ mb: 2 }}>
                    <BreadcrumbsWithHomeIcon
                        sx={{
                            flexGrow: 1,
                            '&:hover': { color: 'primary.dark' },
                            height: '39px',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    />
                </Container>
                <StyledBox>
                    <ScrolledStack sx={{ width: '300px', mr: 4 }} spacing={1}>
                    {dialogsList}
                    </ScrolledStack>
                    <Stack sx={{ flexGrow: 1 }} spacing={1}>
                        <ScrolledStack>
                            <DialogMessages />
                        </ScrolledStack>
                        {activeDialogId && <AddMessage />}
                    </Stack>
                </StyledBox>
                {/* <div className={s.dialog__messages}>
                    <div className={s.messages}>
                    <Routes>
                        <Route
                            path={`/dialogs/dialog/0`}
                            element={() => <DialogMessages
                                dialogs={dialogs}
                                addMessage={addMessage} />} />
                    </Routes>
                    </div>
                </div> */}
            </Container>
        </ChatWrapper>
    )
}
export default Dialogs;