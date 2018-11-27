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
const /** @type {?} */ LIB_URLS = {
    key: 'markerClusterer',
    scripts: [
        'https://api.map.baidu.com/library/MarkerClusterer/1.2/src/MarkerClusterer_min.js',
        'https://api.map.baidu.com/library/TextIconOverlay/1.2/src/TextIconOverlay_min.js'
    ]
};
export class MarkerClustererComponent {
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
        nullCheck(this.options, 'options is required for <marker-clusterer>');
        this._service.getNativeMap().then((map) => {
            return this.scriptLoader.load(LIB_URLS, false, () => {
                this.markerClusterer = new window.BMapLib.MarkerClusterer(map, toMarkerClustererOptions(this.options));
                this.loaded.emit(this.markerClusterer);
            });
        });
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes["options"] && !changes["options"].isFirstChange()) {
            this.resetOptions(changes["options"].currentValue);
        }
    }
    /**
     * @param {?} options
     * @return {?}
     */
    resetOptions(options) {
        if (options.markers) {
            this.markerClusterer.clearMarkers();
            this.markerClusterer.addMarkers(options.markers.map(m => new window.BMap.Marker(toPoint(m.point), toMarkerOptions(m.options))));
        }
        if (!isUndefined(options.girdSize)) {
            this.markerClusterer.setGridSize(options.girdSize);
        }
        if (!isUndefined(options.maxZoom)) {
            this.markerClusterer.setMaxZoom(options.maxZoom);
        }
        if (options.styles) {
            this.markerClusterer.setStyles(options.styles.filter(s => s).map(s => toTextIconStyle(s)));
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.markerClusterer.clearMarkers();
    }
}
MarkerClustererComponent.decorators = [
    { type: Directive, args: [{
                selector: 'marker-clusterer'
            },] },
];
/** @nocollapse */
MarkerClustererComponent.ctorParameters = () => [
    { type: MapService, },
    { type: ScriptLoader, },
];
MarkerClustererComponent.propDecorators = {
    "options": [{ type: Input },],
    "loaded": [{ type: Output },],
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2VyQ2x1c3RlcmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXIyLWJhaWR1LW1hcC8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvbWFya2VyQ2x1c3RlcmVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUlMLE1BQU0sRUFFUCxNQUFNLGVBQWUsQ0FBQTtBQUV0QixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUE7QUFDL0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLG1CQUFtQixDQUFBO0FBQy9DLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBRSxNQUFNLHdCQUF3QixDQUFBO0FBQzVHLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQTtBQUVwRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUE7QUFHeEQsdUJBQU0sUUFBUSxHQUFHO0lBQ2YsR0FBRyxFQUFFLGlCQUFpQjtJQUN0QixPQUFPLEVBQUU7UUFDUCxrRkFBa0Y7UUFDbEYsa0ZBQWtGO0tBQ25GO0NBQ0YsQ0FBQTtBQUtELE1BQU07Ozs7O0lBT0osWUFBb0IsUUFBb0IsRUFBVSxZQUEwQjtRQUF4RCxhQUFRLEdBQVIsUUFBUSxDQUFZO1FBQVUsaUJBQVksR0FBWixZQUFZLENBQWM7c0JBSmpELElBQUksWUFBWSxFQUFFO0tBSW1DOzs7O0lBRXpFLFFBQVE7UUFDYixTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSw0Q0FBNEMsQ0FBQyxDQUFBO1FBRXJFLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBaUIsRUFBRSxFQUFFO1lBQ3RELE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRTtnQkFDbEQsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLEdBQUcsRUFBRSx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQTtnQkFFdEcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFBO2FBQ3ZDLENBQUMsQ0FBQTtTQUNILENBQUMsQ0FBQTs7Ozs7O0lBR0csV0FBVyxDQUFDLE9BQWlEO1FBQ2xFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sZUFBWSxDQUFDLE9BQU8sWUFBUyxhQUFhLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDeEQsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLFlBQVMsWUFBWSxDQUFDLENBQUE7U0FDaEQ7Ozs7OztJQUdLLFlBQVksQ0FBQyxPQUErQjtRQUNsRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNwQixJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksRUFBRSxDQUFBO1lBQ25DLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUM3QixPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxlQUFlLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FDL0YsQ0FBQTtTQUNGO1FBQ0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuQyxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUE7U0FDbkQ7UUFDRCxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQTtTQUNqRDtRQUNELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ25CLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtTQUMzRjs7Ozs7SUFHSSxXQUFXO1FBQ2hCLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxFQUFFLENBQUE7Ozs7WUFqRHRDLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsa0JBQWtCO2FBQzdCOzs7O1lBZlEsVUFBVTtZQUVWLFlBQVk7Ozt3QkFlbEIsS0FBSzt1QkFFTCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZVxufSBmcm9tICdAYW5ndWxhci9jb3JlJ1xuXG5pbXBvcnQgeyBudWxsQ2hlY2sgfSBmcm9tICcuLi9oZWxwZXJzL3ZhbGlkYXRlJ1xuaW1wb3J0IHsgaXNVbmRlZmluZWQgfSBmcm9tICcuLi9oZWxwZXJzL29iamVjdCdcbmltcG9ydCB7IHRvTWFya2VyQ2x1c3RlcmVyT3B0aW9ucywgdG9Qb2ludCwgdG9NYXJrZXJPcHRpb25zLCB0b1RleHRJY29uU3R5bGUgfSBmcm9tICcuLi9oZWxwZXJzL3RyYW5zZm9ybWVyJ1xuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL3Byb3ZpZGVycy9tYXBTZXJ2aWNlJ1xuaW1wb3J0IHsgTWFya2VyQ2x1c3RlcmVyT3B0aW9ucywgQk1hcmtlckNsdXN0ZXJlciB9IGZyb20gJy4uL3R5cGVzL01hcmtlckNsdXN0ZXJlcidcbmltcG9ydCB7IFNjcmlwdExvYWRlciB9IGZyb20gJy4uL3Byb3ZpZGVycy9zY3JpcHRMb2FkZXInXG5pbXBvcnQgeyBCTWFwSW5zdGFuY2UgfSBmcm9tICcuLi90eXBlcy9NYXAnXG5cbmNvbnN0IExJQl9VUkxTID0ge1xuICBrZXk6ICdtYXJrZXJDbHVzdGVyZXInLFxuICBzY3JpcHRzOiBbXG4gICAgJ2h0dHBzOi8vYXBpLm1hcC5iYWlkdS5jb20vbGlicmFyeS9NYXJrZXJDbHVzdGVyZXIvMS4yL3NyYy9NYXJrZXJDbHVzdGVyZXJfbWluLmpzJyxcbiAgICAnaHR0cHM6Ly9hcGkubWFwLmJhaWR1LmNvbS9saWJyYXJ5L1RleHRJY29uT3ZlcmxheS8xLjIvc3JjL1RleHRJY29uT3ZlcmxheV9taW4uanMnXG4gIF1cbn1cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnbWFya2VyLWNsdXN0ZXJlcidcbn0pXG5leHBvcnQgY2xhc3MgTWFya2VyQ2x1c3RlcmVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpIHByaXZhdGUgb3B0aW9uczogTWFya2VyQ2x1c3RlcmVyT3B0aW9uc1xuXG4gIEBPdXRwdXQoKSBwcml2YXRlIGxvYWRlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKVxuXG4gIHByaXZhdGUgbWFya2VyQ2x1c3RlcmVyOiBCTWFya2VyQ2x1c3RlcmVyXG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfc2VydmljZTogTWFwU2VydmljZSwgcHJpdmF0ZSBzY3JpcHRMb2FkZXI6IFNjcmlwdExvYWRlcikge31cblxuICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgbnVsbENoZWNrKHRoaXMub3B0aW9ucywgJ29wdGlvbnMgaXMgcmVxdWlyZWQgZm9yIDxtYXJrZXItY2x1c3RlcmVyPicpXG5cbiAgICB0aGlzLl9zZXJ2aWNlLmdldE5hdGl2ZU1hcCgpLnRoZW4oKG1hcDogQk1hcEluc3RhbmNlKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5zY3JpcHRMb2FkZXIubG9hZChMSUJfVVJMUywgZmFsc2UsICgpID0+IHtcbiAgICAgICAgdGhpcy5tYXJrZXJDbHVzdGVyZXIgPSBuZXcgd2luZG93LkJNYXBMaWIuTWFya2VyQ2x1c3RlcmVyKG1hcCwgdG9NYXJrZXJDbHVzdGVyZXJPcHRpb25zKHRoaXMub3B0aW9ucykpXG5cbiAgICAgICAgdGhpcy5sb2FkZWQuZW1pdCh0aGlzLm1hcmtlckNsdXN0ZXJlcilcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiB7IFtwcm9wZXJ0eU5hbWU6IHN0cmluZ106IFNpbXBsZUNoYW5nZSB9KSB7XG4gICAgaWYgKGNoYW5nZXMub3B0aW9ucyAmJiAhY2hhbmdlcy5vcHRpb25zLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgdGhpcy5yZXNldE9wdGlvbnMoY2hhbmdlcy5vcHRpb25zLmN1cnJlbnRWYWx1ZSlcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHJlc2V0T3B0aW9ucyhvcHRpb25zOiBNYXJrZXJDbHVzdGVyZXJPcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMubWFya2Vycykge1xuICAgICAgdGhpcy5tYXJrZXJDbHVzdGVyZXIuY2xlYXJNYXJrZXJzKClcbiAgICAgIHRoaXMubWFya2VyQ2x1c3RlcmVyLmFkZE1hcmtlcnMoXG4gICAgICAgIG9wdGlvbnMubWFya2Vycy5tYXAobSA9PiBuZXcgd2luZG93LkJNYXAuTWFya2VyKHRvUG9pbnQobS5wb2ludCksIHRvTWFya2VyT3B0aW9ucyhtLm9wdGlvbnMpKSlcbiAgICAgIClcbiAgICB9XG4gICAgaWYgKCFpc1VuZGVmaW5lZChvcHRpb25zLmdpcmRTaXplKSkge1xuICAgICAgdGhpcy5tYXJrZXJDbHVzdGVyZXIuc2V0R3JpZFNpemUob3B0aW9ucy5naXJkU2l6ZSlcbiAgICB9XG4gICAgaWYgKCFpc1VuZGVmaW5lZChvcHRpb25zLm1heFpvb20pKSB7XG4gICAgICB0aGlzLm1hcmtlckNsdXN0ZXJlci5zZXRNYXhab29tKG9wdGlvbnMubWF4Wm9vbSlcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMuc3R5bGVzKSB7XG4gICAgICB0aGlzLm1hcmtlckNsdXN0ZXJlci5zZXRTdHlsZXMob3B0aW9ucy5zdHlsZXMuZmlsdGVyKHMgPT4gcykubWFwKHMgPT4gdG9UZXh0SWNvblN0eWxlKHMpKSlcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5tYXJrZXJDbHVzdGVyZXIuY2xlYXJNYXJrZXJzKClcbiAgfVxufVxuIl19