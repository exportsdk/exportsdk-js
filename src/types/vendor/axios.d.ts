import 'axios';

declare module 'axios' {
  type ResponseEncoding =
    | 'ascii'
    | 'utf8'
    | 'utf16le'
    | 'ucs2'
    | 'base64'
    | 'latin1'
    | 'binary'
    | 'hex';

  interface AxiosRequestConfig {
    responseEncoding?: ResponseEncoding;
  }
}
