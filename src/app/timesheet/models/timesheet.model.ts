import { ITimesheet } from './timesheet.model';

export class Timesheet implements ITimesheet {
  start: string;
  end: string;

  constructor (responseData: any) {
    this.start = responseData.start;
    this.end = responseData.end;
  }
}

export interface ITimesheet {
  start: string;
  end: string;
}
