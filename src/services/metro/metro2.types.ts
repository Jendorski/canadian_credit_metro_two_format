// metro2.types.ts

/** Base interface for all record types */
export interface Metro2Record {
    recordIdentifier: string;
}

/** 1. Header Record */
export interface HeaderRecord extends Metro2Record {
    recordIdentifier: '1';
    cycleIdentifier: string; // e.g., '20251024'
    reporterName: string; // Furnisher/Institution name
    reporterAddress: string;
    reporterPhone?: string;
    dateCreated: string; // YYYYMMDD
    programVersion?: string; // Optional, e.g. 'METRO2.5'
}

/** 2. Base Segment (J1) */
export interface BaseSegment extends Metro2Record {
    recordIdentifier: 'J1';
    accountNumber: string;
    portfolioType: 'R' | 'I' | 'O' | 'C'; // Revolving, Installment, Open, etc.
    dateOpened: string; // YYYYMMDD
    creditLimit?: number;
    highCredit?: number;
    currentBalance: number;
    paymentRating?: string;
    accountStatus: string; // e.g., '11' = Current, '97' = Charge-off
    paymentHistoryProfile?: string; // 24 months payment code string
    consumerName: string;
    consumerSSN?: string;
    consumerAddress: string;
    dateOfLastPayment?: string; // YYYYMMDD
    dateOfFirstDelinquency?: string; // YYYYMMDD
    ecoaCode?: string; // e.g., '1' = Individual, '2' = Joint
    complianceCode?: string; // e.g., 'XB' = Disputed
}

/** 3. Trailer Record */
export interface TrailerRecord extends Metro2Record {
    recordIdentifier: 'Z';
    totalBaseRecords: number;
    totalRecords: number;
}

/** J2 SEGMENT — Supplemental Data */
export interface J2Segment extends Metro2Record {
    recordIdentifier: 'J2';
    alternateConsumerName?: string;
    alternateAddress?: string;
    city?: string;
    state?: string;
    postalCode?: string;
}

/** K1 SEGMENT — Associated Consumer */
export interface K1Segment extends Metro2Record {
    recordIdentifier: 'K1';
    associatedName: string;
    associatedSSN?: string;
    associatedAddress?: string;
    relationshipCode: '1' | '2' | '3'; // 1=Co-borrower, 2=Authorized user, 3=Joint
}

/** L1 SEGMENT — Dispute / Compliance */
export interface L1Segment extends Metro2Record {
    recordIdentifier: 'L1';
    complianceCode: string; // e.g., 'XB'
    disputeDescription?: string;
}
