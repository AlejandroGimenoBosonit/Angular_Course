//  import ngModule from Angular Core
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

// Components to be used in our global counter component
import { CounterComponent } from './counter/counter.component';

// using ngModule decorator
@NgModule({
    // declare components, modules, pipes, etc are being used in this module'
    declarations:[
        CounterComponent
    ],
    // What we want to be visible outside of this module?
    exports:[
        CounterComponent
    ]
})

// exportingto use it out of this file
export class CounterModule {};