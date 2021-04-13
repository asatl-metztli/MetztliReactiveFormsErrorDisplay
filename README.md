# Metztli Reactive Forms Error Display

This package helps to display errors in Reactive Forms.

## USage

Just add a component `errdisplay` with the same formControlName as the form control you want to show errors.

  <form [formGroup]="form">
    <input formControlName="controlName"  />
    <errdisplay formControlName="controlName">
    </errdisplay>
  </form>```

If any Validator returns an error it will be shown in the place of the component.

For example if the `Validator.required` is used, then if the input is used and then deleted it will appear the message

<li>Error: required</li>

## Personalized Error Messages

You can use personalized error messages by passing them as parameters

<errdisplay fromControlName="controlName"  [errorMessages]="{required:'message1'">

This example will show

<li>message1</li>

If the error 'required' is present.

## Showing error messages using a templates

You can use a personalized template for `errdisplay` using the directive `errorTemplate` inside of `errdisplay`.

  <errdisplay  formControlName="controlName" >
    <ng-template let-error [errorTemplate]>
      template: {{error}}
    </ng-template>
  </errdisplay>

All the error messages will be shown using the template for each one of them.
