import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';


import { AuthService } from '../shared/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authService: AuthService,
      public loadingController: LoadingController,
      public alertController: AlertController
  ) {
      if (this.authService.currentUserValue) { 
          this.router.navigate(['/']);
      }
  }

  ngOnInit() {
    this.createFormLogin();
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
      this.submitted = true;

      if (this.loginForm.invalid) {
          return;
      }

      let loadingInstance: any;
      this.loadingController.create({
        message: 'Por favor espere...',
        translucent: true,
        cssClass: 'custom-class custom-loading'
      }).then(loading => {
        loadingInstance = loading
        loading.present()
      });

      this.authService.login(this.f.email.value, this.f.password.value)
      .subscribe(
        data => {
            this.router.navigate([this.returnUrl]);
            loadingInstance.dismiss();
        },
        error => {
          loadingInstance.dismiss();

          this.alertController.create({
            subHeader: 'Error',
            message: 'Intente nuevamente.',
            buttons: ['Aceptar']
          }).then((alert) => {
            alert.present();
          })
      
        });
  }

  createFormLogin(){
    this.loginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.maxLength(30), Validators.email]],
        password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }


}
