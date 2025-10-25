/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
// metro2.utils.ts

import { BaseSegment, HeaderRecord, TrailerRecord } from './metro2.types';

export const padRight = (value: string | number, length: number): string => {
    return String(value || '').padEnd(length, ' ');
};

export const padLeft = (value: string | number, length: number): string => {
    return String(value || '').padStart(length, '0');
};

/**
 * Serialize a record object to a single line of fixed-width text
 * (example for simplified fields)
 */
export function serializeHeader(record: HeaderRecord): string {
    return [
        padRight(record.recordIdentifier, 2),
        padRight(record.cycleIdentifier, 8),
        padRight(record.reporterName, 30),
        padRight(record.reporterAddress, 40),
        padRight(record.dateCreated, 8),
        padRight(record.programVersion ?? '', 10)
    ].join('');
}

export function serializeBaseSegment(record: BaseSegment): string {
    return [
        padRight(record.recordIdentifier, 2),
        padRight(record.accountNumber, 25),
        padRight(record.portfolioType, 1),
        padRight(record.dateOpened, 8),
        padLeft(record.creditLimit ?? '', 9),
        padLeft(record.highCredit ?? '', 9),
        padLeft(record.currentBalance || '', 9),
        padRight(record.accountStatus, 2),
        padRight(record.consumerName, 30),
        padRight(record.consumerAddress, 40)
    ].join('');
}

export function serializeTrailer(record: TrailerRecord): string {
    return [
        padRight(record.recordIdentifier, 2),
        padLeft(record.totalBaseRecords, 6),
        padLeft(record.totalRecords, 6)
    ].join('');
}

// ---------------- SERIALIZERS ----------------

export function serializeJ2(record: any): string {
    return [
        padRight(record.recordIdentifier, 2),
        padRight(record.alternateConsumerName ?? '', 30),
        padRight(record.alternateAddress ?? '', 40),
        padRight(record.city ?? '', 20),
        padRight(record.state ?? '', 2),
        padRight(record.postalCode ?? '', 10)
    ].join('');
}

export function serializeK1(record: any): string {
    return [
        padRight(record.recordIdentifier, 2),
        padRight(record.associatedName, 30),
        padRight(record.associatedSSN ?? '', 9),
        padRight(record.associatedAddress ?? '', 40),
        padRight(record.relationshipCode, 1)
    ].join('');
}

export function serializeL1(record: any): string {
    return [
        padRight(record.recordIdentifier, 2),
        padRight(record.complianceCode, 2),
        padRight(record.disputeDescription ?? '', 50)
    ].join('');
}
