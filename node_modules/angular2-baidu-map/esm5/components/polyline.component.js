/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { isNull, isUndefined } from '../helpers/object';
import { toPoints } from '../helpers/transformer';
import { nullCheck } from '../helpers/validate';
import { MapService } from '../providers/mapService';
var PolylineComponent = /** @class */ (function () {
    function PolylineComponent(_service) {
        this._service = _service;
        this.loaded = new EventEmitter();
    }
    /**
     * @return {?}
     */
    PolylineComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        nullCheck(this.points, 'points is required for <polyline>');
        this._service
            .addOverlay(function () {
            return (_this.polyline = new window.BMap.Polyline(toPoints(_this.points), _this.options));
        })
            .then(function () {
            _this.loaded.emit(_this.polyline);
        });
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    PolylineComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes["points"] && !changes["points"].isFirstChange()) {
            this.polyline.setPath(toPoints(changes["points"].currentValue));
        }
        if (changes["options"] && !changes["options"].isFirstChange()) {
            this.setOptions(changes["options"].currentValue);
        }
    };
    /**
     * @return {?}
     */
    PolylineComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._service.removeOverlay(this.polyline);
    };
    /**
     * @param {?} options
     * @return {?}
     */
    PolylineComponent.prototype.setOptions = /**
     * @param {?} options
     * @return {?}
     */
    function (options) {
        if (isNull(options)) {
            return;
        }
        if (!isUndefined(options.enableEditing)) {
            if (options.enableEditing) {
                this.polyline.enableEditing();
            }
            else {
                this.polyline.disableEditing();
            }
        }
        if (!isUndefined(options.enableMassClear)) {
            if (options.enableEditing) {
                this.polyline.enableMassClear();
            }
            else {
                this.polyline.disableMassClear();
            }
        }
        if (!isUndefined(options.strokeColor)) {
            this.polyline.setStrokeColor(options.strokeColor);
        }
        if (!isUndefined(options.strokeOpacity)) {
            this.polyline.setStrokeOpacity(options.strokeOpacity);
        }
        if (!isUndefined(options.strokeStyle)) {
            this.polyline.setStrokeStyle(options.strokeStyle);
        }
        if (!isUndefined(options.strokeWeight)) {
            this.polyline.setStrokeWeight(options.strokeWeight);
        }
    };
    PolylineComponent.decorators = [
        { type: Directive, args: [{
                    selector: 'polyline'
                },] },
    ];
    /** @nocollapse */
    PolylineComponent.ctorParameters = function () { return [
        { type: MapService, },
    ]; };
    PolylineComponent.propDecorators = {
        "points": [{ type: Input },],
        "options": [{ type: Input },],
        "loaded": [{ type: Output },],
    };
    return PolylineComponent;
}());
export { PolylineComponent };
function PolylineComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    PolylineComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    PolylineComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    PolylineComponent.propDecorators;
    /** @type {?} */
    PolylineComponent.prototype.points;
    /** @type {?} */
    PolylineComponent.prototype.options;
    /** @type {?} */
    PolylineComponent.prototype.loaded;
    /** @type {?} */
    PolylineComponent.prototype.polyline;
    /** @type {?} */
    PolylineComponent.prototype._service;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9seWxpbmUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhcjItYmFpZHUtbWFwLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9wb2x5bGluZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFJTCxNQUFNLEVBRVAsTUFBTSxlQUFlLENBQUE7QUFFdEIsT0FBTyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQTtBQUN2RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sd0JBQXdCLENBQUE7QUFDakQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHFCQUFxQixDQUFBO0FBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQTs7SUFlbEQsMkJBQW9CLFFBQW9CO1FBQXBCLGFBQVEsR0FBUixRQUFRLENBQVk7c0JBSmIsSUFBSSxZQUFZLEVBQUU7S0FJRDs7OztJQUVyQyxvQ0FBUTs7Ozs7UUFDYixTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxtQ0FBbUMsQ0FBQyxDQUFBO1FBRTNELElBQUksQ0FBQyxRQUFRO2FBQ1YsVUFBVSxDQUFDO1lBQ1YsTUFBTSxDQUFDLENBQUMsS0FBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsS0FBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUE7U0FDdkYsQ0FBQzthQUNELElBQUksQ0FBQztZQUNKLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtTQUNoQyxDQUFDLENBQUE7Ozs7OztJQUdDLHVDQUFXOzs7O2NBQUMsT0FBaUQ7UUFDbEUsRUFBRSxDQUFDLENBQUMsT0FBTyxjQUFXLENBQUMsT0FBTyxXQUFRLGFBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN0RCxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxXQUFRLFlBQVksQ0FBQyxDQUFDLENBQUE7U0FDN0Q7UUFDRCxFQUFFLENBQUMsQ0FBQyxPQUFPLGVBQVksQ0FBQyxPQUFPLFlBQVMsYUFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3hELElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxZQUFTLFlBQVksQ0FBQyxDQUFBO1NBQzlDOzs7OztJQUdJLHVDQUFXOzs7O1FBQ2hCLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTs7Ozs7O0lBR3BDLHNDQUFVOzs7O2NBQUMsT0FBd0I7UUFDekMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwQixNQUFNLENBQUE7U0FDUDtRQUNELEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7Z0JBQzFCLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLENBQUE7YUFDOUI7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsRUFBRSxDQUFBO2FBQy9CO1NBQ0Y7UUFDRCxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO2dCQUMxQixJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsRUFBRSxDQUFBO2FBQ2hDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFBO2FBQ2pDO1NBQ0Y7UUFDRCxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RDLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQTtTQUNsRDtRQUNELEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUE7U0FDdEQ7UUFDRCxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RDLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQTtTQUNsRDtRQUNELEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFBO1NBQ3BEOzs7Z0JBbkVKLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsVUFBVTtpQkFDckI7Ozs7Z0JBTlEsVUFBVTs7OzJCQVFoQixLQUFLOzRCQUNMLEtBQUs7MkJBRUwsTUFBTTs7NEJBekJUOztTQXFCYSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgU2ltcGxlQ2hhbmdlXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXG5cbmltcG9ydCB7IGlzTnVsbCwgaXNVbmRlZmluZWQgfSBmcm9tICcuLi9oZWxwZXJzL29iamVjdCdcbmltcG9ydCB7IHRvUG9pbnRzIH0gZnJvbSAnLi4vaGVscGVycy90cmFuc2Zvcm1lcidcbmltcG9ydCB7IG51bGxDaGVjayB9IGZyb20gJy4uL2hlbHBlcnMvdmFsaWRhdGUnXG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vcHJvdmlkZXJzL21hcFNlcnZpY2UnXG5pbXBvcnQgeyBCUG9seWxpbmUsIFBvbHlsaW5lT3B0aW9ucyB9IGZyb20gJy4uL3R5cGVzL1BvbHlsaW5lJ1xuaW1wb3J0IHsgUG9pbnQgfSBmcm9tICcuLi90eXBlcy9Qb2ludCdcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAncG9seWxpbmUnXG59KVxuZXhwb3J0IGNsYXNzIFBvbHlsaW5lQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpIHByaXZhdGUgcG9pbnRzOiBBcnJheTxQb2ludD5cbiAgQElucHV0KCkgcHJpdmF0ZSBvcHRpb25zOiBQb2x5bGluZU9wdGlvbnNcblxuICBAT3V0cHV0KCkgcHJpdmF0ZSBsb2FkZWQgPSBuZXcgRXZlbnRFbWl0dGVyKClcblxuICBwcml2YXRlIHBvbHlsaW5lOiBCUG9seWxpbmVcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zZXJ2aWNlOiBNYXBTZXJ2aWNlKSB7fVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICBudWxsQ2hlY2sodGhpcy5wb2ludHMsICdwb2ludHMgaXMgcmVxdWlyZWQgZm9yIDxwb2x5bGluZT4nKVxuXG4gICAgdGhpcy5fc2VydmljZVxuICAgICAgLmFkZE92ZXJsYXkoKCkgPT4ge1xuICAgICAgICByZXR1cm4gKHRoaXMucG9seWxpbmUgPSBuZXcgd2luZG93LkJNYXAuUG9seWxpbmUodG9Qb2ludHModGhpcy5wb2ludHMpLCB0aGlzLm9wdGlvbnMpKVxuICAgICAgfSlcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5sb2FkZWQuZW1pdCh0aGlzLnBvbHlsaW5lKVxuICAgICAgfSlcbiAgfVxuXG4gIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiB7IFtwcm9wZXJ0eU5hbWU6IHN0cmluZ106IFNpbXBsZUNoYW5nZSB9KSB7XG4gICAgaWYgKGNoYW5nZXMucG9pbnRzICYmICFjaGFuZ2VzLnBvaW50cy5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMucG9seWxpbmUuc2V0UGF0aCh0b1BvaW50cyhjaGFuZ2VzLnBvaW50cy5jdXJyZW50VmFsdWUpKVxuICAgIH1cbiAgICBpZiAoY2hhbmdlcy5vcHRpb25zICYmICFjaGFuZ2VzLm9wdGlvbnMuaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICB0aGlzLnNldE9wdGlvbnMoY2hhbmdlcy5vcHRpb25zLmN1cnJlbnRWYWx1ZSlcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fc2VydmljZS5yZW1vdmVPdmVybGF5KHRoaXMucG9seWxpbmUpXG4gIH1cblxuICBwcml2YXRlIHNldE9wdGlvbnMob3B0aW9uczogUG9seWxpbmVPcHRpb25zKTogdm9pZCB7XG4gICAgaWYgKGlzTnVsbChvcHRpb25zKSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGlmICghaXNVbmRlZmluZWQob3B0aW9ucy5lbmFibGVFZGl0aW5nKSkge1xuICAgICAgaWYgKG9wdGlvbnMuZW5hYmxlRWRpdGluZykge1xuICAgICAgICB0aGlzLnBvbHlsaW5lLmVuYWJsZUVkaXRpbmcoKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5wb2x5bGluZS5kaXNhYmxlRWRpdGluZygpXG4gICAgICB9XG4gICAgfVxuICAgIGlmICghaXNVbmRlZmluZWQob3B0aW9ucy5lbmFibGVNYXNzQ2xlYXIpKSB7XG4gICAgICBpZiAob3B0aW9ucy5lbmFibGVFZGl0aW5nKSB7XG4gICAgICAgIHRoaXMucG9seWxpbmUuZW5hYmxlTWFzc0NsZWFyKClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucG9seWxpbmUuZGlzYWJsZU1hc3NDbGVhcigpXG4gICAgICB9XG4gICAgfVxuICAgIGlmICghaXNVbmRlZmluZWQob3B0aW9ucy5zdHJva2VDb2xvcikpIHtcbiAgICAgIHRoaXMucG9seWxpbmUuc2V0U3Ryb2tlQ29sb3Iob3B0aW9ucy5zdHJva2VDb2xvcilcbiAgICB9XG4gICAgaWYgKCFpc1VuZGVmaW5lZChvcHRpb25zLnN0cm9rZU9wYWNpdHkpKSB7XG4gICAgICB0aGlzLnBvbHlsaW5lLnNldFN0cm9rZU9wYWNpdHkob3B0aW9ucy5zdHJva2VPcGFjaXR5KVxuICAgIH1cbiAgICBpZiAoIWlzVW5kZWZpbmVkKG9wdGlvbnMuc3Ryb2tlU3R5bGUpKSB7XG4gICAgICB0aGlzLnBvbHlsaW5lLnNldFN0cm9rZVN0eWxlKG9wdGlvbnMuc3Ryb2tlU3R5bGUpXG4gICAgfVxuICAgIGlmICghaXNVbmRlZmluZWQob3B0aW9ucy5zdHJva2VXZWlnaHQpKSB7XG4gICAgICB0aGlzLnBvbHlsaW5lLnNldFN0cm9rZVdlaWdodChvcHRpb25zLnN0cm9rZVdlaWdodClcbiAgICB9XG4gIH1cbn1cbiJdfQ==