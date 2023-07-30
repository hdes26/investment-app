import { Component, OnInit } from '@angular/core';
import { Chart , registerables } from 'chart.js';
Chart.register(...registerables)
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  title = 'chartDemo';
  ngOnInit() {
    new Chart("myChart", {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: 'Data1',
          data: [12, 19, 3, 5, 2, 3],
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
}
