/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { isNull } from '../helpers/object';
import { toIcon, toMarkerOptions, toPoint, toSize } from '../helpers/transformer';
import { nullCheck } from '../helpers/validate';
import { MapService } from '../providers/mapService';
var MarkerComponent = /** @class */ (function () {
    function MarkerComponent(_service) {
        this._service = _service;
        this.loaded = new EventEmitter();
        this.clicked = new EventEmitter();
    }
    /**
     * @return {?}
     */
    MarkerComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        nullCheck(this.point, 'point is required for <marker>');
        this._service
            .addOverlay(function () {
            return (_this.marker = new window.BMap.Marker(toPoint(_this.point), toMarkerOptions(_this.options)));
        })
            .then(function (_a) {
            var map = _a.map;
            _this.loaded.emit(_this.marker);
            _this.addListener(_this.marker, map);
        })
            .then(function () {
            // workaround: it's weird that postion is set while constructing phase will make click event not working
            // workaround: it's weird that postion is set while constructing phase will make click event not working
            _this.marker.setPosition(new window.BMap.Point(_this.point.lng, _this.point.lat));
        });
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    MarkerComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes["point"] && !changes["point"].isFirstChange()) {
            this.marker.setPosition(toPoint(changes["point"].currentValue));
        }
        if (changes["options"] && !changes["options"].isFirstChange()) {
            this.setOptions(changes["options"].currentValue);
        }
    };
    /**
     * @return {?}
     */
    MarkerComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._service.removeOverlay(this.marker);
    };
    /**
     * @param {?} options
     * @return {?}
     */
    MarkerComponent.prototype.setOptions = /**
     * @param {?} options
     * @return {?}
     */
    function (options) {
        if (isNull(options)) {
            return;
        }
        if (!isNull(options.offset)) {
            this.marker.setOffset(toSize(options.offset));
        }
        if (!isNull(options.icon)) {
            this.marker.setIcon(toIcon(options.icon.imageUrl, options.icon.size, options.icon));
        }
        if (!isNull(options.enableMassClear)) {
            this.marker[(options.enableMassClear ? 'enable' : 'disable') + 'MassClear']();
        }
        if (!isNull(options.enableDragging)) {
            this.marker[(options.enableDragging ? 'enable' : 'disable') + 'Dragging']();
        }
        if (!isNull(options.rotation)) {
            this.marker.setRotation(options.rotation);
        }
        if (!isNull(options.shadow)) {
            this.marker.setShadow(toIcon(options.shadow.imageUrl, options.shadow.size, options.shadow));
        }
        if (!isNull(options.title)) {
            this.marker.setTitle(options.title);
        }
    };
    /**
     * @param {?} marker
     * @param {?} map
     * @return {?}
     */
    MarkerComponent.prototype.addListener = /**
     * @param {?} marker
     * @param {?} map
     * @return {?}
     */
    function (marker, map) {
        var _this = this;
        marker.addEventListener('click', function (e) {
            _this.clicked.emit({
                e: e,
                map: map,
                marker: marker
            });
        });
    };
    MarkerComponent.decorators = [
        { type: Directive, args: [{
                    selector: 'marker'
                },] },
    ];
    /** @nocollapse */
    MarkerComponent.ctorParameters = function () { return [
        { type: MapService, },
    ]; };
    MarkerComponent.propDecorators = {
        "point": [{ type: Input },],
        "options": [{ type: Input },],
        "loaded": [{ type: Output },],
        "clicked": [{ type: Output },],
    };
    return MarkerComponent;
}());
export { MarkerComponent };
function MarkerComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MarkerComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MarkerComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    MarkerComponent.propDecorators;
    /** @type {?} */
    MarkerComponent.prototype.point;
    /** @type {?} */
    MarkerComponent.prototype.options;
    /** @type {?} */
    MarkerComponent.prototype.loaded;
    /** @type {?} */
    MarkerComponent.prototype.clicked;
    /** @type {?} */
    MarkerComponent.prototype.marker;
    /** @type {?} */
    MarkerComponent.prototype._service;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXIyLWJhaWR1LW1hcC8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvbWFya2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUlMLE1BQU0sRUFFUCxNQUFNLGVBQWUsQ0FBQTtBQUV0QixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sbUJBQW1CLENBQUE7QUFDMUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxlQUFlLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHdCQUF3QixDQUFBO0FBQ2pGLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQTtBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0seUJBQXlCLENBQUE7O0lBaUJsRCx5QkFBb0IsUUFBb0I7UUFBcEIsYUFBUSxHQUFSLFFBQVEsQ0FBWTtzQkFMYixJQUFJLFlBQVksRUFBRTt1QkFDakIsSUFBSSxZQUFZLEVBQUU7S0FJRjs7OztJQUVyQyxrQ0FBUTs7Ozs7UUFDYixTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxnQ0FBZ0MsQ0FBQyxDQUFBO1FBRXZELElBQUksQ0FBQyxRQUFRO2FBQ1YsVUFBVSxDQUFDO1lBQ1YsTUFBTSxDQUFDLENBQUMsS0FBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsZUFBZSxDQUFDLEtBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUE7U0FDbEcsQ0FBQzthQUNELElBQUksQ0FBQyxVQUFDLEVBQU87Z0JBQUwsWUFBRztZQUNWLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUM3QixLQUFJLENBQUMsV0FBVyxDQUFDLEtBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUE7U0FDbkMsQ0FBQzthQUNELElBQUksQ0FBQzs7WUFFSixBQURBLHdHQUF3RztZQUN4RyxLQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEtBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtTQUMvRSxDQUFDLENBQUE7Ozs7OztJQUdDLHFDQUFXOzs7O2NBQUMsT0FBaUQ7UUFDbEUsRUFBRSxDQUFDLENBQUMsT0FBTyxhQUFVLENBQUMsT0FBTyxVQUFPLGFBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNwRCxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsT0FBTyxVQUFPLFlBQVksQ0FBQyxDQUFDLENBQUE7U0FDN0Q7UUFDRCxFQUFFLENBQUMsQ0FBQyxPQUFPLGVBQVksQ0FBQyxPQUFPLFlBQVMsYUFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3hELElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxZQUFTLFlBQVksQ0FBQyxDQUFBO1NBQzlDOzs7OztJQUdJLHFDQUFXOzs7O1FBQ2hCLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTs7Ozs7O0lBR2xDLG9DQUFVOzs7O2NBQUMsT0FBc0I7UUFDdkMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwQixNQUFNLENBQUE7U0FDUDtRQUNELEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFBO1NBQzlDO1FBQ0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxQixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7U0FDcEY7UUFDRCxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxFQUFFLENBQUE7U0FDOUU7UUFDRCxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxFQUFFLENBQUE7U0FDNUU7UUFDRCxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlCLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQTtTQUMxQztRQUNELEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFBO1NBQzVGO1FBQ0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzQixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUE7U0FDcEM7Ozs7Ozs7SUFHSyxxQ0FBVzs7Ozs7Y0FBQyxNQUFlLEVBQUUsR0FBaUI7O1FBQ3BELE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsVUFBQyxDQUFNO1lBQ3RDLEtBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO2dCQUNoQixDQUFDLEdBQUE7Z0JBQ0QsR0FBRyxLQUFBO2dCQUNILE1BQU0sUUFBQTthQUNQLENBQUMsQ0FBQTtTQUNILENBQUMsQ0FBQTs7O2dCQTlFTCxTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLFFBQVE7aUJBQ25COzs7O2dCQVBRLFVBQVU7OzswQkFTaEIsS0FBSzs0QkFDTCxLQUFLOzJCQUVMLE1BQU07NEJBQ04sTUFBTTs7MEJBM0JUOztTQXNCYSxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZVxufSBmcm9tICdAYW5ndWxhci9jb3JlJ1xuXG5pbXBvcnQgeyBpc051bGwgfSBmcm9tICcuLi9oZWxwZXJzL29iamVjdCdcbmltcG9ydCB7IHRvSWNvbiwgdG9NYXJrZXJPcHRpb25zLCB0b1BvaW50LCB0b1NpemUgfSBmcm9tICcuLi9oZWxwZXJzL3RyYW5zZm9ybWVyJ1xuaW1wb3J0IHsgbnVsbENoZWNrIH0gZnJvbSAnLi4vaGVscGVycy92YWxpZGF0ZSdcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuLi9wcm92aWRlcnMvbWFwU2VydmljZSdcbmltcG9ydCB7IEJNYXBJbnN0YW5jZSB9IGZyb20gJy4uL3R5cGVzL01hcCdcbmltcG9ydCB7IEJNYXJrZXIsIE1hcmtlck9wdGlvbnMgfSBmcm9tICcuLi90eXBlcy9NYXJrZXInXG5pbXBvcnQgeyBQb2ludCB9IGZyb20gJy4uL3R5cGVzL1BvaW50J1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdtYXJrZXInXG59KVxuZXhwb3J0IGNsYXNzIE1hcmtlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKSBwcml2YXRlIHBvaW50OiBQb2ludFxuICBASW5wdXQoKSBwcml2YXRlIG9wdGlvbnM6IE1hcmtlck9wdGlvbnNcblxuICBAT3V0cHV0KCkgcHJpdmF0ZSBsb2FkZWQgPSBuZXcgRXZlbnRFbWl0dGVyKClcbiAgQE91dHB1dCgpIHByaXZhdGUgY2xpY2tlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKVxuXG4gIHByaXZhdGUgbWFya2VyOiBCTWFya2VyXG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfc2VydmljZTogTWFwU2VydmljZSkge31cblxuICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgbnVsbENoZWNrKHRoaXMucG9pbnQsICdwb2ludCBpcyByZXF1aXJlZCBmb3IgPG1hcmtlcj4nKVxuXG4gICAgdGhpcy5fc2VydmljZVxuICAgICAgLmFkZE92ZXJsYXkoKCkgPT4ge1xuICAgICAgICByZXR1cm4gKHRoaXMubWFya2VyID0gbmV3IHdpbmRvdy5CTWFwLk1hcmtlcih0b1BvaW50KHRoaXMucG9pbnQpLCB0b01hcmtlck9wdGlvbnModGhpcy5vcHRpb25zKSkpXG4gICAgICB9KVxuICAgICAgLnRoZW4oKHsgbWFwIH0pID0+IHtcbiAgICAgICAgdGhpcy5sb2FkZWQuZW1pdCh0aGlzLm1hcmtlcilcbiAgICAgICAgdGhpcy5hZGRMaXN0ZW5lcih0aGlzLm1hcmtlciwgbWFwKVxuICAgICAgfSlcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgLy8gd29ya2Fyb3VuZDogaXQncyB3ZWlyZCB0aGF0IHBvc3Rpb24gaXMgc2V0IHdoaWxlIGNvbnN0cnVjdGluZyBwaGFzZSB3aWxsIG1ha2UgY2xpY2sgZXZlbnQgbm90IHdvcmtpbmdcbiAgICAgICAgdGhpcy5tYXJrZXIuc2V0UG9zaXRpb24obmV3IHdpbmRvdy5CTWFwLlBvaW50KHRoaXMucG9pbnQubG5nLCB0aGlzLnBvaW50LmxhdCkpXG4gICAgICB9KVxuICB9XG5cbiAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IHsgW3Byb3BlcnR5TmFtZTogc3RyaW5nXTogU2ltcGxlQ2hhbmdlIH0pIHtcbiAgICBpZiAoY2hhbmdlcy5wb2ludCAmJiAhY2hhbmdlcy5wb2ludC5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMubWFya2VyLnNldFBvc2l0aW9uKHRvUG9pbnQoY2hhbmdlcy5wb2ludC5jdXJyZW50VmFsdWUpKVxuICAgIH1cbiAgICBpZiAoY2hhbmdlcy5vcHRpb25zICYmICFjaGFuZ2VzLm9wdGlvbnMuaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICB0aGlzLnNldE9wdGlvbnMoY2hhbmdlcy5vcHRpb25zLmN1cnJlbnRWYWx1ZSlcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fc2VydmljZS5yZW1vdmVPdmVybGF5KHRoaXMubWFya2VyKVxuICB9XG5cbiAgcHJpdmF0ZSBzZXRPcHRpb25zKG9wdGlvbnM6IE1hcmtlck9wdGlvbnMpOiB2b2lkIHtcbiAgICBpZiAoaXNOdWxsKG9wdGlvbnMpKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgaWYgKCFpc051bGwob3B0aW9ucy5vZmZzZXQpKSB7XG4gICAgICB0aGlzLm1hcmtlci5zZXRPZmZzZXQodG9TaXplKG9wdGlvbnMub2Zmc2V0KSlcbiAgICB9XG4gICAgaWYgKCFpc051bGwob3B0aW9ucy5pY29uKSkge1xuICAgICAgdGhpcy5tYXJrZXIuc2V0SWNvbih0b0ljb24ob3B0aW9ucy5pY29uLmltYWdlVXJsLCBvcHRpb25zLmljb24uc2l6ZSwgb3B0aW9ucy5pY29uKSlcbiAgICB9XG4gICAgaWYgKCFpc051bGwob3B0aW9ucy5lbmFibGVNYXNzQ2xlYXIpKSB7XG4gICAgICB0aGlzLm1hcmtlclsob3B0aW9ucy5lbmFibGVNYXNzQ2xlYXIgPyAnZW5hYmxlJyA6ICdkaXNhYmxlJykgKyAnTWFzc0NsZWFyJ10oKVxuICAgIH1cbiAgICBpZiAoIWlzTnVsbChvcHRpb25zLmVuYWJsZURyYWdnaW5nKSkge1xuICAgICAgdGhpcy5tYXJrZXJbKG9wdGlvbnMuZW5hYmxlRHJhZ2dpbmcgPyAnZW5hYmxlJyA6ICdkaXNhYmxlJykgKyAnRHJhZ2dpbmcnXSgpXG4gICAgfVxuICAgIGlmICghaXNOdWxsKG9wdGlvbnMucm90YXRpb24pKSB7XG4gICAgICB0aGlzLm1hcmtlci5zZXRSb3RhdGlvbihvcHRpb25zLnJvdGF0aW9uKVxuICAgIH1cbiAgICBpZiAoIWlzTnVsbChvcHRpb25zLnNoYWRvdykpIHtcbiAgICAgIHRoaXMubWFya2VyLnNldFNoYWRvdyh0b0ljb24ob3B0aW9ucy5zaGFkb3cuaW1hZ2VVcmwsIG9wdGlvbnMuc2hhZG93LnNpemUsIG9wdGlvbnMuc2hhZG93KSlcbiAgICB9XG4gICAgaWYgKCFpc051bGwob3B0aW9ucy50aXRsZSkpIHtcbiAgICAgIHRoaXMubWFya2VyLnNldFRpdGxlKG9wdGlvbnMudGl0bGUpXG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhZGRMaXN0ZW5lcihtYXJrZXI6IEJNYXJrZXIsIG1hcDogQk1hcEluc3RhbmNlKSB7XG4gICAgbWFya2VyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGU6IGFueSkgPT4ge1xuICAgICAgdGhpcy5jbGlja2VkLmVtaXQoe1xuICAgICAgICBlLFxuICAgICAgICBtYXAsXG4gICAgICAgIG1hcmtlclxuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG4iXX0=