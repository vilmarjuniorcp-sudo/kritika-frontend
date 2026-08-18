import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterPage } from './chapter-page';

describe('ChapterPage', () => {
  let component: ChapterPage;
  let fixture: ComponentFixture<ChapterPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChapterPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ChapterPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
