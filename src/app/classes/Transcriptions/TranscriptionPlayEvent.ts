export class TranscriptionPlayEvent{
  startTimeSeconds!: number;
  endTimeSeconds!: number;

  constructor(start: number, end: number){
    this.startTimeSeconds = start;
    this.endTimeSeconds = end;
  }
}
