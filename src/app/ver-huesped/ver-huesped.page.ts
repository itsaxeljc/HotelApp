  import { Component, OnInit } from '@angular/core';
import { Huesped } from '../models/huesped';
import { HuespedService } from '../services/huesped.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ver-huesped',
  templateUrl: './ver-huesped.page.html',
  styleUrls: ['./ver-huesped.page.scss'],
})
export class VerHuespedPage implements OnInit {
  public huesped: Huesped;
  countrycode: string = '52';
  whatsappnumber: string = '13111049546';
  url:string='';
  public precioHabitacion = 0;
  public claveHabitacion = 0;
  constructor(
    private huespedService: HuespedService,
    private activatedRouteService: ActivatedRoute
    
  ) {}

  ngOnInit() {
    this.activatedRouteService.queryParams.subscribe((params) => {
      this.huesped = this.huespedService.getHuespedToken(params.token);
    });
    this.url=" https://wa.me/"+this.countrycode+this.whatsappnumber + "?text=Gracias por reservar, aquí tiene su código de acceso: "+ this.huesped.token;
    this.precioHabitacion = this.huespedService.getPrecioHabitacion(this.huesped.token);
    this.claveHabitacion = this.huespedService.getClaveHabitacion(this.huesped.token);
  }
  
  public formatFecha(date:string){
    const dateArray = date.split('-');
    const dateFormat = new Date(dateArray[0]+'/'+dateArray[1]+'/'+dateArray[2]);
    return (dateFormat.toLocaleDateString('es-es',{ weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' }));
  }
}
