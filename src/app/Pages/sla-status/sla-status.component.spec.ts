import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlaStatusComponent } from './sla-status.component';

describe('SlaStatusComponent', () => {
  let component: SlaStatusComponent;
  let fixture: ComponentFixture<SlaStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlaStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlaStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
