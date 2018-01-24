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

        // const headers = new HttpHeaders().set('Authorization', localStorage.getItem('token'));

        return new Observable(observer => {
            this.http.get(`http://127.0.0.1:3000/api/cat`).subscribe(
                (response: Response) => {
                    observer.next(response);
                    observer.complete();
                },
                error => {
                    observer.error(error);
                });
        });
        // return this.http.get(`http://127.0.0.1:3000/api/cat`, this.getHeader())
        //     .map((res: Response) => res.json());
    }


    uploadImage(avt) {
        // return this.http.post(`http://localhost:3000/api/upload/image`, avt)
        //     .map((res: Response) => res.json());
    }

    // private getHeader() {
    //     const token = localStorage.getItem('token');
    //     const headers = new HttpHeaders({
    //         'Content-Type': 'application/json',
    //         'Access-Control-Allow-Origin': '*',
    //         'Access-Control-Allow-Methods': '*',
    //         'Authorization': token,
    //         'Access-Control-Allow-Credentials': 'true'
    //     });
    //     return { headers: headers };
    // }
}
