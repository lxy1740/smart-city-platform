
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';


@Injectable()
export class FunctionDefinitionService {

    constructor(private http: HttpClient) {
    }

    // 获取数据定义
    getProperty(modelId): Observable<any> {
        return this.http.get(`/api/device/model/property/all?modelId=${modelId}`)
            .pipe(map((res) => {
                return res;
            }));
    }

    // 获取历史数据的统计值
    getStatistics(id: number, field: string, agg: string, from: string, to: string, interval: string) {
        return this.http
            .get(`/api/airmonitor/stat/${id}/${field}/${agg}?from=${from}&to=${to}&interval=${interval}`)
            .pipe(map((res) => {
                return res;
            }));
    }
}
