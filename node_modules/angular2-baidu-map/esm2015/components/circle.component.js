/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { isNull, isUndefined } from '../helpers/object';
import { toPoint } from '../helpers/transformer';
import { nullCheck } from '../helpers/validate';
import { MapService } from '../providers/mapService';
export class CircleComponent {
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
        nullCheck(this.center, 'center is required for <circle>');
        nullCheck(this.radius, 'center is required for <circle>');
        this._service
            .addOverlay(() => {
            return (this.circle = new window.BMap.Circle(toPoint(this.center), this.radius, this.options));
        })
            .then(() => {
            this.loaded.emit(this.circle);
        });
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes["center"] && !changes["center"].isFirstChange()) {
            this.circle.setCenter(toPoint(changes["center"].currentValue));
        }
        if (changes["radius"] && !changes["radius"].isFirstChange()) {
            this.circle.setRadius(changes["radius"].currentValue);
        }
        if (changes["options"] && !changes["options"].isFirstChange()) {
            this.setOptions(changes["options"].currentValue);
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._service.removeOverlay(this.circle);
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
                this.circle.enableEditing();
            }
            else {
                this.circle.disableEditing();
            }
        }
        if (!isUndefined(options.enableMassClear)) {
            if (options.enableEditing) {
                this.circle.enableMassClear();
            }
            else {
                this.circle.disableMassClear();
            }
        }
        if (!isUndefined(options.strokeColor)) {
            this.circle.setStrokeColor(options.strokeColor);
        }
        if (!isUndefined(options.fillColor)) {
            this.circle.setFillColor(options.fillColor);
        }
        if (!isUndefined(options.strokeOpacity)) {
            this.circle.setStrokeOpacity(options.strokeOpacity);
        }
        if (!isUndefined(options.fillOpacity)) {
            this.circle.setFillOpacity(options.fillOpacity);
        }
        if (!isUndefined(options.strokeStyle)) {
            this.circle.setStrokeStyle(options.strokeStyle);
        }
        if (!isUndefined(options.strokeWeight)) {
            this.circle.setStrokeWeight(options.strokeWeight);
        }
    }
}
CircleComponent.decorators = [
    { type: Directive, args: [{
                selector: 'circle'
            },] },
];
/** @nocollapse */
CircleComponent.ctorParameters = () => [
    { type: MapService, },
];
CircleComponent.propDecorators = {
    "center": [{ type: Input },],
    "radius": [{ type: Input },],
    "options": [{ type: Input },],
    "loaded": [{ type: Output },],
};
function CircleComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    CircleComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    CircleComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    CircleComponent.propDecorators;
    /** @type {?} */
    CircleComponent.prototype.center;
    /** @type {?} */
    CircleComponent.prototype.radius;
    /** @type {?} */
    CircleComponent.prototype.options;
    /** @type {?} */
    CircleComponent.prototype.loaded;
    /** @type {?} */
    CircleComponent.prototype.circle;
    /** @type {?} */
    CircleComponent.prototype._service;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2lyY2xlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXIyLWJhaWR1LW1hcC8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvY2lyY2xlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUlMLE1BQU0sRUFFUCxNQUFNLGVBQWUsQ0FBQTtBQUV0QixPQUFPLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxNQUFNLG1CQUFtQixDQUFBO0FBQ3ZELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQTtBQUNoRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUE7QUFDL0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHlCQUF5QixDQUFBO0FBT3BELE1BQU07Ozs7SUFTSixZQUFvQixRQUFvQjtRQUFwQixhQUFRLEdBQVIsUUFBUSxDQUFZO3NCQUpiLElBQUksWUFBWSxFQUFFO0tBSUQ7Ozs7SUFFckMsUUFBUTtRQUNiLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLGlDQUFpQyxDQUFDLENBQUE7UUFDekQsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsaUNBQWlDLENBQUMsQ0FBQTtRQUV6RCxJQUFJLENBQUMsUUFBUTthQUNWLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDZixNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFBO1NBQy9GLENBQUM7YUFDRCxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ1QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0s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QVcsQ0FBQyxDQUFBO1NBQ2hEO1FBQ0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2QyxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUE7U0FDbEQ7Ozs7WUE5RUosU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxRQUFRO2FBQ25COzs7O1lBTlEsVUFBVTs7O3VCQVFoQixLQUFLO3VCQUNMLEtBQUs7d0JBQ0wsS0FBSzt1QkFFTCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZVxufSBmcm9tICdAYW5ndWxhci9jb3JlJ1xuXG5pbXBvcnQgeyBpc051bGwsIGlzVW5kZWZpbmVkIH0gZnJvbSAnLi4vaGVscGVycy9vYmplY3QnXG5pbXBvcnQgeyB0b1BvaW50IH0gZnJvbSAnLi4vaGVscGVycy90cmFuc2Zvcm1lcidcbmltcG9ydCB7IG51bGxDaGVjayB9IGZyb20gJy4uL2hlbHBlcnMvdmFsaWRhdGUnXG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vcHJvdmlkZXJzL21hcFNlcnZpY2UnXG5pbXBvcnQgeyBCQ2lyY2xlLCBDaXJjbGVPcHRpb25zIH0gZnJvbSAnLi4vdHlwZXMvQ2lyY2xlJ1xuaW1wb3J0IHsgUG9pbnQgfSBmcm9tICcuLi90eXBlcy9Qb2ludCdcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnY2lyY2xlJ1xufSlcbmV4cG9ydCBjbGFzcyBDaXJjbGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcbiAgQElucHV0KCkgcHJpdmF0ZSBjZW50ZXI6IFBvaW50XG4gIEBJbnB1dCgpIHByaXZhdGUgcmFkaXVzOiBudW1iZXJcbiAgQElucHV0KCkgcHJpdmF0ZSBvcHRpb25zOiBDaXJjbGVPcHRpb25zXG5cbiAgQE91dHB1dCgpIHByaXZhdGUgbG9hZGVkID0gbmV3IEV2ZW50RW1pdHRlcigpXG5cbiAgcHJpdmF0ZSBjaXJjbGU6IEJDaXJjbGVcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zZXJ2aWNlOiBNYXBTZXJ2aWNlKSB7fVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICBudWxsQ2hlY2sodGhpcy5jZW50ZXIsICdjZW50ZXIgaXMgcmVxdWlyZWQgZm9yIDxjaXJjbGU+JylcbiAgICBudWxsQ2hlY2sodGhpcy5yYWRpdXMsICdjZW50ZXIgaXMgcmVxdWlyZWQgZm9yIDxjaXJjbGU+JylcblxuICAgIHRoaXMuX3NlcnZpY2VcbiAgICAgIC5hZGRPdmVybGF5KCgpID0+IHtcbiAgICAgICAgcmV0dXJuICh0aGlzLmNpcmNsZSA9IG5ldyB3aW5kb3cuQk1hcC5DaXJjbGUodG9Qb2ludCh0aGlzLmNlbnRlciksIHRoaXMucmFkaXVzLCB0aGlzLm9wdGlvbnMpKVxuICAgICAgfSlcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5sb2FkZWQuZW1pdCh0aGlzLmNpcmNsZSlcbiAgICAgIH0pXG4gIH1cblxuICBwdWJsaWMgbmdPbkNoYW5nZXMoY2hhbmdlczogeyBbcHJvcGVydHlOYW1lOiBzdHJpbmddOiBTaW1wbGVDaGFuZ2UgfSkge1xuICAgIGlmIChjaGFuZ2VzLmNlbnRlciAmJiAhY2hhbmdlcy5jZW50ZXIuaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICB0aGlzLmNpcmNsZS5zZXRDZW50ZXIodG9Qb2ludChjaGFuZ2VzLmNlbnRlci5jdXJyZW50VmFsdWUpKVxuICAgIH1cbiAgICBpZiAoY2hhbmdlcy5yYWRpdXMgJiYgIWNoYW5nZXMucmFkaXVzLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgdGhpcy5jaXJjbGUuc2V0UmFkaXVzKGNoYW5nZXMucmFkaXVzLmN1cnJlbnRWYWx1ZSlcbiAgICB9XG4gICAgaWYgKGNoYW5nZXMub3B0aW9ucyAmJiAhY2hhbmdlcy5vcHRpb25zLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgdGhpcy5zZXRPcHRpb25zKGNoYW5nZXMub3B0aW9ucy5jdXJyZW50VmFsdWUpXG4gICAgfVxuICB9XG5cbiAgcHVibGljIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX3NlcnZpY2UucmVtb3ZlT3ZlcmxheSh0aGlzLmNpcmNsZSlcbiAgfVxuXG4gIHByaXZhdGUgc2V0T3B0aW9ucyhvcHRpb25zOiBDaXJjbGVPcHRpb25zKTogdm9pZCB7XG4gICAgaWYgKGlzTnVsbChvcHRpb25zKSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGlmICghaXNVbmRlZmluZWQob3B0aW9ucy5lbmFibGVFZGl0aW5nKSkge1xuICAgICAgaWYgKG9wdGlvbnMuZW5hYmxlRWRpdGluZykge1xuICAgICAgICB0aGlzLmNpcmNsZS5lbmFibGVFZGl0aW5nKClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY2lyY2xlLmRpc2FibGVFZGl0aW5nKClcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFpc1VuZGVmaW5lZChvcHRpb25zLmVuYWJsZU1hc3NDbGVhcikpIHtcbiAgICAgIGlmIChvcHRpb25zLmVuYWJsZUVkaXRpbmcpIHtcbiAgICAgICAgdGhpcy5jaXJjbGUuZW5hYmxlTWFzc0NsZWFyKClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY2lyY2xlLmRpc2FibGVNYXNzQ2xlYXIoKVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIWlzVW5kZWZpbmVkKG9wdGlvbnMuc3Ryb2tlQ29sb3IpKSB7XG4gICAgICB0aGlzLmNpcmNsZS5zZXRTdHJva2VDb2xvcihvcHRpb25zLnN0cm9rZUNvbG9yKVxuICAgIH1cbiAgICBpZiAoIWlzVW5kZWZpbmVkKG9wdGlvbnMuZmlsbENvbG9yKSkge1xuICAgICAgdGhpcy5jaXJjbGUuc2V0RmlsbENvbG9yKG9wdGlvbnMuZmlsbENvbG9yKVxuICAgIH1cbiAgICBpZiAoIWlzVW5kZWZpbmVkKG9wdGlvbnMuc3Ryb2tlT3BhY2l0eSkpIHtcbiAgICAgIHRoaXMuY2lyY2xlLnNldFN0cm9rZU9wYWNpdHkob3B0aW9ucy5zdHJva2VPcGFjaXR5KVxuICAgIH1cbiAgICBpZiAoIWlzVW5kZWZpbmVkKG9wdGlvbnMuZmlsbE9wYWNpdHkpKSB7XG4gICAgICB0aGlzLmNpcmNsZS5zZXRGaWxsT3BhY2l0eShvcHRpb25zLmZpbGxPcGFjaXR5KVxuICAgIH1cbiAgICBpZiAoIWlzVW5kZWZpbmVkKG9wdGlvbnMuc3Ryb2tlU3R5bGUpKSB7XG4gICAgICB0aGlzLmNpcmNsZS5zZXRTdHJva2VTdHlsZShvcHRpb25zLnN0cm9rZVN0eWxlKVxuICAgIH1cbiAgICBpZiAoIWlzVW5kZWZpbmVkKG9wdGlvbnMuc3Ryb2tlV2VpZ2h0KSkge1xuICAgICAgdGhpcy5jaXJjbGUuc2V0U3Ryb2tlV2VpZ2h0KG9wdGlvbnMuc3Ryb2tlV2VpZ2h0KVxuICAgIH1cbiAgfVxufVxuIl19