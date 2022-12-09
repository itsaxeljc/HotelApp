import { Component, OnInit } from '@angular/core';
import { Huesped } from '../models/huesped';
import { HuespedService } from '../services/huesped.service';
import { AuthenticationService } from '../services/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public huespedes: Huesped[];
  public huesped: Huesped;
  public tokens = ['admin'];
  public myForm: FormGroup;
  public validationMessages: Object;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private huespedService: HuespedService
  ) {
    this.huesped = {
      token: '',
      nombre: '',
      telefono: '',
      fecha_ingreso: '',
      fecha_salida: '',
      habitacion: 0,
      anticipo: 0,
      id: '',
    };
  }

  async ngOnInit() {
    this.huespedService.getHuespedes().subscribe((res) => {
      this.huespedes = res;
      this.huespedes.forEach((element) => {
        this.tokens.push(element.token);
      });
      console.log(this.tokens);
    });

    this.myForm = this.formBuilder.group({
      token: ['', Validators.compose([Validators.required])],
    });

    this.validationMessages = {
      token: [
        {
          type: 'required',
          message: 'Campo requerido para continuar',
        },
      ],
    };
  }

  public getHuespedInfo(token: string): Huesped {
    let item: Huesped;
    this.huespedes.forEach((element) => {
      if (element.token === token) {
        item = element as Huesped;
      }
    });
    console.log(item);
    return item;
  }

  login() {
    const token = this.myForm.get('token').value;
    this.huesped = this.getHuespedInfo(token);
    if (this.tokens.includes(this.myForm.get('token').value)) {
      this.authService.validarToken(
        this.myForm.get('token').value,
        this.huesped
      );
    }
  }
}
