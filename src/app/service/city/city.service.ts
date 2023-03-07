import {Injectable} from '@angular/core';
import {City} from "../../model/city";
import {catchError, Observable, of, tap} from "rxjs";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {CityResponse} from "../../model/cityResponse";
import {LoggerService} from "../logger/logger.service";

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private citiesUrl = "http://localhost:9000/api/cities"
  httpOptions = {
    headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set("Authorization", 'Basic ZWRpdG9yOnBhc3N3b3Jk')
  };

  constructor(private http: HttpClient,
              private logger: LoggerService,) {
  }

  getCityResponse(page: number, size: number, name: string): Observable<CityResponse> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('name', name);
    return this.http.get<CityResponse>(this.citiesUrl, {params: params, headers: this.httpOptions.headers})
      .pipe(
        tap(cityResponse => {
          this.log(`fetched cities`);
          return cityResponse;
        }),
        catchError(this.handleError<CityResponse>(`getCities`))
      );
  }

  getCity(id: number): Observable<City> {
    const url = `${this.citiesUrl}/${id}`;
    return this.http.get<City>(url, this.httpOptions).pipe(
      tap(city => this.log(`get city by id=${city.id}, city=${city}`)),
      catchError(this.handleError<City>(`getCity id=${id}`))
    );
  }

  updateCity(city: City): Observable<City> {
    const url = `${this.citiesUrl}/${city.id}`;
    return this.http.put<City>(url, city, this.httpOptions);
  }

  private log(message: string) {
    this.logger.logInfo(`CityService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}


