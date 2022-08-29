# Angualr Bases

## 1. Install Angular
Install the CLI using the npm package manager:
```
npm install -g @angular/cli
```

## 2. Generating a New Project
We can generate a new Angular project typing the following command:
```
ng new project_name
cd project_name/
```

## 3. Initiate an Angular Project
To initiate Angular's internal server we must type:
```
ng serve
```

## 4. Angular Component
An Angular component should be compose with three main scripts:

-Typescript File

    Typescript class where we'll code our component's logic. This class will use an element called 'Component'. This component is a decorator that marks a class as an Angular component and provides configuration metadata that determines how the component should be processed, instantiated, and used at runtime.

- A basic typescript component sould be made of
    ```
    import { Component } from '@angular/core';

    @Component({
        /*
        The CSS selector that identifies this directive in a 
        template and triggers instantiation of the directive.
        */
        selector: 'app-root',
        
        /*
        The relative path or absolute URL of a template file for an Angular component. 
        If provided, do not supply an inline template using template.
        */
        templateUrl: './app.component.html',
        
        /*
        One or more relative paths or absolute URLs for files 
        containing CSS stylesheets to use in this component.
        */
        styleUrls: ['./app.component.css']
        
        })

    export class AppComponent { }
    ```

-HTML Template

     HTML template to render our web content.

-CSS Styles File

    CSS template where we define our module styles.


**IMPORTANT**: In our project we must define inside every component's folder a special script called 'module' to deal with every project's component.

In a project, only the app component should be the unique componente in thesrc folder. The rest of our app's components, modules, templates and styles will be allocated inside it.


## 5. Angular Module

As your application grows, you can organize code relevant for a specific feature. This helps apply clear boundaries for features. With feature modules, you can keep code related to a specific functionality or feature separate from other code. Delineating areas of your application helps with collaboration between developers and teams, separating directives, and managing the size of the root module.

- To generate a module we can create it manually or we can use the following command:
    ```
    ng generate module CustomerDashboard
    ```
    Or
    ```
    ng g m CustomerDashboard
    ```
This causes the CLI to create a folder called customer-dashboard with a file inside called customer-dashboard.module.ts with the following contents:
```
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Imported Components
import { AppComponent } from './app.component';

// importing module instead
import { CounterModule } from './counter/counter.module';
import { HeroesModule } from './heroes/heroes.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    // Importing a external module we can use itscontent
    HeroesModule,
    CounterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## 6. How Angular communicates a component's scripts?
When we generate a new component we have usually created three files. In this example we're going to learn how can interact a component called 'heroes' inside our main app component.

```
src
├── app
    │
    ├── heroes
    │   ├── hero
    │   │   ├── hero.component.ts
    │   │   ├── hero.component.html
    │   │   └── hero.component.css
    │   ├── list
    │   │   ├── list.component.ts
    │   │   ├── list.component.html
    │   │   └── list.component.css
    │   │
    │   │
    │   └── heroes.module.ts
    │    
    ├── app.component.ts
    ├── app.component.html
    ├── app.component.css
    │ 
    └── app.module.ts

```
- A **module** indicates what coponents are declared inside itself, what components we want to be vivisble outside itself ( for the rest of the app), and the imports

    ```
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
    ```

- For this brew example we wanto to examinate our **list html component** that only renders a couple of things:

    - An Avenger's list
    - A local html template
    - Buttons


    ```
    <h1>Avengers List!</h1>

    <ul>
        <li *ngFor="let avenger of avengers; let i = index">
            {{ i+1 }} - {{ avenger }}
        </li>
    </ul>


    <!-- IF/ELSE: In this case we use a local reference (#localReference only exists in html template's side) to define an else action-->
    <h3 
        *ngIf="deleteAvenger else notDeleted" 
        >
        Deleted Avenger: {{ deleteAvenger }}
    </h3> 

    <ng-template #notDeleted>
        <h3>Nobody was deleted!</h3>
    </ng-template>

    <!-- delete button -->
    <button (click)="deleteHeroes()"> Delete Heroes </button>
    ```
- A list typescript component where we can define all the component logic:
    ```
    import { Component, OnInit } from '@angular/core';

        @Component({
        selector: 'app-list',
        templateUrl: './list.component.html'
        })
        export class ListComponent implements OnInit {

        constructor() { }

        ngOnInit(): void {
        }

        avengers: string[] = ['Spiderman', 'Hulk', 'Black Widow', 'Thor', 'Vision', 'Scarlet Witch'];
        deleteAvenger: string = '';


        // delete method
        deleteHeroes(){
            this.deleteAvenger = this.avengers.shift() || '';
        }
    }

    ```
## 7. Button 'click' event
To bind to an event you use the Angular event binding syntax. This syntax consists of a target event name within parentheses to the left of an equal sign, and a quoted template statement to the right.

```
<button (click)="methodName">Save</button>
```

## 8. ngFor
We've put in our previous code that we want to print every avenger in a list. To do this we can make a simple iteration with an for loop. This logic an be implemented with a **ngFor** instruction.

We've declared in our component's typescript file an initial Aray with the avenger's names
```
export class ListComponent {
    avengers: string[] = ['Spiderman', 'Hulk', 'Black Widow', 'Thor', 'Vision', 'Scarlet Witch'];
}
```
This variables in the class export action are present in our html template to use them


```
<h1>Avengers List!</h1>

<ul>
    <!-- Iteraring with Angular for loop instruction-->

    <li 
        *ngFor="let avenger of avengers; let i = index"
    >
        {{ i+1 }} - {{ avenger }}
    </li>
</ul>
```
## 9. ngIf
With the same logic, we can use the **if statement** todeclare any condition that we need.

We've declared in our component's typescript file an initial Aray with the avenger's names and a variable called 'deleteAvenger' to show how Angular deal with an array content.
```
export class ListComponent {
     avengers: string[] = ['Spiderman', 'Hulk', 'Black Widow', 'Thor', 'Vision', 'Scarlet Witch'];

    deleteAvenger: string = '';
}
```
We want to make our code delete the first array's element( avenger) when we press a button. Additionally we want to render a message when there isn't any avenger deleted or the avenger's name when he/she is deleted.

```
<h3 
    *ngIf="deleteAvenger else notDeleted" 
    >
    Deleted Avenger: {{ deleteAvenger }}
</h3> 

<ng-template #notDeleted>
    <h3>Nobody was deleted!</h3>
</ng-template>

<!-- delete button -->
<button (click)="deleteHeroes()"> Delete Heroes </button>
```
**IMPORTANT 1.0**: We can declare this logic with a simple if statement ike the following code:
```
<h2 
    *ngIf="deleteAvenger"
>   Deleted Avenger: {{ deleteAvenger }}
</h2> 

<h2
    *ngIf="!deleteAvenger"
>   Nobody was deleted
</h2>
```

**IMORTANT 2.0**: In this case we've declared an if/else statement linking it with an angular **ng-templeate**'s id. It allows us to display any content when a ng-template is called.

In the last code line, we can see how we've declared an button click event calling a method named 'deleteHeroes()', This method is defined in our list.component.ts.




# Angualr Bases II: WorkFlow
In this section we're going to study how Angular works with a proper and simple structure using a form to store and render a character's list.


## 1. Modules
First of all we need a module to connect this component with the rest of our app. For this we're going to create or generate our module:
```
ng generate module dbzModule
```
Or
```
ng g m dbzModule
```

When we're created our module we will define:
- Declarations: components inside our globalcomponent that we want to use inside it
- Imports: angular components that our component will use
- providers: angular services that our component requires.

At the end our **dbz.module.ts** will have like this example:
```
import { NgModule } from '@angular/core';

//Usually we are going to work with ngFor, ngIf , etc
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


// Components
import { MainPageComponent } from './main-page/main-page.component';
import { CharactersComponent } from './characters/characters.component';
import { AddCharacterComponent } from './add-character/add-character.component';

// Services
import { DbzService } from './services/dbz.service';




@NgModule({
  declarations: [
    MainPageComponent,
    CharactersComponent,
    AddCharacterComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[
    MainPageComponent,
    FormsModule
  ],
  providers:[
    DbzService
  ]
})
export class DbzModule { }

```

## 2. Services
A good practice for our project is define the component's logic into the same service to keep clean our code.
To generate a service we can do it manually or we can generate it with the following command:
```
ng generate service dbz
```
Or
```
ng g s dbz
```
A Service's code will look like this example: 

```
/*
Components shouldn't fetch or save 
data directly and they certainly shouldn't 
knowingly present fake data. They should focus
on presenting data and delegate data access to a service.
*/

import { Injectable } from "@angular/core";

// Typescript interfaces
import { Character } from "../interfaces/dbz.interface";

@Injectable()

export class DbzService {
    // we declare a characters array to store them
    // declared as private to protect this array
    private _characters: Character[] = [
        {
            name: 'Goku',
            power: 20000
        },
        {
            name: 'Vegeta',
            power: 19000
        }
    ]; 
    
    get characters(): Character[]{
        // break the reference to protect our data 
        return [...this._characters];
    }

    constructor(){
        console.log("Service Initialized");
    }

    // methods
    addCharacter(characterToAdd: Character){
        // we want to edit our private data
        this._characters.push(characterToAdd);
    }
}
```
## 3. Components
At this point we are going to deal with the different parts of our component. In this case we want to crate a pair of columns. The first one will render in a list the content of a character's array, and the second one will be a simple form to introduce our data. We can call these two component inside a third one as main component. With this structure we've:

- **main-page**
- **characters**
- **add-character**


### 3.1 main-page

- **main-page/main-page.component.html**

    A simple html template to render our components
    ```
    <p>Dragon Ball Z</p>
    <hr> 

    <div class="row">
        <div class="col">
            <!-- characters module -->        
            <app-characters></app-characters>
        </div>
        <div class="col">
            <app-add-character></app-add-character>
        </div>
    </div> 
    ```

- **main-page/main-page.component.ts**
    We need to understand that our typescript component will declare a single component value and a service injection in the class constructor to use all the logic that our component requires.

    ```
    import { Component, OnInit } from '@angular/core';

    // typescript interface
    import { Character } from '../interfaces/dbz.interface';
    import { DbzService } from '../services/dbz.service';

    @Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: []
    })
    export class MainPageComponent implements OnInit {

    ngOnInit(): void {
    }

    // default component value
    defaultChar: Character = {
        name: 'Mr. Satan',
        power: 10
    }

    // constructor to crate a service instance
    constructor(private dbzService: DbzService){ }// dependence insjection
    }

    ```

### 3.2 characters

- **characters/characters.component.html**

    A simple html template to render our components
    ```
    <h3>Characters</h3>
    <hr>
    <ul>
        <li *ngFor="let character of characters"> 
            {{ character.name }} - {{ character.power | number}}
        </li>
        <!-- 
            We can use pipes to transform strings, currency amounts, dates, and other data for display
        -->
    </ul>
    ```

- **characters/characters.component.ts**
    In this case we want to access to thearrays data and render them in the html template. 

    ```
    import { Component, OnInit } from '@angular/core';

    // typescript interface
    import { Character } from '../interfaces/dbz.interface';
    import { DbzService } from '../services/dbz.service';

    @Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: []
    })
    export class MainPageComponent implements OnInit {

    ngOnInit(): void {
    }

    // default component value
    defaultChar: Character = {
        name: 'Mr. Satan',
        power: 10
    }

    // constructor to crate a service instance
    constructor(private dbzService: DbzService){ }// dependence insjection
    }

    ```

### 3.3 add-character - ngModel

- **add-character/add-character.component.html**

    A simple html  form to introduce our data
    ```
    <h3>Add: <small>{{ childDefaultCharacter.name }}</small></h3>
    <hr>
    <!-- we use an Angular module to this form - ngSubmit - -->
    <form (ngSubmit)="addCharacter()">
        <input 
            type="text" 
            placeholder="Name" 

            name="name"
            [(ngModel)]="childDefaultCharacter.name"
            
        />
        <input 
            type="number" 
            placeholder="Power Level" 

            name="power"
            [(ngModel)]="childDefaultCharacter.power"
        />
        <button type="submit">Add </button>
    </form>
    ```
**NOTE:** We've declared an order in our second input to listen[] and emit() an event, In this case we emit our character's 'name' and  'power'.

- **add-character/add-character.component.ts**

    In this case we want to do a couple of things:

    - Declare a variable as input with default data(we can let them empty)

        ```
        //object to deal with form information
        @Input() childDefaultCharacter: Character = {
            name: 'Yamcha',
            power: 1
        }
        ```
    - Declare the class constructor wit hte service injection

        ```
        //service injections
        constructor(private dbzService:DbzService) {}
        ```
    - A mehtod to call our service method
        ```
        addCharacter(){
        if(this.childDefaultCharacter.name.trim().length === 0) return; 
        
        // calling service method
        this.dbzService.addCharacter(this.childDefaultCharacter);

        // refresh input value
        this.childDefaultCharacter = {name: '', power:0};
        
        }
        ```

    At the end we'll have a component like the following:

    ```
    import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

    // typescript interface
    import { Character } from '../interfaces/dbz.interface';
    import { DbzService } from '../services/dbz.service';

    @Component({
    selector: 'app-add-character',
    templateUrl: './add-character.component.html',
    styleUrls: []
    })
    export class AddCharacterComponent implements OnInit {

        ngOnInit(): void {
        }

        //object to deal with form information
        @Input() childDefaultCharacter: Character = {
            name: 'Yamcha',
            power: 1
        }

        //service injections
        constructor(private dbzService:DbzService) {}
        
        addCharacter(){
            if(this.childDefaultCharacter.name.trim().length === 0) return; 
            
            // calling service method
            this.dbzService.addCharacter(this.childDefaultCharacter);

            // refresh input value
            this.childDefaultCharacter = {name: '', power:0};
            
        }
    }

    ```
## 4. @Input
Decorator that marks a class field as an input property and supplies configuration metadata. The input property is bound to a DOM property in the template. During change detection, Angular automatically updates the data property with the DOM property's value.

```
@Input() childDefaultCharacter: Character = {
    name: 'Yamcha',
    power: 1
}
```
It means that our @Input(), childDefaultCharacter is going to come from the parent component. In this case the parent component is 'main-page' and we could see that we passed to this component the 'defaultChar' object to the add-character.component 'childDefaultCharacter'.

```
<p>Dragon Ball Z</p>
<hr> 

<div class="row">
    <div class="col">
        ...
    </div>
    <div class="col">
        <!-- Add character Module -->
        <app-add-character 

            [childDefaultCharacter]="defaultChar"

        ></app-add-character>
    </div>
</div> 
```

## 5. @Output

Decorator that marks a class field as an output property and supplies configuration metadata. The DOM property bound to the output property is automatically updated during change detection.

We use it to emit an event in the component to add a character:

- 1. add-character.component.html
```
<h3>Add: <small>{{ childDefaultCharacter.name }}</small></h3>
<hr>
<!-- we use an Angular module to this form - ngSubmit - -->
<form (ngSubmit)="addCharacter()">
    <input 
        type="text" 
        placeholder="Name" 

        [value]="newCharacter.name" //listen to the event
        (input)="changeName($event)" // emit the event
        
    />
    <input 
        type="number" 
        placeholder="Power Level" 

        [value]="newCharacter.power" //listen to the event
        (input)="changeName($event)" // emit the event
    />
    <button type="submit">Add </button>
</form>
```
- 2. add-character.component.ts
```
//object to deal with form information
@Input() childDefaultCharacter: Character = {
    name: '',
    power: 0
}

// emit event to send character info
@Output() outNewChar: EventEmitter<Character>  = new EventEmitter<Character>();


addCharacter(){
// To avoid Angular to refresh every time we press the button
// event.preventDefault();

if(this.childDefaultCharacter.name.trim().length === 0) return; 

// emit the event listener
this.outNewChar.emit(this.childDefaultCharacter);

// refresh input value
this.childDefaultCharacter = {name: '', power:0};

}
```





















