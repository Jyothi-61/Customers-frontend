import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Viewprofile } from './viewprofile';

describe('Viewprofile', () => {
  let component: Viewprofile;
  let fixture: ComponentFixture<Viewprofile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Viewprofile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Viewprofile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
