import {
    WEBSTORE_ORDER,
    DELIVERY_ORDER,
    DINEIN_ORDER,
    PICKUP_ORDER,
    TAKEAWAY_ORDER,
} from './templateData/order.js';
import OnlineTransaction from '../../models/onlineTransaction.js';
import * as uuid from 'uuid';
import { Types } from 'mongoose';
const ObjectId = Types.ObjectId;

const WebStoreStatus = {
    CREATED: 'created',
    PENDING_PAYMENT: 'pendingPayment',
    PENDING_VERIFICATION: 'pendingVerification',
    FAILED: 'failed',
    PAYMENT_CANCELLED: 'paymentCancelled',
    CANCELLED: 'cancelled',
    PAID: 'paid',
    // ACCEPTED: 'accepted',
    READY_FOR_DELIVERY: 'readyForDelivery',
    READY_FOR_PICKUP: 'readyForPickup',
    SHIPPED: 'shipped',
    PICKED_UP: 'pickedUp',
    CONFIRMED: 'confirmed',
    // LOGISTICS_CONFIRMED: 'logisticsConfirmed',
    // DELIVERED: 'delivered',
};

const DineInStatus = {
    CREATED: 'created',
    PENDING_PAYMENT: 'pendingPayment',
    // PENDING_VERIFICATION: 'pendingVerification',
    FAILED: 'failed',
    PAYMENT_CANCELLED: 'paymentCancelled',
    CANCELLED: 'cancelled',
    PAID: 'paid',
    // ACCEPTED: 'accepted',
    // READY_FOR_DELIVERY: 'readyForDelivery',
    // READY_FOR_PICKUP: 'readyForPickup',
    // SHIPPED: 'shipped',
    // PICKED_UP: 'pickedUp',
    CONFIRMED: 'confirmed',
    // LOGISTICS_CONFIRMED: 'logisticsConfirmed',
    // DELIVERED: 'delivered',
};

const TakeawayStatus = {
    CREATED: 'created',
    PENDING_PAYMENT: 'pendingPayment',
    // PENDING_VERIFICATION: 'pendingVerification',
    FAILED: 'failed',
    PAYMENT_CANCELLED: 'paymentCancelled',
    CANCELLED: 'cancelled',
    PAID: 'paid',
    ACCEPTED: 'accepted',
    // READY_FOR_DELIVERY: 'readyForDelivery',
    // READY_FOR_PICKUP: 'readyForPickup',
    // SHIPPED: 'shipped',
    // PICKED_UP: 'pickedUp',
    CONFIRMED: 'confirmed',
    // LOGISTICS_CONFIRMED: 'logisticsConfirmed',
    // DELIVERED: 'delivered',
};

const DeliveryStatus = {
    CREATED: 'created',
    PENDING_PAYMENT: 'pendingPayment',
    // PENDING_VERIFICATION: 'pendingVerification',
    FAILED: 'failed',
    PAYMENT_CANCELLED: 'paymentCancelled',
    CANCELLED: 'cancelled',
    PAID: 'paid',
    ACCEPTED: 'accepted',
    // READY_FOR_DELIVERY: 'readyForDelivery',
    // READY_FOR_PICKUP: 'readyForPickup',
    // SHIPPED: 'shipped',
    PICKED_UP: 'pickedUp',
    CONFIRMED: 'confirmed',
    LOGISTICS_CONFIRMED: 'logisticsConfirmed',
    DELIVERED: 'delivered',
};

const PickupStatus = {
    CREATED: 'created',
    PENDING_PAYMENT: 'pendingPayment',
    // PENDING_VERIFICATION: 'pendingVerification',
    FAILED: 'failed',
    PAYMENT_CANCELLED: 'paymentCancelled',
    CANCELLED: 'cancelled',
    PAID: 'paid',
    ACCEPTED: 'accepted',
    // READY_FOR_DELIVERY: 'readyForDelivery',
    // READY_FOR_PICKUP: 'readyForPickup',
    // SHIPPED: 'shipped',
    PICKED_UP: 'pickedUp',
    CONFIRMED: 'confirmed',
    // LOGISTICS_CONFIRMED: 'logisticsConfirmed',
    // DELIVERED: 'delivered',
};

export async function mock() {
    const orders = [
        ...Object.values(WebStoreStatus).map((status) => ({
            ...WEBSTORE_ORDER,
            status,
            receiptNumber: uuid.v4(),
            transactionId: uuid.v4(),
            consumerId: 'MOCK_DATA',
            storeId: new ObjectId('674834be50d04500071dd443'),
        })),
        ...Object.values(DineInStatus).map((status) => ({
            ...DINEIN_ORDER,
            status,
            channel: 3,
            shippingType: 'dineIn',
            receiptNumber: uuid.v4(),
            transactionId: uuid.v4(),
            consumerId: 'MOCK_DATA',
            storeId: new ObjectId('674834be50d04500071dd443'),
        })),
        ...Object.values(PickupStatus).map((status) => ({
            ...PICKUP_ORDER,
            status,
            channel: 3,
            shippingType: 'pickup',
            receiptNumber: uuid.v4(),
            transactionId: uuid.v4(),
            consumerId: 'MOCK_DATA',
            storeId: new ObjectId('674834be50d04500071dd443'),
        })),
        ...Object.values(TakeawayStatus).map((status) => ({
            ...TAKEAWAY_ORDER,
            status,
            channel: 3,
            shippingType: 'takeaway',
            receiptNumber: uuid.v4(),
            transactionId: uuid.v4(),
            consumerId: 'MOCK_DATA',
            storeId: new ObjectId('674834be50d04500071dd443'),
        })),
        ...Object.values(DeliveryStatus).map((status) => ({
            ...DELIVERY_ORDER,
            status,
            channel: 3,
            shippingType: 'delivery',
            receiptNumber: uuid.v4(),
            transactionId: uuid.v4(),
            consumerId: 'MOCK_DATA',
            storeId: new ObjectId('674834be50d04500071dd443'),
        })),
    ];
    await OnlineTransaction.deleteMany({ consumerId: 'MOCK_DATA' });
    await OnlineTransaction.insertMany(orders);
}
