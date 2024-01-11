export enum StepEnum {
  Details = "Details",
  Payment = "Payment",
  Result = "Result",
}

export enum PaymentTypesEnum {
  Ad = "Ad",
  Payment = "Payment",
}

export interface DetailsFormValues {
  paymentType: PaymentTypesEnum;
  images?: FileList;
  description: string;
  email: string;
}
