// import pipe dependencies
import { Pipe, PipeTransform } from '@angular/core';

// Pipe Decorator
@Pipe({
    // declare custom name
    name: 'upperCase'
})
// export class
export class UppercasePipe implements PipeTransform {
    // with optional arguments
    transform( word: string, isUpper: boolean = true ):string {
        return (isUpper)? word.toUpperCase() : word.toLocaleLowerCase();
    }
}

// MUST BE PROVIDED IN A MODULE