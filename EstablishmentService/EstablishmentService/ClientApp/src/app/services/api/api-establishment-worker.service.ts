import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../../helpers/api-decorator';
import { ApiResponse } from '../../models/api-response.model';
import { InviteAcceptModel } from '../../models/invite/invite-accept.model';
import { ModelResponse } from '../../models/model-response.model';
import { SingleValueModel } from '../../models/single-value.model';
import { UserModel } from '../../models/user/user.model';
import { GetWorkersRequestModel } from '../../models/workers/get-workers-request.model';
import { WorkerRemovedModel } from '../../models/workers/worker-removed.model';
import { HeadersService } from '../headers.service';

@Injectable()
export class APIEstablishmentWorkerService {

  private _headers: HttpHeaders;

  constructor(
    private _httpClient: HttpClient,
    private _headersService: HeadersService
  ) {
    _headersService.onHeadersChanged.subscribe(headers => this._headers = headers);
  }

  // <response code="200">List user of models</response>
  @API<ModelResponse<UserModel[]>>()
  public async getWorkers(request: GetWorkersRequestModel): Promise<ModelResponse<UserModel[]>> {
    let params = new HttpParams();
    if (request.find != null) params = params.set("find", request.find);

    let response = new ModelResponse<UserModel[]>();
    response.model = await this._httpClient.get<UserModel[]>(`api/worker/${request.establishmentId}`, { params: params, headers: this._headers }).toPromise();
    return response;
  }

  // <response code="200">Api response</response>
  // <response code="404">Establishment not found</response>
  @API<ModelResponse<WorkerRemovedModel>>()
  public async deleteMeFromEstablishment(request: number): Promise<ModelResponse<WorkerRemovedModel>> {
    let response = new ModelResponse<WorkerRemovedModel>();
    response.model = await this._httpClient.delete<WorkerRemovedModel>(`api/worker/${request}/delete-worker`, { headers: this._headers }).toPromise();
    return response;
  }

  // <response code="200">Api response</response>
  // <response code="400">Bad Request</response>
  // <response code="404">Establishment not found</response>
  @API<ApiResponse>()
  public async deleteWorkerFromEstablishment(establishmentId: number, workedId: number): Promise<ApiResponse> {
    let response = new ApiResponse();

    response = await this._httpClient
      .delete<ApiResponse>(`api/worker/${establishmentId}/${workedId}/delete-worker`, { headers: this._headers }).toPromise();

    return response;
  }

  // <response code="200">Invite token</response>
  // <response code="404">Establishment not found</response>
  @API<ModelResponse<string>>()
  public async getInvite(request: number): Promise<ModelResponse<string>> {
    let responseResult = new ModelResponse<SingleValueModel<string>>();
    responseResult.model = await this._httpClient.get<SingleValueModel<string>>(`api/worker/invite/${request}`, { headers: this._headers }).toPromise();

    let response = new ModelResponse<string>();
    response.error = responseResult.error;
    response.status = responseResult.status;
    response.success = responseResult.success;
    response.model = responseResult.model.value;
    return response;
  }

  // <response code="200">Invite token</response>
  // <response code="400">Bad Token, Token time expired</response>
  // <response code="404">Establishment not found</response>
  @API<ModelResponse<InviteAcceptModel>>()
  public async acceptInvite(request: string): Promise<ModelResponse<InviteAcceptModel>> {
    let response = new ModelResponse<InviteAcceptModel>();
    response.model = await this._httpClient.post<InviteAcceptModel>(`api/worker/invite?token=${request}`, null, { headers: this._headers }).toPromise();
    return response;
  }
}
