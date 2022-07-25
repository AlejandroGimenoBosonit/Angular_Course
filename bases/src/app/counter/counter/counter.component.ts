/*
This is going to be a temporal component to learn how we can divide our code in modules to use them anywhere we want in our project.
*/

import { Component } from "@angular/core";

// decorator
@Component({
    selector: 'app-counter',
    template: `
        <h1>{{ title }}</h1>

        <h3>Data: <strong>{{ data }}</strong></h3>

        <!-- 
            We use a button click event (click)="" 
            In this expression we can define a javascript logic

            e.g: (click)="counter+counter=1"

            But instead of this we are going to call a method defined at our typescript component
            (This example is going to be defined with an argument to learn how Angular deals with it)
        --> 
        <button (click)="operationMthod(data)">+ {{ data }}</button>
        <span> {{ counter }} </span>
        <button (click)="operationMthod(-data)">- {{ data }}</button>
    `
})

export class CounterComponent {
// When component is loaded or refreshed Angular will assign the default values
    title  : string  = 'Some Random Title';
    counter: number = 0;
    data   : number  = 5;
    // We can define methods in our typescript component to avoid to put logic in the HTML template
    operationMthod(value: number){
    this.counter += value;
    }
}