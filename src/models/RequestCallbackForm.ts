export interface RequestCallbackForm {
    firstName: string;
    lastName: string;
    phoneNumber: number;
    email: string;
    callbackMode: CallBackMode
    groupDiscount: string;
    comment?: string;
}

export enum CallBackMode {
    PHONE = 'PHONE',
    EMAIL = 'EMAIL',
}