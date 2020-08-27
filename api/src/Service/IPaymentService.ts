import { Account } from '../Entity/Account';

export interface PaymentData {
  value: number,
  barCode: string,
  paymentDetail: string,
  type: string,
  operator?: string,
}

export enum PaymentStatus {
  SentToOperator,
  Processing,
  Done,
};

export interface PaymentDataResult extends PaymentData {
  status: PaymentStatus,
  errorMessage?: string,
}

export interface IPaymentService {
  doPayment(account: Account, data: PaymentData): Promise<PaymentDataResult>;
}
