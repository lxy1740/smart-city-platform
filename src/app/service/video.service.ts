
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';




@Injectable()
export class VideoService {
    // public url: string;
    constructor(private http: HttpClient ) {

    }

    // 获取详细的位置数据;
    getCalamity(ne: any, sw: any): Observable<any> {
        // 获取接口数据
        return this.http.post('/api/disaster/inbounds', {
            'ne': ne,
            'sw': sw
        })
            .pipe(map((res: Response) => {
                return res;
            }));
    }

    // getCalamity(): Observable<any> {
    //     const list = CALAMITYLIST.light_list;
    //     list.map((item, i) => {
    //         const val = this.getRandomIntInclusive(0, 10); // 调用方法，得到两个数重的随机数
    //         // console.log(val);
    //         if (val < 5) {
    //             list[i].error = 0;
    //         } else {
    //             list[i].error = 1;
    //         }
    //     });
    //     return of(list);
    // }

    // // 得到一个两数之间的随机整数，包括两个数在内
    // getRandomIntInclusive(min, max) {
    //     min = Math.ceil(min);
    //     max = Math.floor(max);
    //     return Math.floor(Math.random() * (max - min + 1)) + min; // The maximum is inclusive and the minimum is inclusive

    // }









}
