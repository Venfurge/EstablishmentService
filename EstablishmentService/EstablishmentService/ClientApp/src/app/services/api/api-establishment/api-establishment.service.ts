import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../../../helpers/api-decorator';
import { EditEstablishmentRequestModel } from '../../../models/establishment/edit-establishment-request.model';
import { EstablishmentModel } from '../../../models/establishment/establishment.model';
import { IdModelRequest } from '../../../models/id-model-request.model';
import { ModelResponse } from '../../../models/model-response.model';
import { HeadersService } from '../../headers.service';

@Injectable()
export class APIEstablishmentService {

  private _headers: HttpHeaders;

  constructor(
    private _httpClient: HttpClient,
    private _headersService: HeadersService
  ) {
    _headersService.onHeadersChanged.subscribe(headers => this._headers = headers);
  }

  // <response code="200">Establishment model</response>
  @API<ModelResponse<EstablishmentModel[]>>()
  public async getEstablishments(): Promise<ModelResponse<EstablishmentModel[]>> {
    let response = new ModelResponse<EstablishmentModel[]>();
    response.model = await this._httpClient.get<EstablishmentModel[]>('api/establishment', { headers: this._headers }).toPromise();
    return response;
  }

  // <response code="200">Establishment model</response>
  // <response code="400">Bad Model</response>
  // <response code="404">Establishment not found</response>
  @API<ModelResponse<EstablishmentModel>>()
  public async editEstablishment(request: IdModelRequest<EditEstablishmentRequestModel>): Promise<ModelResponse<EstablishmentModel>> {
    let response = new ModelResponse<EstablishmentModel>();
    response.model = await this._httpClient.put<EstablishmentModel>(`api/establishment/${request.id}`, request.model, { headers: this._headers }).toPromise();
    return response;
  }

  // <response code="200">Establishment model</response>
  // <response code="400">Bad Model</response>
  // <response code="404">Establishment or image not found</response>
  @API<ModelResponse<EstablishmentModel>>()
  public async editEstablishmentImage(request: IdModelRequest<FormData>): Promise<ModelResponse<EstablishmentModel>> {
    let response = new ModelResponse<EstablishmentModel>();
    response.model = await this._httpClient.put<EstablishmentModel>(`api/establishment/${request.id}/edit-image`, request.model, { headers: this._headers }).toPromise();
    return response;
  }

  // <response code="200">Establishment model</response>
  // <response code="400">Bad Model</response>
  // <response code="404">Establishment not found</response>
  @API<ModelResponse<EstablishmentModel>>()
  public async deleteEstablishmentImage(request: number): Promise<ModelResponse<EstablishmentModel>> {
    let response = new ModelResponse<EstablishmentModel>();
    response.model = await this._httpClient.put<EstablishmentModel>(`api/establishment/${request}/delete-image`, null, { headers: this._headers }).toPromise();
    return response;
  }
}
