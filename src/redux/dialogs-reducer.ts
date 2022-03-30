import { DialogDataType, MessageDataType } from '../components/common/types';

const ADD_MESSAGE: 'unfriendly-network/dialogs/ADD-MESSAGE' = 'unfriendly-network/dialogs/ADD-MESSAGE',
      SET_ACTIVE_DIALOG_ID: 'unfriendly-network/dialogs/SET-ACTIVE-DIALOG-ID' = 'unfriendly-network/dialogs/SET-ACTIVE-DIALOG-ID';

const initialState = {
    dialogsData: [
        {id: 0, name: 'Irene'},
        {id: 1, name: 'Dmitriy'},
        {id: 2, name: 'Mark'},
        {id: 3, name: 'Helena'}
    ] as DialogsDataType,
    messagesData: [
        {id: 0, name: 'Irene', text: `Hello, retard. You aren't welcome here. Get out of here!`},
        {id: 1, name: 'You', text: `But I'm so happy to be here`},
        {id: 2, name: 'Irene', text: 'Mark'},
        {id: 3, name: 'You', text: 'IreneIreneIreneIrene'},
        {id: 4, name: 'Irene', text: 'Dmitriy'},
        {id: 5, name: 'You', text: 'Mark'},
        {id: 6, name: 'Irene', text: 'Helena'}
    ] as MessagesDataType,
    placeholderText: 'Hello',
    newMessageBody: '',
    activeDialogId: undefined as undefined | number,
};

type DialogsDataType = Array<DialogDataType>;
type MessagesDataType = Array<MessageDataType>;

type initialStateType = typeof initialState;

const dialogsReducer = (state: initialStateType = initialState, action: any): initialStateType => {
    const type = action.type;

    switch(type) {
        case ADD_MESSAGE:
            const newMessage = {
                id: 7,
                name: 'You',
                text: action.newMessageBody
            };
            return {
                ...state,
                messagesData: [...state.messagesData, newMessage],
                newMessageBody: ''
            };
        case SET_ACTIVE_DIALOG_ID:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state;
    }
}

export const addMessage = (body: string) => ({ type: ADD_MESSAGE, newMessageBody: body });
export const setActiveDialogId = (activeDialogId: number) => ({ type: SET_ACTIVE_DIALOG_ID, payload: { activeDialogId }});

export default dialogsReducer;