import { Injectable } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  // Login básico
  public tokens = ['admin','9895257528'];
  public token = '';

  constructor(
    private router: Router,
    private alertController: AlertController
  ) {}

  async validarToken(token: string) {
    this.token = token;
    if (token === this.tokens[0]) {
      await this.router.navigate(['/home']);
    } 
    else if(this.tokens.includes(token)){
      let navigationExtras: NavigationExtras = {
        state: {
          token: token
        }
      }
      window.localStorage.setItem('token',this.token);
      await this.router.navigate(['/tabs'], navigationExtras);
    }
    else {
          this.presentAlert();
          this.token = '';
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'El token ingresado no es válido',
      buttons: ['OK'],
    });
    await alert.present();
  }

  getToken() {
    return this.token;
  }
}
