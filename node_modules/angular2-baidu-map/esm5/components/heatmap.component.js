/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { nullCheck } from '../helpers/validate';
import { MapService } from '../providers/mapService';
import { ScriptLoader } from '../providers/scriptLoader';
var /** @type {?} */ LIB_URL = "https://api.map.baidu.com/library/Heatmap/2.0/src/Heatmap_min.js";
var HeatmapComponent = /** @class */ (function () {
    function HeatmapComponent(_service, scriptLoader) {
        this._service = _service;
        this.scriptLoader = scriptLoader;
        this.loaded = new EventEmitter();
    }
    /**
     * @return {?}
     */
    HeatmapComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        nullCheck(this.dataset, 'dataset is required for <heatmap>');
        this._service.getNativeMap().then(function () {
            return _this.scriptLoader.load(LIB_URL, false, function () {
                _this._service
                    .addOverlay(function () {
                    return (_this.heatmap = new window.BMapLib.HeatmapOverlay(_this.options));
                })
                    .then(function () {
                    _this.loaded.emit(_this.heatmap);
                    if (_this.dataset) {
                        _this.heatmap.setDataSet(_this.dataset);
                    }
                });
            });
        });
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    HeatmapComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes["dataset"] && !changes["dataset"].isFirstChange()) {
            this.heatmap.setDataSet(changes["dataset"].currentValue);
        }
        if (changes["options"] && !changes["options"].isFirstChange()) {
            this.heatmap.setOptions(changes["options"].currentValue);
        }
    };
    /**
     * @return {?}
     */
    HeatmapComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._service.removeOverlay(this.heatmap);
    };
    HeatmapComponent.decorators = [
        { type: Directive, args: [{
                    selector: 'heatmap'
                },] },
    ];
    /** @nocollapse */
    HeatmapComponent.ctorParameters = function () { return [
        { type: MapService, },
        { type: ScriptLoader, },
    ]; };
    HeatmapComponent.propDecorators = {
        "dataset": [{ type: Input },],
        "options": [{ type: Input },],
        "loaded": [{ type: Output },],
    };
    return HeatmapComponent;
}());
export { HeatmapComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhdG1hcC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyMi1iYWlkdS1tYXAvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2hlYXRtYXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBSUwsTUFBTSxFQUVQLE1BQU0sZUFBZSxDQUFBO0FBRXRCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQTtBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0seUJBQXlCLENBQUE7QUFFcEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDJCQUEyQixDQUFBO0FBRXhELHFCQUFNLE9BQU8sR0FBRyxrRUFBa0UsQ0FBQTs7SUFhaEYsMEJBQW9CLFFBQW9CLEVBQVUsWUFBMEI7UUFBeEQsYUFBUSxHQUFSLFFBQVEsQ0FBWTtRQUFVLGlCQUFZLEdBQVosWUFBWSxDQUFjO3NCQUpqRCxJQUFJLFlBQVksRUFBRTtLQUltQzs7OztJQUV6RSxtQ0FBUTs7Ozs7UUFDYixTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxtQ0FBbUMsQ0FBQyxDQUFBO1FBRTVELElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxDQUFDO1lBQ2hDLE1BQU0sQ0FBQyxLQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFO2dCQUM1QyxLQUFJLENBQUMsUUFBUTtxQkFDVixVQUFVLENBQUM7b0JBQ1YsTUFBTSxDQUFDLENBQUMsS0FBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLEtBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFBO2lCQUN4RSxDQUFDO3FCQUNELElBQUksQ0FBQztvQkFDSixLQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7b0JBQzlCLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO3dCQUNqQixLQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxLQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7cUJBQ3RDO2lCQUNGLENBQUMsQ0FBQTthQUNMLENBQUMsQ0FBQTtTQUNILENBQUMsQ0FBQTs7Ozs7O0lBR0csc0NBQVc7Ozs7Y0FBQyxPQUFpRDtRQUNsRSxFQUFFLENBQUMsQ0FBQyxPQUFPLGVBQVksQ0FBQyxPQUFPLFlBQVMsYUFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3hELElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLE9BQU8sWUFBUyxZQUFZLENBQUMsQ0FBQTtTQUN0RDtRQUNELEVBQUUsQ0FBQyxDQUFDLE9BQU8sZUFBWSxDQUFDLE9BQU8sWUFBUyxhQUFhLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDeEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsT0FBTyxZQUFTLFlBQVksQ0FBQyxDQUFBO1NBQ3REOzs7OztJQUdJLHNDQUFXOzs7O1FBQ2hCLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTs7O2dCQTFDNUMsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxTQUFTO2lCQUNwQjs7OztnQkFSUSxVQUFVO2dCQUVWLFlBQVk7Ozs0QkFRbEIsS0FBSzs0QkFDTCxLQUFLOzJCQUVMLE1BQU07OzJCQXpCVDs7U0FxQmEsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZVxufSBmcm9tICdAYW5ndWxhci9jb3JlJ1xuXG5pbXBvcnQgeyBudWxsQ2hlY2sgfSBmcm9tICcuLi9oZWxwZXJzL3ZhbGlkYXRlJ1xuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL3Byb3ZpZGVycy9tYXBTZXJ2aWNlJ1xuaW1wb3J0IHsgQkhlYXRtYXAsIEhlYXRtYXBPcHRpb25zLCBIZWF0bWFwRGF0YSB9IGZyb20gJy4uL3R5cGVzL0hlYXRtYXAnXG5pbXBvcnQgeyBTY3JpcHRMb2FkZXIgfSBmcm9tICcuLi9wcm92aWRlcnMvc2NyaXB0TG9hZGVyJ1xuXG5jb25zdCBMSUJfVVJMID0gYGh0dHBzOi8vYXBpLm1hcC5iYWlkdS5jb20vbGlicmFyeS9IZWF0bWFwLzIuMC9zcmMvSGVhdG1hcF9taW4uanNgXG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ2hlYXRtYXAnXG59KVxuZXhwb3J0IGNsYXNzIEhlYXRtYXBDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcbiAgQElucHV0KCkgcHJpdmF0ZSBkYXRhc2V0OiBIZWF0bWFwRGF0YVxuICBASW5wdXQoKSBwcml2YXRlIG9wdGlvbnM6IEhlYXRtYXBPcHRpb25zXG5cbiAgQE91dHB1dCgpIHByaXZhdGUgbG9hZGVkID0gbmV3IEV2ZW50RW1pdHRlcigpXG5cbiAgcHJpdmF0ZSBoZWF0bWFwOiBCSGVhdG1hcFxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3NlcnZpY2U6IE1hcFNlcnZpY2UsIHByaXZhdGUgc2NyaXB0TG9hZGVyOiBTY3JpcHRMb2FkZXIpIHt9XG5cbiAgcHVibGljIG5nT25Jbml0KCkge1xuICAgIG51bGxDaGVjayh0aGlzLmRhdGFzZXQsICdkYXRhc2V0IGlzIHJlcXVpcmVkIGZvciA8aGVhdG1hcD4nKVxuXG4gICAgdGhpcy5fc2VydmljZS5nZXROYXRpdmVNYXAoKS50aGVuKCgpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLnNjcmlwdExvYWRlci5sb2FkKExJQl9VUkwsIGZhbHNlLCAoKSA9PiB7XG4gICAgICAgIHRoaXMuX3NlcnZpY2VcbiAgICAgICAgICAuYWRkT3ZlcmxheSgoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gKHRoaXMuaGVhdG1hcCA9IG5ldyB3aW5kb3cuQk1hcExpYi5IZWF0bWFwT3ZlcmxheSh0aGlzLm9wdGlvbnMpKVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5sb2FkZWQuZW1pdCh0aGlzLmhlYXRtYXApXG4gICAgICAgICAgICBpZiAodGhpcy5kYXRhc2V0KSB7XG4gICAgICAgICAgICAgIHRoaXMuaGVhdG1hcC5zZXREYXRhU2V0KHRoaXMuZGF0YXNldClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IHsgW3Byb3BlcnR5TmFtZTogc3RyaW5nXTogU2ltcGxlQ2hhbmdlIH0pIHtcbiAgICBpZiAoY2hhbmdlcy5kYXRhc2V0ICYmICFjaGFuZ2VzLmRhdGFzZXQuaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICB0aGlzLmhlYXRtYXAuc2V0RGF0YVNldChjaGFuZ2VzLmRhdGFzZXQuY3VycmVudFZhbHVlKVxuICAgIH1cbiAgICBpZiAoY2hhbmdlcy5vcHRpb25zICYmICFjaGFuZ2VzLm9wdGlvbnMuaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICB0aGlzLmhlYXRtYXAuc2V0T3B0aW9ucyhjaGFuZ2VzLm9wdGlvbnMuY3VycmVudFZhbHVlKVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9zZXJ2aWNlLnJlbW92ZU92ZXJsYXkodGhpcy5oZWF0bWFwKVxuICB9XG59XG4iXX0=