import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import {HttpClientModule} from '@angular/common/http'
import { MyApp } from './app.component';
import { Camera } from '@ionic-native/camera'
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CategoriaService } from '../services/domain/categoria.service';
import { ErrorInterceptorProvier } from '../interceptors/error.interceptors';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { ClienteService } from '../services/domain/cliente.service';
import { AuthInterceptorProvier } from '../interceptors/auth.interceptor';
import { ProdutoService } from '../services/domain/produto.service';
import { CartService } from '../services/domain/cart.service';
import { ImageUtilService } from '../services/domain/imageUtil.service';

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
    ClienteService,
    StorageService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthInterceptorProvier,
    ErrorInterceptorProvier,
    ProdutoService,
    CartService,
    Camera,
    ImageUtilService
  ]
})
export class AppModule {}
