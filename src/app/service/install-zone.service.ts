import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InstallZoneService {
  public url: string;
  constructor(private http: HttpClient) {

  }
    // 城市列表
    getZoneDefault(): Observable<any> {
        // return Observable.of(ARTICLESTYPE);

        return this.http.get('/api/zone/default')
            .pipe(map((res: Response) => {
                return res;
            }));
    }

    // 获取所有安装区域
    getZone(page, pageSize): Observable<any> {
    // return Observable.of(ARTICLESTYPE);

        return this.http.get(`/api/zone?page=${page}&pageSize=${pageSize}`)
        .pipe(map((res: Response) => {
            return res;
        }));
    }

    // 删除安装区域
    deleteInstall(id) {
        return this.http.delete(`/api/zone?id=${id}`)
            .pipe(map((res: Response) => {
                const data = { status: 200};
                return data;
            }));
    }

    // 新增安装区域
    addNewInstall(body): Observable<any> {
        return this.http.post('/api/zone', body)
            .pipe(map((res: Response) => { // 相当于一种映射
                return res;
            }));
    }
}

