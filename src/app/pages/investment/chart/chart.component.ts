import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables)
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
})
export class ChartComponent implements OnInit {
  private myChart: Chart | null = null;


  ngOnInit() {
    const data: number[] = [12, 19, 3, 5, 2, 3];

    this.updateChart(data);
  }
  updateChart(data: number[]) {
    if (this.myChart) {
      this.myChart.destroy();
    }

    this.myChart = new Chart("myChart", {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: 'Data1',
          data: data,
          backgroundColor: "#0196FD",
          borderColor: "#0196FD",
          borderWidth: 1,
          borderRadius: 50
        },
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
  }

  ngOnDestroy() {
    if (this.myChart) {
      this.myChart.destroy();
    }
  }
}
