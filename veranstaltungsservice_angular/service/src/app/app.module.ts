import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VeranstaltungAnlegenComponent } from './veranstaltung-anlegen/veranstaltung-anlegen.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpServiceService } from './http-service.service';
import { FormsModule }    from '@angular/forms';
import { MessagesComponent } from './messages/messages.component';

@NgModule({
  declarations: [
    AppComponent,
    VeranstaltungAnlegenComponent,
    DashboardComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [HttpServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
