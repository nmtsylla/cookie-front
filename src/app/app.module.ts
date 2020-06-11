import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WebsitesComponent } from './websites/websites.component';
import { WebsitesDetailComponent } from './websites-detail/websites-detail.component';
import { WebsiteAddComponent } from './website-add/website-add.component';
import { WebsiteEditComponent } from './website-edit/website-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    WebsitesComponent,
    WebsitesDetailComponent,
    WebsiteAddComponent,
    WebsiteEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
