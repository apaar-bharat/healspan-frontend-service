import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatclaimComponent } from './creatclaim.component';

describe('CreatclaimComponent', () => {
  let component: CreatclaimComponent;
  let fixture: ComponentFixture<CreatclaimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatclaimComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatclaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
