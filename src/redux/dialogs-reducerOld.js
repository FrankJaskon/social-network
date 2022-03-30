const ADD_MESSAGE = 'unfriendly-network/dialogs/ADD-MESSAGE';

const initialState = {
    dialogsData: [
        {id: 0, name: 'Irene'},
        {id: 1, name: 'Dmitriy'},
        {id: 2, name: 'Mark'},
        {id: 3, name: 'Helena'}
    ],
    messagesData: [
        {id: 0, name: 'Irene', message: `Hello, retard of here!Hello, retard. You aren't welcome here. Get out of here!`},
        {id: 1, name: 'You', message: `But I'm so happy to be here`},
        {id: 2, name: 'Irene', message: 'Mark'},
        {id: 3, name: 'You', message: 'IreneIreneIreneIrene'},
        {id: 4, name: 'Irene', message: 'Dmitriy'},
        {id: 5, name: 'You', message: 'Mark'},
        {id: 6, name: 'Irene', message: 'Helena'}
    ],
    placeholderText: 'Hello',
    newMessageBody: ''
};

const dialogsReducer = (state = initialState, action) => {
    const type = action.type;

    switch(type) {
        case ADD_MESSAGE:
            const newMessage = {
                id: 7,
                name: 'You',
                message: action.newMessageBody
            };
            return {
                ...state,
                messagesData: [...state.messagesData, newMessage],
                newMessageBody: ''
            };
        default:
            return state;
    }
}

export const addMessage = (body) => ({type: ADD_MESSAGE, newMessageBody: body});

export default dialogsReducer;