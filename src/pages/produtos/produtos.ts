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

   items : ProdutoDTO[]=[]; 
   page: number =0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public produtoService: ProdutoService, public loadingController: LoadingController) {
  
  }

  doRefresh(refresher) {
    this.page = 0;
    this.items=[];
    this.loadData();
     setTimeout(() => {
      refresher.complete();
    }, 1000);
  }


  private loadData(){
    let loader = this.presentLoadingDefault();
    this.produtoService.findByCategoria(this.navParams.get('categoria_id'),this.page,10).subscribe(response =>{
    let start = this.items.length;
    this.items = this.items.concat(response['content']);
    let end = this.items.length;
    this.loadImageUrls(start,end);
    loader.dismiss(); 
   },error=>{loader.dismiss();});
  }

  presentLoadingDefault() {
      let loading = this.loadingController.create({content: 
        'Aguarde!'});
      loading.present();
    return loading;

  }

  ionViewDidLoad() {
    this.loadData();
  }


  loadImageUrls(start: number, end:number){
    for (let index = start; index < end; index++) {
          this.produtoService.getSmallImageFromBucket(this.items[index].id).subscribe(response=>{
            this.items[index].imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${this.items[index].id}-small.jpg`;
          },error=>{})
    }
  }

  showDetail(produto_id: string){
    this.navCtrl.push('ProdutoDetailPage',{produto_id:produto_id});
  }

  doInfinite(infiniteScroll) {
    this.page++;
    this.loadData();
     setTimeout(() => {
     infiniteScroll.complete();
    }, 2000);
  }

}
