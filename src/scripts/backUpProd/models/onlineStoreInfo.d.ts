import { Model, Document, Schema } from 'mongoose';

declare const OnlineStoreInfo: Model<OnlineStoreInfoSchema>;
export default OnlineStoreInfo;

export interface OnlineStoreInfoSchema extends Document {
    business: string;

    beepBrandName?: string;

    beepProfileImage?: string;

    firstEnableDate: string;

    lastEnableDate: string;

    firstPublishDate: string;

    lastPublishDate: string;

    bankingDetails: BankingDetailsSchema;

    storeName: string;

    operationHours: string;

    phone: string;

    alternatePhone1: string;

    alternatePhone2: string;

    state: string;

    street: string;

    aboutStore: string;

    email: string;

    postcode: string;

    hasLogo: boolean;

    banners: BannersSchema[];

    featuredProducts: string[];

    themeColor: string;

    pages: PagesSchema[];

    customDomain: string;

    connectStatus: string;

    logo: string;

    favicon: string;

    analyticTools: AnalyticToolsSchema[];

    enabledChatType: string;

    socialMediaInfo: SocialMediaInfoSchema;

    offlinePaymentBankAccounts: OfflinePaymentBankAccountsSchema[];

    offlinePaymentInstructions: OfflinePaymentInstructionsSchema;

    customizeCommissionRate: number;

    onlinePaymentOptions: onlinePaymentOptionSchema[];

    customizeCommissionRates: customizeCommissionRatesSchema;

    facebookDomainVerification: string;
}

export interface BankingDetailsSchema {
    bankName: string;

    bankCode: string;

    bankAccountNumber: string;

    beneficiaryAccountName: string;

    beneficiaryAddress: string;

    beneficiaryPhoneNumber: string;

    bankAddress: string;
}

export interface BannersSchema {
    imgId: string;

    redirectType: string;

    redirectTarget: string;
}

export interface PagesSchema {
    name: string;

    slug: string;

    version: number;

    lastPublishTime: Date;
}

export interface AnalyticToolsSchema {
    name: string;

    trackingId: string;
}

export interface SocialMediaInfoSchema {
    twitter: string;

    facebook: FacebookSchema;

    instagram: string;

    youtube: string;

    whatsapp: string;

    line: LineSchema;

    viber: ViberSchema;
}

export interface FacebookSchema {
    pageId: string;

    language: string;

    themeColor: string;

    greetingMessage: string;
}

export interface LineSchema {
    personalLine: string;

    officialLine: string;

    usePersonalLine: boolean;
}

export interface ViberSchema {
    personalViber: string;

    officialViber: string;

    usePersonalViber: boolean;
}

export interface OfflinePaymentBankAccountsSchema {
    bankName: string;

    bankAccountName: string;

    bankAccountNumber: string;

    ordering: number;
}

export interface OfflinePaymentInstructionsSchema {
    additionalNotes: string;

    enabledContactInfo: string[];
}

export interface onlinePaymentOptionSchema {
    name: string;

    additionalInfo: Schema.Types.Mixed;

    isDisabled: Boolean;
}

export interface customizeCommissionRatesSchema {
    ecommerce: number;
    beepInStore: number;
    beepDelivery: number;
    beepPickup: number;
    beepTakeaway: number;
}
