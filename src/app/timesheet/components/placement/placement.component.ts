import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { IPlacement } from '../../models/placement.model';
import { PlacementService } from '../../../timesheet/services/placement/placement.service';
import { PlacementType, DefaultPlacementType } from '../../../timesheet/settings/placementType.enum';

@Component({
  selector: 'app-placement',
  templateUrl: './placement.component.html',
  styleUrls: ['./placement.component.scss'],
})
export class PlacementComponent implements OnInit {
  public placement: IPlacement;
  public placementTypes: Array<{ value: number; title: string }> = Object.keys(PlacementType)
    .filter(k => isNaN(Number(k)))
    .map(key => ({ value: PlacementType[key], title: key }));
  public defaultPlacementType: PlacementType = DefaultPlacementType;

  constructor (
    private placementService: PlacementService,
  ) {}

  ngOnInit () {
    this.placementService.placement.subscribe((placement: IPlacement) => {
      this.placement = placement;
    });
  }

  public onPrint (): void {
    window.print();
  }

  public onSubmit (placementForm: NgForm): void {
    this.placementService.submit(placementForm.value);
  }

  public onClear (): void {
    this.placementService.clear();
  }
}
