import { Injectable } from "@angular/core";
import { HttpInterceptor, HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { StorageService } from "../services/storage.service";


//classe para interceptar os erros
@Injectable()
export class ErrorInterceptor implements HttpInterceptor{
    
    constructor(public sotrage: StorageService){

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).catch((error,caugth)=>{
             
           let errorObj = error;
            if(errorObj.error){
                 errorObj = errorObj.error;   
            }
            if(!errorObj.status){
                errorObj = JSON.parse(errorObj)
            }

            console.log("Error identificado pelo interceptor: ");
            console.log(errorObj);

            switch(errorObj.status){
                case 403: this.handle403(); break;
            }
           return Observable.throw(errorObj);
       }) as any;
    }

    //forçar a limpeza do localStorage
    handle403(){
        this.sotrage.setLocalUser(null);
    }
}


export const ErrorInterceptorProvier = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};
