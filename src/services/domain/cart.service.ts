import { Injectable } from "@angular/core";
import { StorageService } from "../storage.service";
import { Cart } from "../../models/cart";
import { ProdutoDTO } from "../../models/produto.dto";


@Injectable()
export class CartService {
    constructor(public storage: StorageService){

    }

    createOrClearCart():Cart {
      let cart: Cart = {items:[]}; // criei um cart vazio com uma lista de itens
       this.storage.setCart(cart); // coloquei o carinho na storage 
       return cart;  // retornei o carrinho
    }

    getCart():Cart{
        let cart: Cart = this.storage.getCart();
        if(cart==null){
            cart=this.createOrClearCart();
        }
        return cart;
    }

    addProduto(produto: ProdutoDTO): Cart{
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id);// econtrar o produto no carrinho igual ao que ta sendo passado na lista
        if(position==-1){// -1 se não existe o produto no carrinho
            cart.items.push({quantidade:1, produto: produto}); // adiciona o produto no carrinho 
        }
        this.storage.setCart(cart); //atualiza o carrinho no localStorage
        return cart;
    }



}