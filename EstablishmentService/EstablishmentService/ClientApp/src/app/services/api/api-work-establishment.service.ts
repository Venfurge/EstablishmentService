import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../../helpers/api-decorator';
import { EstablishmentModel } from '../../models/establishment/establishment.model';
import { ModelResponse } from '../../models/model-response.model';
import { HeadersService } from '../headers.service';

@Injectable()
export class APIWorkEstablishmentService {

  private _headers: HttpHeaders;

  constructor(
    private _httpClient: HttpClient,
    private _headersService: HeadersService
  ) {
    _headersService.onHeadersChanged.subscribe(headers => this._headers = headers);
  }

  // <response code="200">Work Establishment models</response>
  @API<ModelResponse<EstablishmentModel[]>>()
  public async getWorkEstablishments(): Promise<ModelResponse<EstablishmentModel[]>> {
    let response = new ModelResponse<EstablishmentModel[]>();
    response.model = await this._httpClient.get<EstablishmentModel[]>('api/work-establishments', { headers: this._headers }).toPromise();
    return response;
  }
}
