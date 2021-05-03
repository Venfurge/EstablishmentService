import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../../../helpers/api-decorator';
import { MealModel } from '../../../models/meal/meal.model';
import { ModelResponse } from '../../../models/model-response.model';
import { SingleValueModel } from '../../../models/single-value.model';
import { HeadersService } from '../../headers.service';

@Injectable()
export class APICommentInvitationService {

  private _headers: HttpHeaders;

  constructor(
    private _httpClient: HttpClient,
    private _headersService: HeadersService
  ) {
    _headersService.onHeadersChanged.subscribe(headers => this._headers = headers);
  }

  // <response code="200">Invite token</response>
  // <response code="404">Meals not found</response>
  @API<ModelResponse<string>>()
  public async createCommentInvite(request: number[]): Promise<ModelResponse<string>> {
    let responseResult = new ModelResponse<SingleValueModel<string>>();
    responseResult.model = await this._httpClient.post<SingleValueModel<string>>(`api/comment/invite`, request, { headers: this._headers }).toPromise();

    let response = new ModelResponse<string>();
    response.error = responseResult.error;
    response.status = responseResult.status;
    response.success = responseResult.success;
    response.model = responseResult.model.value;
    return response;
  }

  // <response code="200">List of Meal Models</response>
  // <response code="400">Bad Token, Token time expired</response>
  // <response code="404">Meals not found</response>
  @API<ModelResponse<MealModel[]>>()
  public async acceptCommentInvite(request: string): Promise<ModelResponse<MealModel[]>> {
    let response = new ModelResponse<MealModel[]>();
    response.model = await this._httpClient.get<MealModel[]>(`api/comment/invite/accept?token=${request}`, { headers: this._headers }).toPromise();
    return response;
  }
}
