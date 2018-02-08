import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class FeedsService {
    constructor(
        private http: HttpClient
    ) { }

    getFeedsItems(obj) {
     return new Observable(observer => {
            this.http.post(`http://localhost:3000/api/feed`, obj)
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

}
