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
