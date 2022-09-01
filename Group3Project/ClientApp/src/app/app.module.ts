import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { CreateAPlantComponent } from './create-aplant/create-aplant.component';
import { TODChangerComponent } from './tod-changer/tod-changer.component';
import { ListOfPlantsComponent } from './list-of-plants/list-of-plants.component';
import { CalculateCapacityComponent } from './calculate-capacity/calculate-capacity.component';
import { LearnPlantInfoComponent } from './learn-plant-info/learn-plant-info.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FactsForNerdsComponent } from './facts-for-nerds/facts-for-nerds.component';
import { Secret } from './secret';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    CreateAPlantComponent,
    TODChangerComponent,
    ListOfPlantsComponent,
    CalculateCapacityComponent,
    LearnPlantInfoComponent,
    FactsForNerdsComponent,
    
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    SocialLoginModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'add-plant', component: CreateAPlantComponent },
      { path: 'tod-changer', component: TODChangerComponent },
      { path: 'calc-cap', component: CalculateCapacityComponent },
      {path: 'FactsForNerds', component: FactsForNerdsComponent},
      {path: 'LearnPlantInfo', component: LearnPlantInfoComponent}
      
    ]),
    NoopAnimationsModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              Secret.Oauth
            )
          }
        ]
      } as SocialAuthServiceConfig,
    }  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
