# GifsApp - How it Works an Angular App?
We're going to study all the components and modules of this project step by step to understand how we can make our components communicate with each other and pass information beetween them.

## Index
[ General Workflow ](#general-workflow)

[ Main Component ](#main-component)

[ Sidebar: Take history from Service ](#sidebar-take-history-from-service)

[ Gifs: Module ](#gifs-module)

[ Gif Search Component: Main Page ](#gif-search-component-main-page)

[ Gif Search Component: Input and @ViewChild](#gif-search-component-input-and-viewchild)

[ Gif Results Component: Taking Info from Service](#gif-results-component-taking-info-from-service)

[ Gif Services ](#gif-services)


## General Workflow
First of all we need to undertand how our app will deal with the information during the component life cycle:

- Main App component.
    
    A main app component will call the rest of our app component. This is the app's global component so we only need to use it to call the other components and modules.

- Sidebar Component

    A lateral sidebar to render an empty array as search history to fill it with every search result.

- Gif component
    - Gifs search component

        A component with only a simple title and a single html input element to enter a query. This query will update our history array calling to the global gif service.

    - Gifs results component

        Once our service's history array is filled with some data results we can call it from our result component and render it.

    - Gifs services

        An Angular service is a section to implement all the logic that our component needs to work properly.

    - Gifs modules

        An angular module will declare all the declarations, exports and imports that our component will use or the components that we want to use outside it.

This is a general folder tree of our project:
```
src
└── app
    │
    ├── gifs
    │   ├── gifs-page
    │   │   ├── gifs-page.component.ts
    │   │   ├── gifs-page.component.html
    │   │   └── gifs-page.component.css
    │   │
    │   ├── gifs-results
    │   │   ├── gifs-results.component.ts
    │   │   ├── gifs-results.component.html
    │   │   └── gifs-results.component.css
    │   │
    │   ├── gifs-search
    │   │   ├── gifs-search.component.ts
    │   │   ├── gifs-search.component.html
    │   │   └── gifs-search.component.css
    │   │
    │   ├── interfaces
    │   │   └── gifs.interfaces.ts
    │   │
    │   ├── services
    │   │   └── gifs.service.ts
    │   │
    │   │
    │   └── gifs.module.ts
    ├── Shared
    │   ├── sidebar
    │   │   ├── sidebar.component.ts
    │   │   ├── sidebar.component.html
    │   │   └── sidebar.component.css
    │   │
    │   └── shared.module.css
    │
    ├── app.component.ts
    ├── app.component.html
    ├── app.component.css
    │ 
    └── app.module.ts

```

## Main Component
In first place, We will work on the main app component. There is thescript where all our code will be ready by modules. In this example our app will render two global sections:

- Lateral Sidebar
- Search & Render Gifs

We're using Bootstrap to deal with styles.
```
<!-- gifsApp\src\app\app.component.html -->

<div class="d-flex">
  <app-sidebar></app-sidebar>
  <app-gifs-page class="container"></app-gifs-page>
</div>
```

## Sidebar: Take history from Service
As we declared in our main app component we are going to work in the "< app-sidebar >< app-sidebar/>" component.

In this component We are going to define a couple of elements to render the desired content:

- A simple title
- Separator
- A group of banners ( buttons ) as search history 

    ```
    src
    └── app
        │
        ├── gifs
        ... ... ...

        ├── Shared
        │   ├── sidebar
        │   │   ├── sidebar.component.ts
        │   │   ├── sidebar.component.html
        │   │   └── sidebar.component.css
        │   │
        │   └── shared.module.css
        │
        ├── app.component.ts
        ├── app.component.html
        ├── app.component.css
        │ 
        └── app.module.ts
    ```

We can see that this component has a method to iterate the gif's service history and iterate it with a ngFor to render as many < a ></ a > elements how we need.

Additionally we want to load previous searchs results when we click in any element. For this we've declared a click event to call a method passing as argument the gif itself. This method will call to a service's method with the parameter we want to search again.

We can see our in this code how it works (Our service's logic will be treated later):

- sidebar.component.html

```
<div class="bg-dark border-right p-3" id="sidebar">
    <h3 class="text-light">GifsApp</h3>

    <hr class="text-white">

    <div class="list-group list-reset">
      <a 
        *ngFor="let gif of history"
        href="#" 
        class="list-group-item list-group-item-action"

        (click)="searchBySidebar( gif )">
        
        {{ gif | titlecase}}
      </a>
    </div>
  </div>
```

- sidebar.component.ts

```
import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  // service injection to access to the service's methods
  constructor(private gifsService: GifsService) { }

  // get history from gifs.service.ts to use in html template
  get history(){
    return this.gifsService.history;
  }

  searchBySidebar( gifText: string ){
    // request
    this.gifsService.searchGifts(gifText);
  }
}

```
    

## Gifs: Module
Like we've learned preciously a module allows us to decide what component we want to be exported, imported and use inside of it.

```
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [
    SidebarComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    SidebarComponent
  ]
})
export class SharedModule { }

```

## Gif Search Component: Main Page  

In the past sections we were learning about the sidebar component. This component was allocated in a 'shared' folder in our app component. But in this case we will study the another global component in a folder called 'gifs' at the same level of 'shared'.

```
src
└── app
    │
    ├── gifs
    │   ├── gifs-page
    │   │   ├── gifs-page.component.ts
    │   │   ├── gifs-page.component.html
    │   │   └── gifs-page.component.css
    │   │

```
In this section we will see our gifs main page or 'gifs-page component' where we'll call a two sub-components to modularize our project in 'search' & 'render results'.

- gifs-page.component.html

    ```

    <div class="row p-3">
        <div class="col">

            <!-- Search component -->
            <app-gifs-search></app-gifs-search>
            <!-- End Search Component -->

        </div>
    </div>
    <hr>
    <div class="row">
        <div class="col">

            <!-- Display Search Results -->
            <app-gifs-results></app-gifs-results>
            <!-- End Display Search Results -->

        </div>
    </div>

    ```

- gifs-page.component.ts
    ```
    import { Component } from '@angular/core';

    @Component({
    selector: 'app-gifs-page',
    templateUrl: './gifs-page.component.html',
    styleUrls: ['./gifs-page.component.css']
    })
    export class GifsPageComponent {

    constructor() { }

    }

    ```

## Gif Search Component: Input and @ViewChild
In this section we'll see how we can introducte data by a html input element and send the info to the service to deal wit it and update a local history.
```
src
└── app
    │
    ├── gifs
    │   ├── gifs-page
    │   │   ├── gifs-page.component.ts
    │   │   ├── gifs-page.component.html
    │   │   └── gifs-page.component.css
    │   │
    ... ... ... ... ... 
    │   │
    │   ├── gifs-search
    │   │   ├── gifs-search.component.ts
    │   │   ├── gifs-search.component.html
    │   │   └── gifs-search.component.css
    │   │
    ... ... ... ... ...
  
    ├── Shared
    ... ... ... ... ...
    │
    ├── app.component.ts
    ├── app.component.html
    ├── app.component.css
    │ 
    └── app.module.ts

```

Where we're using a **form** we use a **ngSubmit** to sent our information and using **ngModule** to listen and switch when we have an data's update like the following example:
```
<form (ngSubmit)="typescriptMethod()" >
    <input 
        type="text" 
        placeholder="Name" 
        name="name"
        [(ngModel)]="childDefaultCharacter.name"
        
    />

    <button type="submit">Add </button>
</form>
```

But this time it's going to be different. In this case we have a unique < input > element to deal with the task to take the query and sent it to the service,so we're going to use an anguar decorator **[@ViewChild](https://angular.io/api/core/ViewChild)**:

- gifs-search.component.html
    ```
    <h5>Search: </h5>
    <input 
        type="text" 
        class="form-control" 
        placeholder="Search gifs..."
        (keyup.enter)="searchMethod()"
        #inputData
    > 
    ```
    Note that we've declared a 'local reference' (#inputData) to associate it with the typescript code using the decorator.

- gifs-search.component.ts
    ```
    import { Component, ElementRef, ViewChild, Input } from '@angular/core';
    import { GifsService } from '../services/gifs.service';

    @Component({
    selector: 'app-gifs-search',
    templateUrl: './gifs-search.component.html',
    styleUrls: ['./gifs-search.component.css']
    })
    export class GifsSearchComponent {

        // service injection to access to the service's methods
        constructor(private gifsService: GifsService) { }

        // View HTML element with a local reference and assign it to a variable
        @ViewChild('inputData') inputData!: ElementRef<HTMLInputElement>;
        
        // method to access to the service's logic
        searchMethod(){
            // console.log(searchQuery);
            const value = this.inputData.nativeElement.value;

            // call service method for API Request
            this.gifsService.searchGifts(value);

            // purge input element
            this.inputData.nativeElement.value = '';
            
        }
    }

    ```
**NOTE:** We've linked our @ViewChild decorator with the local reference (inside the parenthesis) and dump a value to a variable called 'inputData'.

**Typescript Note:** If we make a console log if this element we can see that it's a 'ElementRef' type, but this type it's a generic one (<T=any>), so we need to specify the data type inside .In this case is an html input elment .

Additionally we've used typescript not null assertion (!) to avoid a typescript possibly error or warning "post-fix expression operator may be used to assert that its operand is non-null and  non-undefined in contexts where the type checker is unable to conclude that fact. Specifically, the operation x! produces a value of the type of x with null and undefined excluded."

```
@ViewChild('inputData') inputData!: ElementRef<HTMLInputElement>;
```

## Gif Results Component: Taking Info from Service
As we can see i n the section's title, in this component we want to take the service's history updated with the previous API request in the service(We'll see later) and render as many elements(gifs) as we can. 
```
src
└── app
    │
    ├── gifs
    │   ├── gifs-page
    │   │   ├── gifs-page.component.ts
    │   │   ├── gifs-page.component.html
    │   │   └── gifs-page.component.css
    │   │
    │   ├── gifs-results
    │   │   ├── gifs-results.component.ts
    │   │   ├── gifs-results.component.html
    │   │   └── gifs-results.component.css
    │   │
    │   ├── gifs-search
    │   │   ├── gifs-search.component.ts
    │   │   ├── gifs-search.component.html
    │   │   └── gifs-search.component.css
    │   │
    ... ... ... ...
    ├── Shared
    ... ... ... ... 
    │
    ├── app.component.ts
    ├── app.component.html
    ├── app.component.css
    │ 
    └── app.module.ts

```

To do this our typescrpt component will only make a service's injection and get its history value. This getter will be used by the HTML template to render the content.

- gifs-results.component.ts
    ```
    import { Component } from '@angular/core';
    import { GifsService } from '../services/gifs.service';

    @Component({
    selector: 'app-gifs-results',
    templateUrl: './gifs-results.component.html',
    styleUrls: ['./gifs-results.component.css']
    })
    export class GifsResultsComponent {

        // service injection
        constructor( private gifsService: GifsService ) { }

        // get results from the service injection
        get results(){
            return this.gifsService.results;
        }
    }
    ```
- gifs-results.component.html

    ```
    <div class="row">
        <div
            *ngFor="let gif of results" 
            class="col-md-4 col-sm-6 animate__animated animate__bounceIn animate__faster">
            <div class="card">
                <img 
                [src]="gif.images.downsized_medium.url" 
                [alt]="gif.title"
                class="card-img-top">
                
                <div class="card-body">
                    <p class="card-text">
                        {{ gif.title | titlecase}}
                    </p>
                </div>
            </div>
        </div>
    </div>
    ```

## Gif Services
In this section will study how our app deals with the inputs, process with them using a simple logic, and sent them to the output components.

```
src
└── app
    │
    ├── gifs
    │   ├── gifs-page
    │   │   ├── gifs-page.component.ts
    │   │   ├── gifs-page.component.html
    │   │   └── gifs-page.component.css
    │   │
    │   ├── gifs-results
    │   │   ├── gifs-results.component.ts
    │   │   ├── gifs-results.component.html
    │   │   └── gifs-results.component.css
    │   │
    │   ├── gifs-search
    │   │   ├── gifs-search.component.ts
    │   │   ├── gifs-search.component.html
    │   │   └── gifs-search.component.css
    │   │
    ... ... ... ... ...
    │   │
    │   ├── services
    │   │   └── gifs.service.ts
    ... ... ... ... ... 
    ├── Shared
    │   ├── sidebar
    │   │   ├── sidebar.component.ts
    │   │   ├── sidebar.component.html
    │   │   └── sidebar.component.css
    │   │
    │   └── shared.module.css
    │
    ├── app.component.ts
    ├── app.component.html
    ├── app.component.css
    │ 
    └── app.module.ts

```
This script will do a couple of things: 

- Declare private and public variables
    ```
    private _history  : string[] = [];
    private _apiKey   : string = 'api_key_from_site';
    private urlService: string = 'https://api.giphy.com/v1/gifs';
    private limit     : number = 10;

    public results    : Gif[] = []; 


    ```

- Load browser's local storage for previous session if there is history saved in the class constructor.
    ```
    constructor( private http: HttpClient ) { 
        
        this._history = JSON.parse(localStorage.getItem('history')!) || [];
        
        this.results = JSON.parse(localStorage.getItem('results')!) || []; 
    }
    ```
We are calling the local storage named as 'history' and 'results', converting the objects into strings and update **this._history** and **this.results** value.


- Declare a getter
    ```
    get history(){
        // break the reference to protect our data returning a new array with the first array's elements.

        return [...this._history];
    }
    ```

- Define methods

At his part we have to remember that we only want to do one thing: make a http request to the API and update our history array with the content:

```
searchGifts(searchQuery: string = '') {
    // convert any element to lowercase
    searchQuery = searchQuery.trim().toLocaleLowerCase();

    // previous check for empty strings
    if(searchQuery.length === 0) return;

    // avoid duplicates
    if(!this._history.includes(searchQuery)){
      this._history.unshift(searchQuery);

      // Allow only the 10 first elements
      this._history = this._history.splice(0, 10);

      // saving history in browser's local storage
      localStorage.setItem('history', JSON.stringify(this._history ));
    } 
    

    // Angular Http parameters
    const  httpParams: HttpParams = new HttpParams()
    .set('api_key', this._apiKey)
    .set('q', searchQuery)
    .set('limit', this.limit)
    

    // Angular http request
    this.http
    .get<HTTPResponseType>(`${this.urlService}/search`, { params: httpParams })
    .subscribe(res =>{
      // console.log(res.data);
      this.results = res.data;
      // save in Local Storage results 
      localStorage.setItem('results', JSON.stringify( this.results ))
    });
  }
```
**ATTENTION**: If we didn't wantto use an Angular method to make our request we could use a pure javascript alternative like the following code:

```
// pure js request
fetch(`https://api.giphy.com/v1/gifs/search?api_key=${this._apiKey}&q={searchQuery}&limit=${limit}`)
.then( res => {
    res.json().then(jsonData => {   
    for(let element in jsonData.data){
    console.log(jsonData.data[element].url);
    }
})
})
```
