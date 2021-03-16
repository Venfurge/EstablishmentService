import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ModelResponse } from "../../models/model-response.model";
import { API } from "../../helpers/api-decorator";
import { HeadersService } from "../headers.service";
import { AddUserModel } from "../../models/user/add-user.model";
import { UserModel } from "../../models/user/user.model";

@Injectable()
export class APIRegisterService {

  private _headers: HttpHeaders;

  constructor(
    private _httpClient: HttpClient,
    private _headersService: HeadersService,
  ) {
    _headersService.onHeadersChanged.subscribe(headers => this._headers = headers);
  }

  /// <response code="200">Id</response>
  /// <response code="400">Bad Model or Login is already used</response>
  @API<ModelResponse<UserModel>>()
  public async register(model: AddUserModel): Promise<ModelResponse<UserModel>> {
    let response = new ModelResponse<UserModel>();
    response.model = await this._httpClient.post<UserModel>('api/register', model, { headers: this._headers }).toPromise();
    return response;
  }

}
