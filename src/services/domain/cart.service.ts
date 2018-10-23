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

    removeProduto(produto: ProdutoDTO): Cart{
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id);// econtrar o produto no carrinho igual ao que ta sendo passado na lista
        if(position!= -1){// diferente de -1 existe produto no carrinho
            cart.items.splice(position,1); //remove
        }
        this.storage.setCart(cart); //atualiza o carrinho no localStorage
        return cart;
    }

    increaseQuantity(produto: ProdutoDTO): Cart{
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id);// econtrar o produto no carrinho igual ao que ta sendo passado na lista
        if(position!= -1){// diferente de -1 existe produto no carrinho
            cart.items[position].quantidade++;
        }
        this.storage.setCart(cart); //atualiza o carrinho no localStorage
        return cart;
    }

    decreaseQuantity(produto: ProdutoDTO): Cart{
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id);// econtrar o produto no carrinho igual ao que ta sendo passado na lista
        if(position!= -1){// diferente de -1 existe produto no carrinho
            cart.items[position].quantidade--;
            if(cart.items[position].quantidade<1){
                cart = this.removeProduto(produto); //remove o produto e pega o estado atual
            }
        }
        this.storage.setCart(cart); //atualiza o carrinho no localStorage
        return cart;
    }
    
    total(): number{
      let car = this.getCart();
      let sum = 0;
      for (let index = 0; index < car.items.length; index++) {
          sum+=car.items[index].produto.preco* car.items[index].quantidade;
          
      }  
      return sum;
    }



}