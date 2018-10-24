import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDTO } from '../../models/endereco.dto';
import { StorageService } from '../../services/storage.service';
import { ClienteService } from '../../services/domain/cliente.service';
import { PedidoDTO } from '../../models/pedidos.dto';
import { CartService } from '../../services/domain/cart.service';

@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  itemsEndereco : EnderecoDTO[];
  pedido: PedidoDTO;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storageService: StorageService, public clienteService: ClienteService, public cartService: CartService) {
  }

  ionViewDidLoad() {
    let localUser = this.storageService.getLocalUser();
    
    if(localUser && localUser.email){
      this.clienteService.findByEmail(localUser.email).subscribe(response =>{
        this.itemsEndereco = response['enderecos'];

        let carrinho = this.cartService.getCart();    

        this.pedido = {
          cliente: {id: response['id']},
          enderecoDeEntrega: null,
          pagamento: null,
          itens : carrinho.items.map(x=>{return  {quantidade: x.quantidade, produto :{id:x.produto.id}}})     
        }
      }, error =>{
          if(error.status==403){// se der o erro 403 volta para o home, que é o login
            this.navCtrl.setRoot('HomePage');
          }});
    }else{//se der algum problema com o token volta para pagina inicial
      this.navCtrl.setRoot('HomePage');
    }
  }


  nextPage(item: EnderecoDTO){
    this.pedido.enderecoDeEntrega={id:item.id};
    this.navCtrl.push('PaymentPage',{pedido: this.pedido});
  }




}
