import { Document, Model } from 'mongoose';

export interface PaymentCollection {
  name: string;
  count?: number;
  amount?: number;
}

export interface ZReadingSchema extends Document {
  business: string;
  registerId: string;
  storeId: string;
  zCount: number;
  closeTime: Date;
  grossSales?: number;
  totalDeductedVat?: number;
  netSales?: number;
  paymentCollections?: PaymentCollection[];
  vatAbleSales?: number;
  vatAmount?: number;
  vatExemptSales?: number;
  zeroRatedSales?: number;
  scDiscount?: number;
  pwdDiscount?: number;
  athleteAndCoachDiscount?: number;
  medalOfValorDiscount?: number;
  soloParentDiscount?: number;
  regularDiscount?: number;
  serviceCharge?: number;
  serviceChargeTax?: number;
  startORNumber?: string;
  endORNumber?: string;
  startTrxNumber?: string;
  endTrxNumber?: string;
  salesTrxCount?: number;
  refundTrxCount?: number;
  refundAmount?: number;
  oldNet?: number;
  newNet?: number;
  oldGross?: number;
  newGross?: number;
  zStartTime?: Date;
  zEndTime?: Date;
  serialNo?: string;
  ptu?: string;
  tin?: string;
  headcount?: number;
  minNo?: string;
  transactionsWithScDiscount?: number;
  transactionsWithPwdDiscount?: number;
  transactionsWithRegularDiscount?: number;
  transactionsWithAthleteAndCoachDiscount?: number;
  transactionsWithMedalOfValorDiscount?: number;
}

declare const ZReading: Model<ZReadingSchema>;
export default ZReading;