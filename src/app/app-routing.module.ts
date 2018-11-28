import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CanDeactivateGuard } from './guard/can-deactivate-guard.service';
import { SelectivePreloadingStrategy } from './selective-preloading-strategy';


const appRoutes: Routes = [
    // { path: '**', component: PageNotFoundComponent },
    // { path: 'login', component: LoginComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'login', loadChildren: './login/login.module#LoginModule' },
    { path: 'home', loadChildren: './home/home.module#HomeModule' },

];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            {
                enableTracing: true, // <-- debugging purposes only
                preloadingStrategy: SelectivePreloadingStrategy

            }
        )
    ],
    exports: [
        RouterModule
    ],
    providers: [
        CanDeactivateGuard,
        SelectivePreloadingStrategy
    ]
})
export class AppRoutingModule { }


/*

Copyright(c): 2018 深圳创新设计研究院
Author: luo.shuqi@live.com
@file: app-routing.module.ts
@time: 2018 / 7 / 2 17: 18

*/
