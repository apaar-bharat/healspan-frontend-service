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

  it("should create a hospitaluser list in an array", () => {
    //const qouteText = "This is my first post";
    component.GetData();
    expect(component.aprrovalDataList.length).toBeGreaterThanOrEqual(1);
  });
});
