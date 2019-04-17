"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var animations_1 = require("@angular/animations");
// Component transition animations
exports.slideInDownAnimation = animations_1.trigger('routeAnimation', [
    animations_1.state('*', animations_1.style({
        opacity: 1,
        transform: 'translateX(0)'
    })),
    animations_1.transition(':enter', [
        animations_1.style({
            opacity: 0,
            transform: 'translateX(-100%)'
        }),
        animations_1.animate('0.2s ease-in')
    ]),
    animations_1.transition(':leave', [
        animations_1.animate('0.5s ease-out', animations_1.style({
            opacity: 0,
            transform: 'translateY(100%)'
        }))
    ])
]);
/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
//# sourceMappingURL=animations.js.map