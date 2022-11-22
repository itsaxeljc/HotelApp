import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HuespedService } from 'src/app/services/huesped.service';
import { Huesped } from 'src/app/models/huesped';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.page.html',
  styleUrls: ['./checkin.page.scss'],
})
export class CheckinPage implements OnInit {
  public token: string;
  public allowed = false;
  public huesped: Huesped;
  public now: Date;
  public checkin: Date;

  constructor(private auth:AuthenticationService, private huespedService:HuespedService) {
      this.token = window.localStorage.getItem('token');
      this.huesped = this.huespedService.getHuespedToken(this.token);
      this.validateCheckIn();
   }

  ngOnInit() {
    this.now = new Date();
  }

  validateCheckIn(){
    console.log(this.huesped.fecha_ingreso);
    this.checkin = this.formatDate(this.huesped.fecha_ingreso);
    if(this.now.getTime() > this.checkin.getTime()){
      this.allowed = false;
      console.log("DENEGADO")
    } else{
      this.allowed = true;
      console.log("PERMITIDO")
    }
  }

  formatDate(date: string) {
    var parts = date.split("/");
    console.log(parts[0]+" "+parts[1]+" "+parts[2]+" ");
    return new Date(parseInt(parts[2]), parseInt(parts[1]), parseInt(parts[0]));
  }

}
