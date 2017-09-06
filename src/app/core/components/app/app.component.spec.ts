import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';

@Component({
  selector: 'app-placement',
  template: `<div class="mock-placement"></div>`
})
class MockPlacementComponent {
  constructor () {}
}

describe('@component: App', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(done => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [
        AppComponent,
        MockPlacementComponent,
      ],
      providers: [],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.debugElement.componentInstance;
        done();
      });
  });

  beforeEach(async(() => {
    fixture.detectChanges(false);
  }));

  afterEach(() => {
    fixture.destroy();
  });

  it('exists', () => {
    expect(fixture.debugElement.nativeElement.querySelector('.app'))
      .toBeTruthy();
  });

  describe('has properties', () => {
    it('company', () => {
      expect(component.company)
        .toEqual('Hard Rock Recruitment');
    });
  });

  describe('displays', () => {

    it('a heading', () => {
      expect(fixture.debugElement.nativeElement.querySelector('.app__header'))
        .toBeTruthy();
    });

    it('placement', () => {
      expect(fixture.debugElement.nativeElement.querySelector('.mock-placement'))
        .toBeTruthy();
    });

    it('a footer', () => {
      expect(fixture.debugElement.nativeElement.querySelector('.app__footer'))
        .toBeTruthy();
    });
  });
});
