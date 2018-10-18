import { Injectable } from "@angular/core";
import { CredencialDTO } from "../models/credencial.dto";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";

@Injectable()
export class AuthService {

    constructor(public http: HttpClient){

    }


    authenticate(creds: CredencialDTO){
        //como se tratta de um post e nao retorna nda no corpo, tem que colocar o responseType como text. O observe para receber a resposta pelo cabecalho
        return this.http.post(`${API_CONFIG.baseUrl}/login`,creds,{observe: 'response',responseType:'text'});
    }
}
