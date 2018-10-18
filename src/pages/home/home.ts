import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  // se tu quiser injetar alguma variavel é só colocar no construtor da classe
  constructor(public navCtrl: NavController, public menu: MenuController) {

  }

  public login(){
    //navegar pagina - colocar entre aspas por causa do layzi
    //push é usado para empilhar e é possivel voltar a pagina anterior
    //this.navCtrl.push('CategoriasPage');
  
    //setRoot -> nao empilha as paginas
    this.navCtrl.setRoot('CategoriasPage');
  }


  ionViewWillEnter(){
    this.menu.swipeEnable(false);
  }
  
  ionViewDidLeave(){
    this.menu.swipeEnable(true);
  }


}
