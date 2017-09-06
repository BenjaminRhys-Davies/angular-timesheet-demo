import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';

import { NextService } from '../next/next.service';
import { IPlacement, Placement } from '../../models/placement.model';
import { ITimesheet, Timesheet } from '../../models/timesheet.model';
import { PlacementType } from '../../settings/placementType.enum';

@Injectable()
export class PlacementService {
  private placementSubject: BehaviorSubject<IPlacement> = new BehaviorSubject(undefined);

  constructor (
    private nextService: NextService,
  ) {}

  public submit ({ client, candidate, role, type, start, end }: {
      client: string;
      candidate: string;
      role: string;
      type: PlacementType;
      start: string;
      end: string;
    }
  ) {
    const timesheets: Array<Timesheet> = this.generateTimesheets(type, new Date(start), new Date(end));
    this.placementSubject.next(new Placement({ client, candidate, role, type, timesheets }));
  }

  public clear (): void {
    this.placementSubject.next(undefined);
  }

  get placement (): BehaviorSubject<IPlacement> {
    return this.placementSubject;
  }

  private generateTimesheets (type: PlacementType, placementStart: Date, placementEnd: Date): Array<ITimesheet> {
    const timesheets: Array<ITimesheet> = [];

    let start: Date = placementStart;
    let periodEnd: Date;
    let end: Date;

    while (start < placementEnd) {
      periodEnd = this.nextService.endOfPeriod[type](start);
      end = placementEnd < periodEnd ? placementEnd : periodEnd;

      timesheets.push(new Timesheet({
        start: start.toUTCString().slice(0, -13),
        end: end.toUTCString().slice(0, -13)
      }));
      start = this.nextService.startOfPeriod[type](start);
    }
    return timesheets;
  }
}
