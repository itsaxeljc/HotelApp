import { Component, OnInit } from '@angular/core';
import { HuespedService } from 'src/app/services/huesped.service';
import { Huesped } from 'src/app/models/huesped';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.page.html',
  styleUrls: ['./checkin.page.scss'],
})
export class CheckinPage implements OnInit {
  public id: string;
  public allowed = false;
  public huesped: Huesped;
  public hoy: string;
  public checkin: string;
  public clave: number;

  constructor(
    private huespedService: HuespedService,
    private activatedRouteService: ActivatedRoute
  ) {
    this.huesped = {
      token: '',
      nombre: '',
      telefono: '',
      fecha_ingreso: '',
      fecha_salida: '',
      habitacion: 0,
      anticipo: 0,
      id: '',
    };
    this.clave = 0;
  }

  ngOnInit() {
    this.huesped = JSON.parse(window.localStorage.getItem('myObject'));
    this.formatDate();
    this.validateCheckIn();
  }

  validateCheckIn() {
    this.checkin = this.huesped.fecha_ingreso;
    if (
      this.hoy < this.huesped.fecha_ingreso ||
      this.hoy > this.huesped.fecha_salida
    ) {
      this.allowed = false;
      console.log('DENEGADO');
    } else {
      this.allowed = true;
      console.log('PERMITIDO');
    }
  }

  formatDate() {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear() + '';
    let day = dd + '';
    let month = mm + '';
    if (dd < 10) {
      day = '0' + dd;
    }
    if (mm < 10) {
      month = '0' + mm;
    }
    this.hoy = yyyy + '-' + mm + '-' + dd;
  }
}
