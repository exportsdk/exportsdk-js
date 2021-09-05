import { ResponseEncoding } from 'axios';

export interface Response<DataType> {
  data: DataType;
  status: number;
}

export type PdfEncoding = ResponseEncoding;

export interface GeneratePdfOptions {
  encoding: PdfEncoding;
}
