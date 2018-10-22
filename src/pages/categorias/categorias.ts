import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriaService } from '../../services/domain/categoria.service';
import { CategoriaDTO } from '../../models/categoria.dto';
import { API_CONFIG } from '../../config/api.config';



@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

    items: CategoriaDTO[];
    bucketUrl: string = API_CONFIG.bucketBaseUrl;

  constructor(public navCtrl: NavController, public navParams: NavParams, public categoriaService: CategoriaService) {
  }

  ionViewDidLoad() {
    //chamada assincrona, usar .subscribe colocando uma função callback
    this.categoriaService.findAll()
    // função anonima ou arrow function
    .subscribe(response =>{this.items=response}, 
               error =>{});// o interceptor está demonstrando os erros agora
    //ou pode ser dessa forma a chamada de funcao
    //.subscribe(this.f);
  }


  showProdutos(){
    this.navCtrl.push('ProdutosPage');
  }



}
