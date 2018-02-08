import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class PetService {
    constructor(
        private http: HttpClient
    ) { }
    myHeaders = new Headers();

    getCats() {
        return new Observable(observer => {
            this.http.get(`http://localhost:3000/api/cat`, this.getHeader())
            .subscribe(
                (response: Response) => {
                    observer.next(response);
                    observer.complete();
                },
                error => {
                    observer.error(error);
                });
        });
    }


    uploadImage(avt) {
        return this.http.post(`http://localhost:3000/api/upload/image`, avt)
            .map((res: Response) => res.json());
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
