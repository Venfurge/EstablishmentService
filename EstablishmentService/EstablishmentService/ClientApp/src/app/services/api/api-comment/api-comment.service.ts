import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../../../helpers/api-decorator';
import { ApiResponse } from '../../../models/api-response.model';
import { AddMealCommentRequest } from '../../../models/comment/add-meal-comment-request.model';
import { MealCommentModel } from '../../../models/comment/meal-comment.model';
import { ModelResponse } from '../../../models/model-response.model';
import { HeadersService } from '../../headers.service';

@Injectable()
export class APICommentService {

  private _headers: HttpHeaders;

  constructor(
    private _httpClient: HttpClient,
    private _headersService: HeadersService
  ) {
    _headersService.onHeadersChanged.subscribe(headers => this._headers = headers);
  }

  // <response code="200">List of Comment Models</response>
  @API<ModelResponse<MealCommentModel[]>>()
  public async getComments(request: number): Promise<ModelResponse<MealCommentModel[]>> {
    let response = new ModelResponse<MealCommentModel[]>();
    response.model = await this._httpClient.get<MealCommentModel[]>(`api/comment?mealId=${request}`, { headers: this._headers }).toPromise();
    return response;
  }

  // <response code="200">Correct add</response>
  // <response code="400">You commented all meals</response>
  @API<ApiResponse>()
  public async addComments(request: AddMealCommentRequest[]): Promise<ApiResponse> {
    let response = new ApiResponse();
    response = await this._httpClient.post<ApiResponse>(`api/comment`, request, { headers: this._headers }).toPromise();
    return response;
  }
}
