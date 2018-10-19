import { Injectable } from "@angular/core";
import { HttpInterceptor, HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { StorageService } from "../services/storage.service";
import { API_CONFIG } from "../config/api.config";


//
@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(public storage: StorageService){

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // só pode mandar o cabeçalho para a minha API. a Api do bucket não vai cabeçalho.    
        let n = API_CONFIG.baseUrl.length;
        let requestToApi = req.url.substring(0,n) == API_CONFIG.baseUrl;
        let localUser = this.storage.getLocalUser();

        if(localUser && requestToApi){
            const authReq = req.clone({headers: req.headers.set('Authorization','Bearer '+localUser.token)});
            return next.handle(authReq);
        }else{
            return next.handle(req);     
        }
    }
}

// declarando o provider do interceptor
export const AuthInterceptorProvier = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
};
