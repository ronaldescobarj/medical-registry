import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class HttpService {
    private baseUrl: string = 'http://localhost:3000/api';
    constructor(private http: Http) { }

    public get(url: string) {
        let headers = this.setHeaders();
        return this.http.get(encodeURI(this.baseUrl + url), { headers })
        	.map((response) => {
                return response.json();
            })
            .catch(handleError);
    }

    public post(url: string, params: any) {
        let headers = this.setHeaders();
        return this.http.post(encodeURI(this.baseUrl + url), params, { headers })
        	.map((response) => {
                return response.json();
            })
            .catch(handleError);
    }
    
    public put(url: string, params: any) {
        let headers = this.setHeaders();
        return this.http.put(encodeURI(this.baseUrl + url), params, { headers })
            .map((response) => {
                return response.json();
            })
            .catch(handleError);
    }

    public delete(url: string) {
        let headers = this.setHeaders();
        return this.http.delete(encodeURI(this.baseUrl + url), { headers })
        	.map((response) => {
                return response.json();
            })
            .catch(handleError);
    }

    private setHeaders() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let authToken = localStorage.getItem('auth_token');
        headers.append('Authorization', `Bearer ${authToken}`);
        return headers;
    }   
}

function handleError(error: any) {
    alert('An error occurred:\n' + error);
    console.error('An error occurred: ', error);
    return Observable.throw(error.message || error);
}