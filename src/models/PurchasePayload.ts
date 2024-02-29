export class PurchasePayload {
    courseId!: number;
    courseDate!: string;
    courseAmt!: number;
    transactionId!: string;
    slug!: string;
    location?: string;
}