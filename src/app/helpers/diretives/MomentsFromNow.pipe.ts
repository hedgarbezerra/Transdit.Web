import {  Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({name: 'fromnow'})
export class MomentsFromNowPipe  implements PipeTransform{
  constructor() { }

  transform(value: Date, ...args: any[]) : string {
    let valueAsMoment = moment(value);

    return valueAsMoment.fromNow()
  }
}
