import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ErrorDisplayDirective } from './error-display-directive';

import { NgxMezErrorDisplayComponent } from './ngx-mez-error-display.component';

describe('NgxMezErrorDisplayComponent', () => {
  let component: NgxMezErrorDisplayComponent;
  let fixture: ComponentFixture<NgxMezErrorDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxMezErrorDisplayComponent ],
      imports: [ ReactiveFormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxMezErrorDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('component is created', () => {
    expect(component).toBeTruthy();
  });


    
});



describe('Testing component with checkpristine=true', () => {
  let wrapperFixture: ComponentFixture<FormPristineControlInputRequiredEmailMinlength>;
  let wrapper: FormPristineControlInputRequiredEmailMinlength;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxMezErrorDisplayComponent, FormPristineControlInputRequiredEmailMinlength ],
      imports: [ ReactiveFormsModule]
    })
    .compileComponents();
  });


  beforeEach(()=>{
    wrapperFixture = TestBed.createComponent(FormPristineControlInputRequiredEmailMinlength);
    wrapper = wrapperFixture.componentInstance;
    wrapperFixture.detectChanges();

  })

  it('Testing creation', ()=>{
    expect(wrapper).toBeTruthy()
  });

  it('Testing clean form', ()=> {
    let username = wrapper.form.controls['username'];

    let errors = wrapperFixture.debugElement.queryAll(By.css('li'));
    expect(username.errors!['required']).toBeTruthy();
    expect(username.errors!['email']).toBeFalsy();
    expect(errors.length).toBe(1)
    if(errors.length === 1)
      expect(errors[0].nativeElement.innerText==="Error: required").toBeTrue();
    else{
      console.log(errors)
    }

  })


  it('Testing update from one error to another', () => {
    let username = wrapper.form.controls['username'];
    username.setValue('holas');
    wrapperFixture.detectChanges();
    let errors = wrapperFixture.debugElement.queryAll(By.css('li'));

    expect(username.errors!['required']).toBeFalsy();
    expect(username.errors!['email']).toBeTruthy();
    expect(errors.length).toBe(1)
    if(errors.length == 1)
      expect(errors[0].nativeElement.innerText==="Error: email").toBeTrue();
  });

  it('Testing update from one error to no error', () => {
    let username = wrapper.form.controls['username'];
    username.setValue('hola@gmail.com');
    wrapperFixture.detectChanges();
    let errors = wrapperFixture.debugElement.queryAll(By.css('li'));

    expect(username.errors).toBeFalsy();
    expect(errors.length).toBe(0)
  });

  it('Testing updated from 1 error to 2 errors', ()=>{
    let username = wrapper.form.controls['username'];
    username.setValue('hola@gmail.com');
    wrapperFixture.detectChanges();
    username.setValue('a')
    wrapperFixture.detectChanges();
    let errors = wrapperFixture.debugElement.queryAll(By.css('li'));

    expect(username.errors).toBeTruthy();
    expect(errors.length).toBe(2)
    if(errors.length == 2){
      expect(errors[0].nativeElement.innerText==="Error: email");
      expect(errors[1].nativeElement.innerText==="Error: minlength");
    }
    
    
  })
})


@Component({
  template:`
  <form [formGroup]="form">
    <input formControlName="username"  />
    <errdisplay [showPristine]="true" formControlName="username">
    </errdisplay>
  </form>
  `
})
class FormPristineControlInputRequiredEmailMinlength {
  public form: FormGroup;

  constructor(private formBuilder: FormBuilder){
    this.form = this.formBuilder.group({
      username: [{value:'', disabled: false}, [Validators.required, Validators.email, Validators.minLength(5)]]
    })

  }
}

describe('Testing component without checkpristine', ()=> {
  let fixture : ComponentFixture<FormControlInputRequired>;
  let wrapper : FormControlInputRequired;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxMezErrorDisplayComponent, FormControlInputRequired ],
      imports: [ ReactiveFormsModule]
    })
    .compileComponents();
  });


  beforeEach(()=>{
    fixture = TestBed.createComponent(FormControlInputRequired);
    wrapper = fixture.componentInstance;
    fixture.detectChanges();

  })

  it('clean form', ()=>{
    let username = wrapper.form.controls['username'];

    let errors = fixture.debugElement.queryAll(By.css('li'));
    expect(username.errors!['required']).toBeTruthy();
    expect(errors.length).toBe(0)
  })

  it('filled', ()=>{
    let username = wrapper.form.controls['username'];
    username.setValue('hola')
    fixture.detectChanges();
    

    let errors = fixture.debugElement.queryAll(By.css('li'));
    expect(username.errors).toBeFalsy();
    expect(errors.length).toBe(0)

  })

  it('filled and emptied', ()=>{
    let username = wrapper.form.controls['username'];
    let inputn = fixture.debugElement.queryAll(By.css('input'))[0].nativeElement;

    inputn.setvalue="hola";
    inputn.dispatchEvent(new Event('input'))
    fixture.detectChanges()

    inputn.setvalue="";
    inputn.dispatchEvent(new Event('input'));

    fixture.detectChanges()


    let errors = fixture.debugElement.queryAll(By.css('li'));
    if(username.errors){
      expect(username.errors['required']).toBeTruthy();
    }
    else{
      expect(username.errors).toBeTruthy();
    }
    expect(errors.length).toBe(1);
    if(errors.length == 1)
      expect(errors[0].nativeElement.innerText).toMatch("Error: required")

  })

})

@Component({
  template:`
  <form [formGroup]="form">
    <input formControlName="username"  />
    <errdisplay formControlName="username">
    </errdisplay>
  </form>
  `
})
class FormControlInputRequired {
  public form: FormGroup;

  constructor(private formBuilder: FormBuilder){
    this.form = this.formBuilder.group({
      username: [{value:'', disabled: false}, [Validators.required]]
    })

  }
}

describe("error with template",()=>{
  let fixture: ComponentFixture<FormControlInputRequiredTemplate>;
  let wrapper: FormControlInputRequiredTemplate;

  beforeEach(async ()=>{
    await TestBed.configureTestingModule({
      declarations: [FormControlInputRequiredTemplate, NgxMezErrorDisplayComponent, ErrorDisplayDirective],
      imports:[ReactiveFormsModule]
    })
  });

  beforeEach(()=>{
    fixture = TestBed.createComponent(FormControlInputRequiredTemplate);
    wrapper = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("creation of component with templatetemplate", ()=>{
    expect(wrapper).toBeTruthy();
  });

  it("clean component with template", ()=>{
    let username = wrapper.form.controls["username"];
    let errors = fixture.debugElement.queryAll(By.css("errormsg"));

    expect(username.value).toMatch("");
    expect(errors.length).toBe(0);

  });

  it("component with template with error", ()=> {
    let username = wrapper.form.controls["username"];
    
    let inputn = fixture.debugElement.queryAll(By.css('input'))[0].nativeElement;

    inputn.setvalue="hola";
    inputn.dispatchEvent(new Event('input'))
    fixture.detectChanges()
    
    let errors = fixture.debugElement.queryAll(By.css(".errormsg"));

    expect(errors.length).toBe(1);
    if(errors.length == 1){
      let errormsg = errors[0].nativeElement.innerText;
      expect(errormsg).toMatch("template: Error: required");
    }else{
      console.log(`errors:`)
      console.log(errors)
    }
  })
})

@Component({
  template:`
  <form [formGroup]="form">
    <input formControlName="username"  />
    <errdisplay  formControlName="username" >
      <ng-template let-error [errorTemplate]>
        <div class="errormsg">
          template: {{error}}
        </div>
      </ng-template>
    </errdisplay>
  </form>
  `
})
class FormControlInputRequiredTemplate {
  public form: FormGroup;

  constructor(private formBuilder: FormBuilder){
    this.form = this.formBuilder.group({
      username: [{value:'', disabled: false}, [Validators.required, Validators.minLength(5)]]
    })

  }
}

describe("testing personalized error messages", ()=>{
  let fixture: ComponentFixture<FormControlInputMinlenEmailMaxLenErrorMessage>;
  let wrapper: FormControlInputMinlenEmailMaxLenErrorMessage;

  beforeEach(async ()=>{
    await TestBed.configureTestingModule({
      declarations: [FormControlInputMinlenEmailMaxLenErrorMessage, NgxMezErrorDisplayComponent, ErrorDisplayDirective],
      imports: [ReactiveFormsModule, FormsModule]
    })
  });

  beforeEach(()=>{
    fixture = TestBed.createComponent(FormControlInputMinlenEmailMaxLenErrorMessage);
    wrapper = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("creating component",()=>{
    expect(wrapper).toBeTruthy();
  });

  it("testing clean", ()=>{
    let inputn = fixture.debugElement.query(By.css("input")).nativeElement;
    let errors = fixture.debugElement.queryAll(By.css("li"));

    expect(errors.length).toBe(0);

    if (errors.length !=0){
      console.log("errors:")
      console.log(errors)
    }
    
  });

  it("single error personalised",()=>{
    let inputn = fixture.debugElement.queryAll(By.css("input"))[0].nativeElement;

    inputn.value="a@b.c";
    inputn.dispatchEvent(new Event('input', {bubbles:true}));
    fixture.detectChanges();

    let errors = fixture.debugElement.queryAll(By.css("li"));


    expect(errors.length).toBe(1);
    if (errors.length == 1){
      expect(errors[0].nativeElement.innerText).toMatch("message1");
    } else {
      console.log("errors:");
      console.log(errors)
    }


  })
  
  it("double error personalised",()=>{
    let inputn = fixture.debugElement.queryAll(By.css("input"))[0].nativeElement;

    inputn.value="a";
    inputn.dispatchEvent(new Event('input', {bubbles:true}));
    fixture.detectChanges();

    let errors = fixture.debugElement.queryAll(By.css("li"));


    expect(errors.length).toBe(2);
    if (errors.length == 2){
      expect(errors[0].nativeElement.innerText).toMatch("message1");
      expect(errors[1].nativeElement.innerText).toMatch("message2");
    } else {
      console.log("errors:");
      console.log(errors)
    }


  })

  it("error generic",()=>{
    let inputn = fixture.debugElement.queryAll(By.css("input"))[0].nativeElement;

    inputn.value="a12345678@mail.com";
    inputn.dispatchEvent(new Event('input', {bubbles:true}));
    fixture.detectChanges();

    let errors = fixture.debugElement.queryAll(By.css("li"));


    expect(errors.length).toBe(1);
    if (errors.length == 1){
      
      expect(errors[0].nativeElement.innerText).toMatch("Error: maxlength");
    } else {
      console.log("errors:");
      console.log(errors)
    }


  })
})

@Component({
  template:`
  <form [formGroup]="form">
    <input formControlName="username"  />
    <errdisplay  formControlName="username" [errorMessages]="{minlength:'message1', 'email':'message2'}">
    </errdisplay>
  </form>
  `
})
class FormControlInputMinlenEmailMaxLenErrorMessage {
  public form: FormGroup;

  constructor(private formBuilder: FormBuilder){
    this.form = this.formBuilder.group({
      username: [{value:'', disabled: false}, [Validators.minLength(6), Validators.email, Validators.maxLength(10)]]
    })

  }
}
