import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormArrayComponent } from './form-array/form-array.component';
import { MoedaBrasileiraPipe } from './pipe/moeda-brasileira.pipe';

@NgModule({
  declarations: [
    AppComponent,
    FormArrayComponent,
    MoedaBrasileiraPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
