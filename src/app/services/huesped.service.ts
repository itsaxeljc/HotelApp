import { Injectable } from '@angular/core';
import { Huesped } from '../models/huesped';
import { AuthenticationService } from './authentication.service';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class HuespedService {
  public huespedes: Huesped[];
  public huesped: Huesped;
  public habitaciones = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  public precioHabitaciones = [
    2300, 1200, 1500, 3100, 4000, 2500, 1300, 1300, 1300, 2000,
  ];
  public claveHabitaciones = [
    125478, 365214, 364128, 259436, 256478, 125946, 231524, 154758, 456325,
    121236,
  ];

  constructor(
    private authService: AuthenticationService,
    private firestore: AngularFirestore
  ) {
    this.huespedes = [
      {
        token: 9895257528 + '',
        nombre: 'Bradley Addiel González Flores',
        telefono: '3222131135',
        fecha_ingreso: '2022-11-20',
        fecha_salida: '2022-11-24',
        habitacion: 1,
        anticipo: 600,
      },
      {
        token: 1245257528 + '',
        nombre: 'Pedro Avila',
        telefono: '3111950830',
        fecha_ingreso: '2022-11-25',
        fecha_salida: '2022-11-28',
        habitacion: 3,
        anticipo: 300,
      },
    ];
  }

  public getHuespedes() {
    return this.firestore
      .collection('huespedes')
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data() as Huesped;
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }

  public nuevoHuesped(Huesped: Huesped) {
    this.firestore.collection('huespedes').add(Huesped);
  }

  public getHabitaciones(): number[] {
    return this.habitaciones;
  }

  public getHuespedId(id: string) {
    let result = this.firestore.collection('huespedes').doc(id).valueChanges();
    return result;
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

  public borrarHuesped(id: string) {
    this.firestore.collection('huespedes').doc(id).delete();
  }

  public getHuespedToken(id: string): Huesped {
    let item: Huesped;
    item = this.huespedes.find((huesped) => {
      return huesped.id === id;
    });
    return item;
  }

  public validarFecha(fecha_ingreso: string, fecha_salida: string) {
    if (fecha_ingreso > fecha_salida) {
      return false;
    }
    return true;
  }

  public validRoomHuesped(fecha_ingreso: string, habitacion: number): boolean {
    const huespedCuartoRepetido: number[] = [];
    this.huespedes.forEach((huesped, i) => {
      if (habitacion === huesped.habitacion) {
        huespedCuartoRepetido.push(i);
      }
    });
    for (let i = 0; i < huespedCuartoRepetido.length; i++) {
      const huesped = this.huespedes[huespedCuartoRepetido[i]];
      if (
        huesped.fecha_ingreso <= fecha_ingreso &&
        huesped.fecha_salida >= fecha_ingreso
      ) {
        return false;
      }
    }
    return true;
  }

  public getPrecioHabitaciones() {
    return this.precioHabitaciones;
  }

  public getPrecioHabitacion(token: string) {
    let item: Huesped;
    item = this.huespedes.find((huesped) => {
      return huesped.token === token;
    });
    return this.precioHabitaciones[+item.habitacion - 1];
  }

  public getClaveHabitaciones() {
    return this.claveHabitaciones;
  }

  public getClaveHabitacion(token: string) {
    let item: Huesped;
    item = this.huespedes.find((huesped) => {
      return huesped.token === token;
    });
    return this.claveHabitaciones[+item.habitacion - 1];
  }
}
