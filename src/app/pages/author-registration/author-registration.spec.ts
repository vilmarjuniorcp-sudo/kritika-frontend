import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorRegistration } from './author-registration';

describe('AuthorRegistration', () => {
  let component: AuthorRegistration;
  let fixture: ComponentFixture<AuthorRegistration>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthorRegistration],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthorRegistration);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
