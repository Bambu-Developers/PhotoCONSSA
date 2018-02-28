import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material';
import { MatInputModule, MatIconModule } from '@angular/material';

// Angular Fire
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';

// Webcam
import { WebcamModule } from 'ngx-webcam';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LandingComponent } from './components/landing/landing.component';

import { ConssaShareComponent } from './components/conssa-share/conssa-share.component';
import { TakePhotoComponent } from './components/take-photo/take-photo.component';  

const appRoutes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'takephoto', component: TakePhotoComponent},
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
    AngularFireStorageModule,
    HttpModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    WebcamModule,
  ],
  declarations: [    
    AppComponent,
    HeaderComponent,
    LandingComponent,
    ConssaShareComponent,    
    TakePhotoComponent,
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
