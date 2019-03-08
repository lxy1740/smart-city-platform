
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // 1.引入HTTP模块
import { Observable } from 'rxjs/';
import { map } from 'rxjs/operators';



@Injectable()
export class DeviceService {
    public url: string;
    // 2.在组件的构造函数中实例化 HttpClient
    constructor(private http: HttpClient) {

    }
    // 城市列表
    getZoneDefault(): Observable<any> {
        // return Observable.of(ARTICLESTYPE);

        // 4.通过HTTP的get方法请求数据
        return this.http.get('/api/zone/default')
            .pipe(map((res: Response) => {
                const data = res;
                // data.regions[0].open = true;
                return data;

            }));
    }

    // 获取所有设备-分页
    getAllDevice(page: number, pageSize: number): Observable<any> {
        // return Observable.of(ARTICLESTYPE);

        return this.http.get(`/api/device?page=${page}&pageSize=${pageSize}`)
            .pipe(map((res: Response) => {
                return res;
            }));
    }

    // 获取指定型号设备-分页
    getAllDeviceByModel(queryStr: String, model: number, page: number, pageSize: number, parentId): Observable<any> {
        // return Observable.of(ARTICLESTYPE);
        let url;
        if (parentId === undefined) {
            url = `/api/device?queryStr=${queryStr}&model=${model}&page=${page}&pageSize=${pageSize}`;
        } else {
            url = `/api/device?queryStr=${queryStr}&model=${model}&page=${page}&pageSize=${pageSize}&parentId=${parentId}`;
        }
        return this.http.get(url)
            .pipe(map((res: Response) => {
                return res;
            }));
    }

    // 获取所有设备型号-分页
    getAllDeviceModel(type: number, page: number, pageSize: number): Observable<any> {
        return this.http.get(`/api/device/model?type=${type}&page=${page}&pageSize=${pageSize}`)
            .pipe(map((res: Response) => {
                return res;
            }));
    }

    // 新增设备
    addNewDevice(body): Observable<any> {
        return this.http.post('/api/device', body
        )
            .pipe(map((res: Response) => {
                return res;
            }));
    }

    // 删除设备
    delDevice(id) {
        return this.http.delete(`/api/device?id=${id}`)
            .pipe(map((res: Response) => {
                const data = { status: 200 };
                return data;
            }));
    }

    // 修改设备
    updateDevice(body): Observable<any> {
        return this.http.put(`/api/device`, body)
            .pipe(map((res: Response) => {
                const data = { status: 200 };
                return data;
            }));
    }

    // 获取指定区域内的所有位置点-分页
    getAllPosiByRegionId(queryStr: String, regionId: number, page: number, pageSize: number): Observable<any> {
        return this.http.get(`/api/position/region/${regionId}?queryStr=${queryStr}&page=${page}&pageSize=${pageSize}`)
            .pipe(map((res: Response) => {
                return res;
            }));
    }

    // 获取指定位置点
    getPosiById(id: number): Observable<any> {
        return this.http.get(`/api/position/${id}`)
            .pipe(map((res: Response) => {
                return res;
            }));
    }

    // 获取所有Customer
    getCustomer(page, pageSize, queryStr): Observable<any> {
        // return Observable.of(ARTICLESTYPE);

        return this.http.get(`/api/customer?page=${page}&pageSize=${pageSize}&queryStr=${queryStr}`)
            .pipe(map((res: Response) => {
                return res;
            }));
    }

    // 获取位置信息
    getPositionById(id): Observable<any> {
        // return Observable.of(ARTICLESTYPE);

        return this.http.get(`/api/position/${id}`)
            .pipe(map((res: Response) => {
                return res;
            }));
    }
}
