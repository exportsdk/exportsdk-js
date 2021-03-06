import axios, { AxiosInstance } from 'axios';
import { CONSTANTS } from './constants';
import { ResponseError } from './response-error';
import { RenderPdfOptions, RenderPdfToStreamOptions, Response } from './types';

export class ExportSdkClient {
  private _apiKey: string;
  private http: AxiosInstance;

  constructor(apiKey: string) {
    this._apiKey = apiKey;
    this.http = ExportSdkClient.getAxiosInstance(apiKey);
  }

  private static getAxiosInstance(apiKey: string): AxiosInstance {
    const instance = axios.create({
      baseURL: CONSTANTS.API_URL,
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': apiKey,
      },
    });

    return instance;
  }

  async renderPdf<TemplateData extends Record<string, unknown>>(
    templateId: string,
    templateData?: TemplateData,
    partialOptions: Partial<RenderPdfOptions> = {}
  ): Promise<Response<Uint8Array>> {
    const options: RenderPdfOptions = {
      encoding: 'utf8',
      ...partialOptions,
    };

    try {
      const response = await this.http.post(
        '/v1/pdf',
        {
          debug: options.debug,
          templateId,
          data: templateData,
          filename: options.filename,
        },
        {
          responseType: 'arraybuffer',
          responseEncoding: options.encoding,
        }
      );

      const data = response.data.buffer
        ? new Uint8Array(response.data.buffer)
        : response.data;

      return {
        data,
        status: response.status,
      };
    } catch (error) {
      this.handleResponseError(error);
    }
  }

  async renderPdfToStream<TemplateData extends Record<string, unknown>>(
    templateId: string,
    templateData?: TemplateData,
    partialOptions: Partial<RenderPdfToStreamOptions> = {}
  ): Promise<Response<NodeJS.ReadableStream>> {
    try {
      const response = await this.http.post(
        '/v1/pdf',
        {
          debug: partialOptions.debug,
          templateId,
          data: templateData,
          filename: partialOptions.filename,
        },
        { responseType: 'stream' }
      );

      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      this.handleResponseError(error);
    }
  }

  get apiKey(): string {
    return this._apiKey;
  }

  setApiKey(apiKey: string): void {
    this._apiKey = apiKey;
    this.http = ExportSdkClient.getAxiosInstance(this._apiKey);
  }

  private handleResponseError(error: unknown): never {
    if (axios.isAxiosError(error) && error.response !== undefined) {
      throw new ResponseError({
        status: error.response.status,
        message: error.response.data.message,
      });
    } else {
      throw error;
    }
  }
}
