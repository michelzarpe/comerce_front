import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';


@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

   items : ProdutoDTO[]; 

  constructor(public navCtrl: NavController, public navParams: NavParams, public produtoService: ProdutoService, public loadingController: LoadingController) {
   
  }


  presentLoadingDefault() {
      let loading = this.loadingController.create({content: 
        'Aguarde!'});
      loading.present();
    return loading;

  }

  ionViewDidLoad() {
     let loader = this.presentLoadingDefault();
     this.produtoService.findByCategoria(this.navParams.get('categoria_id')).subscribe(response =>{
     this.items = response['content'];
     this.loadImageUrls();
     loader.dismiss(); 
    },error=>{loader.dismiss();});
  }


  loadImageUrls(){
    for (let index = 0; index < this.items.length; index++) {
          this.produtoService.getSmallImageFromBucket(this.items[index].id).subscribe(response=>{
            this.items[index].imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${this.items[index].id}-small.jpg`;
          },error=>{})
    }
  }

  showDetail(produto_id: string){
    this.navCtrl.push('ProdutoDetailPage',{produto_id:produto_id});
  }

}
