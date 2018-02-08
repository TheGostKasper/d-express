// Services
import { PetService } from './pets/app.service.pet';
import { AuthenticationService } from './services/app.authentication';
import { InterestsService } from './interests/app.interests.service';
import { FeedsService } from './feeds/app.feeds.service';

// Components
import { AppComponent } from './app.component';
import { UserComponent } from './users/app.user';
import { PetsComponent } from './pets/app.pets';
import { LoginComponent } from './login/app.login';
import { InterestsComponent } from './interests/app.interests';
import { FeedsComponent } from './feeds/app.feeds';

import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthInterceptor } from './services/interceptor';

export class Container {
    declarations = [
        AppComponent,
        UserComponent,
        PetsComponent,
        LoginComponent,
        FeedsComponent,
        InterestsComponent
    ];
    providers = [{
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true,
    }, AuthenticationService, PetService, InterestsService, FeedsService];
}
