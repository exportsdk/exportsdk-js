# exportsdk-js

A JavaScript/TypeScript API client for [ExportSDK](https://exportsdk.com).

# Table of contents

- [Obtain an API key](#obtain-an-api-key)
- [Install package](#install-package)
- [Basic usage](#basic-usage)
- [Example application](#example-application)
- [ExportSdkClient API reference](#exportsdkclient-api-reference)
  - [Properties](#client-properties)
    - [get apiKey](#get-apikey)
  - [Methods](#client-methods)
    - [renderPdf](#renderPdf)
    - [renderPdfToStream](#renderPdfToStream)
    - [setApiKey](#setApiKey)
  - [Types](#client-types)
    - [PdfEncoding](#pdfencoding)
    - [RenderPdfOptions](#renderpdfoptions)
    - [Response\<DataType\>](#Response)
    <br/><br/>

# Obtain an API key

Visit the [ExportSDK dashboard](https://app.exportsdk.com/settings/keys), select the appropriate organization and grab an existing API key or generate a new one.

<br />

# Install package

```sh
npm install @exportsdk/client
```

<br />

# Basic Usage

Import the client class and instantiate it with an API key. Both the ES module syntax and CommonJS module syntax are supported.

```typescript
// ES Module
import { ExportSdkClient } from '@exportsdk/client';

// CommonJS module
const { ExportSdkClient } = require('@exportsdk/client');

const client = new ExportSdkClient(process.env.EXPORTSDK_API_KEY);
```

Begin rendering PDFs by providing a template ID (obtained from the [ExportSDK dashboard](https://app.exportsdk.com/templates)) and the data required for that template. PDFs can be generated as NodeJS readable streams (convenient for sending as HTTP responses) or binary data.

```typescript
const templateId = 'eea2644c-9110-453f-a558-b0541664fb52';
const templateData = {
  firstName: 'Jon',
  middleName: 'Bon',
  lastName: 'Jovi',
};

const binary = await client.renderPdf(templateId, templateData);
const stream = await client.renderPdfToStream(templateId, templateData);
```

<br />

# Example Application

TODO

<br />

# ExportSdkClient API reference

<a id="client-properties"></a>
## Properties

<a id="get-apikey"></a>
### `get apiKey: string`
Returns the API key that was used to initialize the client object, or that was last use to call `ExportSdkClient.prototype.setApiKey`.

<br />

<a id="client-methods"></a>
## Methods
<br />

<a id="renderPdf"></a>
### `ExportSdkClient.prototype.renderPdf`
```typescript
renderPdf<TemplateData extends Record<string, unknown>>(
  templateId: string,
  templateData?: TemplateData,
  partialOptions: Partial<RenderPdfOptions> = {}
) : Promise<Response<Uint8Array>>
```
<br />

<a id="renderPdfToStream"></a>
### `ExportSdkClient.prototype.renderPdfToStream`
```typescript
renderPdfToStream<TemplateData extends Record<string, unknown>>(
  templateId: string,
  templateData?: TemplateData
): Promise<Response<NodeJS.ReadableStream>>
```
<br />

<a id="setApiKey"></a>
### `ExportSdkClient.prototype.setApiKey`
```typescript
setApiKey(apiKey: string): void
```
<br />

<a id="client-types"></a>
## Types
<br />

### `PdfEncoding`
```typescript
type PdfEncoding = 
  | 'ascii'
  | 'utf8'
  | 'utf16le'
  | 'ucs2'
  | 'base64'
  | 'latin1'
  | 'binary'
  | 'hex';
```
### `RenderPdfOptions`
```typescript
interface RenderPdfOptions {
  encoding: PdfEncoding;
}
```

<a id="Response"></a>
### `Response<DataType>`
```typescript
interface Response<DataType> {
  data: DataType;
  status: number;
}

