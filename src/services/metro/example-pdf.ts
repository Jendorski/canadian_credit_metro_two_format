// src/example-pdf.ts

import { Metro2FileBuilder } from './metro2.builder';
import { writeMetro2ToPDF } from './metro2.pdf';

export async function generateMetro2PDF() {
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

    builder.addL1({
        recordIdentifier: 'L1',
        complianceCode: 'XB',
        disputeDescription: 'Consumer disputes account balance accuracy'
    });

    // Build Metro2 Text
    const metro2File = builder.build();

    // Write to PDF
    await writeMetro2ToPDF(metro2File, 'metro2-report.pdf', {
        title: 'ABC — Metro 2 Compliance Report',
        reporterName: 'ABC',
        date: '2025-10-24'
    });

    console.log('✅ Metro2 PDF generated: metro2-report.pdf');
}

generateMetro2PDF().catch(console.error);
