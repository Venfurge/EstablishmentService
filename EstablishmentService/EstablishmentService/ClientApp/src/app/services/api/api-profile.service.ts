import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ModelResponse } from '../../models/model-response.model';
import { UserModel } from '../../models/user/user.model';
import { HeadersService } from '../headers.service';
import { API } from '../../helpers/api-decorator';
import { EditUserRequest } from '../../models/user/edit-user-request.model';
import { ApiResponse } from '../../models/api-response.model';
import { ChangeUserPasswordRequest } from '../../models/user/change-user-password-request.model';
import { IdModelRequest } from '../../models/id-model-request.model';

@Injectable()
export class APIProfileService {

  private _headers: HttpHeaders;

  constructor(
    private _httpClient: HttpClient,
    private _headersService: HeadersService
  ) {
    _headersService.onHeadersChanged.subscribe(headers => this._headers = headers);
  }

  // <response code="200">User model</response>
  // <response code="404">User not found</response>
  @API<ModelResponse<UserModel>>()
  public async getProfile(): Promise<ModelResponse<UserModel>> {
    let response = new ModelResponse<UserModel>();
    response.model = await this._httpClient.get<UserModel>('api/profile', { headers: this._headers }).toPromise();
    return response;
  }

  // <response code="200">User model</response>
  // <response code="400">Bad Model or Login is already used</response>
  // <response code="404">User not found</response>
  @API<ModelResponse<UserModel>>()
  public async editProfile(request: EditUserRequest): Promise<ModelResponse<UserModel>> {
    let response = new ModelResponse<UserModel>();
    response.model = await this._httpClient.put<UserModel>('api/profile', request, { headers: this._headers }).toPromise();
    return response;
  }

  // <response code="200">User model</response>
  // <response code="400">Bad Model</response>
  // <response code="404">User or image not found</response>
  @API<ModelResponse<UserModel>>()
  public async editUserProfileImage(request: IdModelRequest<FormData>): Promise<ModelResponse<UserModel>> {
    let response = new ModelResponse<UserModel>();
    response.model = await this._httpClient.put<UserModel>('api/profile/edit-image', request.model, { headers: this._headers }).toPromise();
    return response;
  }

  // <response code="200">User model</response>
  // <response code="400">Bad Model</response>
  // <response code="404">User not found</response>
  @API<ModelResponse<UserModel>>()
  public async deleteUserProfileImage(): Promise<ModelResponse<UserModel>> {
    let response = new ModelResponse<UserModel>();
    response.model = await this._httpClient.put<UserModel>('api/profile/delete-image', null, { headers: this._headers }).toPromise();
    return response;
  }

  // <response code="200">User model</response>
  // <response code="400">Bad Model</response>
  // <response code="404">User not found</response>
  @API<ApiResponse>()
  public async changePassword(request: ChangeUserPasswordRequest): Promise<ApiResponse> {
    await this._httpClient.post('api/profile/change-password', request, { headers: this._headers }).toPromise();
    return new ApiResponse();
  }
}
