/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { isNull, isUndefined } from '../helpers/object';
import { toPoints } from '../helpers/transformer';
import { nullCheck } from '../helpers/validate';
import { MapService } from '../providers/mapService';
export class PolygonComponent {
    /**
     * @param {?} _service
     */
    constructor(_service) {
        this._service = _service;
        this.loaded = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        nullCheck(this.points, 'points is required for <polygon>');
        this._service
            .addOverlay(() => {
            return (this.polygon = new window.BMap.Polygon(toPoints(this.points), this.options));
        })
            .then(() => {
            this.loaded.emit(this.polygon);
        });
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes["points"] && !changes["points"].isFirstChange()) {
            this.polygon.setPath(toPoints(changes["points"].currentValue));
        }
        if (changes["options"] && !changes["options"].isFirstChange()) {
            this.setOptions(changes["options"].currentValue);
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._service.removeOverlay(this.polygon);
    }
    /**
     * @param {?} options
     * @return {?}
     */
    setOptions(options) {
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
    }
}
PolygonComponent.decorators = [
    { type: Directive, args: [{
                selector: 'polygon'
            },] },
];
/** @nocollapse */
PolygonComponent.ctorParameters = () => [
    { type: MapService, },
];
PolygonComponent.propDecorators = {
    "points": [{ type: Input },],
    "options": [{ type: Input },],
    "loaded": [{ type: Output },],
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9seWdvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyMi1iYWlkdS1tYXAvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3BvbHlnb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBSUwsTUFBTSxFQUVQLE1BQU0sZUFBZSxDQUFBO0FBRXRCLE9BQU8sRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLE1BQU0sbUJBQW1CLENBQUE7QUFDdkQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHdCQUF3QixDQUFBO0FBQ2pELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQTtBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0seUJBQXlCLENBQUE7QUFPcEQsTUFBTTs7OztJQVFKLFlBQW9CLFFBQW9CO1FBQXBCLGFBQVEsR0FBUixRQUFRLENBQVk7c0JBSmIsSUFBSSxZQUFZLEVBQUU7S0FJRDs7OztJQUVyQyxRQUFRO1FBQ2IsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsa0NBQWtDLENBQUMsQ0FBQTtRQUUxRCxJQUFJLENBQUMsUUFBUTthQUNWLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDZixNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQTtTQUNyRixDQUFDO2FBQ0QsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNULElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtTQUMvQixDQUFDLENBQUE7Ozs7OztJQUdDLFdBQVcsQ0FBQyxPQUFpRDtRQUNsRSxFQUFFLENBQUMsQ0FB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USxVQUFVOzs7dUJBUWhCLEtBQUs7d0JBQ0wsS0FBSzt1QkFFTCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZVxufSBmcm9tICdAYW5ndWxhci9jb3JlJ1xuXG5pbXBvcnQgeyBpc051bGwsIGlzVW5kZWZpbmVkIH0gZnJvbSAnLi4vaGVscGVycy9vYmplY3QnXG5pbXBvcnQgeyB0b1BvaW50cyB9IGZyb20gJy4uL2hlbHBlcnMvdHJhbnNmb3JtZXInXG5pbXBvcnQgeyBudWxsQ2hlY2sgfSBmcm9tICcuLi9oZWxwZXJzL3ZhbGlkYXRlJ1xuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL3Byb3ZpZGVycy9tYXBTZXJ2aWNlJ1xuaW1wb3J0IHsgQlBvbHlnb24sIFBvbHlnb25PcHRpb25zIH0gZnJvbSAnLi4vdHlwZXMvUG9seWdvbidcbmltcG9ydCB7IFBvaW50IH0gZnJvbSAnLi4vdHlwZXMvUG9pbnQnXG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ3BvbHlnb24nXG59KVxuZXhwb3J0IGNsYXNzIFBvbHlnb25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcbiAgQElucHV0KCkgcHJpdmF0ZSBwb2ludHM6IEFycmF5PFBvaW50PlxuICBASW5wdXQoKSBwcml2YXRlIG9wdGlvbnM6IFBvbHlnb25PcHRpb25zXG5cbiAgQE91dHB1dCgpIHByaXZhdGUgbG9hZGVkID0gbmV3IEV2ZW50RW1pdHRlcigpXG5cbiAgcHJpdmF0ZSBwb2x5Z29uOiBCUG9seWdvblxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3NlcnZpY2U6IE1hcFNlcnZpY2UpIHt9XG5cbiAgcHVibGljIG5nT25Jbml0KCkge1xuICAgIG51bGxDaGVjayh0aGlzLnBvaW50cywgJ3BvaW50cyBpcyByZXF1aXJlZCBmb3IgPHBvbHlnb24+JylcblxuICAgIHRoaXMuX3NlcnZpY2VcbiAgICAgIC5hZGRPdmVybGF5KCgpID0+IHtcbiAgICAgICAgcmV0dXJuICh0aGlzLnBvbHlnb24gPSBuZXcgd2luZG93LkJNYXAuUG9seWdvbih0b1BvaW50cyh0aGlzLnBvaW50cyksIHRoaXMub3B0aW9ucykpXG4gICAgICB9KVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICB0aGlzLmxvYWRlZC5lbWl0KHRoaXMucG9seWdvbilcbiAgICAgIH0pXG4gIH1cblxuICBwdWJsaWMgbmdPbkNoYW5nZXMoY2hhbmdlczogeyBbcHJvcGVydHlOYW1lOiBzdHJpbmddOiBTaW1wbGVDaGFuZ2UgfSkge1xuICAgIGlmIChjaGFuZ2VzLnBvaW50cyAmJiAhY2hhbmdlcy5wb2ludHMuaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICB0aGlzLnBvbHlnb24uc2V0UGF0aCh0b1BvaW50cyhjaGFuZ2VzLnBvaW50cy5jdXJyZW50VmFsdWUpKVxuICAgIH1cbiAgICBpZiAoY2hhbmdlcy5vcHRpb25zICYmICFjaGFuZ2VzLm9wdGlvbnMuaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICB0aGlzLnNldE9wdGlvbnMoY2hhbmdlcy5vcHRpb25zLmN1cnJlbnRWYWx1ZSlcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fc2VydmljZS5yZW1vdmVPdmVybGF5KHRoaXMucG9seWdvbilcbiAgfVxuXG4gIHByaXZhdGUgc2V0T3B0aW9ucyhvcHRpb25zOiBQb2x5Z29uT3B0aW9ucyk6IHZvaWQge1xuICAgIGlmIChpc051bGwob3B0aW9ucykpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBpZiAoIWlzVW5kZWZpbmVkKG9wdGlvbnMuZW5hYmxlRWRpdGluZykpIHtcbiAgICAgIGlmIChvcHRpb25zLmVuYWJsZUVkaXRpbmcpIHtcbiAgICAgICAgdGhpcy5wb2x5Z29uLmVuYWJsZUVkaXRpbmcoKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5wb2x5Z29uLmRpc2FibGVFZGl0aW5nKClcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFpc1VuZGVmaW5lZChvcHRpb25zLmVuYWJsZU1hc3NDbGVhcikpIHtcbiAgICAgIGlmIChvcHRpb25zLmVuYWJsZUVkaXRpbmcpIHtcbiAgICAgICAgdGhpcy5wb2x5Z29uLmVuYWJsZU1hc3NDbGVhcigpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnBvbHlnb24uZGlzYWJsZU1hc3NDbGVhcigpXG4gICAgICB9XG4gICAgfVxuICAgIGlmICghaXNVbmRlZmluZWQob3B0aW9ucy5zdHJva2VDb2xvcikpIHtcbiAgICAgIHRoaXMucG9seWdvbi5zZXRTdHJva2VDb2xvcihvcHRpb25zLnN0cm9rZUNvbG9yKVxuICAgIH1cbiAgICBpZiAoIWlzVW5kZWZpbmVkKG9wdGlvbnMuZmlsbENvbG9yKSkge1xuICAgICAgdGhpcy5wb2x5Z29uLnNldEZpbGxDb2xvcihvcHRpb25zLmZpbGxDb2xvcilcbiAgICB9XG4gICAgaWYgKCFpc1VuZGVmaW5lZChvcHRpb25zLnN0cm9rZU9wYWNpdHkpKSB7XG4gICAgICB0aGlzLnBvbHlnb24uc2V0U3Ryb2tlT3BhY2l0eShvcHRpb25zLnN0cm9rZU9wYWNpdHkpXG4gICAgfVxuICAgIGlmICghaXNVbmRlZmluZWQob3B0aW9ucy5maWxsT3BhY2l0eSkpIHtcbiAgICAgIHRoaXMucG9seWdvbi5zZXRGaWxsT3BhY2l0eShvcHRpb25zLmZpbGxPcGFjaXR5KVxuICAgIH1cbiAgICBpZiAoIWlzVW5kZWZpbmVkKG9wdGlvbnMuc3Ryb2tlU3R5bGUpKSB7XG4gICAgICB0aGlzLnBvbHlnb24uc2V0U3Ryb2tlU3R5bGUob3B0aW9ucy5zdHJva2VTdHlsZSlcbiAgICB9XG4gICAgaWYgKCFpc1VuZGVmaW5lZChvcHRpb25zLnN0cm9rZVdlaWdodCkpIHtcbiAgICAgIHRoaXMucG9seWdvbi5zZXRTdHJva2VXZWlnaHQob3B0aW9ucy5zdHJva2VXZWlnaHQpXG4gICAgfVxuICB9XG59XG4iXX0=