import { Injectable } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  // Login básico
  public tokens = ['admin','9895257528','1245257528'];
  public token = '';

  constructor(
    private router: Router,
    private alertController: AlertController
  ) {}

  validarToken(token: string) {
    this.token = token;
    if (token === this.tokens[0]) {
      this.router.navigate(['/home']);
    } 
    else if(this.tokens.includes(token)){
      let navigationExtras: NavigationExtras = {
        state: {
          token: token
        }
      }
      window.localStorage.setItem('token',this.token);
      this.router.navigate(['/tabs'], navigationExtras);
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

  public borrarToken(token:string){
    this.tokens.forEach((tok,i) => {
      if (tok === token){
        this.tokens.splice(i,1);
        return;
      }
    });
  }
  getToken() {
    return this.token;
  }
}
