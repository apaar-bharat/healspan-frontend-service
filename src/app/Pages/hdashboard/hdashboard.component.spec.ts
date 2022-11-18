import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HdashboardComponent } from './hdashboard.component';

describe('HdashboardComponent', () => {
  let component: HdashboardComponent;
  let fixture: ComponentFixture<HdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HdashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
