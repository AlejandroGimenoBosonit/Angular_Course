import { Directive, Input, TemplateRef, ViewContainerRef  } from '@angular/core';

@Directive({
  selector: '[customIf]'
})
export class CustomIfDirective {

  @Input() set customIf( condition: boolean ) {
    if ( condition ) {
      this.viewContainer.createEmbeddedView( this.templateRef );
    } else {
      this.viewContainer.clear();
    }
  }

  constructor(
    private templateRef: TemplateRef<HTMLElement>,
    private viewContainer: ViewContainerRef
  ) {}


}
