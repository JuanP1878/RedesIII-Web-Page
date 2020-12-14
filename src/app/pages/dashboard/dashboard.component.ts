import { WebServiceService } from "./../../Services/web-service.service";
import { Component, OnInit } from "@angular/core";
import { Chart } from "chart.js";
import { Observable } from "rxjs";

@Component({
  selector: "app-dashboard",
  templateUrl: "dashboard.component.html",
})
export class DashboardComponent implements OnInit {
  private intervalUpdate: any = null;
  public chartHUM: any = null;
  public chartTEM: any = null;
  public ctx;
  public canvas;
  hum: any;
  temp: any;
  dataTemp = [];
  dataHum = [];

  constructor(private webService: WebServiceService) {
  }

  ngOnInit(): void {
    this.intervalUpdate = setInterval(
      function () {
        this.showData();
      }.bind(this),
      3000
    );

    //console.log("**")
    this.showData();
    console.log(this.dataHum,this.dataTemp)
    //console.log("***")
    // Gráfica temperatura
    this.canvas = document.getElementById("realtimeTEM");
    this.ctx = this.canvas.getContext("2d");
    var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);
    gradientStroke.addColorStop(1, "rgba(66,134,121,0.15)");
    gradientStroke.addColorStop(0.4, "rgba(66,134,121,0.0)");
    gradientStroke.addColorStop(0, "rgba(66,134,121,0)"); //green colors

    this.chartTEM = new Chart("realtimeTEM", {
      type: "line",
      data: {
        labels: [],
        datasets: [
          {
            fill: true,
            backgroundColor: gradientStroke,
            borderColor: "#00d6b4",
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: "#00d6b4",
            pointBorderColor: "rgba(255,255,255,0)",
            pointHoverBackgroundColor: "#00d6b4",
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
          },
        ]
      },
      options: {
        tooltips: {
          enabled: false,
        },
        legend: {
          display: false,
          position: "bottom",
          labels: {
            fontColor: "white",
          },
        },
        scales: {
          yAxes: [
            {
              ticks: {
                fontColor: "white",
                //beginAtZero: true,
              },
            },
          ],
          xAxes: [
            {
              ticks: {
                fontColor: "white",
                //beginAtZero: true,
              },
            },
          ],
        },
      },
    });

    //Grafica uso de humedad
    this.canvas = document.getElementById("realtimeHUM");
    this.ctx = this.canvas.getContext("2d");
    var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
    gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
    gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

    this.chartHUM = new Chart("realtimeHUM", {
      type: "line",
      data: {
        labels: [],
        datasets: [
          {
            fill: true,
            backgroundColor: gradientStroke,
            borderColor: "#1f8ef1",
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: "#1f8ef1",
            pointBorderColor: "rgba(255,255,255,0)",
            pointHoverBackgroundColor: "#1f8ef1",
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
          },
        ],
      },
      options: {
        tooltips: {
          enabled: false,
        },
        legend: {
          display: false,
          position: "bottom",
          labels: {
            fontColor: "white",
          },
        },
        scales: {
          yAxes: [
            {
              ticks: {
                fontColor: "white",
                // beginAtZero: true,
              },
            },
          ],
          xAxes: [
            {
              ticks: {
                fontColor: "white",
                //beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  }

  private ngOnDestroy(): void {
    clearInterval(this.intervalUpdate);
  }

  getData(): Observable<any> {
    return this.webService.getQueryNode("getSensorData");
  }

  getCurrentData(): Observable<any> {
    return this.webService.getQuery("getCurrentSensorData");
  }

  showData() {
    this.getCurrentData().subscribe(
      (response) => {
        //console.log(response);
        this.temp = response.temp;
        this.hum = response.hum;
        let chartTime: any = new Date();
        chartTime =
          chartTime.getHours() +
          ":" +
          (chartTime.getMinutes() < 10
            ? "0" + chartTime.getMinutes()
            : chartTime.getMinutes()) +
          ":" +
          (chartTime.getSeconds() < 10
            ? "0" + chartTime.getSeconds()
            : chartTime.getSeconds());
        if (this.chartTEM.data.labels.length > 9) {
          this.chartTEM.data.labels.shift();
          this.chartTEM.data.datasets[0].data.shift();

          this.chartHUM.data.labels.shift();
          this.chartHUM.data.datasets[0].data.shift();
        }

        this.chartTEM.data.labels.push(chartTime);
        this.chartTEM.data.datasets[0].data.push(response.temp);
        this.chartTEM.update();

        this.chartHUM.data.labels.push(chartTime);
        this.chartHUM.data.datasets[0].data.push(response.hum);
        this.chartHUM.update();
      },
      (error) => {
        console.error("ERROR: Unexpected response");
      }
    );
  }

}
