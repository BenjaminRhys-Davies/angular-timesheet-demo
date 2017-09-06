import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacementType, DefaultPlacementType } from '../../settings/placementType.enum';
import { TimesheetComponent } from './timesheet.component';

describe('@component: Timesheet', () => {
  const expectedTimesheet = {
    id: 99,
    client: 'EXPECTED_CLIENT',
    candidate: 'EXPECTED_CANDIDATE',
    role: 'EDXPECTED_ROLE',
    type: DefaultPlacementType,
    start: 'EXPECTED_START',
    end: 'EXPECTED_END',
  };

  let fixture: ComponentFixture<TimesheetComponent>;
  let component: TimesheetComponent;

  beforeEach((done) => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [TimesheetComponent],
      providers: [],
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(TimesheetComponent);
        component = fixture.debugElement.componentInstance;
        done();
      });
  });

  beforeEach(async(() => {
    component.id = expectedTimesheet.id;
    component.client = expectedTimesheet.client;
    component.candidate = expectedTimesheet.candidate;
    component.role = expectedTimesheet.role;
    component.type = expectedTimesheet.type;
    component.start = expectedTimesheet.start;
    component.end = expectedTimesheet.end;
    fixture.detectChanges(false);
  }));

  afterEach(() => {
    fixture.destroy();
  });

  it('exists', () => {
    expect(fixture.debugElement.nativeElement.querySelector('.timesheet'))
      .toBeTruthy();
  });

  describe('has properties', () => {
    it('placementType', () => {
      expect(component.placementType).toEqual(PlacementType);
    });
  });

  describe('displays the', () => {
    it('id', () => {
      expect(fixture.debugElement.nativeElement.querySelector('.timesheet__id').textContent)
        .toEqual(`${ expectedTimesheet.id }`);
    });

    it('Client Name', () => {
      expect(fixture.debugElement.nativeElement.querySelector('.timesheet__client').textContent)
        .toEqual(expectedTimesheet.client);
    });

    it('Candidate Name', () => {
      expect(fixture.debugElement.nativeElement.querySelector('.timesheet__candidate').textContent)
        .toEqual(expectedTimesheet.candidate);
    });

    it('Job Title', () => {
      expect(fixture.debugElement.nativeElement.querySelector('.timesheet__role').textContent)
        .toEqual(expectedTimesheet.role);
    });

    it('Placement Type', () => {
      expect(fixture.debugElement.nativeElement.querySelector('.timesheet--weekly'))
        .toBeTruthy();
    });

    describe('Placement Date range', () => {
      it('Start Date', () => {
        expect(fixture.debugElement.nativeElement.querySelector('.timesheet__start').textContent)
          .toEqual(expectedTimesheet.start);
      });

      it('End Date', () => {
        expect(fixture.debugElement.nativeElement.querySelector('.timesheet__end').textContent)
          .toEqual(expectedTimesheet.end);
      });
    });

    it('Billable hours', () => {
      expect(fixture.debugElement.nativeElement.querySelector('.timesheet__billable').textContent)
        .toEqual('');
    });
  });
});
