import { Injectable } from '@angular/core';
import { Huesped } from '../models/huesped';
import { AuthenticationService } from './authentication.service';
import { find, map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root',
})
export class HuespedService {
  public huespedes: Huesped[];
  public huesped: Huesped;
  public habitaciones = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  public precioHabitaciones = [2300, 1200, 1500, 3100, 4000, 2500, 1300, 1300, 1300, 2000];
  public claveHabitaciones = [125478, 365214, 364128, 259436, 256478, 125946, 231524, 154758, 456325, 121236];

  constructor(private authService:AuthenticationService, private firestore: AngularFirestore) {
    this.getHuespedes().subscribe( res => {
      this.huespedes = res;
    })
  }

  public getHuespedes(){
    return this.firestore.collection('huespeds').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Huesped;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      })
    )
  }

  public getHabitaciones(): number[] {
    return this.habitaciones;
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
    this.firestore.collection('huespeds').doc(id).delete();
  }

  public nuevoHuesped(Huesped: Huesped) {
    this.firestore.collection('huespeds').add(Huesped);
  }

  public getHuespedToken(id: string){
    let result = this.firestore.collection('huespeds').doc(id).valueChanges();
    return result;
  }
  
  public validarFecha(fecha_ingreso: string, fecha_salida: string){
    if (fecha_ingreso > fecha_salida ){
      return false
    }
    return true;
  }

  public validRoomHuesped(fecha_ingreso: string, habitacion: number): boolean{
    const huespedCuartoRepetido: number[] = [];
    
    this.huespedes.forEach((huesped,i) => {
      if (habitacion === huesped.habitacion){
        huespedCuartoRepetido.push(i);
      }
    });
    
    for (let i = 0; i < huespedCuartoRepetido.length; i++){
      const huesped = this.huespedes[huespedCuartoRepetido[i]];
      if (huesped.fecha_ingreso <= fecha_ingreso && huesped.fecha_salida >= fecha_ingreso){
        return false
      }
    }
    return true;
  }

  public getPrecioHabitaciones(){
      return this.precioHabitaciones;
  }

  public getPrecioHabitacion(item: Huesped){
    return this.precioHabitaciones[+item.habitacion];
  }

  public getClaveHabitaciones(){
      return this.claveHabitaciones;
  }

  public getClaveHabitacion(item:Huesped){
    return this.claveHabitaciones[+item.habitacion-1];
  }

  public getHuespedByToken(token: string){
    this.huespedes.forEach(item => {
      if(item.token === token){
        this.huesped = item;
      }
    });
  }
}
