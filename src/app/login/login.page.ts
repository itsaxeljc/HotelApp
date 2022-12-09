import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HuespedService } from '../services/huesped.service';
import { Huesped } from '../models/huesped';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public myForm: FormGroup;
  public validationMessages: Object;
  public huespeds: Huesped[];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private huespedService: HuespedService
  ) {
    this.huespedService.getHuespedes().subscribe( res => {
      this.huespeds = res;
    })
  }

  async ngOnInit() {
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

  async login() {
    this.huespedService.huespedes = this.huespeds;
    this.huespeds.forEach(item => {
      this.authService.tokens.push(item.token);
    });
    this.authService.validarToken(this.myForm.get('token').value);
    this.huespedService.getHuespedByToken(this.myForm.get('token').value);
  }
}
