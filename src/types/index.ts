import { ResponseEncoding } from 'axios';

export type PdfEncoding = ResponseEncoding;

export interface RenderPdfOptions {
  encoding: PdfEncoding;
}

export interface Response<DataType> {
  data: DataType;
  status: number;
}
