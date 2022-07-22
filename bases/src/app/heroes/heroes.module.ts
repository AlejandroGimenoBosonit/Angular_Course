//  import ngModule from Angular Core
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

// Components to be used in our global heroes component
import { HeroComponent } from './hero/hero.component';
import { ListComponent } from './list/list.component';


// using ngModule decorator
@NgModule({
    // declare components, modules, pipes, etc are being used in this module'
    declarations:[
        HeroComponent, 
        ListComponent
    ],
    // What we want to be visible outside of this module?
    exports:[
        ListComponent
    ],
    imports:[
        CommonModule // offers module like ngFor & ngIf
    ]
})

// exportingto use it out of this file
export class HeroesModule {};