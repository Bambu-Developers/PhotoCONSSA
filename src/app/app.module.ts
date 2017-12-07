import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LandingComponent } from './components/landing/landing.component';

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
    MatButtonModule
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
