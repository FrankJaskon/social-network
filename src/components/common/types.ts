export interface DialogDataType {
    id: number
    name: string
}

export interface MessageDataType extends DialogDataType {
    text: string
}