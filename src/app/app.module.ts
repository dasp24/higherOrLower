import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { RandomNumberComponent } from './components/random-number/random-number.component';
import { ArrowComponent } from './components/arrow/arrow.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RandomNumberComponent,
    ArrowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
