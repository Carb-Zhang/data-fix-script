declare const ShippingZone: Model<ShippingZoneSchema>;
export default ShippingZone;

import { Document, Model } from 'mongoose';

export enum ShippingType {
  DOMESTIC = 'domestic',
  INTERNATIONAL = 'international',
  RANGE = 'range',
}

export interface FreeCondition {
  entity: string;
  propertyName: string;
  operator: string;
  operand: string[];
}

export interface Measure {
  _id: string;
  id: string;
  maxValue?: number,
  minValue: number,
  type: string,
  unit: string,
}

export interface BaseRateCalculation {
  _id: string;
  id: string;
  originalRate?: number;
  rate: number;
  measure: Measure;
}

export interface AdditionalRateCalculation {
  _id: string;
  id: string;
  additionalRate: number
  additionalMeasureValue: number
  measure: Measure
}


export interface RateCalculation {
  _id: string;
  id: string;
  firstBase: BaseRateCalculation
  secondBase?: BaseRateCalculation
  additions?: AdditionalRateCalculation[]
}

export interface DeliveryMethod {
  _id: string;
  id: string;
  name: string;
  type: string;
  rate: number;
  rateCalculation: RateCalculation,
  minShippingTime: number;
  maxShippingTime: number;
  shippingTimeUnit: string;
  enableConditionalFreeShipping?: boolean;
  freeConditions?: FreeCondition[];
}

export interface ShippingZoneSchema extends Document {
  _id: string;
  business: string;
  name: string;
  shippingType: ShippingType;
  isRedeemed?: boolean;
  coveredCountries?: string[];
  country?: string;
  states?: string[];
  postcodes?: string[];
  deliveryMethods: DeliveryMethod[];
  distance: number;
  logisticsRideType: string;
}
