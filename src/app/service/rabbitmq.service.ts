import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';


@Injectable()
export class RabbitmqService {
    constructor (private http : HttpClient){

    }

    

    createQueue(body): Observable<any> {
        return this.http.post(`/msg_api/webSocket/createQueue`,body);
    }
}