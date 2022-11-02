import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as moment_ from 'moment';
import {Chart, ChartConfiguration} from 'chart.js'
const moment = moment_;


export enum DayRanges {
  ThreeDays = 3,
  SevenDays = 7,
  FourteenDays = 14,
  OneMonth = 30,
  ThreeMonths = 90,
  Custom = 0,
}

export const inputDateFormat = 'YYYY-MM-DD';
export const updateUnit = 'days';
export const DefaultTimeRange = DayRanges.FourteenDays;


@Component({
  selector: 'app-clinic',
  templateUrl: './clinic.component.html',
  styleUrls: ['./clinic.component.css']
})
export class ClinicComponent implements OnInit {
  public dayRanges: typeof DayRanges = DayRanges;
  public selectedRange!: number;
  public customSelection: boolean = false;
  public chart!:Chart;
  public maxDate!: Date;
  public minDate!: Date;

  private _fromDate!: string;
  private _toDate!: string;
  public  cfg: ChartConfiguration = {
    type: 'bar',
    data: {
        labels: ['Jan', 'Feb'],
        datasets: []
    },
  };
  constructor() {
    this.resetUI();
  }

  ngOnInit(): void {
    
    this.setMaxDateRange();

    
   
  }

  public changeFromDate(e: any): void {

    this.fromDate = e.value;
  }

  public changeToDate(e: any): void {
    this.toDate = e.value;
  }

  public resetUI(): void {
    this.selectedRange = DefaultTimeRange;
    this._fromDate = moment().subtract((this.selectedRange - 1), updateUnit).format(inputDateFormat);
    this._toDate = moment().format(inputDateFormat);
  }

  private emitRange(): void {
    // const fromDate = moment(this.fromDate).subtract(1, updateUnit).format(inputDateFormat);
    const fromDate = moment(this.fromDate).format(inputDateFormat);
 
    const toDate = moment(this.toDate).format(inputDateFormat);
  
    this.setMaxDateRange();
  }

  private setMaxDateRange(): void {
    // this.maxDate = moment(this.fromDate).add(3, 'months').toDate();
    this.maxDate = moment(this.fromDate).add(1200, 'm').toDate();    // add moment içindeki değere ne kadar ekleme yapmak istediğimiz
    this.minDate = moment(this.toDate).subtract(1200, 'm').toDate();  // subtract moment içindeki değere ne kadar çıkarma yapmak istedğimiz
    
  }

  public updateRange(range: number): void {
    if (range !== DayRanges.Custom) {
      console.log(range)
      this._fromDate = moment(this.toDate).subtract((range - 1), updateUnit).format(inputDateFormat);
      console.log(this._fromDate)
      this.emitRange();
    }
    this.customSelection = range === DayRanges.Custom;
  }

  public moveRange(forward: boolean = true): void {

    console.log(forward);
    const updateValue = forward ? this.selectedRange : -this.selectedRange;
    console.log(updateValue);
    this._fromDate = moment(this.fromDate).add(updateValue, updateUnit).format(inputDateFormat);
    console.log(this._fromDate);
    this._toDate = moment(this.toDate).add(updateValue, updateUnit).format(inputDateFormat);
    this.emitRange();
  }

  private propagateDateChange(): void {
    this.selectedRange = DayRanges.Custom;
    this.customSelection = true;
    this.emitRange();
  }

  get fromDate(): string {
    return this._fromDate;
  }

  get toDate(): string {
    return this._toDate;
  }

  set fromDate(date: string) {
    this._fromDate = date;
    console.log(this._fromDate)
    this.propagateDateChange();
  }

  set toDate(date: string) {
  console.log(date)
    this._toDate = date;
    this.propagateDateChange();
  }
 }







