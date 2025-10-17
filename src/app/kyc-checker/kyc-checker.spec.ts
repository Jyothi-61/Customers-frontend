import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KycChecker } from './kyc-checker';

describe('KycChecker', () => {
  let component: KycChecker;
  let fixture: ComponentFixture<KycChecker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KycChecker]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KycChecker);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
