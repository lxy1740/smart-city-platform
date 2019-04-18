import { Injectable,Renderer2} from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

@Injectable()
export class SelectivePreloadingStrategy implements PreloadingStrategy {
    preloadedModules: string[] = [];
  
    preload(route: Route, load: () => Observable<any>): Observable<any> {
        if (route.data && route.data['preload']) {
            // add the route path to the preloaded module array
            this.preloadedModules.push(route.path);

            // log the route path to the console
            console.log('Preloaded: ' + route.path);
           if(location.pathname=="/login"){
             
                const video1=document.getElementById("video1")
                const video2=document.getElementById("video2")
                video1.addEventListener("ended",function(){
                    video1.style.display="none";
                    video2.style.display="block";
                    
                })
            }
          
            return load();
        } else {
            return of(null);
        }
    }
}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
