import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[errorTemplate]',
  host:{}
})
export class ErrorDisplayDirective {
  @Input() type: string = "";

  @Input('errorTemplate') name: string = "any";

  constructor(public template: TemplateRef<any>) { }

  getType(): string {
    return this.name;
  }

}
