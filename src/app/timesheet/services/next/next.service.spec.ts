import { NextService } from './next.service';
import { PlacementType } from '../../settings/placementType.enum';
import { Weekdays, FirstDayOfWeek } from '../../settings/weekdays.enum';

function prettifyDateToWeekday (date: number, offset: number = -3): string {
  const day: Weekdays = (date + offset) % 7;
  return Weekdays[day];
}

describe('@service: Next', () => {
  let nextService: NextService;

  beforeEach(() => {
    nextService = new NextService();
  });

  describe('FirstDayOfWeek', () => {
    it('is Monday', () => {
      expect(Weekdays[FirstDayOfWeek])
        .toEqual('monday');
    });
  });

  describe('endOfPeriod', () => {
    it('can handle weekly periods', () => {
      expect(nextService.endOfPeriod)
        .toEqual(jasmine.objectContaining({
          [PlacementType.Weekly]: jasmine.any(Function),
        }));
    });

    describe(`endOfPeriod.${ PlacementType[PlacementType.Weekly] } ()`, () => {
      const type = PlacementType.Weekly;
      const expectedEndOfWeek = new Date('2017-09-10T23:59:59.999Z');

      describe('returns the expected date of next sunday', () => {
        [
          4, // 2017-09-04 is a monday
          5, // ..tuesday
          6, // ..wednesday
          7, // ..thursday
          8, // ..friday
          9, // ..saturday
          10, // ..sunday
        ].map((day: number) => {
          it(`from preceding ${ prettifyDateToWeekday(day) }`, function () {
            expect(nextService.endOfPeriod[type](new Date(`2017-09-${ this.pad(day) }T${ this.randomTimeStamp() }Z`)))
              .toEqual(expectedEndOfWeek);
          });
        });
      });

      describe('does not return the date of next sunday', () => {
        it('from preceding sunday', () => {
          expect(nextService.endOfPeriod[type](new Date(`2017-09-03T00:00:00.000Z`)))
            .not.toEqual(expectedEndOfWeek);
        });

        it('from following monday', () => {
          expect(nextService.endOfPeriod[type](new Date(`2017-09-11T00:00:00.000Z`)))
            .not.toEqual(expectedEndOfWeek);
        });
      });
    });

    it('can handle monthly periods', () => {
      expect(nextService.endOfPeriod)
        .toEqual(jasmine.objectContaining({
          [PlacementType.Monthly]: jasmine.any(Function),
        }));
    });

    describe(`endOfPeriod.${ PlacementType[PlacementType.Monthly] } ()`, () => {
      const type = PlacementType.Monthly;
      const expectedEndOfMonth = new Date('2017-09-30T23:59:59.999Z');

      describe('returns the last date in current month', function () {
        [
          1,
          2,
          Math.floor(Math.random() * (29 - 2 + 1)) + 2,
          29,
          30,
        ].map((day: number) => {
          it(`from ${ day }-09-2017`, function () {
            expect(nextService.endOfPeriod[type](new Date(`2017-09-${ this.pad(day) }T${ this.randomTimeStamp() }Z`)))
              .toEqual(expectedEndOfMonth);
          });
        });
      });

      describe('does not return the last date in current month', () => {
        it('from the preceding month', () => {
          expect(nextService.endOfPeriod[type](new Date(`2017-08-31T00:00:00.000Z`)))
            .not.toEqual(expectedEndOfMonth);
        });

        it('from the following month', () => {
          expect(nextService.endOfPeriod[type](new Date(`2017-10-01T00:00:00.000Z`)))
            .not.toEqual(expectedEndOfMonth);
        });
      });
    });

  });

  describe('startOfPeriod', () => {
    it('can handle weekly periods', () => {
      expect(nextService.startOfPeriod)
        .toEqual(jasmine.objectContaining({
          [PlacementType.Monthly]: jasmine.any(Function),
        }));
    });

    describe(`startOfPeriod.${ PlacementType[PlacementType.Weekly] } ()`, () => {
      const type = PlacementType.Weekly;
      const expectedStartOfWeek = new Date('2017-09-11T00:00:00.000Z');

      describe(`returns the expected date of next monday`, () => {
        [
          4, // 2017-09-04 is a monday
          5, // ..tuesday
          6, // ..wednesday
          7, // ..thursday
          8, // ..friday
          9, // ..saturday
          10, // ..sunday
        ].map((day: number) => {
          it(`from preceding ${ prettifyDateToWeekday(day) }`, function () {
            expect(nextService.startOfPeriod[type](new Date(`2017-09-${ this.pad(day) }T${ this.randomTimeStamp() }Z`)))
              .toEqual(expectedStartOfWeek);
          });
        });
      });

      describe(`does not return the date of next monday`, () => {
        it('from the preceding sunday', () => {
          expect(nextService.startOfPeriod[type](new Date(`2017-09-03T00:00:00.000Z`)))
            .not.toEqual(expectedStartOfWeek);
        });

        it('from the following monday', () => {
          expect(nextService.startOfPeriod[type](new Date(`2017-09-11T00:00:00.000Z`)))
            .not.toEqual(expectedStartOfWeek);
        });
      });
    });

    it('can handle monthly periods', () => {
      expect(nextService.startOfPeriod)
        .toEqual(jasmine.objectContaining({
          [PlacementType.Monthly]: jasmine.any(Function),
        }));
    });

    describe(`startOfPeriod.${ PlacementType[PlacementType.Monthly] } ()`, () => {
      const type = PlacementType.Monthly;
      const expectedStartOfNextMonth = new Date('2017-10-01T00:00:00.000Z');

      describe('returns the first date in next month', () => {
        [
          1,
          2,
          Math.floor(Math.random() * (29 - 2 + 1)) + 2,
          29,
          30,
        ].map((day: number) => {
          it(`from ${ day }-09-2017`, function () {
            expect(nextService.startOfPeriod[type](new Date(`2017-09-${ this.pad(day) }T${ this.randomTimeStamp() }Z`)))
              .toEqual(expectedStartOfNextMonth);
          });
        });
      });

      describe('does not return the first date in next month', () => {
        it('from the preceding month', () => {
          expect(nextService.startOfPeriod[type](new Date(`2017-08-31T00:00:00.000Z`)))
            .not.toEqual(expectedStartOfNextMonth);
        });

        it('from the following month', () => {
          expect(nextService.startOfPeriod[type](new Date(`2017-10-01T00:00:00.000Z`)))
            .not.toEqual(expectedStartOfNextMonth);
        });
      });
    });
  });
});
