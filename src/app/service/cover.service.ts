
import { Component, Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/';
import { of } from 'rxjs/';
import { tap, delay } from 'rxjs/operators';
import { Http, Headers, Response } from '@angular/http';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';
import { WindowRef } from '../windowserver';


import { Point } from '../data/point.type';
import { map } from 'rxjs/operators';


@Injectable()
export class CoverService {

    constructor(private http: Http) {


    }


    // 获取详细的位置数据
    getCovers( ne: Point, sw: Point): Observable<any> {
        return this.http.post('/api/manhole/inbounds', {

            'ne': ne,
            'sw': sw

        })
            .pipe(map((res: Response) => {
                if (res.status === 200) {
                    const data = res.json();
                    return data;
                } else {
                    return res.json().code.toString();
                }
            }));
    }

    // 获取指定类型的事件
    getIssues(deviceType: number, state: number): Observable<any> {
        return this.http.get(`/api/issue/open?deviceType=${deviceType}&state=${state}`)
            .pipe(map((res: Response) => {
                if (res.status === 200) {
                    const data = res.json();
                    return data;
                } else  {
                    return res.json().code.toString();
                }
            }));
    }

    // 设置指定事件状态0-1
    setIssues(issueId: number, state: number, comment: string): Observable<any> {
        return this.http.post(`/api/issue/${issueId}/state`, {
            'comment': comment,
            'state': state
        })
            .pipe(map((res: Response) => {
                if (res.status === 200) {
                    const data = res.json().code.toString();
                    return data;
                } else {
                    return res.json().code.toString();
                }
            }));
    }

    // 获取指定设备类型的不同状态的统计

    getStatus(deviceType: number, state: number, comment: string): Observable<any> {
        return this.http.post(`/api/issue/open/stat?deviceType=${deviceType}`, {
            'comment': comment,
            'state': state
        })
            .pipe(map((res: Response) => {
                if (res.status === 200) {
                    const data = res.json();
                    return data;
                } else {
                    return res.json().code.toString();
                }
            }));
    }
}
