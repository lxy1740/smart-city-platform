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

    // 获取所有安装区域
    getZone(): Observable<any> {
    // return Observable.of(ARTICLESTYPE);

    return this.http.get('/api/zone')
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
    addNewInstall(center: any, full_name: String, name: String, region_id: String): Observable<any> {
        return this.http.post('/api/zone', {
            'center': center,
            'full_name': full_name,
            'name': name,
            'region_id': region_id
        })
            .pipe(map((res: Response) => { // 相当于一种映射
                return res;
            }));
    }
}

