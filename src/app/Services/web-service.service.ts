import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class WebServiceService {

  constructor(private http:HttpClient) {
    console.log("Servicio Listo");
   }

   getQuery(query: string) {
    const headers:HttpHeaders = new HttpHeaders();
    const url = `http://192.168.15.100:8080/${query}`;
    return this.http.get(url, {headers});
  }

  getQueryNode(query: string) {
    const headers:HttpHeaders = new HttpHeaders();
    const url = `http://192.168.15.100:3000/${query}`;
    return this.http.get(url, {headers});
  }

  sendRequest(url:string){
    return this.getQuery(url);
  }
}
