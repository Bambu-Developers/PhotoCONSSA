import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LandingComponent } from './components/landing/landing.component';
import { HttpModule } from '@angular/http'


// AngularFire
import { AngularFireDatabaseModule } from 'angularfire2/database';  

const appRoutes: Routes = [
  {path: '', component: LandingComponent}
];


@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
    ),
    BrowserAnimationsModule,
    MatButtonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    HttpModule
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    LandingComponent
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
