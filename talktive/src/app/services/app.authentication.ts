import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthenticationService {
    ApiUrl = 'http://localhost:3000';
    constructor(
        private http: HttpClient
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
    getToken() {
        return localStorage.getItem('token');
    }

    private getHeader() {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'access-control-allow-headers,access-control-allow-origin,content-type,authorization'
        });
        return { headers: headers };
    }
}
