
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/';
// import { of } from 'rxjs/';
import { map } from 'rxjs/operators';




@Injectable()
export class LedService {
    public url: string;
    constructor(private http: Http) {

    }
    //
    getUsers(): Observable<any> {
        // return Observable.of(ARTICLESTYPE);

        return this.http.get('/led-api/users')
            .pipe(map((res: Response) => {
                if (res.status === 200) {
                    console.log(res);
                    const data = res.json();
                    return data;
                } else if (res.status === 202) {
                    return res.json().code.toString();

                }
            }));


    }



}
