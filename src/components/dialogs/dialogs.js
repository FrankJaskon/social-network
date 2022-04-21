import React from 'react';
import { Box, Container, Divider, InputBase, Stack, Typography } from '@mui/material';
import BreadcrumbsWithHomeIcon from '../common/breadcrumb';
import { styled, alpha } from '@mui/material/styles';
import DialogItem from './dialog-item';
import CollapsedMessage from './messages/message/collapsed-message';
import DialogMessages from './messages';
import AddMessage from './messages/add-message';
import ChatWrapper from '../common/chat-wrapper';
import { useDispatch, useSelector } from 'react-redux';
import SearchInput from '../common/search-input';
import { setSearchParams, showUsers } from '../../redux/users-reducer';

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

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    // color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        width: '100%',
        marginLeft: 0,
    },
}));


const Dialogs = ({dialogs, addMessage}) => {
    const { activeDialogId, dialogsData } = useSelector((state) => state.dialogs);
    const dispatch = useDispatch();

    const dialogsList = dialogsData.map(d => <DialogItem key={d.id} name={d.name} id={d.id}/>);

    const handleSearchChange = (event) => {
        const term = event.target.value;
        // dispatch(setSearchParams(term, undefined));
        // dispatch(showUsers());
    }

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
                        <SearchInput
                            placeholder='Search from users'
                            onSubmit={handleSearchChange}
                            StyledComponent={StyledInputBase}
                            // disabled={getIsDisabledSearch()}
                        />
                        {dialogsList}
                    </ScrolledStack>
                    <Stack sx={{ flexGrow: 1 }} spacing={1}>
                        <ScrolledStack>
                            <DialogMessages />
                        </ScrolledStack>
                        {activeDialogId !== undefined && <AddMessage />}
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