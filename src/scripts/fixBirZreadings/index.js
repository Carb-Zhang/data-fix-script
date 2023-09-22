import ZReadingModel from '../../models/zReading.js';
import { BackUpModel } from './zReadingBackUp.js';

async function getFirstZReadings() {
    return ZReadingModel.aggregate([
        [
            {
                $match: {
                    zStartTime: { $exists: true },
                },
            },
            {
                $sort: {
                    zCount: 1,
                },
            },
            {
                $group: {
                    _id: {
                        business: '$business',
                        registerId: '$registerId',
                    },
                    firstZCount: {
                        $first: '$zCount',
                    },
                    firstGross: {
                        $first: '$newGross',
                    },
                    firstNet: {
                        $first: '$newNet',
                    },
                },
            },
            {
                $project: {
                    business: '$_id.business',
                    registerId: '$_id.registerId',
                    firstZCount: 1,
                    firstGross: 1,
                    firstNet: 1,
                    _id: 0,
                },
            },
        ],
    ]);
}

async function fixOneZReading(business, registerId, nextZCount, nextOldNet, nextOldGross) {
    const originalZreading = await ZReadingModel.findOne({
        business,
        registerId,
        zCount: nextZCount,
    }).lean();
    if (!originalZreading) {
        return null;
    }
    if (originalZreading.oldNet === nextOldNet && originalZreading.oldGross === nextOldGross) {
        return {
            newNet: originalZreading.newNet,
            newGross: originalZreading.newGross,
        };
    }
    await BackUpModel.insertMany([originalZreading]);
    const nextNewNet = originalZreading.newNet + (nextOldNet - originalZreading.oldNet);
    const nextNewGross = originalZreading.newGross + (nextOldGross - originalZreading.oldGross);
    await ZReadingModel.updateOne(
        {
            business,
            registerId,
            zCount: nextZCount,
        },
        {
            $set: {
                oldNet: nextOldNet,
                oldGross: nextOldGross,
                newNet: nextNewNet,
                newGross: nextNewGross,
            },
        },
    );
    return {
        newNet: nextNewNet,
        newGross: nextNewGross,
    };
}

async function fixForOneRegister(firstZReading) {
    const { business, registerId, firstZCount, firstGross, firstNet } = firstZReading;
    let nextZCount = firstZCount + 1;
    let nextOldNet = firstNet;
    let nextOldGross = firstGross;

    while (true) {
        const result = await fixOneZReading(
            business,
            registerId,
            nextZCount,
            nextOldNet,
            nextOldGross,
        );
        if (!result) {
            break;
        }
        nextZCount++;
        nextOldNet = result.newNet;
        nextOldGross = result.newGross;
    }
}

export async function run() {
    const firstZReadings = await getFirstZReadings();
    for (let i = 0; i < firstZReadings.length; i++) {
        await fixForOneRegister(firstZReadings[i]);
        console.log(
            `done fix for business: ${firstZReadings[i].business}, registerId: ${firstZReadings[i].registerId}`,
        );
    }
}
