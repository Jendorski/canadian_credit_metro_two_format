# Canadian Credit Metro 2 Format Generator

A TypeScript/Node.js application for generating Metro 2 credit reporting format files and PDF reports, designed for testing and evaluation of credit reporting data compliance.

## Overview

This project implements a comprehensive Metro 2 format generator that creates standardized credit reporting files used by credit bureaus. Metro 2 is the industry-standard format for transmitting consumer credit information between data furnishers and credit reporting agencies.

## Features

### Core Functionality
- **Metro 2 File Generation**: Create compliant Metro 2 format files with proper fixed-width formatting
- **PDF Report Generation**: Convert Metro 2 data into readable PDF reports using PDFKit
- **Type-Safe Implementation**: Full TypeScript support with comprehensive type definitions
- **Validation**: Zod-based validation for all Metro 2 segments and fields
- **Builder Pattern**: Fluent API for constructing Metro 2 files programmatically

### Supported Metro 2 Segments
- **Header Record (1)**: File metadata, reporter information, and cycle identifiers
- **Base Segment (J1)**: Primary account information including balances, payment history, and consumer data
- **J2 Segment**: Supplemental consumer data (alternate names, addresses)
- **K1 Segment**: Associated consumer information (co-borrowers, authorized users)
- **L1 Segment**: Compliance and dispute information
- **Trailer Record (Z)**: File summary with record counts

### Security & Express Server
- Production-ready Express.js server with comprehensive security middleware
- Helmet.js for security headers (CSP, HSTS, XSS protection)
- CORS configuration for cross-origin requests
- Request sanitization and rate limiting
- Compression and file upload support

## Project Structure

```
src/
├── index.ts                    # Main Express server
├── services/metro/
│   ├── metro2.types.ts        # TypeScript interfaces for Metro 2 records
│   ├── metro2.builder.ts      # Builder class for constructing Metro 2 files
│   ├── metro2.utils.ts        # Serialization utilities and formatters
│   ├── metro2.example.ts      # Example Metro 2 file construction
│   ├── example-pdf.ts         # PDF generation example
│   └── metro2.pdf.ts          # PDF creation utilities
```

## Usage Examples

### Basic Metro 2 File Creation

```typescript
import { Metro2FileBuilder } from './services/metro/metro2.builder';

const builder = new Metro2FileBuilder();

// Set header information
builder.setHeader({
    recordIdentifier: '1',
    cycleIdentifier: '20251024',
    reporterName: 'ABC LENDING INC',
    reporterAddress: '123 CREDIT ST, FINTECH CITY',
    dateCreated: '20251024'
});

// Add account information
builder.addBase({
    recordIdentifier: 'J1',
    accountNumber: 'ACC123456789',
    portfolioType: 'R', // Revolving credit
    dateOpened: '20230115',
    creditLimit: 10000,
    currentBalance: 5000,
    accountStatus: '11', // Current
    consumerName: 'JOHN DOE',
    consumerAddress: '456 MAIN ST, METROVILLE'
});

// Generate the Metro 2 file
const metro2File = builder.build();
```

### PDF Report Generation

```typescript
import { generateMetro2PDF } from './services/metro/example-pdf';

// Generates a PDF report from Metro 2 data
await generateMetro2PDF();
```

## Installation & Setup

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Start the server
npm start
```

## Environment Variables

Create a `.env` file with the following:

```
PORT=3000
ENV=development
```

## Technical Specifications

- **Node.js**: >=20.0.0
- **TypeScript**: Full type safety with strict configuration
- **Validation**: Zod schemas for runtime type checking
- **PDF Generation**: PDFKit for report creation
- **Security**: Comprehensive middleware stack for production deployment

## Metro 2 Format Compliance

This implementation follows the Metro 2 format specification for:
- Fixed-width field formatting
- Record type identification
- Proper field padding and alignment
- Validation of required fields and data types
- Standard portfolio types (R=Revolving, I=Installment, O=Open, C=Collection)
- Account status codes and payment ratings

## Development

The project includes comprehensive TypeScript types, validation, and examples for working with Metro 2 credit reporting data. It's designed for testing and evaluation purposes in credit reporting workflows.

## License

Creative Commons
