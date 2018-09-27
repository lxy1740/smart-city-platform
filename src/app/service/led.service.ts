
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
    // getUsers(): Observable<any> {
    //     // return Observable.of(ARTICLESTYPE);

    //     return this.http.get('/led-api/users')
    //         .pipe(map((res: Response) => {
    //             if (res.status === 200) {
    //                 console.log(res);
    //                 const data = res.json();
    //                 return data;
    //             } else if (res.status === 202) {
    //                 return res.json().code.toString();

    //             }
    //         }));


    // }

    createUser(body): Observable<any> {
        // return Observable.of(ARTICLESTYPE);

        return this.http.post('/led-api/users/createUser', body)
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

    getUsers(currentPage, pageSize): Observable<any> {
        // return Observable.of(ARTICLESTYPE);

        return this.http.get(`/led-api/users/getUser?pageSize=${pageSize}&currentPage=${currentPage}`)
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

    createTask(body): Observable<any> {
        // return Observable.of(ARTICLESTYPE);

        return this.http.post('/led-api/tasks/createTask', body)
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

    getTasks(currentPage, pageSize): Observable<any> {
        // return Observable.of(ARTICLESTYPE);

        return this.http.get(`/led-api/tasks/getTask?pageSize=${pageSize}&currentPage=${currentPage}`)
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
    searchAllTask(id, currentPage, pageSize): Observable<any> {
        return this.http.get(`/led-api/tasks/searchTask?id=${id}&pageSize=${pageSize}&currentPage=${currentPage}`)
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

    searchTask(body): Observable<any> {
        // return Observable.of(ARTICLESTYPE);

        return this.http.post('/led-api/tasks/searchTask', body)
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

    createMedia(body): Observable<any> {
        // return Observable.of(ARTICLESTYPE);

        return this.http.post('/led-api/medias/createMedia', body)
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

    getMedias(currentPage, pageSize): Observable<any> {
        // return Observable.of(ARTICLESTYPE);

        return this.http.get(`/led-api/medias/getMedia?pageSize=${pageSize}&currentPage=${currentPage}`)
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
