import { Injectable } from '@angular/core';
import { Weekdays, FirstDayOfWeek } from '../../settings/weekdays.enum';
import { PlacementType } from '../../settings/placementType.enum';

@Injectable()
export class NextService {
  constructor () {}

  public endOfPeriod = {
    [PlacementType.Weekly]: (from: Date): Date => {
      const nextWeekday: Date = this.nextWeekday(from);
      nextWeekday.setUTCHours(0, 0, 0, 0);
      nextWeekday.setUTCMilliseconds(-1);
      return nextWeekday;
    },
    [PlacementType.Monthly]: (from: Date): Date => {
      const nextMonth: Date = this.nextMonth(from);
      nextMonth.setUTCDate(0);
      nextMonth.setUTCHours(23, 59, 59, 999);
      return nextMonth;
    },
  };

  public startOfPeriod = {
    [PlacementType.Weekly]: (from: Date): Date => {
      const nextWeekday: Date = this.nextWeekday(from);
      nextWeekday.setUTCHours(0, 0, 0, 0);
      return nextWeekday;
    },
    [PlacementType.Monthly]: (from: Date): Date => {
      const nextMonth: Date = this.nextMonth(from);
      nextMonth.setUTCHours(0, 0, 0, 0);
      return nextMonth;
    },
  };

  private nextWeekday (from: Date, weekday: Weekdays = FirstDayOfWeek): Date {
    const nextWeekday: Date = new Date(from.getTime());
    nextWeekday.setUTCDate(from.getUTCDate() + (7 + weekday - from.getUTCDay() - 1) % 7 + 1);
    return nextWeekday;
  }

  private nextMonth (from: Date): Date {
    const nextMonth: Date = new Date(from.getTime());
    nextMonth.setUTCMonth((from.getUTCMonth() + 1) % 12, 1);
    return nextMonth;
  }
}
