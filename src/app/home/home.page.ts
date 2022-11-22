import { Component } from '@angular/core';
import { Huesped } from '../models/huesped';
import { HuespedService } from '../services/huesped.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public huespedes: Huesped[];
  countrycode: string = '52';
  whatsappnumber: string = '13111049546';
  url:string='';
  constructor(
    private huespedService: HuespedService,
    private alertController: AlertController,
    private router: Router
  ) {
    this.huespedes = huespedService.getHuespedes();
  }

  public async borrarHuesped(pos: number) {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      subHeader: '¿Estás seguro que deseas eliminar el huésped?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {},
        },
        {
          text: 'Aceptar',
          role: 'confirm',
          handler: () => {
            this.huespedes = this.huespedService.borrarHuesped(pos);
          },
        },
      ],
    });
    await alert.present();
  }

  public verHuesped(token: string) {
    this.router.navigate(['/ver-huesped'], {
      queryParams: { token: token },
    });
  }

  public cerrarSesion() {
    this.router.navigate(['/login']);
  }

  public nuevoHuesped() {
    this.router.navigate(['/nuevo-huesped']);
  }
}
