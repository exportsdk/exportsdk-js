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
  console.log(req.body);
  const {
    action,
    apiKey,
    templateId,
    templateData: templateDataStr,
  } = req.body;
  const templateData = JSON.parse(templateDataStr);

  const exportSdkClient = new ExportSdkClient(apiKey);

  if (action === 'Write PDF') {
    const response = await exportSdkClient.generatePdf(
      templateId,
      templateData
    );

    await fs.writeFile(
      path.join(__dirname, `pdfs/exportsdk_${new Date().getTime()}.pdf`),
      response.data
    );

    res.redirect('/');
  } else if (action === 'Stream PDF') {
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=exportsdk.pdf`);

    const pdfStream = await exportSdkClient
      .generatePdfStream(templateId, templateData)
      .catch(e => {
        console.error(e);
        throw e;
      });

    pdfStream.data.pipe(res);
  }
});

function main() {
  const port = process.env.PORT || 8000;

  app.listen(port, () => {
    console.info(`Running example server on port ${port}!`);
  });
}

main();
