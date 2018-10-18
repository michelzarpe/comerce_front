import { Injectable } from "@angular/core";
import { HttpInterceptor, HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs/Rx";


//classe para interceptar os erros
@Injectable()
export class ErrorInterceptor implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("No intercptor");
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

           return Observable.throw(errorObj);
       }) as any;
    }
}


export const ErrorInterceptorProvier = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};
