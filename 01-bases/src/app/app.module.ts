import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Imported Components
import { AppComponent } from './app.component';

// import { CounterComponent } from './counter/counter.component';
// importing module instead
import { CounterModule } from './counter/counter.module';

// this components are being exported from the heroes module script
// import { HeroComponent } from './heroes/hero/hero.component';
// import { ListComponent } from './heroes/list/list.component';
import { HeroesModule } from './heroes/heroes.module';
import { DbzModule } from './dbz/dbz.module';


@NgModule({
  declarations: [
    AppComponent,
    // CounterComponent
  ],
  imports: [
    BrowserModule,
    // Importing a external module we can use itscontent
    HeroesModule,
    CounterModule,
    DbzModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
