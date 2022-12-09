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
  public huesped: Huesped = {
        token: 9895257528 + '',
        nombre: 'Bradley Addiel González Flores',
        telefono: '3222131135',
        fecha_ingreso: '2022-11-20',
        fecha_salida: '2022-11-24',
        habitacion: 1,
        anticipo:600
  };
  public huespeds:Huesped[]=[];
  public hoy:string;
  public checkin: string;
  public clave: number=0;

  constructor(private auth:AuthenticationService, private huespedService:HuespedService) {
      this.token = window.localStorage.getItem('token');
      this.huesped = this.huespedService.huesped;
      this.clave = this.huespedService.getClaveHabitacion(this.huesped);
   }

  ngOnInit() {
    this.token = window.localStorage.getItem('id');
    this.formatDate();
    this.validateCheckIn();
  }

  validateCheckIn(){
    console.log(this.huesped.fecha_ingreso);
    console.log(this.hoy);
    this.checkin = this.huesped.fecha_ingreso;
    if(this.hoy < this.huesped.fecha_ingreso || this.hoy > this.huesped.fecha_salida){
      this.allowed = false;
      console.log("DENEGADO")
    } else{
      this.allowed = true;
      console.log("PERMITIDO")
    }
  }

  formatDate() {
    let now = new Date;
    let dd = now.getDate();
    let mm = now.getMonth()+1;
    let yyyy = now.getFullYear()+'';
    let day = dd+'';
    let month = mm+'';
    if(dd<10){
      day = '0'+dd;
    }
    if(mm<10){
      month = '0'+mm;
    }
    this.hoy = yyyy+'-'+mm+'-'+day;
  }
}
