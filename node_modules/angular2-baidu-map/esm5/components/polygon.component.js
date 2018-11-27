/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { isNull, isUndefined } from '../helpers/object';
import { toPoints } from '../helpers/transformer';
import { nullCheck } from '../helpers/validate';
import { MapService } from '../providers/mapService';
var PolygonComponent = /** @class */ (function () {
    function PolygonComponent(_service) {
        this._service = _service;
        this.loaded = new EventEmitter();
    }
    /**
     * @return {?}
     */
    PolygonComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        nullCheck(this.points, 'points is required for <polygon>');
        this._service
            .addOverlay(function () {
            return (_this.polygon = new window.BMap.Polygon(toPoints(_this.points), _this.options));
        })
            .then(function () {
            _this.loaded.emit(_this.polygon);
        });
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    PolygonComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes["points"] && !changes["points"].isFirstChange()) {
            this.polygon.setPath(toPoints(changes["points"].currentValue));
        }
        if (changes["options"] && !changes["options"].isFirstChange()) {
            this.setOptions(changes["options"].currentValue);
        }
    };
    /**
     * @return {?}
     */
    PolygonComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._service.removeOverlay(this.polygon);
    };
    /**
     * @param {?} options
     * @return {?}
     */
    PolygonComponent.prototype.setOptions = /**
     * @param {?} options
     * @return {?}
     */
    function (options) {
        if (isNull(options)) {
            return;
        }
        if (!isUndefined(options.enableEditing)) {
            if (options.enableEditing) {
                this.polygon.enableEditing();
            }
            else {
                this.polygon.disableEditing();
            }
        }
        if (!isUndefined(options.enableMassClear)) {
            if (options.enableEditing) {
                this.polygon.enableMassClear();
            }
            else {
                this.polygon.disableMassClear();
            }
        }
        if (!isUndefined(options.strokeColor)) {
            this.polygon.setStrokeColor(options.strokeColor);
        }
        if (!isUndefined(options.fillColor)) {
            this.polygon.setFillColor(options.fillColor);
        }
        if (!isUndefined(options.strokeOpacity)) {
            this.polygon.setStrokeOpacity(options.strokeOpacity);
        }
        if (!isUndefined(options.fillOpacity)) {
            this.polygon.setFillOpacity(options.fillOpacity);
        }
        if (!isUndefined(options.strokeStyle)) {
            this.polygon.setStrokeStyle(options.strokeStyle);
        }
        if (!isUndefined(options.strokeWeight)) {
            this.polygon.setStrokeWeight(options.strokeWeight);
        }
    };
    PolygonComponent.decorators = [
        { type: Directive, args: [{
                    selector: 'polygon'
                },] },
    ];
    /** @nocollapse */
    PolygonComponent.ctorParameters = function () { return [
        { type: MapService, },
    ]; };
    PolygonComponent.propDecorators = {
        "points": [{ type: Input },],
        "options": [{ type: Input },],
        "loaded": [{ type: Output },],
    };
    return PolygonComponent;
}());
export { PolygonComponent };
function PolygonComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    PolygonComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    PolygonComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    PolygonComponent.propDecorators;
    /** @type {?} */
    PolygonComponent.prototype.points;
    /** @type {?} */
    PolygonComponent.prototype.options;
    /** @type {?} */
    PolygonComponent.prototype.loaded;
    /** @type {?} */
    PolygonComponent.prototype.polygon;
    /** @type {?} */
    PolygonComponent.prototype._service;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9seWdvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyMi1iYWlkdS1tYXAvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3BvbHlnb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBSUwsTUFBTSxFQUVQLE1BQU0sZUFBZSxDQUFBO0FBRXRCLE9BQU8sRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLE1BQU0sbUJBQW1CLENBQUE7QUFDdkQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHdCQUF3QixDQUFBO0FBQ2pELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQTtBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0seUJBQXlCLENBQUE7O0lBZWxELDBCQUFvQixRQUFvQjtRQUFwQixhQUFRLEdBQVIsUUFBUSxDQUFZO3NCQUpiLElBQUksWUFBWSxFQUFFO0tBSUQ7Ozs7SUFFckMsbUNBQVE7Ozs7O1FBQ2IsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsa0NBQWtDLENBQUMsQ0FBQTtRQUUxRCxJQUFJLENBQUMsUUFBUTthQUNWLFVBQVUsQ0FBQztZQUNWLE1BQU0sQ0FBQyxDQUFDLEtBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFBO1NBQ3JGLENBQUM7YUFDRCxJQUFJLENBQUM7WUFDSixLQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7U0FDL0IsQ0FBQyxDQUFBOzs7Ozs7SUFHQyxzQ0FBVzs7OztjQUFDLE9BQWlEO1FBQ2xFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sY0FBVyxDQUFDLE9BQU8s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UWhCLEtBQUs7NEJBQ0wsS0FBSzsyQkFFTCxNQUFNOzsyQkF6QlQ7O1NBcUJhLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBTaW1wbGVDaGFuZ2Vcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcblxuaW1wb3J0IHsgaXNOdWxsLCBpc1VuZGVmaW5lZCB9IGZyb20gJy4uL2hlbHBlcnMvb2JqZWN0J1xuaW1wb3J0IHsgdG9Qb2ludHMgfSBmcm9tICcuLi9oZWxwZXJzL3RyYW5zZm9ybWVyJ1xuaW1wb3J0IHsgbnVsbENoZWNrIH0gZnJvbSAnLi4vaGVscGVycy92YWxpZGF0ZSdcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuLi9wcm92aWRlcnMvbWFwU2VydmljZSdcbmltcG9ydCB7IEJQb2x5Z29uLCBQb2x5Z29uT3B0aW9ucyB9IGZyb20gJy4uL3R5cGVzL1BvbHlnb24nXG5pbXBvcnQgeyBQb2ludCB9IGZyb20gJy4uL3R5cGVzL1BvaW50J1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdwb2x5Z29uJ1xufSlcbmV4cG9ydCBjbGFzcyBQb2x5Z29uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpIHByaXZhdGUgcG9pbnRzOiBBcnJheTxQb2ludD5cbiAgQElucHV0KCkgcHJpdmF0ZSBvcHRpb25zOiBQb2x5Z29uT3B0aW9uc1xuXG4gIEBPdXRwdXQoKSBwcml2YXRlIGxvYWRlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKVxuXG4gIHByaXZhdGUgcG9seWdvbjogQlBvbHlnb25cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zZXJ2aWNlOiBNYXBTZXJ2aWNlKSB7fVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICBudWxsQ2hlY2sodGhpcy5wb2ludHMsICdwb2ludHMgaXMgcmVxdWlyZWQgZm9yIDxwb2x5Z29uPicpXG5cbiAgICB0aGlzLl9zZXJ2aWNlXG4gICAgICAuYWRkT3ZlcmxheSgoKSA9PiB7XG4gICAgICAgIHJldHVybiAodGhpcy5wb2x5Z29uID0gbmV3IHdpbmRvdy5CTWFwLlBvbHlnb24odG9Qb2ludHModGhpcy5wb2ludHMpLCB0aGlzLm9wdGlvbnMpKVxuICAgICAgfSlcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5sb2FkZWQuZW1pdCh0aGlzLnBvbHlnb24pXG4gICAgICB9KVxuICB9XG5cbiAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IHsgW3Byb3BlcnR5TmFtZTogc3RyaW5nXTogU2ltcGxlQ2hhbmdlIH0pIHtcbiAgICBpZiAoY2hhbmdlcy5wb2ludHMgJiYgIWNoYW5nZXMucG9pbnRzLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgdGhpcy5wb2x5Z29uLnNldFBhdGgodG9Qb2ludHMoY2hhbmdlcy5wb2ludHMuY3VycmVudFZhbHVlKSlcbiAgICB9XG4gICAgaWYgKGNoYW5nZXMub3B0aW9ucyAmJiAhY2hhbmdlcy5vcHRpb25zLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgdGhpcy5zZXRPcHRpb25zKGNoYW5nZXMub3B0aW9ucy5jdXJyZW50VmFsdWUpXG4gICAgfVxuICB9XG5cbiAgcHVibGljIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX3NlcnZpY2UucmVtb3ZlT3ZlcmxheSh0aGlzLnBvbHlnb24pXG4gIH1cblxuICBwcml2YXRlIHNldE9wdGlvbnMob3B0aW9uczogUG9seWdvbk9wdGlvbnMpOiB2b2lkIHtcbiAgICBpZiAoaXNOdWxsKG9wdGlvbnMpKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgaWYgKCFpc1VuZGVmaW5lZChvcHRpb25zLmVuYWJsZUVkaXRpbmcpKSB7XG4gICAgICBpZiAob3B0aW9ucy5lbmFibGVFZGl0aW5nKSB7XG4gICAgICAgIHRoaXMucG9seWdvbi5lbmFibGVFZGl0aW5nKClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucG9seWdvbi5kaXNhYmxlRWRpdGluZygpXG4gICAgICB9XG4gICAgfVxuICAgIGlmICghaXNVbmRlZmluZWQob3B0aW9ucy5lbmFibGVNYXNzQ2xlYXIpKSB7XG4gICAgICBpZiAob3B0aW9ucy5lbmFibGVFZGl0aW5nKSB7XG4gICAgICAgIHRoaXMucG9seWdvbi5lbmFibGVNYXNzQ2xlYXIoKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5wb2x5Z29uLmRpc2FibGVNYXNzQ2xlYXIoKVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIWlzVW5kZWZpbmVkKG9wdGlvbnMuc3Ryb2tlQ29sb3IpKSB7XG4gICAgICB0aGlzLnBvbHlnb24uc2V0U3Ryb2tlQ29sb3Iob3B0aW9ucy5zdHJva2VDb2xvcilcbiAgICB9XG4gICAgaWYgKCFpc1VuZGVmaW5lZChvcHRpb25zLmZpbGxDb2xvcikpIHtcbiAgICAgIHRoaXMucG9seWdvbi5zZXRGaWxsQ29sb3Iob3B0aW9ucy5maWxsQ29sb3IpXG4gICAgfVxuICAgIGlmICghaXNVbmRlZmluZWQob3B0aW9ucy5zdHJva2VPcGFjaXR5KSkge1xuICAgICAgdGhpcy5wb2x5Z29uLnNldFN0cm9rZU9wYWNpdHkob3B0aW9ucy5zdHJva2VPcGFjaXR5KVxuICAgIH1cbiAgICBpZiAoIWlzVW5kZWZpbmVkKG9wdGlvbnMuZmlsbE9wYWNpdHkpKSB7XG4gICAgICB0aGlzLnBvbHlnb24uc2V0RmlsbE9wYWNpdHkob3B0aW9ucy5maWxsT3BhY2l0eSlcbiAgICB9XG4gICAgaWYgKCFpc1VuZGVmaW5lZChvcHRpb25zLnN0cm9rZVN0eWxlKSkge1xuICAgICAgdGhpcy5wb2x5Z29uLnNldFN0cm9rZVN0eWxlKG9wdGlvbnMuc3Ryb2tlU3R5bGUpXG4gICAgfVxuICAgIGlmICghaXNVbmRlZmluZWQob3B0aW9ucy5zdHJva2VXZWlnaHQpKSB7XG4gICAgICB0aGlzLnBvbHlnb24uc2V0U3Ryb2tlV2VpZ2h0KG9wdGlvbnMuc3Ryb2tlV2VpZ2h0KVxuICAgIH1cbiAgfVxufVxuIl19