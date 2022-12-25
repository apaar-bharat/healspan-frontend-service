import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OthercostComponent } from './othercost.component';

describe('OthercostComponent', () => {
  let component: OthercostComponent;
  let fixture: ComponentFixture<OthercostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OthercostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OthercostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
