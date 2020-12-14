import { Component, OnInit } from "@angular/core";
import { WebServiceService } from "./../../Services/web-service.service";
import { Observable } from "rxjs";
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: "app-media",
  templateUrl: "./media.component.html",
  styleUrls: ["./media.component.scss"],
})
export class MediaComponent implements OnInit {
  dealTitle: any;
  dealPrice: any;
  dealImg: any;
  dealLink: any;
  dealDate: any;
  idTracks = [
    "48XgkAh1fkcZqA2EZWCDX6",
    "7xRWmHZ2wt3zDgM5mAL0JU",
    "5pUlI3bMpx2GPu7rXBbk0w",
    "2xM9f6WuG5GF6GeTDtPuhs",
    "78M7CiqTpJYoPQKkwjM48Z",
    "3VJSv1RoYiCY4ECGyDO7ry",
    "7JS743HRDpx2NvoNQ39p4O",
    "1IkpQA0SPJilH29vEnocOB",
    "1WvJiky1CYAy6ZhhBVrckj",
    "7wqqITYuu4S9YqVZMlT7OH",
  ];
  nameTracks = [
    "Mi Tío Snoop",
    "Aleman: Bzrp Music Sessions, Vol. 15",
    "Vengo De Nada",
    "ALELUYA - REMIX",
    "Rucón",
    "Me Gusta Lo Simple",
    "G.P.S. - con Aleman",
    "Tantas Veces",
    "Categoría 5 / Huracán",
    "Los Duros",
  ];
  randomNumber: any;
  id:any
  url:any
  constructor(private webService: WebServiceService,private sanitizer: DomSanitizer) {

    this.randomNumber = (Math.random() * (9 - 0)).toFixed(0);
    this.id = this.idTracks[this.randomNumber];
    let aux = `https://open.spotify.com/embed/track/${this.id}`
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(aux);
    this.getData().subscribe((response) => {
      //console.log(response[0]);
      this.dealTitle = response[0].name;
      this.dealPrice = response[0].price;
      this.dealImg = response[0].img_url;
      this.dealLink = response[0].deal_url;
      this.dealDate = response[0].date;
    });
  }

  ngOnInit(): void {}

  getData(): Observable<any> {
    return this.webService.getQueryNode("dotd");
  }
}
