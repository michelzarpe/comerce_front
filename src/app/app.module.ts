import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import {HttpClientModule} from '@angular/common/http'
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CategoriaService } from '../services/domain/categoria.service';
import { ErrorInterceptorProvier } from '../interceptors/error.interceptors';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
   ],
  providers: [
    StatusBar,
    SplashScreen,
    CategoriaService,
    AuthService,
    StorageService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ErrorInterceptorProvier
  ]
})
export class AppModule {}
