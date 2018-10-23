import { Injectable } from "@angular/core";
import { LocalUser } from "../models/local_user.";
import { STORAGE_KEYS } from "../config/sotrage_keys.config";
import { Cart } from "../models/cart";


@Injectable()
export class StorageService{

    //retorna o usuário logado que foi gravado no localStorage (apartir do HTML5)
    getLocalUser() : LocalUser{
        let usr = localStorage.getItem(STORAGE_KEYS.localUser);
            if(usr==null){
                return null;
            }else{
                return JSON.parse(usr);
            }

    }

    setLocalUser(obj: LocalUser){
            if(obj == null){
                localStorage.removeItem(STORAGE_KEYS.localUser);
            }else{
                localStorage.setItem(STORAGE_KEYS.localUser,JSON.stringify(obj))
            }    
    }

    //carinho de compras!
    getCart() : Cart{
        let usr = localStorage.getItem(STORAGE_KEYS.cart);
        if(usr==null){
            return null;
        }else{
            return JSON.parse(usr);
        }
    }

    setCart(obj: Cart){
        if(obj == null){
            localStorage.removeItem(STORAGE_KEYS.cart);
        }else{
            localStorage.setItem(STORAGE_KEYS.cart,JSON.stringify(obj))
        }    
}



}