
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/';
import { of } from 'rxjs/';
import { CALAMITYLIST } from '../data/calamity-list';



@Injectable()
export class VideoService {
    public url: string;
    constructor() {

    }


    getCalamity(): Observable<any> {
        const list = CALAMITYLIST.light_list;
        list.map((item, i) => {
            const val = this.getRandomIntInclusive(0, 10);
            // console.log(val);
            if (val < 5) {
                list[i].error = 0;
            } else {
                list[i].error = 1;
            }
        });
        return of(list);

    }

    // 得到一个两数之间的随机整数，包括两个数在内
    getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; // The maximum is inclusive and the minimum is inclusive

    }









}
