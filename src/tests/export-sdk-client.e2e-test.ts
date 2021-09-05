import { config } from 'dotenv';
import path from 'path';
import { Readable } from 'stream';
import { ExportSdkClient } from '../export-sdk-client';

config({ path: path.join(__dirname, '.env') });

const { API_KEY, TEMPLATE_ID } = process.env;

if (!API_KEY || !TEMPLATE_ID) {
  throw new Error(`
  Environment variable(s) missing. Copy ${path.join(
    __dirname,
    '.env.example'
  )} to ${path.join(__dirname, '.env')} and
  provide a value for each environment variable.
  `);
}

describe(ExportSdkClient.name, () => {
  let client: ExportSdkClient;

  beforeEach(() => {
    client = new ExportSdkClient(API_KEY);
  });

  describe(ExportSdkClient.prototype.renderPdf.name, () => {
    test('should return a Buffer/ArrayBuffer', async () => {
      const response = await client.renderPdf(TEMPLATE_ID, {
        firstName: 'Mike',
        lastName: 'Baz',
      });

      const buffer = response.data;

      expect(buffer).toBeInstanceOf(Uint8Array);
    });
  });

  describe(ExportSdkClient.prototype.renderPdfToStream.name, () => {
    test('should return a ReadableStream', async () => {
      const response = await client.renderPdfToStream(TEMPLATE_ID, {
        firstName: 'Mike',
        lastName: 'Baz',
      });

      const stream = response.data;

      expect(stream).toBeInstanceOf(Readable);
    });
  });
});
