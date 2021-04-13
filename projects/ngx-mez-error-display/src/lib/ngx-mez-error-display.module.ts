import { NgModule } from '@angular/core';
import { NgxMezErrorDisplayComponent } from './ngx-mez-error-display.component';
import { ErrorDisplayDirective } from './error-display-directive';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [NgxMezErrorDisplayComponent,ErrorDisplayDirective],
  imports: [
    ReactiveFormsModule,
  ],
  exports: [NgxMezErrorDisplayComponent, ErrorDisplayDirective]
})
export class NgxMezErrorDisplayModule { }
