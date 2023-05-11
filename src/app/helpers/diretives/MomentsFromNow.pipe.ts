import {  Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import momentDurationFormatSetup from "moment-duration-format";
import { truncateDecimals } from '../HelperFunctions';
momentDurationFormatSetup(moment);

@Pipe({name: 'fromnow'})
export class MomentsFromNowPipe  implements PipeTransform{
  constructor() { }

  transform(value: Date, ...args: any[]) : string {
    let valueAsMoment = moment(value);

    return valueAsMoment.fromNow()
  }
}

@Pipe({name: 'playtime'})
export class SecondsToPlaytimePipe  implements PipeTransform{
  constructor() {  }

  transform(value: number, ...args: any[]) : string {
    let valueAsDuration = moment.duration(value, 'seconds');

    return valueAsDuration.format("*hh:mm:ss:SS")
  }
}

@Pipe({name: 'percentage'})
export class PercentagePipe  implements PipeTransform{
  constructor() {  }

  transform(value: number, ...args: any[]) : string {
    let percentual = value * 100;

    return `${Math.trunc(percentual)}%`
  }
}

