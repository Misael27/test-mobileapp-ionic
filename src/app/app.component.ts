import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { User } from './shared/models';
import { AuthService } from './shared/services';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  currentUser: User;

  public appPages = [
    {
      title: 'Bookings',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Salir',
      url: '/login',
      icon: 'log-out'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
    this.platform.ready().then(() => {
      if(this.platform.is('android')) {
        this.statusBar.styleBlackOpaque();
      }
      else {
        this.statusBar.styleDefault();
      }
      this.splashScreen.hide();
    });
  }
  
  logout(){
    this.authService.logout();
  }
  
}
