import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { FormsModule } from '@angular/forms';

import { PlacementService } from '../../../timesheet/services/placement/placement.service';
import { PlacementType, DefaultPlacementType } from '../../../timesheet/settings/placementType.enum';
import { PlacementComponent } from './placement.component';

@Component({
  selector: 'app-timesheet',
  template: `<div class="mockTimesheet">
    <p class="mockTimesheet__id">{{id}}</p>
    <p class="mockTimesheet__client">{{client}}</p>
    <p class="mockTimesheet__candidate">{{candidate}}</p>
    <p class="mockTimesheet__role">{{role}}</p>
    <p class="mockTimesheet__type">{{type}}</p>
    <p class="mockTimesheet__start">{{start}}</p>
    <p class="mockTimesheet__end">{{end}}</p>
</div>`
})
class MockTimesheetComponent {
  @Input() id: number;
  @Input() client: string;
  @Input() candidate: string;
  @Input() role: string;
  @Input() type: PlacementType;
  @Input() start: string;
  @Input() end: string;

  constructor () {}
}

class MockPlacementService {
  public getPlacementSpy = () => 'thisIsASpy';
  get placement () {
    return this.getPlacementSpy();
  }

  public submit = () => 'thisIsASpy';
  public clear = () => 'thisIsASpy';
}

describe('@component: Placement', () => {
  const expectedPlacement = {
    client: 'EXPECTED_CLIENT',
    candidate: 'EXPECTED_CLIENT',
    role: 'EXPECTED_CLIENT',
    type: DefaultPlacementType,
    timesheets: [
      { start: 'EXPECTED_START', end: 'EXPECTED_END' },
    ],
  };

  let fixture: ComponentFixture<PlacementComponent>;
  let component: PlacementComponent;

  beforeEach(done => {
    const mockPlacementService = new MockPlacementService();
    spyOn(mockPlacementService, 'getPlacementSpy');
    spyOn(mockPlacementService, 'submit');
    spyOn(mockPlacementService, 'clear');

    TestBed.configureTestingModule({
      imports: [
        FormsModule,
      ],
      declarations: [
        PlacementComponent,
        MockTimesheetComponent,
      ],
      providers: [
        { provide: PlacementService, useValue: mockPlacementService },
      ],
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(PlacementComponent);
        component = fixture.debugElement.componentInstance;
        done();
      });
  });

  afterEach(() => {
    fixture.destroy();
  });

  describe('has properties', () => {
    beforeEach(async(() => {
      TestBed.get(PlacementService).getPlacementSpy.and.returnValue(Observable.of(undefined));
      fixture.detectChanges(false);
    }));

    it('placementTypes', () => {
      expect(component.placementTypes).toEqual([
        { value: 0, title: 'Weekly' },
        { value: 1, title: 'Monthly' },
      ]);
    });

    it('placement', () => {
      expect(component.placement).toBeUndefined();
    });

    it('defaultPlacementType', () => {
      expect(component.defaultPlacementType).toEqual(DefaultPlacementType);
    });
  });

  describe('With an empty placement', () => {
    beforeEach(async(() => {
      TestBed.get(PlacementService).getPlacementSpy.and.returnValue(Observable.of(undefined));
      fixture.detectChanges(false);
    }));

    describe('displays', () => {
      it('form', () => {
        expect(fixture.debugElement.nativeElement.querySelector('form.placement'))
          .toBeTruthy();
      });

      describe('inputs', () => {
        [
          'client',
          'candidate',
          'role',
          'start',
          'end',
          'type',
        ].map((name: string) => {
          it(name, () => {
            expect(fixture.debugElement.nativeElement.querySelector(`.placement__${ name }`))
              .toBeTruthy();
          });
        });
      });

      it('submit', () => {
        expect(fixture.debugElement.nativeElement.querySelector('.placement__submit'))
          .toBeTruthy();
      });
    });

    describe('Submit', () => {
      const start = '2017-09-01';
      const end = '2017-09-02';

      beforeEach(function () {
        fixture.debugElement.nativeElement.querySelector('.placement__client').value = expectedPlacement.client;
        fixture.debugElement.nativeElement.querySelector('.placement__candidate').value = expectedPlacement.candidate;
        fixture.debugElement.nativeElement.querySelector('.placement__role').value = expectedPlacement.role;
        fixture.debugElement.nativeElement.querySelector('.placement__start').value = start;
        fixture.debugElement.nativeElement.querySelector('.placement__end').value = end;
        fixture.debugElement.nativeElement.querySelector('.placement__submit').click();
        fixture.detectChanges(false);
      });

      it('valid placement', () => {
        expect(TestBed.get(PlacementService).submit)
          .toHaveBeenCalled();
      });
    });
  });

  describe('With a valid placement', () => {
    beforeEach(async(() => {
      TestBed.get(PlacementService).getPlacementSpy.and.returnValue(Observable.of(expectedPlacement));
      fixture.detectChanges(false);
    }));

    describe('displays', () => {
      it('timesheet section', () => {
        expect(fixture.debugElement.nativeElement.querySelector('section.placement'))
          .toBeTruthy();
      });

      it('number of timesheets', () => {
        expect(fixture.debugElement.nativeElement.querySelectorAll('.mockTimesheet').length)
          .toEqual(expectedPlacement.timesheets.length);
      });

      describe('timesheet details', () => {
        it('id', () => {
          expect(fixture.debugElement.nativeElement.querySelector('.mockTimesheet__id').textContent)
            .toEqual('1');
        });

        it('client', () => {
          expect(fixture.debugElement.nativeElement.querySelector('.mockTimesheet__client').textContent)
            .toEqual(expectedPlacement.client);
        });

        it('candidate', () => {
          expect(fixture.debugElement.nativeElement.querySelector('.mockTimesheet__candidate').textContent)
            .toEqual(expectedPlacement.candidate);
        });

        it('role', () => {
          expect(fixture.debugElement.nativeElement.querySelector('.mockTimesheet__role').textContent)
            .toEqual(expectedPlacement.role);
        });

        it('type', () => {
          expect(fixture.debugElement.nativeElement.querySelector('.mockTimesheet__type').textContent)
            .toEqual(`${ expectedPlacement.type }`);
        });

        it('start', () => {
          expect(fixture.debugElement.nativeElement.querySelector('.mockTimesheet__start').textContent)
            .toEqual(expectedPlacement.timesheets[0].start);
        });

        it('end', () => {
          expect(fixture.debugElement.nativeElement.querySelector('.mockTimesheet__end').textContent)
            .toEqual(expectedPlacement.timesheets[0].end);
        });
      });
    });

    describe('buttons', () => {
      [
        'print',
        'clear',
      ].map((name: string) => {
        it(name, () => {
          expect(fixture.debugElement.nativeElement.querySelector(`.placement__${ name }`))
            .toBeTruthy();
        });
      });

      it('can print', () => {
        spyOn(window, 'print');
        fixture.debugElement.nativeElement.querySelector('.placement__print').click();

        expect(window.print).toHaveBeenCalled();
      });

      it('can clear placement', () => {
        fixture.debugElement.nativeElement.querySelector('.placement__clear').click();

        expect(TestBed.get(PlacementService).clear).toHaveBeenCalled();
      });
    });
  });
});
