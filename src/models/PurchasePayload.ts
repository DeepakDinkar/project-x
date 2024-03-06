import { SaveAddressForm } from "./SaveAddressForm";

export class PurchasePayload {
  courses!: PurchaseCourse[];
  address!: SaveAddressForm | undefined;
  saveAddress!: boolean;
}

export class PurchaseCourse {
  courseId!: number;
  courseDate!: string;
  courseAmt!: number;
  transactionId!: string;
  slug!: string;
  location?: string;
  imageUrl?: string;
}
