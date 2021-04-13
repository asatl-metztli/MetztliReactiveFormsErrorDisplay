import { Component, ContentChildren, Injector, Input, OnInit, QueryList, AfterContentInit} from '@angular/core';
import { ControlValueAccessor, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ErrorDisplayDirective } from './error-display-directive';

@Component({
  selector: 'errdisplay',
  template: `
  <ng-container *ngIf="ngControl && ngControl.errors && (ngControl.dirty || showPristine)">
    <ng-container *ngIf="errorTemplate">
      <ng-container *ngFor="let error of getErrors()" >
        <ng-container *ngTemplateOutlet="errorTemplate; context: {$implicit: error}"></ng-container>
      </ng-container>
    </ng-container>
    <ng-container *ngIf="!errorTemplate">
      <ul>
        <ng-container *ngFor="let error of getErrors()" >
          <li style="color:red;">{{error}}</li>
        </ng-container>
      </ul>
    </ng-container>
   </ng-container>
  `,
  providers:[
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: NgxMezErrorDisplayComponent
    }
  ]
})
export class NgxMezErrorDisplayComponent implements OnInit, ControlValueAccessor, AfterContentInit {

  @Input() formControlName: string|null = null;
  @Input() showPristine: boolean = false;
  @Input() errorMessages: {[key:string]:string} = {};
  @Input() defaultErrors:{[key:string]:string}={};
  @ContentChildren(ErrorDisplayDirective) templates: QueryList<any>;

  errorTemplate: ErrorDisplayDirective;

  ngControl:NgControl | null = null;


  debug = {'ngOnInit':false, 'ngAfterContentInit':false, 'templates':false};

  onModelChange = (_:any)=>{}
  onTouch = () => {};
  constructor(
    private injector:Injector
  ) { }

  ngOnInit(): void {
    if(this.formControlName){
      this.ngControl = this.injector.get(NgControl);
      if (this.debug['ngOnInit']){
        console.log('check check')
        console.log('ngcontrol')
        console.log(this.ngControl)
        console.log('ngcontrol errors')
        console.log(this.ngControl.errors)
        console.log('ngcontrol valid')
        console.log(this.ngControl.valid)
      }
      
    }    
  }

  ngAfterContentInit(){
    if(this.debug['templates']){
      console.log("templates")
      console.log(this.templates)
    }
    this.templates.forEach( template=>{
      this.errorTemplate = template.template;
    })
    if(this.debug['ngAfterContentInit']) { 
      console.log("after contentinit")
      console.log(this.ngControl)
      console.log(this.ngControl?.errors)
    }
    
  }


  getErrors():string[] {
    let res:string[] = [];
    let counter = 0;
    if(this.ngControl !== null && this.ngControl.control){
      if(this.ngControl.control.errors!=null){
      Object.keys(this.ngControl.control.errors).forEach( key =>{
        let errorMessage = this.errorMessages[key];
        if( errorMessage) {
          res.push(errorMessage);
        } else {
          let errorMessage = this.defaultErrors[key];
          if (errorMessage) {
            res.push(errorMessage)
          } else {
            res.push(`Error: ${key}`)
          }

        }
      })
    }
    }
    return res;
  }

  registerOnChange(val: any){
    this.onChange = val;
  }

  registerOnTouched(val: any){
    this.onTouch = val;
  }

  onChange(){
    console.log("onchange")
  }

  writeValue(val: any){
  }

}
