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











































