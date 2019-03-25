"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var operators_1 = require("rxjs/operators");
var LedService = /** @class */ (function () {
    function LedService(http) {
        this.http = http;
    }
    LedService.prototype.gFiles = function (id) {
        // return Observable.of(ARTICLESTYPE);
        return this.http.get("/led-api/files/gFiles?id=" + id)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    LedService.prototype.createAir = function () {
        // return Observable.of(ARTICLESTYPE);
        return this.http.get("/led-api/files/createAir")
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    LedService.prototype.delProgram = function (id) {
        return this.http.delete("/led-api/programs/delProgram?id=" + id)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    LedService.prototype.getProgram = function (id) {
        // return Observable.of(ARTICLESTYPE);
        return this.http.get("/led-api/programs/getProgram?id=" + id)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    LedService.prototype.createProgram = function (body) {
        // return Observable.of(ARTICLESTYPE);
        return this.http.post('/led-api/programs/createProgram', body)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    LedService.prototype.getPrograms = function (currentPage, pageSize) {
        // return Observable.of(ARTICLESTYPE);
        return this.http
            .get("/led-api/programs/getPrograms?pageSize=" + pageSize + "&currentPage=" + currentPage + "&timestamp=" + new Date().getTime())
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    LedService.prototype.delTask = function (id) {
        return this.http.delete("/led-api/tasks/delTask?id=" + id)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    LedService.prototype.createTask = function (body) {
        // return Observable.of(ARTICLESTYPE);
        return this.http.post('/led-api/tasks/createTask', body)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    LedService.prototype.getTasks = function (currentPage, pageSize) {
        // return Observable.of(ARTICLESTYPE);
        return this.http.get("/led-api/tasks/getTasks?pageSize=" + pageSize + "&currentPage=" + currentPage + "&timestamp=" + new Date().getTime())
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    LedService.prototype.createUser = function (body) {
        // return Observable.of(ARTICLESTYPE);
        return this.http.post('/led-api/users/createUser', body)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    LedService.prototype.getUsers = function (currentPage, pageSize) {
        // return Observable.of(ARTICLESTYPE);
        return this.http.get("/led-api/users/getUser?pageSize=" + pageSize + "&currentPage=" + currentPage)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    LedService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], LedService);
    return LedService;
}());
exports.LedService = LedService;
//# sourceMappingURL=led.service.js.map