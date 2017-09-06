import { PlacementType } from '../settings/placementType.enum';
import { ITimesheet } from './timesheet.model';

export class Placement implements IPlacement {
  client: string;
  candidate: string;
  role: string;
  type: PlacementType;
  timesheets: Array<ITimesheet>;

  constructor (responseData: any) {
    this.client = responseData.client;
    this.candidate = responseData.candidate;
    this.role = responseData.role;
    this.type = responseData.type;
    this.timesheets = responseData.timesheets || [];
  }
}

export interface IPlacement {
  client: string;
  candidate: string;
  role: string;
  type: PlacementType;
  timesheets: Array<ITimesheet>;
}
