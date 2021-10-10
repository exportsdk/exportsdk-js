# exportsdk-js

A JavaScript/TypeScript API client for [ExportSDK](https://exportsdk.com).

# Table of contents

- [Obtain an API key](#obtain-an-api-key)
- [Install package](#install-package)
- [Basic usage](#basic-usage)
- [Example application](#example-application)
- [ExportSdkClient API reference](#exportsdkclient-api-reference)
  - [Methods](#client-methods)
    - [.renderPdf](#renderPdf)
    - [.renderPdfToStream](#renderPdfToStream)
    - [.setApiKey](#setApiKey)
  - [Types](#client-types)
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

<a id="client-methods"></a>

## Methods

<br />

<a id="renderPdf"></a>
```
renderPdf<TemplateData extends Record<string, unknown>>(
  templateId: string,
  templateData?: TemplateData,
  partialOptions: Partial<RenderPdfOptions> = {}
) : Promise<Response<Uint8Array>>
```

<br />

<a id="client-types"></a>

## Types

<br />

###
