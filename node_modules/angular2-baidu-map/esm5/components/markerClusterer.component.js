/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { nullCheck } from '../helpers/validate';
import { isUndefined } from '../helpers/object';
import { toMarkerClustererOptions, toPoint, toMarkerOptions, toTextIconStyle } from '../helpers/transformer';
import { MapService } from '../providers/mapService';
import { ScriptLoader } from '../providers/scriptLoader';
var /** @type {?} */ LIB_URLS = {
    key: 'markerClusterer',
    scripts: [
        'https://api.map.baidu.com/library/MarkerClusterer/1.2/src/MarkerClusterer_min.js',
        'https://api.map.baidu.com/library/TextIconOverlay/1.2/src/TextIconOverlay_min.js'
    ]
};
var MarkerClustererComponent = /** @class */ (function () {
    function MarkerClustererComponent(_service, scriptLoader) {
        this._service = _service;
        this.scriptLoader = scriptLoader;
        this.loaded = new EventEmitter();
    }
    /**
     * @return {?}
     */
    MarkerClustererComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        nullCheck(this.options, 'options is required for <marker-clusterer>');
        this._service.getNativeMap().then(function (map) {
            return _this.scriptLoader.load(LIB_URLS, false, function () {
                _this.markerClusterer = new window.BMapLib.MarkerClusterer(map, toMarkerClustererOptions(_this.options));
                _this.loaded.emit(_this.markerClusterer);
            });
        });
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    MarkerClustererComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes["options"] && !changes["options"].isFirstChange()) {
            this.resetOptions(changes["options"].currentValue);
        }
    };
    /**
     * @param {?} options
     * @return {?}
     */
    MarkerClustererComponent.prototype.resetOptions = /**
     * @param {?} options
     * @return {?}
     */
    function (options) {
        if (options.markers) {
            this.markerClusterer.clearMarkers();
            this.markerClusterer.addMarkers(options.markers.map(function (m) { return new window.BMap.Marker(toPoint(m.point), toMarkerOptions(m.options)); }));
        }
        if (!isUndefined(options.girdSize)) {
            this.markerClusterer.setGridSize(options.girdSize);
        }
        if (!isUndefined(options.maxZoom)) {
            this.markerClusterer.setMaxZoom(options.maxZoom);
        }
        if (options.styles) {
            this.markerClusterer.setStyles(options.styles.filter(function (s) { return s; }).map(function (s) { return toTextIconStyle(s); }));
        }
    };
    /**
     * @return {?}
     */
    MarkerClustererComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.markerClusterer.clearMarkers();
    };
    MarkerClustererComponent.decorators = [
        { type: Directive, args: [{
                    selector: 'marker-clusterer'
                },] },
    ];
    /** @nocollapse */
    MarkerClustererComponent.ctorParameters = function () { return [
        { type: MapService, },
        { type: ScriptLoader, },
    ]; };
    MarkerClustererComponent.propDecorators = {
        "options": [{ type: Input },],
        "loaded": [{ type: Output },],
    };
    return MarkerClustererComponent;
}());
export { MarkerClustererComponent };
function MarkerClustererComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MarkerClustererComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MarkerClustererComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    MarkerClustererComponent.propDecorators;
    /** @type {?} */
    MarkerClustererComponent.prototype.options;
    /** @type {?} */
    MarkerClustererComponent.prototype.loaded;
    /** @type {?} */
    MarkerClustererComponent.prototype.markerClusterer;
    /** @type {?} */
    MarkerClustererComponent.prototype._service;
    /** @type {?} */
    MarkerClustererComponent.prototype.scriptLoader;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2VyQ2x1c3RlcmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXIyLWJhaWR1LW1hcC8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvbWFya2VyQ2x1c3RlcmVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUlMLE1BQU0sRUFFUCxNQUFNLGVBQWUsQ0FBQTtBQUV0QixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUE7QUFDL0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLG1CQUFtQixDQUFBO0FBQy9DLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBRSxNQUFNLHdCQUF3QixDQUFBO0FBQzVHLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQTtBQUVwRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUE7QUFHeEQscUJBQU0sUUFBUSxHQUFHO0lBQ2YsR0FBRyxFQUFFLGlCQUFpQjtJQUN0QixPQUFPLEVBQUU7UUFDUCxrRkFBa0Y7UUFDbEYsa0ZBQWtGO0tBQ25GO0NBQ0YsQ0FBQTs7SUFZQyxrQ0FBb0IsUUFBb0IsRUFBVSxZQUEwQjtRQUF4RCxhQUFRLEdBQVIsUUFBUSxDQUFZO1FBQVUsaUJBQVksR0FBWixZQUFZLENBQWM7c0JBSmpELElBQUksWUFBWSxFQUFFO0tBSW1DOzs7O0lBRXpFLDJDQUFROzs7OztRQUNiLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLDRDQUE0QyxDQUFDLENBQUE7UUFFckUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQyxHQUFpQjtZQUNsRCxNQUFNLENBQUMsS0FBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRTtnQkFDN0MsS0FBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLEdBQUcsRUFBRSx3QkFBd0IsQ0FBQyxLQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQTtnQkFFdEcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLGVBQWUsQ0FBQyxDQUFBO2FBQ3ZDLENBQUMsQ0FBQTtTQUNILENBQUMsQ0FBQTs7Ozs7O0lBR0csOENBQVc7Ozs7Y0FBQyxPQUFpRDtRQUNsRSxFQUFFLENBQUMsQ0FBQyxPQUFPLGVBQVksQ0FBQyxPQUFPLFlBQVMsYUFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3hELElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxZQUFTLFlBQVksQ0FBQyxDQUFBO1NBQ2hEOzs7Ozs7SUFHSywrQ0FBWTs7OztjQUFDLE9BQStCO1FBQ2xELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxFQUFFLENBQUE7WUFDbkMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQzdCLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLGVBQWUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBcEUsQ0FBb0UsQ0FBQyxDQUMvRixDQUFBO1NBQ0Y7UUFDRCxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25DLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQTtTQUNuRDtRQUNELEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1NBQ2pEO1FBQ0QsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDbkIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLEVBQUQsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsZUFBZSxDQUFDLENBQUMsQ0FBQyxFQUFsQixDQUFrQixDQUFDLENBQUMsQ0FBQTtTQUMzRjs7Ozs7SUFHSSw4Q0FBVzs7OztRQUNoQixJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksRUFBRSxDQUFBOzs7Z0JBakR0QyxTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtpQkFDN0I7Ozs7Z0JBZlEsVUFBVTtnQkFFVixZQUFZOzs7NEJBZWxCLEtBQUs7MkJBRUwsTUFBTTs7bUNBakNUOztTQThCYSx3QkFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgU2ltcGxlQ2hhbmdlXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXG5cbmltcG9ydCB7IG51bGxDaGVjayB9IGZyb20gJy4uL2hlbHBlcnMvdmFsaWRhdGUnXG5pbXBvcnQgeyBpc1VuZGVmaW5lZCB9IGZyb20gJy4uL2hlbHBlcnMvb2JqZWN0J1xuaW1wb3J0IHsgdG9NYXJrZXJDbHVzdGVyZXJPcHRpb25zLCB0b1BvaW50LCB0b01hcmtlck9wdGlvbnMsIHRvVGV4dEljb25TdHlsZSB9IGZyb20gJy4uL2hlbHBlcnMvdHJhbnNmb3JtZXInXG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vcHJvdmlkZXJzL21hcFNlcnZpY2UnXG5pbXBvcnQgeyBNYXJrZXJDbHVzdGVyZXJPcHRpb25zLCBCTWFya2VyQ2x1c3RlcmVyIH0gZnJvbSAnLi4vdHlwZXMvTWFya2VyQ2x1c3RlcmVyJ1xuaW1wb3J0IHsgU2NyaXB0TG9hZGVyIH0gZnJvbSAnLi4vcHJvdmlkZXJzL3NjcmlwdExvYWRlcidcbmltcG9ydCB7IEJNYXBJbnN0YW5jZSB9IGZyb20gJy4uL3R5cGVzL01hcCdcblxuY29uc3QgTElCX1VSTFMgPSB7XG4gIGtleTogJ21hcmtlckNsdXN0ZXJlcicsXG4gIHNjcmlwdHM6IFtcbiAgICAnaHR0cHM6Ly9hcGkubWFwLmJhaWR1LmNvbS9saWJyYXJ5L01hcmtlckNsdXN0ZXJlci8xLjIvc3JjL01hcmtlckNsdXN0ZXJlcl9taW4uanMnLFxuICAgICdodHRwczovL2FwaS5tYXAuYmFpZHUuY29tL2xpYnJhcnkvVGV4dEljb25PdmVybGF5LzEuMi9zcmMvVGV4dEljb25PdmVybGF5X21pbi5qcydcbiAgXVxufVxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdtYXJrZXItY2x1c3RlcmVyJ1xufSlcbmV4cG9ydCBjbGFzcyBNYXJrZXJDbHVzdGVyZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcbiAgQElucHV0KCkgcHJpdmF0ZSBvcHRpb25zOiBNYXJrZXJDbHVzdGVyZXJPcHRpb25zXG5cbiAgQE91dHB1dCgpIHByaXZhdGUgbG9hZGVkID0gbmV3IEV2ZW50RW1pdHRlcigpXG5cbiAgcHJpdmF0ZSBtYXJrZXJDbHVzdGVyZXI6IEJNYXJrZXJDbHVzdGVyZXJcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zZXJ2aWNlOiBNYXBTZXJ2aWNlLCBwcml2YXRlIHNjcmlwdExvYWRlcjogU2NyaXB0TG9hZGVyKSB7fVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICBudWxsQ2hlY2sodGhpcy5vcHRpb25zLCAnb3B0aW9ucyBpcyByZXF1aXJlZCBmb3IgPG1hcmtlci1jbHVzdGVyZXI+JylcblxuICAgIHRoaXMuX3NlcnZpY2UuZ2V0TmF0aXZlTWFwKCkudGhlbigobWFwOiBCTWFwSW5zdGFuY2UpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLnNjcmlwdExvYWRlci5sb2FkKExJQl9VUkxTLCBmYWxzZSwgKCkgPT4ge1xuICAgICAgICB0aGlzLm1hcmtlckNsdXN0ZXJlciA9IG5ldyB3aW5kb3cuQk1hcExpYi5NYXJrZXJDbHVzdGVyZXIobWFwLCB0b01hcmtlckNsdXN0ZXJlck9wdGlvbnModGhpcy5vcHRpb25zKSlcblxuICAgICAgICB0aGlzLmxvYWRlZC5lbWl0KHRoaXMubWFya2VyQ2x1c3RlcmVyKVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IHsgW3Byb3BlcnR5TmFtZTogc3RyaW5nXTogU2ltcGxlQ2hhbmdlIH0pIHtcbiAgICBpZiAoY2hhbmdlcy5vcHRpb25zICYmICFjaGFuZ2VzLm9wdGlvbnMuaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICB0aGlzLnJlc2V0T3B0aW9ucyhjaGFuZ2VzLm9wdGlvbnMuY3VycmVudFZhbHVlKVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcmVzZXRPcHRpb25zKG9wdGlvbnM6IE1hcmtlckNsdXN0ZXJlck9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucy5tYXJrZXJzKSB7XG4gICAgICB0aGlzLm1hcmtlckNsdXN0ZXJlci5jbGVhck1hcmtlcnMoKVxuICAgICAgdGhpcy5tYXJrZXJDbHVzdGVyZXIuYWRkTWFya2VycyhcbiAgICAgICAgb3B0aW9ucy5tYXJrZXJzLm1hcChtID0+IG5ldyB3aW5kb3cuQk1hcC5NYXJrZXIodG9Qb2ludChtLnBvaW50KSwgdG9NYXJrZXJPcHRpb25zKG0ub3B0aW9ucykpKVxuICAgICAgKVxuICAgIH1cbiAgICBpZiAoIWlzVW5kZWZpbmVkKG9wdGlvbnMuZ2lyZFNpemUpKSB7XG4gICAgICB0aGlzLm1hcmtlckNsdXN0ZXJlci5zZXRHcmlkU2l6ZShvcHRpb25zLmdpcmRTaXplKVxuICAgIH1cbiAgICBpZiAoIWlzVW5kZWZpbmVkKG9wdGlvbnMubWF4Wm9vbSkpIHtcbiAgICAgIHRoaXMubWFya2VyQ2x1c3RlcmVyLnNldE1heFpvb20ob3B0aW9ucy5tYXhab29tKVxuICAgIH1cbiAgICBpZiAob3B0aW9ucy5zdHlsZXMpIHtcbiAgICAgIHRoaXMubWFya2VyQ2x1c3RlcmVyLnNldFN0eWxlcyhvcHRpb25zLnN0eWxlcy5maWx0ZXIocyA9PiBzKS5tYXAocyA9PiB0b1RleHRJY29uU3R5bGUocykpKVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLm1hcmtlckNsdXN0ZXJlci5jbGVhck1hcmtlcnMoKVxuICB9XG59XG4iXX0=