import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';
import { CartService } from '../../services/domain/cart.service';

@IonicPage()
@Component({
  selector: 'page-produto-detail',
  templateUrl: 'produto-detail.html',
})
export class ProdutoDetailPage {

  item: ProdutoDTO;

  constructor(public navCtrl: NavController, public navParams: NavParams, public produtoService: ProdutoService, public cartService: CartService, public loadingController:LoadingController) {
  }

  ionViewDidLoad() {
    let loader = this.presentLoadingDefault();
    this.produtoService.findById(this.navParams.get('produto_id')).subscribe(response=>{
        this.item = response;
        this.getImageUrlIfExists();
        loader.dismiss();
    }, error=>{loader.dismiss();});
  }


getImageUrlIfExists(){
  this.produtoService.getImageFromBucket(this.item.id).subscribe(response=>{
    this.item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${this.item.id}.jpg`;
  }, error=>{});
}

addToCart(produto: ProdutoDTO){
  this.cartService.addProduto(produto);
  this.navCtrl.setRoot('CartPage');
}

presentLoadingDefault() {
  let loading = this.loadingController.create({content:'Aguarde d:) '});
  loading.present();
return loading;
}

}
