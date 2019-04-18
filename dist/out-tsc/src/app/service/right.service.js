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
var operators_1 = require("rxjs/operators");
var http_1 = require("@angular/common/http");
var RightService = /** @class */ (function () {
    function RightService(http) {
        this.http = http;
    }
    // 获取所有角色 - 分页
    RightService.prototype.getAllRole = function (queryStr, page, pageSize) {
        return this.http.get("/security/role?queryStr=" + queryStr + "&page=" + page + "&pageSize=" + pageSize)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // 新增角色
    RightService.prototype.addNewRole = function (name, authorities) {
        return this.http.post('/security/role', {
            'name': name,
            'authorities': authorities
        })
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // 修改角色
    RightService.prototype.updateRole = function (id, name, authorities) {
        return this.http.put('/security/role', {
            'id': id,
            'name': name,
            'authorities': authorities
        })
            .pipe(operators_1.map(function (res) {
            var data = { status: 200 };
            return data;
        }));
    };
    // 删除用户
    RightService.prototype.deleteRole = function (id) {
        return this.http.delete("/security/role?id=" + id)
            .pipe(operators_1.map(function (res) {
            var data = { status: 200 };
            return data;
        }));
    };
    // 获取角色对应的权限
    RightService.prototype.getAuthorityByRoleId = function (roleId) {
        return this.http.get("/security/role/getAuthorityByRoleId?roleId=" + roleId)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    // 根据用户获取权限
    RightService.prototype.getAuthoritiesByUserId = function (userId) {
        return this.http.get("/security/user/getAuthoritiesByUserId?userId=" + userId)
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    RightService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], RightService);
    return RightService;
}());
exports.RightService = RightService;
//# sourceMappingURL=right.service.js.map