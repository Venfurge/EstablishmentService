import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LoginRequest } from "../../models/auth/login-request.model";
import { ModelResponse } from "../../models/model-response.model";
import { LoginResponse } from "../../models/auth/login-response.model";
import { API } from "../../helpers/api-decorator";

@Injectable()
export class APIAuthService {

  constructor(
    private _httpClient: HttpClient
  ) {

  }

  @API<ModelResponse<LoginResponse>>()
  public async login(model: LoginRequest): Promise<ModelResponse<LoginResponse>> {
    let response = new ModelResponse<LoginResponse>();
    response.model = await this._httpClient.post<LoginResponse>('api/auth', model).toPromise();
    return response;
  }

}
