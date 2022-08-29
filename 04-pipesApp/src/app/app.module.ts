import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Fieldset animation module
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Personal Modules
import { SharedModule } from './shared/shared.module';
// routes module
import { AppRouterModule } from './routes/app-router/app-router.module';

import { AppComponent } from './app.component';
import { SalesModule } from './sales/sales.module';

// Change app's local 
import localES from '@angular/common/locales/es';
import localFR from '@angular/common/locales/fr';
import localJA from '@angular/common/locales/ja';
// function
import { registerLocaleData } from '@angular/common';
// call function with language as an argument
registerLocaleData( localES );
registerLocaleData( localFR );
registerLocaleData( localJA );

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRouterModule,
    SharedModule,
    SalesModule
  ],
  providers: [
    // language as global implementation
    { provide: LOCALE_ID, useValue: 'es'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
