import ZReadingModel from '../../models/zReading.js';

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

async function checkOneZReading(business, registerId, nextZCount, nextOldNet, nextOldGross) {
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
    } else {
        console.log(`Found incorrect zreading, ${business} ${registerId} ${nextZCount}`);
        return null;
    }
}

async function checkForOneRegister(firstZReading) {
    const { business, registerId, firstZCount, firstGross, firstNet } = firstZReading;
    let nextZCount = firstZCount + 1;
    let nextOldNet = firstNet;
    let nextOldGross = firstGross;

    while (true) {
        const result = await checkOneZReading(
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
        await checkForOneRegister(firstZReadings[i]);
    }
}
