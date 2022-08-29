import { Component, OnInit } from '@angular/core';
import { DataCollection } from 'src/app/interfaces/interface';
import { ChartService } from 'src/app/services/chart.service';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styles: [
  ]
})
export class DoughnutChartComponent implements OnInit {
  doughnutStylesData!: DataCollection;
  colors: string[] = new Array(3).fill('');

  constructor(private chartService: ChartService) { }

  ngOnInit(): void {
    this.chartService.getDataSets().subscribe( datasets => {
      datasets.datasets
              .forEach(element=> {
                delete element.borderColor;
                delete element.fill;
                delete element.tension;
                element.backgroundColor = this.colors.map((element) => element = this.getRandomColor());
              });
      this.doughnutStylesData = datasets
    });
  }

  getRandomColor(): string {
    return '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
  }
}
