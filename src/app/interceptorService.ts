import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse,
    HttpHeaderResponse} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs/';
@Injectable()
export class InterceptorService { //  implements HttpInterceptor

    constructor () {}

    // intercept(request: HttpRequest<any>, next: HttpHandler): Observable<
    //     | HttpHeaderResponse
    //     | HttpResponse<any>> {
    //     let req = request.clone({
    //         url: request.hadBaseurl ? `${request.url}` : `${baseurl}${request.url}`,
    //       });
    //     return next.handle(req).pipe( mergeMap((event: any) => {
    //         // 正常返回，处理具体返回参数
    //         if (event instanceof HttpResponse && event.status === 200) {
    //             return this.handleData(event); // 具体处理请求返回数据
    //         }
    //         return of (event);
    //     }),
    //     catchError((err: HttpErrorResponse) => this.handleData(err)));
    //     }

    // private handleData(event: HttpResponse<any> | HttpErrorResponse, ): Observable<any> {
    //     // 业务处理：一些通用操作
    //     switch (event.status) {
    //         case 200:
    //         if (event instanceof HttpResponse) {
    //             const body: any = event.body;
    //             if (body && body.rc === 3) {
    //                 this.goTo('/test');
    //             }
    //         }
    //         break;
    //         case 401: // 未登录状态码
    //         this.goTo('/login');
    //         break;
    //         case 404:
    //         case 500:
    //         break;
    //         default:
    //         return of (event);
    //     }
    // }
}
