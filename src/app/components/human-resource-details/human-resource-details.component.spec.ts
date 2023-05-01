import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HumanResourceDetailsComponent } from './human-resource-details.component';

describe('HumanResourceDetailsComponent', () => {
  let component: HumanResourceDetailsComponent;
  let fixture: ComponentFixture<HumanResourceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HumanResourceDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HumanResourceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
