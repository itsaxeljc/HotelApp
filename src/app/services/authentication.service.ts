import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  // Clase para validar login
  public tokens = ['admin'];

  constructor(
    private router: Router,
    private alertController: AlertController
  ) {}

  async validarToken(token: String) {
    if (token === this.tokens[0]) {
      await this.router.navigate(['/home']);
    } else {
      this.presentAlert();
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'El token ingresado no es válido',
      buttons: ['OK'],
    });
    await alert.present();
  }
}
