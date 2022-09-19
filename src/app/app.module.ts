import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FranchiseEnquiryComponent } from './franchise-enquiry/franchise-enquiry.component';

@NgModule({
  declarations: [
    AppComponent,
    FranchiseEnquiryComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
