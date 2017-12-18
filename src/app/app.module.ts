import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material';
import {MatFormFieldModule} from '@angular/material';
import {MatInputModule} from '@angular/material';
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
import { ConssaShareComponent } from './components/conssa-share/conssa-share.component';  

const appRoutes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'share', component: ConssaShareComponent}
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
    HttpModule,
    MatFormFieldModule,
    MatInputModule
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    LandingComponent,
    ConssaShareComponent
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
