import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { AuthenticationService } from './../services/app.authentication';
@Component({
    selector: 'app-user',
    templateUrl: './app.user.html',
    styleUrls: ['./app.user.css']
})
export class UserComponent implements OnInit {
    title = 'Users';
    constructor(private authentication: AuthenticationService) {
        authentication.checkToken();
    }
    ngOnInit() {
    }


}
