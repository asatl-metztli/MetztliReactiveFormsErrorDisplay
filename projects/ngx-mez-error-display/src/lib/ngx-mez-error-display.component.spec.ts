import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxMezErrorDisplayComponent } from './ngx-mez-error-display.component';

describe('NgxMezErrorDisplayComponent', () => {
  let component: NgxMezErrorDisplayComponent;
  let fixture: ComponentFixture<NgxMezErrorDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxMezErrorDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxMezErrorDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
