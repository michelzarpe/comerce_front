import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDTO } from '../../models/endereco.dto';
import { StorageService } from '../../services/storage.service';
import { ClienteService } from '../../services/domain/cliente.service';

@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  items : EnderecoDTO[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public storageService: StorageService, public clienteService: ClienteService) {
  }

  ionViewDidLoad() {
    let localUser = this.storageService.getLocalUser();
    
    if(localUser && localUser.email){
      this.clienteService.findByEmail(localUser.email).subscribe(response =>{
        this.items = response['enderecos'];
      }, error =>{
          if(error.status==403){// se der o erro 403 volta para o home, que é o login
            this.navCtrl.setRoot('HomePage');
          }});
    }else{//se der algum problema com o token volta para pagina inicial
      this.navCtrl.setRoot('HomePage');
    }
    }

}
