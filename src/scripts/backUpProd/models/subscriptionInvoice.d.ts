import { Model, Document } from 'mongoose';

declare const SubscriptionInvoice: Model<SubscriptionInvoiceSchema>;
export default SubscriptionInvoice;

export interface LineItem { 
    unitAmount: number,
    quantity: number,
    amount: number,
    taxAmount: number,
    description: string,
    entityType: string,
    entityId: string,
    discountAmount: number,
    itemLevelDiscountAmount: number 
}

export interface SubscriptionInvoiceSchema extends Document {
    business: string;
    subscriptionId: string;
    invoiceId: string;
    status: string;
    total: number,
    amountPaid: number,
    creditsApplied: number,
    amountDue: number,
    currencyCode: string,
    generatedAt: number,
    tax: number,
    subTotal: number,
    lineItems: [LineItem],
    deleted: boolean
}
