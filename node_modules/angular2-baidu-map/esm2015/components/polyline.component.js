/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { isNull, isUndefined } from '../helpers/object';
import { toPoints } from '../helpers/transformer';
import { nullCheck } from '../helpers/validate';
import { MapService } from '../providers/mapService';
export class PolylineComponent {
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
        nullCheck(this.points, 'points is required for <polyline>');
        this._service
            .addOverlay(() => {
            return (this.polyline = new window.BMap.Polyline(toPoints(this.points), this.options));
        })
            .then(() => {
            this.loaded.emit(this.polyline);
        });
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes["points"] && !changes["points"].isFirstChange()) {
            this.polyline.setPath(toPoints(changes["points"].currentValue));
        }
        if (changes["options"] && !changes["options"].isFirstChange()) {
            this.setOptions(changes["options"].currentValue);
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._service.removeOverlay(this.polyline);
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
    }
}
PolylineComponent.decorators = [
    { type: Directive, args: [{
                selector: 'polyline'
            },] },
];
/** @nocollapse */
PolylineComponent.ctorParameters = () => [
    { type: MapService, },
];
PolylineComponent.propDecorators = {
    "points": [{ type: Input },],
    "options": [{ type: Input },],
    "loaded": [{ type: Output },],
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9seWxpbmUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhcjItYmFpZHUtbWFwLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9wb2x5bGluZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFJTCxNQUFNLEVBRVAsTUFBTSxlQUFlLENBQUE7QUFFdEIsT0FBTyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQTtBQUN2RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sd0JBQXdCLENBQUE7QUFDakQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHFCQUFxQixDQUFBO0FBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQTtBQU9wRCxNQUFNOzs7O0lBUUosWUFBb0IsUUFBb0I7UUFBcEIsYUFBUSxHQUFSLFFBQVEsQ0FBWTtzQkFKYixJQUFJLFlBQVksRUFBRTtLQUlEOzs7O0lBRXJDLFFBQVE7UUFDYixTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxtQ0FBbUMsQ0FBQyxDQUFBO1FBRTNELElBQUksQ0FBQyxRQUFRO2FBQ1YsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNmLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFBO1NBQ3ZGLENBQUM7YUFDRCxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ1QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1NBQ2hDLENBQUMsQ0FBQTs7Ozs7O0lBR0MsV0FBVyxDQUFDLE9BQWlEO1FBQ2xFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sY0FBVyxDQUFDLE9BQU8sV0FBUSxhQUFhLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDdEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sV0FBUSxZQUFZLENBQUMsQ0FBQyxDQUFBO1NBQzdEO1FBQ0QsRUFBRSxDQUFDLENBQUMsT0FBTyxlQUFZLENBQUMsT0FBTyxZQUFTLGFBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN4RCxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sWUFBUyxZQUFZLENBQUMsQ0FBQTtTQUM5Qzs7Ozs7SUFHSSxXQUFXO1FBQ2hCLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTs7Ozs7O0lBR3BDLFVBQVUsQ0FBQyxPQUF3QjtRQUN6QyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLE1BQU0sQ0FBQTtTQUNQO1FBQ0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztnQkFDMUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsQ0FBQTthQUM5QjtZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxFQUFFLENBQUE7YUFDL0I7U0FDRjtRQUNELEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7Z0JBQzFCLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxFQUFFLENBQUE7YUFDaEM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixFQUFFLENBQUE7YUFDakM7U0FDRjtRQUNELEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFBO1NBQ2xEO1FBQ0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QyxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQTtTQUN0RDtRQUNELEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFBO1NBQ2xEO1FBQ0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2QyxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUE7U0FDcEQ7Ozs7WUFuRUosU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxVQUFVO2FBQ3JCOzs7O1lBTlEsVUFBVTs7O3VCQVFoQixLQUFLO3dCQUNMLEtBQUs7dUJBRUwsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBTaW1wbGVDaGFuZ2Vcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcblxuaW1wb3J0IHsgaXNOdWxsLCBpc1VuZGVmaW5lZCB9IGZyb20gJy4uL2hlbHBlcnMvb2JqZWN0J1xuaW1wb3J0IHsgdG9Qb2ludHMgfSBmcm9tICcuLi9oZWxwZXJzL3RyYW5zZm9ybWVyJ1xuaW1wb3J0IHsgbnVsbENoZWNrIH0gZnJvbSAnLi4vaGVscGVycy92YWxpZGF0ZSdcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuLi9wcm92aWRlcnMvbWFwU2VydmljZSdcbmltcG9ydCB7IEJQb2x5bGluZSwgUG9seWxpbmVPcHRpb25zIH0gZnJvbSAnLi4vdHlwZXMvUG9seWxpbmUnXG5pbXBvcnQgeyBQb2ludCB9IGZyb20gJy4uL3R5cGVzL1BvaW50J1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdwb2x5bGluZSdcbn0pXG5leHBvcnQgY2xhc3MgUG9seWxpbmVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcbiAgQElucHV0KCkgcHJpdmF0ZSBwb2ludHM6IEFycmF5PFBvaW50PlxuICBASW5wdXQoKSBwcml2YXRlIG9wdGlvbnM6IFBvbHlsaW5lT3B0aW9uc1xuXG4gIEBPdXRwdXQoKSBwcml2YXRlIGxvYWRlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKVxuXG4gIHByaXZhdGUgcG9seWxpbmU6IEJQb2x5bGluZVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3NlcnZpY2U6IE1hcFNlcnZpY2UpIHt9XG5cbiAgcHVibGljIG5nT25Jbml0KCkge1xuICAgIG51bGxDaGVjayh0aGlzLnBvaW50cywgJ3BvaW50cyBpcyByZXF1aXJlZCBmb3IgPHBvbHlsaW5lPicpXG5cbiAgICB0aGlzLl9zZXJ2aWNlXG4gICAgICAuYWRkT3ZlcmxheSgoKSA9PiB7XG4gICAgICAgIHJldHVybiAodGhpcy5wb2x5bGluZSA9IG5ldyB3aW5kb3cuQk1hcC5Qb2x5bGluZSh0b1BvaW50cyh0aGlzLnBvaW50cyksIHRoaXMub3B0aW9ucykpXG4gICAgICB9KVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICB0aGlzLmxvYWRlZC5lbWl0KHRoaXMucG9seWxpbmUpXG4gICAgICB9KVxuICB9XG5cbiAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IHsgW3Byb3BlcnR5TmFtZTogc3RyaW5nXTogU2ltcGxlQ2hhbmdlIH0pIHtcbiAgICBpZiAoY2hhbmdlcy5wb2ludHMgJiYgIWNoYW5nZXMucG9pbnRzLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgdGhpcy5wb2x5bGluZS5zZXRQYXRoKHRvUG9pbnRzKGNoYW5nZXMucG9pbnRzLmN1cnJlbnRWYWx1ZSkpXG4gICAgfVxuICAgIGlmIChjaGFuZ2VzLm9wdGlvbnMgJiYgIWNoYW5nZXMub3B0aW9ucy5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMuc2V0T3B0aW9ucyhjaGFuZ2VzLm9wdGlvbnMuY3VycmVudFZhbHVlKVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9zZXJ2aWNlLnJlbW92ZU92ZXJsYXkodGhpcy5wb2x5bGluZSlcbiAgfVxuXG4gIHByaXZhdGUgc2V0T3B0aW9ucyhvcHRpb25zOiBQb2x5bGluZU9wdGlvbnMpOiB2b2lkIHtcbiAgICBpZiAoaXNOdWxsKG9wdGlvbnMpKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgaWYgKCFpc1VuZGVmaW5lZChvcHRpb25zLmVuYWJsZUVkaXRpbmcpKSB7XG4gICAgICBpZiAob3B0aW9ucy5lbmFibGVFZGl0aW5nKSB7XG4gICAgICAgIHRoaXMucG9seWxpbmUuZW5hYmxlRWRpdGluZygpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnBvbHlsaW5lLmRpc2FibGVFZGl0aW5nKClcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFpc1VuZGVmaW5lZChvcHRpb25zLmVuYWJsZU1hc3NDbGVhcikpIHtcbiAgICAgIGlmIChvcHRpb25zLmVuYWJsZUVkaXRpbmcpIHtcbiAgICAgICAgdGhpcy5wb2x5bGluZS5lbmFibGVNYXNzQ2xlYXIoKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5wb2x5bGluZS5kaXNhYmxlTWFzc0NsZWFyKClcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFpc1VuZGVmaW5lZChvcHRpb25zLnN0cm9rZUNvbG9yKSkge1xuICAgICAgdGhpcy5wb2x5bGluZS5zZXRTdHJva2VDb2xvcihvcHRpb25zLnN0cm9rZUNvbG9yKVxuICAgIH1cbiAgICBpZiAoIWlzVW5kZWZpbmVkKG9wdGlvbnMuc3Ryb2tlT3BhY2l0eSkpIHtcbiAgICAgIHRoaXMucG9seWxpbmUuc2V0U3Ryb2tlT3BhY2l0eShvcHRpb25zLnN0cm9rZU9wYWNpdHkpXG4gICAgfVxuICAgIGlmICghaXNVbmRlZmluZWQob3B0aW9ucy5zdHJva2VTdHlsZSkpIHtcbiAgICAgIHRoaXMucG9seWxpbmUuc2V0U3Ryb2tlU3R5bGUob3B0aW9ucy5zdHJva2VTdHlsZSlcbiAgICB9XG4gICAgaWYgKCFpc1VuZGVmaW5lZChvcHRpb25zLnN0cm9rZVdlaWdodCkpIHtcbiAgICAgIHRoaXMucG9seWxpbmUuc2V0U3Ryb2tlV2VpZ2h0KG9wdGlvbnMuc3Ryb2tlV2VpZ2h0KVxuICAgIH1cbiAgfVxufVxuIl19