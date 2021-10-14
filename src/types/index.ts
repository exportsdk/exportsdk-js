import { ResponseEncoding } from 'axios';

export type PdfEncoding = ResponseEncoding;

export interface CommonPdfOptions {
  filename?: string;
}

export interface RenderPdfOptions extends CommonPdfOptions {
  encoding: PdfEncoding;
}

export type RenderPdfToStreamOptions = CommonPdfOptions;

export interface Response<DataType> {
  data: DataType;
  status: number;
}
