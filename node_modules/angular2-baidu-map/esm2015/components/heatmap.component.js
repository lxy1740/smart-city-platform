/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { nullCheck } from '../helpers/validate';
import { MapService } from '../providers/mapService';
import { ScriptLoader } from '../providers/scriptLoader';
const /** @type {?} */ LIB_URL = `https://api.map.baidu.com/library/Heatmap/2.0/src/Heatmap_min.js`;
export class HeatmapComponent {
    /**
     * @param {?} _service
     * @param {?} scriptLoader
     */
    constructor(_service, scriptLoader) {
        this._service = _service;
        this.scriptLoader = scriptLoader;
        this.loaded = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        nullCheck(this.dataset, 'dataset is required for <heatmap>');
        this._service.getNativeMap().then(() => {
            return this.scriptLoader.load(LIB_URL, false, () => {
                this._service
                    .addOverlay(() => {
                    return (this.heatmap = new window.BMapLib.HeatmapOverlay(this.options));
                })
                    .then(() => {
                    this.loaded.emit(this.heatmap);
                    if (this.dataset) {
                        this.heatmap.setDataSet(this.dataset);
                    }
                });
            });
        });
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes["dataset"] && !changes["dataset"].isFirstChange()) {
            this.heatmap.setDataSet(changes["dataset"].currentValue);
        }
        if (changes["options"] && !changes["options"].isFirstChange()) {
            this.heatmap.setOptions(changes["options"].currentValue);
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._service.removeOverlay(this.heatmap);
    }
}
HeatmapComponent.decorators = [
    { type: Directive, args: [{
                selector: 'heatmap'
            },] },
];
/** @nocollapse */
HeatmapComponent.ctorParameters = () => [
    { type: MapService, },
    { type: ScriptLoader, },
];
HeatmapComponent.propDecorators = {
    "dataset": [{ type: Input },],
    "options": [{ type: Input },],
    "loaded": [{ type: Output },],
};
function HeatmapComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    HeatmapComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    HeatmapComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    HeatmapComponent.propDecorators;
    /** @type {?} */
    HeatmapComponent.prototype.dataset;
    /** @type {?} */
    HeatmapComponent.prototype.options;
    /** @type {?} */
    HeatmapComponent.prototype.loaded;
    /** @type {?} */
    HeatmapComponent.prototype.heatmap;
    /** @type {?} */
    HeatmapComponent.prototype._service;
    /** @type {?} */
    HeatmapComponent.prototype.scriptLoader;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhdG1hcC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyMi1iYWlkdS1tYXAvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2hlYXRtYXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBSUwsTUFBTSxFQUVQLE1BQU0sZUFBZSxDQUFBO0FBRXRCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQTtBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0seUJBQXlCLENBQUE7QUFFcEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDJCQUEyQixDQUFBO0FBRXhELHVCQUFNLE9BQU8sR0FBRyxrRUFBa0UsQ0FBQTtBQUtsRixNQUFNOzs7OztJQVFKLFlBQW9CLFFBQW9CLEVBQVUsWUFBMEI7UUFBeEQsYUFBUSxHQUFSLFFBQVEsQ0FBWTtRQUFVLGlCQUFZLEdBQVosWUFBWSxDQUFjO3NCQUpqRCxJQUFJLFlBQVksRUFBRTtLQUltQzs7OztJQUV6RSxRQUFRO1FBQ2IsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsbUNBQW1DLENBQUMsQ0FBQTtRQUU1RCxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDckMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFO2dCQUNqRCxJQUFJLENBQUMsUUFBUTtxQkFDVixVQUFVLENBQUMsR0FBRyxFQUFFO29CQUNmLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQTtpQkFDeEUsQ0FBQztxQkFDRCxJQUFJLENBQUMsR0FBRyxFQUFFO29CQUNULElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtvQkFDOUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7d0JBQ2pCLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtxQkFDdEM7aUJBQ0YsQ0FBQyxDQUFBO2FBQ0wsQ0FBQyxDQUFBO1NBQ0gsQ0FBQyxDQUFBOzs7Ozs7SUFHRyxXQUFXLENBQUMsT0FBaUQ7UUFDbEUsRUFBRSxDQUFDLENBQUMsT0FBTyxlQUFZLENBQUMsT0FBTyxZQUFTLGFBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN4RCxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLFlBQVMsWUFBWSxDQUFDLENBQUE7U0FDdEQ7UUFDRCxFQUFFLENBQUMsQ0FBQyxPQUFPLGVBQVksQ0FBQyxPQUFPLFlBQVMsYUFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3hELElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLE9BQU8sWUFBUyxZQUFZLENBQUMsQ0FBQTtTQUN0RDs7Ozs7SUFHSSxXQUFXO1FBQ2hCLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTs7OztZQTFDNUMsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxTQUFTO2FBQ3BCOzs7O1lBUlEsVUFBVTtZQUVWLFlBQVk7Ozt3QkFRbEIsS0FBSzt3QkFDTCxLQUFLO3VCQUVMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgU2ltcGxlQ2hhbmdlXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXG5cbmltcG9ydCB7IG51bGxDaGVjayB9IGZyb20gJy4uL2hlbHBlcnMvdmFsaWRhdGUnXG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vcHJvdmlkZXJzL21hcFNlcnZpY2UnXG5pbXBvcnQgeyBCSGVhdG1hcCwgSGVhdG1hcE9wdGlvbnMsIEhlYXRtYXBEYXRhIH0gZnJvbSAnLi4vdHlwZXMvSGVhdG1hcCdcbmltcG9ydCB7IFNjcmlwdExvYWRlciB9IGZyb20gJy4uL3Byb3ZpZGVycy9zY3JpcHRMb2FkZXInXG5cbmNvbnN0IExJQl9VUkwgPSBgaHR0cHM6Ly9hcGkubWFwLmJhaWR1LmNvbS9saWJyYXJ5L0hlYXRtYXAvMi4wL3NyYy9IZWF0bWFwX21pbi5qc2BcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnaGVhdG1hcCdcbn0pXG5leHBvcnQgY2xhc3MgSGVhdG1hcENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKSBwcml2YXRlIGRhdGFzZXQ6IEhlYXRtYXBEYXRhXG4gIEBJbnB1dCgpIHByaXZhdGUgb3B0aW9uczogSGVhdG1hcE9wdGlvbnNcblxuICBAT3V0cHV0KCkgcHJpdmF0ZSBsb2FkZWQgPSBuZXcgRXZlbnRFbWl0dGVyKClcblxuICBwcml2YXRlIGhlYXRtYXA6IEJIZWF0bWFwXG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfc2VydmljZTogTWFwU2VydmljZSwgcHJpdmF0ZSBzY3JpcHRMb2FkZXI6IFNjcmlwdExvYWRlcikge31cblxuICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgbnVsbENoZWNrKHRoaXMuZGF0YXNldCwgJ2RhdGFzZXQgaXMgcmVxdWlyZWQgZm9yIDxoZWF0bWFwPicpXG5cbiAgICB0aGlzLl9zZXJ2aWNlLmdldE5hdGl2ZU1hcCgpLnRoZW4oKCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuc2NyaXB0TG9hZGVyLmxvYWQoTElCX1VSTCwgZmFsc2UsICgpID0+IHtcbiAgICAgICAgdGhpcy5fc2VydmljZVxuICAgICAgICAgIC5hZGRPdmVybGF5KCgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiAodGhpcy5oZWF0bWFwID0gbmV3IHdpbmRvdy5CTWFwTGliLkhlYXRtYXBPdmVybGF5KHRoaXMub3B0aW9ucykpXG4gICAgICAgICAgfSlcbiAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmxvYWRlZC5lbWl0KHRoaXMuaGVhdG1hcClcbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGFzZXQpIHtcbiAgICAgICAgICAgICAgdGhpcy5oZWF0bWFwLnNldERhdGFTZXQodGhpcy5kYXRhc2V0KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICBwdWJsaWMgbmdPbkNoYW5nZXMoY2hhbmdlczogeyBbcHJvcGVydHlOYW1lOiBzdHJpbmddOiBTaW1wbGVDaGFuZ2UgfSkge1xuICAgIGlmIChjaGFuZ2VzLmRhdGFzZXQgJiYgIWNoYW5nZXMuZGF0YXNldC5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMuaGVhdG1hcC5zZXREYXRhU2V0KGNoYW5nZXMuZGF0YXNldC5jdXJyZW50VmFsdWUpXG4gICAgfVxuICAgIGlmIChjaGFuZ2VzLm9wdGlvbnMgJiYgIWNoYW5nZXMub3B0aW9ucy5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMuaGVhdG1hcC5zZXRPcHRpb25zKGNoYW5nZXMub3B0aW9ucy5jdXJyZW50VmFsdWUpXG4gICAgfVxuICB9XG5cbiAgcHVibGljIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX3NlcnZpY2UucmVtb3ZlT3ZlcmxheSh0aGlzLmhlYXRtYXApXG4gIH1cbn1cbiJdfQ==