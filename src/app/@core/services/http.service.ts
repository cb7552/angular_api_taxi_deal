import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable()
export class HttpService {
  public headers = new HttpHeaders().set('Accept', 'application/json').set('Content-Type', 'application/json').set('Access-Control-Allow-Origin', '*');

  constructor(private http: HttpClient) {}

  private get_formatted_url(url: string): string {
    return environment.api_endpoint + url;
  }

  public get(url: string, params = {}): Observable<any> {
    return this.request('GET', this.get_formatted_url(url), {}, params);
  }

  public post(url: string, body: any = {}, params = {}): Observable<any> {
    //  // console.log(url);

    return this.request('POST', this.get_formatted_url(url), body, params);
  }

  public put(url: string, body: any = {}, params = {}): Observable<any> {
    //  // console.log(url);
    return this.request('PUT', this.get_formatted_url(url), body, params);
  }

  public patch(url: string, body: any = {}, params = {}): Observable<any> {
    //  // console.log(url);
    return this.request('PATCH', this.get_formatted_url(url), body, params);
  }

  public delete(url: string, body: any = {}, params = {}): Observable<any> {
    //  // console.log(url);
    return this.request('DELETE', this.get_formatted_url(url), body, params);
  }

  public request(method: string, url, body: any = {}, params = {}) {
    return this.http.request(method, url, {
      body: body,
      headers: this.headers,
      params: this.buildParams(params)
    });
  }

  public buildParams(paramsObj: any): HttpParams {
    let params = new HttpParams();
    Object.keys(paramsObj).forEach((key) => {
      params = params.set(key, paramsObj[key]);
    });
    return params;
  }

  public resetHeaders(): void {
    this.headers = new HttpHeaders().set('Accept', 'application/json').set('Content-Type', 'application/json').set('Access-Control-Allow-Origin', '*');
  }

  public setHeader(key: string, value: string): void {
    this.headers = this.headers.set(key, value);
  }

  public deleteHeader(key: string): void {
    this.headers = this.headers.delete(key);
  }
}
