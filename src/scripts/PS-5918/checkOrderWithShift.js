export function checkOrderWithShift(business, registerId, order, shifts) {
    const onComplete = (checkResult) => {
        if (checkResult) {
            checkResult.shiftIds = checkResult.shiftIds.filter(Boolean);
            console.log(
                [
                    order.transactionId,
                    business,
                    registerId,
                    checkResult.message,
                    checkResult.shiftIds.join(','),
                ].join(','),
            );
        }
    };
    // get two available shifts, one contains createdTime, another contains modifiedTime
    // max 2 shifts, may get the same shift
    const availableShifts = shifts.filter(
        (it) => checkShiftByTime(order.createdTime, it) || checkShiftByTime(order.modifiedTime, it),
    );
    if (!availableShifts.length) {
        console.log(`Error:can not get available shifts of order:${order.transactionId},`);
        return onComplete({
            message: 'lost',
            shiftIds: [],
        });
    }
    if (!order.preOrderId) {
        // openOrder is included in one shift
        const checkOpenOrder = checkOpenOrderShift(
            order.transactionId,
            order.modifiedTime,
            availableShifts,
        );
        return onComplete(checkOpenOrder);
    } else {
        const checkPreOrder = checkPreOrderShift(availableShifts);
        return onComplete(checkPreOrder);
    }
}

/**
 * openOrder, lost or incorrect
 */
function checkOpenOrderShift(transactionId, paidTime, shifts) {
    const correctShift = getCorrectShift(paidTime, shifts);
    const correctShiftId = correctShift?.shiftId;

    const correctContains = (correctShift?.registerTransactions || []).find(
        (it) => it.transactionId === transactionId,
    );
    if (correctContains) {
        // ok
        return null;
    } else {
        const incorrectShift = shifts.filter((it) => it.shiftId !== correctShiftId)[0];
        if (!incorrectShift) {
            console.log(`,Error:can not get the first shift of open order:${transactionId},`);
            return {
                message: 'lost',
                shiftIds: [correctShiftId],
            };
        }
        const incorrectContains = incorrectShift.registerTransactions.find(
            (it) => it.transactionId === transactionId,
        );
        if (!incorrectContains) {
            return {
                message: 'lost',
                shiftIds: [correctShiftId],
            };
        } else {
            return {
                message: 'incorrect',
                shiftIds: [correctShiftId, incorrectShift.shiftId],
            };
        }
    }
}

/**
 * preOrder，对应的shift不会丢但是可能错误地包含了全部金额
 * collect preOrder,可能丢了，或者被包含在错误的shift中了
 * 如果两个时间的shift都一样，那就没有错。否则需要重新生成两个shift
 */
function checkPreOrderShift(shifts) {
    if (shifts.length === 1) {
        // ok
        return null;
    } else {
        return {
            message: 'preOrder regenerate',
            shiftIds: shifts.map((it) => it.shiftId),
        };
    }
}

function checkShiftByTime(orderTime, shift) {
    const openDate = new Date(shift.openTime);
    const closeDate = new Date(shift.closeTime);
    const orderDate = new Date(orderTime);
    return orderDate >= openDate && orderDate <= closeDate;
}

function getCorrectShift(orderTime, shifts) {
    return shifts.find((shift) => checkShiftByTime(orderTime, shift));
}
