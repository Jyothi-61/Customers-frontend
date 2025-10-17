import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Createprofile } from './createprofile';

describe('Createprofile', () => {
  let component: Createprofile;
  let fixture: ComponentFixture<Createprofile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Createprofile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Createprofile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
