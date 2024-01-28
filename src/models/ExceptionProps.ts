import { ReactNode } from "react";

type ExceptionProps = {
    status: Status;
    subTitle: string;
    title?: string;
    extra?: ReactNode
}

export enum Status {
    FORBIDDEN = 403, NOT_FOUND = 404, SERVER_ERROR = 500,
}


export default ExceptionProps;