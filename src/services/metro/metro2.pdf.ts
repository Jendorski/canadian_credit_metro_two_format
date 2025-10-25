// src/metro2.pdf.ts
import fs from 'node:fs';
import PDFDocument from 'pdfkit';

/**
 * Writes a Metro 2 formatted file to a human-readable PDF document
 */
export async function writeMetro2ToPDF(
    metro2Text: string,
    outputPath: string,
    options?: {
        title?: string;
        reporterName?: string;
        date?: string;
    }
) {
    return new Promise<void>((resolve, reject) => {
        try {
            const doc = new PDFDocument({
                size: 'A4',
                margin: 50
            });

            const writeStream = fs.createWriteStream(outputPath);
            doc.pipe(writeStream);

            // Title
            doc.font('Helvetica-Bold')
                .fontSize(16)
                .text(options?.title ?? 'METRO 2 REPORT', {
                    align: 'center'
                });
            doc.moveDown(0.5);

            // Reporter Info
            if (options?.reporterName || options?.date) {
                doc.font('Helvetica')
                    .fontSize(10)
                    .text(`Reporter: ${options.reporterName ?? 'Unknown'}`, {
                        align: 'left'
                    });
                doc.text(
                    `Generated: ${options.date ?? new Date().toISOString().slice(0, 10)}`,
                    {
                        align: 'left'
                    }
                );
                doc.moveDown(1);
            }

            // Divider
            doc.moveTo(50, doc.y)
                .lineTo(545, doc.y)
                .strokeColor('#cccccc')
                .stroke();
            doc.moveDown(1);

            // Main METRO2 Text Content
            doc.font('Courier').fontSize(9);
            const lines = metro2Text.split('\n');
            lines.forEach((line) => doc.text(line, { lineGap: 2 }));

            // Footer
            doc.moveDown(1);
            doc.font('Helvetica-Oblique')
                .fontSize(8)
                .fillColor('gray')
                .text('Generated via Metro2FileBuilder (TypeScript)', {
                    align: 'center'
                });

            doc.end();

            writeStream.on('finish', () => {
                resolve();
            });
            writeStream.on('error', reject);
        } catch (err: unknown) {
            reject(err);
        }
    });
}
