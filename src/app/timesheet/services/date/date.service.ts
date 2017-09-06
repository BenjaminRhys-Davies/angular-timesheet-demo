import { Injectable } from '@angular/core';

@Injectable()
export class DateService {
  constructor () {}

  public now (): Date {
    const now: Date = new Date();
    return new Date(Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
    ));
  }
}
