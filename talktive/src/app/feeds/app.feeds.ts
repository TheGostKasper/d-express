import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../services/app.authentication';
import { FeedsService } from './app.feeds.service';

@Component({
    selector: 'app-feeds',
    templateUrl: './app.feeds.html',
    styleUrls: ['./app.feeds.css']
})
export class FeedsComponent implements OnInit {
    feed = {};
    items = [];
    item: any;
    description: any;
    constructor(private authentication: AuthenticationService, private feedService: FeedsService) { }
    ngOnInit() {
        this.authentication.checkToken();
    }
    getFeeds(obj) {
        this.feedService.getFeedsItems(obj).subscribe(
            (response: any) => {
                this.items.push(response.data);
            }
        );
    }
    displayItems(item) {
        this.item = item;
    }
    displayDescription(arti, event) {
        event.preventDefault();
        this.description = arti.description;
    }
}
