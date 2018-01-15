import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { AuthenticationService } from './../services/app.authentication';
import { InterestsService } from './app.interests.service';

@Component({
    selector: 'app-interests',
    templateUrl: './app.interests.html',
    styleUrls: ['./app.interests.css']
})
export class InterestsComponent implements OnInit {
    constructor(private authenticationService: AuthenticationService, private interestsService: InterestsService) { }
    ngOnInit() {
        // this.loadUser();
    }
}
