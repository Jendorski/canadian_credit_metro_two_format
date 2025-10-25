/* eslint-disable @stylistic/quotes */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// src/metro2.builder.ts

import {
    HeaderRecord,
    BaseSegment,
    TrailerRecord,
    J2Segment,
    K1Segment,
    L1Segment
} from './metro2.types';
import {
    serializeHeader,
    serializeBaseSegment,
    serializeTrailer,
    serializeJ2,
    serializeK1,
    serializeL1
} from './metro2.utils';
import { z } from 'zod';

export class Metro2FileBuilder {
    private header: HeaderRecord | null = null;
    private baseSegments: BaseSegment[] = [];
    private j2Segments: J2Segment[] = [];
    private k1Segments: K1Segment[] = [];
    private l1Segments: L1Segment[] = [];

    /** Set Header */
    setHeader(header: HeaderRecord): this {
        this.validateHeader(header);
        this.header = header;
        return this;
    }

    /** Add Base Segment */
    addBase(segment: BaseSegment): this {
        this.validateBase(segment);
        this.baseSegments.push(segment);
        return this;
    }

    /** Add J2 Segment */
    addJ2(segment: J2Segment): this {
        this.validateJ2(segment);
        this.j2Segments.push(segment);
        return this;
    }

    /** Add K1 Segment */
    addK1(segment: K1Segment): this {
        this.validateK1(segment);
        this.k1Segments.push(segment);
        return this;
    }

    /** Add L1 Segment */
    addL1(segment: L1Segment): this {
        this.validateL1(segment);
        this.l1Segments.push(segment);
        return this;
    }

    /** Auto-generate Trailer */
    private buildTrailer(): TrailerRecord {
        const totalBase = this.baseSegments.length;
        const totalRecords =
            1 + // header
            totalBase +
            this.j2Segments.length +
            this.k1Segments.length +
            this.l1Segments.length +
            1; // trailer

        return {
            recordIdentifier: 'Z',
            totalBaseRecords: totalBase,
            totalRecords: totalRecords
        };
    }

    /** Validate with Zod schemas */
    private validateHeader(header: HeaderRecord) {
        const schema = z.object({
            recordIdentifier: z.literal('1'),
            cycleIdentifier: z.string().length(8),
            reporterName: z.string().min(1).max(30),
            reporterAddress: z.string().min(1).max(40),
            dateCreated: z.string().length(8)
        });
        schema.parse(header);
    }

    private validateBase(segment: BaseSegment) {
        const schema = z.object({
            recordIdentifier: z.literal('J1'),
            accountNumber: z.string().min(1).max(25),
            portfolioType: z.enum(['R', 'I', 'O', 'C']),
            dateOpened: z.string().length(8),
            currentBalance: z.number().nonnegative(),
            consumerName: z.string().min(1),
            consumerAddress: z.string().min(1)
        });
        schema.parse(segment);
    }

    private validateJ2(segment: J2Segment) {
        z.object({ recordIdentifier: z.literal('J2') }).parse(segment);
    }

    private validateK1(segment: K1Segment) {
        z.object({
            recordIdentifier: z.literal('K1'),
            associatedName: z.string().min(1),
            relationshipCode: z.enum(['1', '2', '3'])
        }).parse(segment);
    }

    private validateL1(segment: L1Segment) {
        z.object({
            recordIdentifier: z.literal('L1'),
            complianceCode: z.string().length(2)
        }).parse(segment);
    }

    /** Add a base segment (J1) */
    addBaseSegment(segment: BaseSegment): this {
        if (segment.recordIdentifier !== 'J1') {
            throw new Error(
                "Invalid base segment recordIdentifier — must be 'J1'."
            );
        }
        this.baseSegments.push(segment);
        return this;
    }

    /** Build Final File */
    build(): string {
        if (!this.header) throw new Error('Missing Header Record.');
        if (this.baseSegments.length === 0)
            throw new Error('At least one Base Segment (J1) required.');

        const trailer = this.buildTrailer();

        const parts = [
            serializeHeader(this.header),
            ...this.baseSegments.map(serializeBaseSegment),
            ...this.j2Segments.map(serializeJ2),
            ...this.k1Segments.map(serializeK1),
            ...this.l1Segments.map(serializeL1),
            serializeTrailer(trailer)
        ];

        return parts.join('\n');
    }
}
