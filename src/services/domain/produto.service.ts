import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { ProdutoDTO } from "../../models/produto.dto";
import { Observable } from "rxjs/Rx";

@Injectable()
export class ProdutoService {
    constructor(public http: HttpClient){

    }

    findByCategoria(categoria_id: string): Observable <ProdutoDTO[]>{
        return this.http.get<ProdutoDTO[]>(`${API_CONFIG.baseUrl}/produtos/?categorias=${categoria_id}`);
    }

    getSmallImageFromBucket(id: string): Observable<any>{
        let url = `${API_CONFIG.bucketBaseUrl}/prod${id}-small.jpg`;
        return this.http.get(url,{responseType:'blob'});
    }

    findById(produto_id: string){
        return this.http.get<ProdutoDTO>(`${API_CONFIG.baseUrl}/produtos/${produto_id}`);
    }

    getImageFromBucket(id:string){
        let url = `${API_CONFIG.bucketBaseUrl}/prod${id}.jpg`;
        return this.http.get(url,{responseType:'blob'});
    }


}