import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';
import { CredencialDTO } from '../../models/credencial.dto';
import { AuthService } from '../../services/auth.service';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    creds: CredencialDTO={email:"",senha:""};

  // se tu quiser injetar alguma variavel é só colocar no construtor da classe
  constructor(public navCtrl: NavController, public menu: MenuController, public auth: AuthService) {

  }

  public login(){
    //navegar pagina - colocar entre aspas por causa do layzi
    //push é usado para empilhar e é possivel voltar a pagina anterior
    //this.navCtrl.push('CategoriasPage');
    //setRoot -> nao empilha as paginas

        this.auth.authenticate(this.creds).subscribe(response=>{
        this.auth.successfullLogin(response.headers.get("Authorization"));
        this.navCtrl.setRoot('CategoriasPage');
      }, error =>{})
     
  }

//Evento de ciclo de vida da tela, palavra tem que ser exatamente igual a documentação
  ionViewWillEnter(){
    this.menu.swipeEnable(false);
  }
  //Evento de ciclo de vida da tela, palavra tem que ser exatamente igual a documentação
  ionViewDidLeave(){
    this.menu.swipeEnable(true);
  }
//Evento de ciclo de vida da tela, palavra tem que ser exatamente igual a documentação
//chamar o refreshtoken se der certo armazena no local storage o token e ai eu passo para pagina de categoria.. caso tenha expirado o token ele vai pedir para fazer login novamente
  ionViewDidEnter(){
      this.auth.refreshToken().subscribe(response=>{
      this.auth.successfullLogin(response.headers.get("Authorization"));
      this.navCtrl.setRoot('CategoriasPage');
    }, error =>{})
  }


  signup(){
    this.navCtrl.push('SignupPage');
  }

}
