import { Document, Model } from 'mongoose';

export interface DeviceInterface {
  token: string;
  // // iOS/Android
  platform: string;
  // // FCM/iOS
  pushPlatform: string;
  appModel: string;
  appVersion: string;
}

export interface DeviceSchema extends Document, DeviceInterface {}

declare const Device: Model<DeviceSchema>;

export default Device;
