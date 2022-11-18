import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewclaimComponent } from './viewclaim.component';

describe('ViewclaimComponent', () => {
  let component: ViewclaimComponent;
  let fixture: ComponentFixture<ViewclaimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewclaimComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewclaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
