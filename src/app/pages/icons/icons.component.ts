import { WebServiceService } from './../../Services/web-service.service';
import { Component, OnInit } from "@angular/core";
import { stringify } from 'querystring';

@Component({
  selector: "app-icons",
  templateUrl: "icons.component.html"
})
export class IconsComponent implements OnInit {
  devices: Devices[] = [
    {
      nombre: 'Xbox',
      status: '#',
    },
    {
      nombre: 'Ventilador',
      status: '#',
    },
    {
      nombre: 'Televisión',
      status: '#',
    },
    {
      nombre: 'Bocinas',
      status: '#',
    },
    {
      nombre: 'Humo',
      status: '#',
    },
    {
      nombre: 'Luz',
      status: '#',
    },
  ];

  constructor(private webService:WebServiceService) {}

  ngOnInit() {
    this.getStatus();
  }

  getStatus() {
    let lts;
    this.webService.sendRequest('status').subscribe(
      (data: any) => {
        //console.log(data[0]);
        this.devices.forEach((element) => {
          lts = element.nombre;
          element.status = data[0][lts];
        });
        //console.log(this.devices);
      },
      (error: any) => {
        console.log('Error');
        //console.log(error);
      }
    );
  }

  sendRequest(nombre: string, status: string) {
    let nom: any = document.getElementById(nombre);
    //console.log(img.innerHTML);

    if (status == '1') {
      this.webService.sendRequest(`${nombre}/on`).subscribe((data: any) => {
        console.log('Request prender');
      });
      nom.innerHTML = `<a id="nombreOn"> ${nombre} </a>`;
    }else if (status == '0') {
      this.webService.sendRequest(`${nombre}/off`).subscribe((data: any) => {
        console.log('Request apagar');
      });
      nom.innerHTML = `<a id="nombreOff"> ${nombre} </a>`;
    }
    this.getStatus();
    //window.location.reload();
  }

}


export interface Devices {
  nombre: string;
  status: string;
}
