import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../../helpers/api-decorator';
import { ApiResponse } from '../../models/api-response.model';
import { IdModelRequest } from '../../models/id-model-request.model';
import { EditMealRequestModel } from '../../models/meal/edit-meal-request.model';
import { GetMealsRequestModel } from '../../models/meal/get-meals-request.model';
import { MealModel } from '../../models/meal/meal.model';
import { ModelResponse } from '../../models/model-response.model';
import { PagingList } from '../../models/paging-list.model';
import { HeadersService } from '../headers.service';

@Injectable()
export class APIMealService {

  private _headers: HttpHeaders;

  constructor(
    private _httpClient: HttpClient,
    private _headersService: HeadersService
  ) {
    _headersService.onHeadersChanged.subscribe(headers => this._headers = headers);
  }

  // <response code="200">Paging list with meal models</response>
  // <response code="404">Establishment not found</response>
  @API<ModelResponse<PagingList<MealModel>>>()
  public async getMeals(request: IdModelRequest<GetMealsRequestModel>): Promise<ModelResponse<PagingList<MealModel>>> {

    let params = new HttpParams();
    if (request.model.ps != null) params = params.set("pn", request.model.pn.toString());
    if (request.model.pn != null) params = params.set("ps", request.model.ps.toString());
    if (request.model.sort != null) params = params.set("sort", request.model.sort);
    if (request.model.sortDir != null) params = params.set("sortDir", request.model.sortDir);
    if (request.model.find != null) params = params.set("find", request.model.find);

    let response = new ModelResponse<PagingList<MealModel>>();
    response.model = await this._httpClient.get<PagingList<MealModel>>(`api/meals/${request.id}`, { params: params, headers: this._headers }).toPromise();
    return response;
  }

  // <response code="200">Meal Model</response>
  // <response code="404">Meal not found</response>
  @API<ModelResponse<PagingList<MealModel>>>()
  public async getMealById(request: IdModelRequest<number>): Promise<ModelResponse<MealModel>> {
    let response = new ModelResponse<MealModel>();
    response.model = await this._httpClient.get<MealModel>(`api/meals/${request.id}/${request.model}`, { headers: this._headers }).toPromise();
    return response;
  }

  // <response code="200">Meal Model</response>
  // <response code="400">Bad Model</response>
  // <response code="404">Meal not found</response>
  @API<ModelResponse<MealModel>>()
  public async addMeal(request: IdModelRequest<EditMealRequestModel>): Promise<ModelResponse<MealModel>> {
    let response = new ModelResponse<MealModel>();
    response.model = await this._httpClient.post<MealModel>(`api/meals/${request.id}`, request.model, { headers: this._headers }).toPromise();
    return response;
  }

  // <response code="200">Meal</response>
  // <response code="400">Bad Model</response>
  // <response code="404">Meal not found</response>
  @API<ModelResponse<MealModel>>()
  public async editMeal(request: IdModelRequest<EditMealRequestModel>): Promise<ModelResponse<MealModel>> {
    let response = new ModelResponse<MealModel>();
    response.model = await this._httpClient.put<MealModel>(`api/meals/${request.id}`, request.model, { headers: this._headers }).toPromise();
    return response;
  }

  // <response code="200">Meal model</response>
  // <response code="400">Bad Model</response>
  // <response code="404">Meal or Meal Image not found</response>
  @API<ModelResponse<MealModel>>()
  public async editMealImage(request: IdModelRequest<FormData>): Promise<ModelResponse<MealModel>> {
    let response = new ModelResponse<MealModel>();
    response.model = await this._httpClient.put<MealModel>(`api/meals/${request.id}/edit-image`, request.model, { headers: this._headers }).toPromise();
    return response;
  }

  // <response code="200">Meal model</response>
  // <response code="400">Bad Model</response>
  // <response code="404">Meal not found</response>
  @API<ModelResponse<MealModel>>()
  public async deleteMealImage(request: number): Promise<ModelResponse<MealModel>> {
    let response = new ModelResponse<MealModel>();
    response.model = await this._httpClient.put<MealModel>(`api/meals/${request}/delete-image`, null, { headers: this._headers }).toPromise();
    return response;
  }

  // <response code="200">Deleted</response>
  @API<ApiResponse>()
  public async deleteMeal(request: number): Promise<ApiResponse> {
    let response = new ApiResponse();
    await this._httpClient.delete<ApiResponse>(`api/meals/${request}`, { headers: this._headers }).toPromise();
    return response;
  }
}
