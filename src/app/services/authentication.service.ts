import { Injectable } from '@angular/core';
import { Huesped } from 'src/app/models/huesped';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  // Login básico
  public tokens = ['admin', '9895257528', '1245257528'];
  public token = '';

  constructor(
    private router: Router,
    private alertController: AlertController
  ) {}

  validarToken(token: string, huesped: Huesped) {
    if (token === 'admin') {
      this.router.navigate(['/home']);
    } else {
      window.localStorage.setItem('myObject', JSON.stringify(huesped));
      this.router.navigate(['/tabs/checkin']);
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'El token ingresado no es válido',
      buttons: ['OK'],
    });
    await alert.present();
  }

  public borrarToken(token: string) {
    this.tokens.forEach((tok, i) => {
      if (tok === token) {
        this.tokens.splice(i, 1);
        return;
      }
    });
  }

  getToken() {
    return this.token;
  }
}
