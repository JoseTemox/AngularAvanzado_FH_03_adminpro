import { Component, Input, OnInit } from '@angular/core';
import { MultiDataSet, Label, Color } from 'ng2-charts';


@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent implements OnInit {

  @Input() titulo: string = 'Sin titulo';
  @Input('labels') doughnutChartLabels: Label[] = ['Label 1', 'Label 2', 'Label 3'];
  @Input('data') doughnutChartData: MultiDataSet = [
    [350, 450, 200],

  ];

  public colors: Color[] =[
    {backgroundColor: ['#9E120E', '#FF5800','#FFB414']}
  ];


  constructor() { }

  ngOnInit(): void {
  }

}
