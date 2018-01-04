import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';

@Injectable()
export class AuthenticationService {
    ApiUrl = 'http://localhost:3000';
    constructor(
        private http: Http
    ) { }
    logIn(user) {
        return this.http.post(this.ApiUrl + `/login`, JSON.stringify(user), this.getHeader())
            .map((res: Response) => res.json());
    }
    checkToken() {
        if (!localStorage.getItem('token')) {
            window.location.href = '/login';
        }
    }
    private getHeader() {
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'access-control-allow-headers,access-control-allow-origin,content-type'
        });
        const options = new RequestOptions({
            headers: headers
        });
        return options;
    }
}
