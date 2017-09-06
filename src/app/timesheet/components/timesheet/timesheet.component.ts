import { Component, Input } from '@angular/core';

import { PlacementType } from '../../settings/placementType.enum';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss'],
})
export class TimesheetComponent {
  @Input() id: number;
  @Input() client: string;
  @Input() candidate: string;
  @Input() role: string;
  @Input() type: PlacementType;
  @Input() start: string;
  @Input() end: string;
  @Input() billable: string;

  public placementType = PlacementType;

  constructor () {}
}
