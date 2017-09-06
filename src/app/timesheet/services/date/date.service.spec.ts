import { DateService } from './date.service';

describe('@service: Date', () => {
  const baseDate = new Date(`2017-09-04T00:00:00.000Z`);

  let dateService: DateService;

  beforeEach(() => {
    jasmine.clock().install();
    jasmine.clock().mockDate(baseDate);

    dateService = new DateService();
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  describe('now ()', () => {
    it('expected date', () => {
      expect(dateService.now()).toEqual(baseDate);
    });
  });
});
