import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class InterestsService {
    constructor(
        private http: Http
    ) { }
    myHeaders = new Headers();

    getCats() {
        return this.http.get(`http://localhost:3000/api/cat`)
            .map((res: Response) => res.json());
    }

}
