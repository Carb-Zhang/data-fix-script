import ZReadingModel from '../../models/zReading.js';
import _ from 'lodash';

async function fixFieldsForOne(zReading, oldVoidAmount, oldVoidNumber) {
    const { _id, extendedInfoForMall } = zReading;
    const voidAmount = _.get(zReading, 'extendedInfoForMall.voidAmount', 0);
    const voidTrxCount = _.get(zReading, 'extendedInfoForMall.voidTrxCount', 0);
    const newExtendedInfoForMall = {
        ...extendedInfoForMall,
        oldVoidAmount,
        oldVoidNumber,
        newVoidAmount: oldVoidAmount + voidAmount,
        newVoidNumber: oldVoidNumber + voidTrxCount,
    };
    await ZReadingModel.updateOne(
        { _id },
        { $set: { extendedInfoForMall: newExtendedInfoForMall } },
    );
    return newExtendedInfoForMall;
}

async function fixFieldsForRegisterId(firstZReading) {
    let { business, storeId, registerId } = firstZReading;

    let oldVoidAmount = 0;
    let oldVoidNumber = 0;
    await ZReadingModel.find({ business, storeId, registerId })
        .sort({ zCount: 1 })
        .lean()
        .cursor({})
        .addCursorFlag('noCursorTimeout', true)
        .eachAsync(
            async (zReading) => {
                const addedFields = await fixFieldsForOne(zReading, oldVoidAmount, oldVoidNumber);
                oldVoidAmount = addedFields.newVoidAmount;
                oldVoidNumber = addedFields.newVoidNumber;
            },

            { continueOnError: false },
        );
}

export async function fixSMFields() {
    await ZReadingModel.find({
        zCount: 1,
        'extendedInfoForMall.discountedTrxCount': { $exists: true },
        'extendedInfoForMall.oldVoidAmount': { $exists: false },
    })
        .sort({ _id: 1 })
        .lean()
        .cursor()
        .addCursorFlag('noCursorTimeout', true)
        .eachAsync(fixFieldsForRegisterId);
}
