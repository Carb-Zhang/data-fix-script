const ErrorType = {
    orderMissInShift: 'orderMissInShift',
    orderInWrongShift: 'orderInWrongShift',
    wrongPreOrder: 'wrongPreOrder',
    shiftMiss: 'shiftMiss',
    shiftNotClose: 'shiftNotClose',
};
/**
 * main function
 * @param {*} business
 * @param {*} registerId
 * @param {*} order
 * @param {*} shifts
 * @returns
 */
export function checkOrderWithShift(business, registerId, order, shifts) {
    // 不需要考虑cancelled的订单，因为如果是错误的cancelled订单，那么他只能在一个shift中取消，并不会影响shift的统计
    const onComplete = (checkResult) => {
        if (checkResult) {
            console.log(
                [
                    business,
                    registerId,
                    order.transactionId,
                    order.receiptNumber,
                    order.preOrderId,
                    checkResult.message,
                    checkResult.shiftIds[0] || '',
                    checkResult.shiftIds[1] || '',
                ].join(','),
            );
        }
    };
    // get two available shifts, one contains createdTime, another contains modifiedTime
    // max 2 shifts, may get the same shift
    const availableShifts = shifts.filter(
        (it) => checkShiftByTime(order.createdTime, it) || checkShiftByTime(order.modifiedTime, it),
    );
    // 未关闭shift的订单，也需要修正它的createdTime。但是cancelled的订单就不需要考虑了
    if (!availableShifts.length) {
        const lastShift = shifts[0];
        if (!lastShift || order.createdTime > lastShift.closeTime) {
            return onComplete({
                message: ErrorType.shiftNotClose,
                shiftIds: [],
            });
        } else {
            return onComplete({
                message: ErrorType.shiftMiss,
                shiftIds: [],
            });
        }
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
            return {
                message: ErrorType.orderMissInShift,
                shiftIds: [correctShiftId],
            };
        }
        const incorrectContains = incorrectShift.registerTransactions.find(
            (it) => it.transactionId === transactionId,
        );
        if (incorrectContains) {
            return {
                message: ErrorType.orderInWrongShift,
                shiftIds: [correctShiftId, incorrectShift.shiftId],
            };
        } else {
            return {
                message: ErrorType.orderMissInShift,
                shiftIds: [correctShiftId],
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
            message: ErrorType.wrongPreOrder,
            shiftIds: shifts.map((it) => it.shiftId),
        };
    }
}

function checkShiftByTime(orderTime, shift) {
    const openDate = shift.openTime;
    const closeDate = shift.closeTime;
    const orderDate = orderTime;
    return orderDate >= openDate && orderDate <= closeDate;
}

function getCorrectShift(orderTime, shifts) {
    return shifts.find((shift) => checkShiftByTime(orderTime, shift));
}
