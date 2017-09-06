import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './core/components/app/app.component';

import { PlacementComponent } from './timesheet/components/placement/placement.component';
import { TimesheetComponent } from './timesheet/components/timesheet/timesheet.component';
import { DateService } from './timesheet/services/date/date.service';
import { NextService } from './timesheet/services/next/next.service';
import { PlacementService } from './timesheet/services/placement/placement.service';

@NgModule({
  declarations: [
    AppComponent,
    PlacementComponent,
    TimesheetComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [
    DateService,
    NextService,
    PlacementService,
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
