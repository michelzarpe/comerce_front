import { Injectable } from "@angular/core";
import { HttpInterceptor, HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { StorageService } from "../services/storage.service";
import { AlertController } from "ionic-angular";


//classe para interceptar os erros
@Injectable()
export class ErrorInterceptor implements HttpInterceptor{
    
    constructor(public sotrage: StorageService, public alertController: AlertController){
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
                case 401: this.handle401(); break;
                default: this.handleDefaultError(errorObj);
            }
           return Observable.throw(errorObj);
       }) as any;
    }
    handleDefaultError(errorObj) {
        this.alertPadrao(errorObj.status,errorObj.error,errorObj.mensage);
    }

    //forçar a limpeza do localStorage
    handle403(){
        this.sotrage.setLocalUser(null);
    }

    //mensagem de erro para usuario e senha
    handle401(){
        this.alertPadrao('401','Falaha de autenticação','E-mail ou Senha incorretos');
    }


    alertPadrao(status: string, error: string, mensagem: string){
        let alert = this.alertController.create({
            title: 'Erro '+status+':'+error,
            message: mensagem,
            enableBackdropDismiss: false,
            buttons: [{text:'Ok'}]
        });
        alert.present(); //apresenta o alert
    }

    
}


export const ErrorInterceptorProvier = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};
