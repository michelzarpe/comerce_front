import { Injectable } from "@angular/core";
import { CredencialDTO } from "../models/credencial.dto";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { LocalUser } from "../models/local_user.";
import { StorageService } from "./storage.service";

@Injectable()
export class AuthService {

    constructor(public http: HttpClient, public storageService: StorageService){

    }


    authenticate(creds: CredencialDTO){
        //como se tratta de um post e nao retorna nda no corpo, tem que colocar o responseType como text. O observe para receber a resposta pelo cabecalho
        return this.http.post(`${API_CONFIG.baseUrl}/login`,creds,{observe: 'response',responseType:'text'});
    }




     successfullLogin(authorizationValue: string){
        let tok = authorizationValue.substring(7);
        //criando objeto LocalUser para guardar só o token
        let user : LocalUser={token:tok};
        this.storageService.setLocalUser(user);
    }
    
     logout(){
        this.storageService.setLocalUser(null);
    }


}
