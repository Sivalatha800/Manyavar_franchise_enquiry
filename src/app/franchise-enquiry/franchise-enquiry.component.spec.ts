import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchiseEnquiryComponent } from './franchise-enquiry.component';

describe('FranchiseEnquiryComponent', () => {
  let component: FranchiseEnquiryComponent;
  let fixture: ComponentFixture<FranchiseEnquiryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FranchiseEnquiryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FranchiseEnquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
