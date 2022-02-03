import React from 'react';
import { Box, Container, Divider, Stack, Typography } from '@mui/material';
import BreadcrumbsWithHomeIcon from '../common/breadcrumb';
import { styled, alpha } from '@mui/material/styles';
import DialogItem from './dialog-item';
import CollapsedMessage from './messages/message/collapsed-message';

const StyledBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    padding: '1rem 3rem',
    borderRadius: '5px',
}));

const ScrolledStack = styled(Stack)(({ theme }) => ({
    overflow: 'auto',
    maxHeight: 'calc(100vh - 200px)',
}));


const Dialogs = ({dialogs, addMessage}) => {

    const {dialogsData} = dialogs;

    const dialogsList = dialogsData.map(d => <DialogItem key={d.id} name={d.name} id={d.id}/>);

    return (
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
                   {dialogsList}
                   {dialogsList}
                   {dialogsList}
                   {dialogsList}
                   {dialogsList}
                   {dialogsList}
                   {dialogsList}
                   {dialogsList}
                </ScrolledStack>
                <ScrolledStack sx={{ flexGrow: 1 }}>
                   <CollapsedMessage />
                   <CollapsedMessage />
                   <CollapsedMessage />
                   <CollapsedMessage />
                   <CollapsedMessage />
                   <CollapsedMessage />
                   <CollapsedMessage />
                   <CollapsedMessage />
                   <CollapsedMessage />
                   <CollapsedMessage />
                   <CollapsedMessage />
                   <CollapsedMessage />
                   <CollapsedMessage />
                   <CollapsedMessage />
                   <CollapsedMessage />
                   <CollapsedMessage />
                   <CollapsedMessage />
                   <CollapsedMessage />
                </ScrolledStack>
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
    )
}
export default Dialogs;