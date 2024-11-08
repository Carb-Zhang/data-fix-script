import { Document, Model } from 'mongoose';

interface ConsumerFacebookSchema {
    id: string;
    token: string;
}

interface NotificationSettingsSchema {
    newsPush: boolean;
    promotionalPush: boolean;
    newsSms: boolean;
    promotionalSms: boolean;
    newsEmail: boolean;
    promotionalEmail: boolean;
}

interface ConsumerDeleteFeedbackSchema {
    reasons: string[];
    comment: string;
}

export interface ConsumerInterface {
    phone?: string;
    membership?: string[];
    firstName?: string;
    lastName?: string;
    email?: string;
    gender?: string;
    birthday?: Date;
    birthdayModifiedTime?: Date;
    password?: string;
    facebook?: ConsumerFacebookSchema;
    defaultShippingAddressId?: string;
    defaultBillingAddressId?: string;
    defaultPaymentMethodId?: string;
    unverifiedPhone?: string;
    mergedTo?: string;
    hasUsedCleverTapVersion?: boolean;
    latestAppVersion?: string;
    registrationTouchpoint?: string;
    registrationSource?: string;
    notificationSettings?: NotificationSettingsSchema;
    alcoholConsentTime?: Date;
    deleteFeedback?: ConsumerDeleteFeedbackSchema;
    isDeleted?: boolean;
}

export interface ConsumerSchema extends Document, ConsumerInterface {}

declare const Consumer: Model<ConsumerSchema>;

export default Consumer;
