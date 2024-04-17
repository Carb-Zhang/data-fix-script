import _ from 'lodash';
import { DateTime } from 'luxon';
import { testRecords } from './testData.js';

function isEqual(v1, v2) {
    return Math.abs(v1 - v2) < 0.1;
}

function timeGapInSeconds(date1, date2) {
    return Math.abs(
        DateTime.fromJSDate(date1).diff(DateTime.fromJSDate(date2), 'seconds').as('seconds'),
    );
}

function getNextRecordGroup(records, startIndex) {
    let i = startIndex;

    const nextRecordGroup = [records[i]];
    let currentRecord = null;
    let nextRecord = null;
    while (records[i + 1]) {
        currentRecord = records[i];
        nextRecord = records[i + 1];
        const timeGap = timeGapInSeconds(currentRecord.changedAt, nextRecord.changedAt);
        i++;
        if (timeGap < 2) {
            nextRecordGroup.push(nextRecord);
        } else {
            break;
        }
    }
    return nextRecordGroup;
}

function sortNextRecordGroup(records, startIndex) {
    const nextRecordGroup = getNextRecordGroup(records, startIndex);
    const isMonotonic = !nextRecordGroup.find(({ diff }) => diff > 0);
    if (isMonotonic) {
        return _.sortBy(nextRecordGroup, ['quantityAfter']);
    } else {
        // todo
    }
}

function sortAuditTrails(originRecords) {
    if (originRecords.length === 0) {
        return;
    }
    let pivot = 0;
    let currentRecord = null;
    let nextRecord = null;
    const sortedRecords = [originRecords[0]];
    while (originRecords[pivot + 1]) {
        currentRecord = originRecords[pivot];
        nextRecord = originRecords[pivot + 1];
        if (isEqual(currentRecord.quantityBefore, nextRecord.quantityAfter)) {
            sortedRecords.push(nextRecord);
            pivot++;
        } else {
            const sortedNextRecordGroup = sortNextRecordGroup(originRecords, pivot + 1);
            sortedRecords.push(...sortedNextRecordGroup);
            pivot += sortedNextRecordGroup.length;
        }
    }
    return sortedRecords;
}

console.log(sortAuditTrails(testRecords));
