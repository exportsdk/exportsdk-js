import bodyParser from 'body-parser';
import express from 'express';
import { promises as fs } from 'fs';
import path from 'path';
import { ExportSdkClient } from '../index';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/pdf', async (req, res) => {
  try {
    const {
      action,
      apiKey: apiKeyRaw,
      filename: filenameRaw = '',
      templateId: templateIdRaw,
      templateData: templateDataStr = '',
    } = req.body;
    const apiKey = apiKeyRaw.trim();
    const filename =
      filenameRaw.trim() || `exportsdk_${new Date().getTime()}.pdf`;
    const templateId = templateIdRaw.trim();
    const templateData = JSON.parse(
      templateDataStr.trim().replace(/(\r|\n)/g, '')
    );

    const exportSdkClient = new ExportSdkClient(apiKey);

    if (action === 'Write PDF') {
      const response = await exportSdkClient.renderPdf(
        templateId,
        templateData
      );

      await fs.writeFile(
        path.join(__dirname, `pdfs/${filename}`),
        response.data
      );

      res.redirect('/');
    } else if (action === 'Stream PDF') {
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader(
        'Content-Disposition',
        `attachment; filename=${filename}.pdf`
      );

      const pdfStream = await exportSdkClient
        .renderPdfToStream(templateId, templateData)
        .catch(e => {
          console.error(e);
          throw e;
        });

      pdfStream.data.pipe(res);
    }
  } catch (error) {
    res.status(500).send('Internal server error');
  }
});

function main() {
  const port = process.env.PORT || 8000;

  app.listen(port, () => {
    console.info(`Running example server on port ${port}!`);
  });
}

main();
