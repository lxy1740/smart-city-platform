
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/';
import { map } from 'rxjs/operators';



@Injectable()
export class DeviceService {
    public url: string;
    constructor(private http: Http) {

    }
    // 城市列表
    getZoneDefault(): Observable<any> {
        // return Observable.of(ARTICLESTYPE);

        return this.http.get('/api/zone/default')
            .pipe(map((res: Response) => {
                if (res.status === 200) {
                    const data = res.json();

                    console.log(data.regions[0]);
                    data.regions[0].open = true;
                    // data.regions[0].children[0].open = true;
                    // data.regions[0].children.map((item, index) => {
                    //     data.regions[0].children[index].open = true;
                    // });

                    return data;
                } else if (res.status === 202) {
                    return res.json().code.toString();

                }
            }));
    }

    // 获取所有设备-分页
    getAllDevice(page: number, pageSize: number): Observable<any> {
        // return Observable.of(ARTICLESTYPE);

        return this.http.get(`/api/device/page=${page}&pageSize=${pageSize}`)
            .pipe(map((res: Response) => {
                if (res.status === 200) {
                    const data = res.json();
                    return data;
                } else if (res.status === 202) {
                    return res.json().code.toString();
                }
            }));
    }





}
