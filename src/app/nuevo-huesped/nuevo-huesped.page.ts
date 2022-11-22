import { Component, OnInit } from '@angular/core';
import { Huesped } from '../models/huesped';
import { HuespedService } from '../services/huesped.service';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { format, add, parseISO, addDays } from 'date-fns';

@Component({
  selector: 'app-nuevo-huesped',
  templateUrl: './nuevo-huesped.page.html',
  styleUrls: ['./nuevo-huesped.page.scss'],
})
export class NuevoHuespedPage implements OnInit {
  public huesped: Huesped;
  public nuevoHuesped: Huesped;
  public myForm: FormGroup;
  public validationMessages: Object;
  public habitaciones = [];
  public diaActual: string;
  public diaSiguiente: string;
  public fechaIngreso: string;
  public fechaSalida: string;
  public token: string;

  constructor(
    private huespedService: HuespedService,
    private formBuilder: FormBuilder,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      nombre: ['', Validators.compose([Validators.required])],
      telefono: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(
            '^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$'
          ),
        ]),
      ],
      habitacion: ['', Validators.compose([Validators.required])],
      token: new FormControl({ value: '', disabled: true }),
    });

    this.validationMessages = {
      nombre: [
        {
          type: 'required',
          message: 'El nombre es requerido',
        },
      ],
      telefono: [
        {
          type: 'required',
          message: 'El teléfono es requerido',
        },
        {
          type: 'pattern',
          message: 'Ingresa un número telefónico válido',
        },
      ],
      habitacion: [
        {
          type: 'required',
          message: 'Selecciona una habitación',
        },
      ],
    };

    this.diaActual = format(new Date(), 'yyyy-MM-dd');
    this.diaSiguiente = format(
      addDays(parseISO(this.diaActual), 1),
      'yyyy-MM-dd'
    );

    this.habitaciones = this.huespedService.getHabitaciones();
  }

  public fechaSeleccionadaIngreso(evento: any): void {
    try {
      const ingreso = format(parseISO(evento.detail.value), 'yyyy-MM-dd');
      this.fechaIngreso = format(addDays(parseISO(ingreso), 1), 'yyyy-MM-dd');
    } catch (error) {
      console.error(error);
    }
  }

  public fechaSeleccionadaSalida(evento: any): void {
    try {
      this.fechaSalida = format(parseISO(evento.detail.value), 'yyyy-MM-dd');
    } catch (error) {
      console.error(error);
    }
  }

  public guardarHuesped(): void {
    if (this.myForm.valid) {
      if (this.fechaIngreso !== undefined) {
        if (this.fechaSalida !== undefined) {
          if (this.huespedService.validarFecha(this.fechaIngreso, this.fechaSalida)) {
            if (this.huespedService.validRoomHuesped(this.fechaIngreso, this.myForm.get('habitacion').value)) {
              this.token = this.huespedService.crearToken();
              this.nuevoHuesped = {
                nombre: this.myForm.get('nombre').value,
                telefono: this.myForm.get('telefono').value,
                habitacion: this.myForm.get('habitacion').value,
                fecha_ingreso: this.fechaIngreso,
                fecha_salida: this.fechaSalida,
                token: this.token,
              };
              this.huespedService.nuevoHuesped(this.nuevoHuesped);
              this.myForm.reset();
              this.presentAlert(
                'Se guardó el nuevo huésped',
                'Token generado: ' + this.token
              );
            }
            else {
              this.presentAlert('La habitacion #' + this.myForm.get('habitacion').value + ' ya se encuentra seleccionada, por favor seleccione otra habitación');
            }
          } else {
            this.presentAlert('La fecha de salida no puede ser menor a la fecha de entrada');
          }
        } else {
          this.presentAlert('Selecciona la fecha de salida');
        }
      } else {
        this.presentAlert('Selecciona la fecha de ingreso');
      }
    } else {
      this.presentAlert('Ingresa los datos del nuevo huésped');
    }
  }

  public prueba() {
    // console.log(this.huespedService.validRoomHuesped(this.fechaIngreso, this.myForm.get('habitacion').value));
console.log(this.huespedService.validarFecha(this.fechaIngreso, this.fechaSalida));

  }

  async presentAlert(mens: string, sub?: string) {
    const alert = await this.alertController.create({
      header: mens,
      subHeader: sub,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
