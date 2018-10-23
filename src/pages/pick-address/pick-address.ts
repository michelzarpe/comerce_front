import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDTO } from '../../models/endereco.dto';

@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  items : EnderecoDTO[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.items = [
      {id:"1", logradouro: "asdfadfasf", numero:"192", complemento:"SSA", bairro: "Santa Monica", cep:"948932342", cidade:{ id:"1", nome:"Uberlandia", estado: {id:"1",nome:"Minas Gerais"}}},
      {id:"2", logradouro: "AFASDFASD", numero:"222", complemento:"FSSDLFKS", bairro: "Santa lUCIA", cep:"3422342", cidade:{ id:"3", nome:"São Paulo", estado: {id:"2",nome:"São Paulo"}}}]
  }

}
