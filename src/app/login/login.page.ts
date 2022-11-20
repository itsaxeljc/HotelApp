import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public myForm: FormGroup;
  public validationMessages: Object;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService
  ) {}

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
    this.authService.validarToken(this.myForm.get('token').value);
  }
}
