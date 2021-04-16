# Metztli Reactive Forms Error Display

This package helps to display errors in Reactive Forms.

## Usage

To show the errors of a form control just add the component `errdisplay` with the same formControlName as the form control.

``` 
  <form [formGroup]="form">
    <input formControlName="controlName"  />
    <errdisplay formControlName="controlName">
    </errdisplay>
  </form>
```

Now every time a validator return an error to the form control, the `errdisplay` will show the error. 

For example if the `Validator.email` is used

```
    this.form = this.formBuilder.group({
      controlName: ['', [Validators.email]]
    })
```
 
 and the input isn't an email, then the following error will be shown.

```
<li>Error: email</li>
```

## Personalized Error Messages

You can use personalized error messages by passing them as parameters

```
<errdisplay fromControlName="controlName"  [errorMessages]="{required:'message1'">
```

This will change the error message from:
```
<li>Error: email</li>
```
to:
```
<li>message1</li>
```

## Showing error messages using a templates

You can use a personalized template using the directive `errorTemplate` in a `ng-template` inside of `errdisplay`.

```
  <errdisplay  formControlName="controlName" >
    <ng-template let-error [errorTemplate]>
      <h1>template text: {{error}}</h1>
    </ng-template>
  </errdisplay>
```

All the error messages will be shown using the template.

```
    <h1>template text: email</h1>
    <h1>template text: required</h1>
```
