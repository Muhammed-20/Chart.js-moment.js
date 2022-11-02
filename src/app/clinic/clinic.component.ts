import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import * as moment_ from 'moment';

import * as _ from 'lodash';
const moment = moment_;

import { Chart, ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import DataLabelsPlugin from 'chartjs-plugin-datalabels';


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
  /* @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined; */

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {
        min:0
      },
      y: {
        
        min: 0
      }
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          font: {
            size:14,
           style:'italic'      // chartın üstü 
          }
        }
      },
      datalabels: {
        anchor: 'end',
        align: 'end'
      },
      tooltip: {
        animations: {
         
        },
        backgroundColor:'blue'
      }
    }
  };
  public barChartType: ChartConfiguration['type'] = 'line';
  public barChartPlugins = [
    DataLabelsPlugin
  ];
public months:any = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];
public data:any = [ 65, 59, 80, 81,105, 56, 55, 40];
  public barChartData: ChartConfiguration['data'] = {
    labels: [...this.months ],
    datasets: [
      { data: [ ...this.data ], label: 'Series A' ,backgroundColor:['blue','red','gray'],fill:false},
      { data: [ 28, 48, 40, 19, 86, 27, 90 ,100], label: 'Series B' ,backgroundColor:'black',},
   
    ]
  };

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public randomize(): void {
    // Only Change 3 values
    this.barChartData.datasets[0].data = [
      Math.round(Math.random() * 100),
      59,
      80,
      Math.round(Math.random() * 100),
      56,
      Math.round(Math.random() * 100),
      40 ];

    this.chart?.update();
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







