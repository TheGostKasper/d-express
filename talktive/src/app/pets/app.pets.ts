import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { PetService } from './app.service.pet';
import { AuthenticationService } from './../services/app.authentication';
import { Buffer } from 'buffer';

import * as lzma from 'lzma-purejs';

@Component({
    selector: 'app-pets',
    templateUrl: './app.pets.html',
    styleUrls: ['./app.pets.css']
})
export class PetsComponent implements OnInit {
    title = 'app';
    cats = [];
    user = {};
    private base64textString;
    userAvatar = {};

    constructor(private petService: PetService, private authentication: AuthenticationService, private _sanitizer: DomSanitizer) {
        authentication.checkToken();
    }

    ngOnInit() {
        this.petService.getCats().subscribe(
            response => {
                console.log(response);
                // if (response.data == null) {
                //     alert(response.message);
                // } else {
                // }
            }
        );
    }
    onFileChange(event) {
        const files = event.target.files;
        const file = files[0];
        if (files && file) {
            const reader = new FileReader();
            reader.onload = this._handleReaderLoaded.bind(this);
            reader.readAsBinaryString(file);
        }
    }
    private _handleReaderLoaded(readerEvt) {
        const binaryString = readerEvt.target.result;
        const strB64 = 'data:image/jpg;base64,' + btoa(binaryString);

        this.base64textString = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
            + btoa(binaryString));

        const data = new Buffer(strB64, 'utf8');
        // const compressed = lzma.compressFile(this.base64textString);
        this.userAvatar = {
            avatar: this.base64textString
        };

        this.petService.uploadImage(this.userAvatar)
            .subscribe(
            response => {
                console.log(response);
                // if (response.data == null) {
                //     alert(response.message);
                // } else {
                // }
            }
            );
    }

    uploadImage(event) {
        console.log(event);
    }
}
