
import { Component, Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/';
import { Http, Headers, Response } from '@angular/http';
import { CookieService } from 'ngx-cookie';

import { of } from 'rxjs/';
import { tap, delay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { WindowRef } from '../windowserver';

// import { Point } from '../data/point.type';
import { map } from 'rxjs/operators';


@Injectable()
export class StrategyService {

    constructor(private http: Http) {
    }
    // 获取策略表
    getStrategy(): Observable<any> {
        return this.http.get(`/api/streetlight/rule`)
            .pipe(map((res: Response) => {
                if (res.status === 200) {
                    const data = res.json();
                    return data;
                } else if (res.status === 202) {
                    return res.json().code.toString();
                }
            }));
    }
    // 新增策略
    addStrategy(name: string): Observable<any> {
        return this.http.post(`/api/streetlight/rule`, {
            'name': name
        })
            .pipe(map((res: Response) => {
                if (res.status === 200) {
                    const data = res.json();
                    return data;
                } else if (res.status === 202) {
                    return res.json().code.toString();
                }
            }));
    }

    // 修改策略
    updateStrategy(id: number, name: string): Observable<any> {
        return this.http.put(`/api/streetlight/rule`, {
            'id': id,
            'name': name
        })
            .pipe(map((res: Response) => {
                if (res.status === 200) {
                    const data = { status: 200 };
                    return data;
                } else if (res.status === 202) {
                    return res.json().code.toString();
                }
            }));
    }

    // 删除策略
    delStrategy(id: number): Observable<any> {
        return this.http.delete(`/api/streetlight/rule?id=${id}`)
            .pipe(map((res: Response) => {
                if (res.status === 200) {
                    const data = { status: 200 };
                    return data;
                } else if (res.status === 202) {
                    return res.json().code.toString();
                }
            }));
    }
    // 获取指定策略的规则
    getRules(ruleId: number): Observable<any> {
        return this.http.get(`/api/streetlight/rule/${ruleId}`)
            .pipe(map((res: Response) => {
                if (res.status === 200) {
                    const data = res.json();
                    return data;
                } else if (res.status === 202) {
                    return res.json().code.toString();
                }
            }));
    }

    // 新增策略的日期规则
    addRules(ruleId: number, start: any, end: any, holidayRules: any, workdayRules: any): Observable<any> {
        return this.http.post(`/api/streetlight/rule/${ruleId}`, {
            'start': start,
            'end': end,
            'holidayRules': holidayRules,
            'workdayRules': workdayRules

        })
            .pipe(map((res: Response) => {
                if (res.status === 200) {
                    const data = res.json();
                    return data;
                } else if (res.status === 202) {
                    return res.json().code.toString();
                }
            }));
    }

    // 新增策略的日期规则
    updataRules(ruleId: number, ruleDateId: number, start: any, end: any, holidayRules: any, workdayRules: any): Observable<any> {
        return this.http.put(`/api/streetlight/rule/${ruleId}?ruleDateId=${ruleDateId}`, {
            'start': start,
            'end': end,
            'holidayRules': holidayRules,
            'workdayRules': workdayRules

        })
            .pipe(map((res: Response) => {
                if (res.status === 200) {
                    const data = res.json();
                    return data;
                } else if (res.status === 202) {
                    return res.json().code.toString();
                }
            }));
    }

    // 删除策略的日期规则
    delRule(ruleId: number, ruleDateId: number): Observable<any> {
        return this.http.delete(`/api/streetlight/rule/${ruleId}?ruleDateId=${ruleDateId}`)
            .pipe(map((res: Response) => {
                if (res.status === 200) {
                    const data = { status: 200 };
                    return data;
                } else if (res.status === 202) {
                    return res.json().code.toString();
                }
            }));
    }
}
