// metro2.example.ts
import { HeaderRecord, BaseSegment, TrailerRecord } from './metro2.types';
import {
    serializeHeader,
    serializeBaseSegment,
    serializeTrailer
} from './metro2.utils';
import { Metro2FileBuilder } from './metro2.builder';

const header: HeaderRecord = {
    recordIdentifier: '1',
    cycleIdentifier: '20251024',
    reporterName: 'ABC LENDING INC',
    reporterAddress: '123 CREDIT ST, FINTECH CITY',
    dateCreated: '20251024'
};

const base: BaseSegment = {
    recordIdentifier: 'J1',
    accountNumber: 'ACC123456789',
    portfolioType: 'R',
    dateOpened: '20230115',
    creditLimit: 10000,
    highCredit: 9500,
    currentBalance: 5000,
    accountStatus: '11',
    consumerName: 'JOHN DOE',
    consumerAddress: '456 MAIN ST, METROVILLE'
};

const trailer: TrailerRecord = {
    recordIdentifier: 'Z',
    totalBaseRecords: 1,
    totalRecords: 3
};

// Combine into final METRO2 text output
const metro2File =
    serializeHeader(header) +
    '\n' +
    serializeBaseSegment(base) +
    '\n' +
    serializeTrailer(trailer);

console.log(metro2File);

export const build = () => {
    const builder = new Metro2FileBuilder();

    builder.setHeader({
        recordIdentifier: '1',
        cycleIdentifier: '20251024',
        reporterName: 'ABC LENDING INC',
        reporterAddress: '123 CREDIT ST, FINTECH CITY',
        dateCreated: '20251024'
    });

    builder.addBase({
        recordIdentifier: 'J1',
        accountNumber: 'ACC123456789',
        portfolioType: 'R',
        dateOpened: '20230115',
        creditLimit: 10000,
        highCredit: 9500,
        currentBalance: 5000,
        accountStatus: '11',
        consumerName: 'JOHN DOE',
        consumerAddress: '456 MAIN ST, METROVILLE'
    });

    builder.addJ2({
        recordIdentifier: 'J2',
        alternateConsumerName: 'JOHN Q DOE',
        alternateAddress: '789 SECOND AVE',
        city: 'METROVILLE',
        state: 'CA',
        postalCode: '90210'
    });

    builder.addK1({
        recordIdentifier: 'K1',
        associatedName: 'JANE DOE',
        relationshipCode: '1'
    });

    builder.addL1({
        recordIdentifier: 'L1',
        complianceCode: 'XB',
        disputeDescription: 'Consumer disputes account balance accuracy'
    });
    // Build Final File
    const metro2File = builder.build();

    console.log('==== METRO 2 FILE OUTPUT ====');
    console.log(metro2File);
};
