
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // 1.引入HTTP模块
import { Observable } from 'rxjs/';
import { map } from 'rxjs/operators';



@Injectable()
export class DeviceHistoryService {
    public url: string;
    // 2.在组件的构造函数中实例化 HttpClient
    constructor(private http: HttpClient) {

    }


    // 获取指定位置点
    getCurrentProperty(deviceId): Observable<any> {
        return this.http.get(`/api/device/property/current/${deviceId}`)
            .pipe(map((res: Response) => {
                return res;
            }));
    }
}
