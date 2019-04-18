"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var service_module_1 = require("./service.module");
describe('ServiceModule', function () {
    var serviceModule;
    beforeEach(function () {
        serviceModule = new service_module_1.ServiceModule();
    });
    it('should create an instance', function () {
        expect(serviceModule).toBeTruthy();
    });
});
//# sourceMappingURL=service.module.spec.js.map