import { Directive, Input } from "@angular/core";
import { FormControl, NG_VALIDATORS, Validator } from "@angular/forms";

@Directive({
    selector: '[customMinDirective][ngModel]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: CustomMinDrective,
        multi: true
    }]
})

export class CustomMinDrective implements Validator{
    // recieve minValue from stock field
    @Input() minValue!: number;

    constructor(){
        console.log('Directive: ', this.minValue);
        
    }

    validate( control: FormControl ) {
        const inputValue = control.value;

        console.log(inputValue);
        
        return (inputValue < this.minValue) ? {'customMin': true} : null;
    }
    
}