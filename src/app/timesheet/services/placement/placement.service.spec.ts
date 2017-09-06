import { PlacementService } from './placement.service';
import { NextService } from '../next/next.service';
import { PlacementType } from '../../settings/placementType.enum';
import { IPlacement } from '../../models/placement.model';
import { Timesheet } from '../../models/timesheet.model';

describe('@service: Placement', () => {
  let placementService: PlacementService;
  let inputPlacement;

  beforeEach(() => {
    inputPlacement = {
      client: 'EXPECTED_CLIENT',
      candidate: 'EXPECTED_CANDIDATE',
      role: 'EXPECTED_ROLE',
      type: PlacementType.Weekly,
      start: '2017-09-07',
      end: '2017-09-14',
    };

    placementService = new PlacementService(new NextService());
  });

  describe('submit ()', () => {
    let expectedPlacement: IPlacement;

    beforeEach(done => {
      placementService.placement
        .filter((placement: IPlacement): boolean => !!placement)
        .subscribe((placement: IPlacement) => {
          expectedPlacement = placement;
          done();
        });

      placementService.submit(inputPlacement);
    });

    describe('returns expected', () => {
      it('Placement', () => {
        expect(expectedPlacement).toEqual(jasmine.objectContaining({
          client: expectedPlacement.client,
          candidate: expectedPlacement.candidate,
          role: expectedPlacement.role,
          type: expectedPlacement.type,
        }));
      });

      it('timesheets', () => {
        expect(expectedPlacement).toEqual(jasmine.objectContaining({
          timesheets: [
            new Timesheet({ start: 'Thu, 07 Sep 2017', end: 'Sun, 10 Sep 2017' }),
            new Timesheet({ start: 'Mon, 11 Sep 2017', end: 'Thu, 14 Sep 2017' }),
          ]
        }));
      });
    });
  });

  describe('clear ()', () => {
    beforeEach(done => {
      placementService.placement
        .filter((placement: IPlacement): boolean => !!placement)
        .subscribe(done);

      placementService.submit(inputPlacement);
    });

    describe('can clear', () => {
      it('placement', done => {
        placementService.placement
          .filter((placement: IPlacement): boolean => !placement)
          .subscribe((placement: IPlacement) => {
            expect(placement).toBeUndefined();
            done();
          });
        placementService.clear();
      });
    });
  });
});
