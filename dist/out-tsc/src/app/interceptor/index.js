"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/common/http");
var interceptorService_1 = require("./interceptorService");
/** Http interceptor providers in outside-in order */
exports.httpInterceptorProviders = [
    { provide: http_1.HTTP_INTERCEPTORS, useClass: interceptorService_1.InterceptorService, multi: true }
];
/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
//# sourceMappingURL=index.js.map