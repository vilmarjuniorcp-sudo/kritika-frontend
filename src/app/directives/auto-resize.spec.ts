import { TestBed } from '@angular/core/testing';
import { AutoResize } from './auto-resize';
import { ElementRef } from '@angular/core';

describe('AutoResize', () => {
  beforeEach(() => {
    const textarea = document.createElement('textarea');
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ElementRef,
          useValue: new ElementRef(textarea)
        }
      ]
    })
  });

  it('should create an instance', () => {
    const directive = TestBed.runInInjectionContext(() => new AutoResize());
    expect(directive).toBeTruthy();
  });
  
});
