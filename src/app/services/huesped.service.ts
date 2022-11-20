import { Injectable } from '@angular/core';
import { Huesped } from '../models/huesped';

@Injectable({
  providedIn: 'root',
})
export class HuespedService {
  public huespedes: Huesped[];

  constructor() {
    this.huespedes = [
      {
        token: 9895257528 + '',
        nombre: 'Bradley Addiel González Flores',
        telefono: '3222131135',
        fecha_ingreso: '21/11/2022',
        fecha_salida: '24/11/2022',
        habitacion: 1,
      },
    ];
  }

  public getHuespedes(): Huesped[] {
    return this.huespedes;
  }

  public crearToken(): string {
    let repeated = false;
    const random = Math.floor(Math.random() * 9000000000) + 1000000000 + '';
    this.huespedes.map((huesped) => {
      if (huesped.token === random) {
        repeated = true;
        this.crearToken();
      }
    });
    return random;
  }

  public borrarHuesped(index: number): Huesped[] {
    this.huespedes.splice(index, 1);
    return this.huespedes;
  }

  public nuevoHuesped(Huesped: Huesped): Huesped[] {
    this.huespedes.push(Huesped);
    this.getHuespedes();
    return this.huespedes;
  }

  public getHuespedToken(token: string): Huesped {
    let item: Huesped;
    item = this.huespedes.find((huesped) => {
      return huesped.token === token;
    });
    return item;
  }
}
