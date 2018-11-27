/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MapService } from '../providers/mapService';
import { nullCheck } from '../helpers/validate';
export class MapComponent {
    /**
     * @param {?} _service
     */
    constructor(_service) {
        this._service = _service;
        this.loaded = new EventEmitter();
        this.clicked = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        nullCheck(this.options, 'options is required for <baidu-map>');
        nullCheck(this.options.centerAndZoom, 'options.centerAndZoom is required for <baidu-map>');
        this._service
            .createMap(this.mapInstance.nativeElement, this.options)
            .then(map => {
            this.loaded.emit(map);
            return map;
        })
            .then(map => {
            this.addListener(map);
        });
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        const /** @type {?} */ opts = /** @type {?} */ (changes["options"].currentValue);
        if (!opts) {
            return console.warn('MapOptions change was ignored since you are passing empty value');
        }
        this._service.setOptions(opts);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        console.log('on map destroy');
    }
    /**
     * @param {?} map
     * @return {?}
     */
    addListener(map) {
        map.addEventListener('click', (e) => {
            this.clicked.emit(e);
        });
    }
}
MapComponent.decorators = [
    { type: Component, args: [{
                providers: [MapService],
                selector: 'baidu-map',
                styles: [
                    `
        .baidu-map-instance {
            width: 100%;
            height: 100%;
            display: none;
        }
        .baidu-map-offline {
            width: 100%;
            height: 100%;
            background-color: #E6E6E6;
            position: relative;
            display: none;
        }
        .baidu-map-offline label {
            fontSize: 30px;
            margin: 0;
            position: absolute;
            top: 50%;
            left: 50%;
            margin-right: -50%;
            transform: translate(-50%, -50%);
        }
        .tranclude-content {
            display: none;
        }
        `
                ],
                template: `
    <div #mapinstance class="baidu-map-instance"></div>
    <div class="baidu-map-offline">
        <label>{{ 'NO_NETWORK' }}</label>
    </div>
    <div class="tranclude-content">
        <ng-content></ng-content>
    </div>
    `
            },] },
];
/** @nocollapse */
MapComponent.ctorParameters = () => [
    { type: MapService, },
];
MapComponent.propDecorators = {
    "options": [{ type: Input },],
    "loaded": [{ type: Output },],
    "clicked": [{ type: Output },],
    "mapInstance": [{ type: ViewChild, args: ['mapinstance',] },],
};
function MapComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MapComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MapComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    MapComponent.propDecorators;
    /** @type {?} */
    MapComponent.prototype.options;
    /** @type {?} */
    MapComponent.prototype.loaded;
    /** @type {?} */
    MapComponent.prototype.clicked;
    /** @type {?} */
    MapComponent.prototype.mapInstance;
    /** @type {?} */
    MapComponent.prototype._service;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXIyLWJhaWR1LW1hcC8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvbWFwLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLEtBQUssRUFHTCxNQUFNLEVBRU4sU0FBUyxFQUNWLE1BQU0sZUFBZSxDQUFBO0FBRXRCLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQTtBQUdwRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUE7QUEyQy9DLE1BQU07Ozs7SUFRSixZQUFvQixRQUFvQjtRQUFwQixhQUFRLEdBQVIsUUFBUSxDQUFZO3NCQUxiLElBQUksWUFBWSxFQUFFO3VCQUNqQixJQUFJLFlBQVksRUFBRTtLQUlGOzs7O0lBRXJDLFFBQVE7UUFDYixTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxxQ0FBcUMsQ0FBQyxDQUFBO1FBQzlELFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxtREFBbUQsQ0FBQyxDQUFBO1FBRTFGLElBQUksQ0FBQyxRQUFRO2FBQ1YsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUM7YUFDdkQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ1YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7WUFDckIsTUFBTSxDQUFDLEdBQUcsQ0FBQTtTQUNYLENBQUM7YUFDRCxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDVixJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1NBQ3RCLENBQUMsQ0FBQTs7Ozs7O0lBR0MsV0FBVyxDQUFDLE9BQWlEO1FBQ2xFLHVCQUFNLElBQUkscUJBQUcsT0FBTyxZQUFTLFlBQTBCLENBQUEsQ0FBQTtRQUN2RCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDVixNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxpRUFBaUUsQ0FBQyxDQUFBO1NBQ3ZGO1FBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUE7Ozs7O0lBR3pCLFdBQVc7UUFDaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBOzs7Ozs7SUFHdkIsV0FBVyxDQUFDLEdBQWlCO1FBQ25DLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFNLEVBQUUsRUFBRTtZQUN2QyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtTQUNyQixDQUFDLENBQUE7Ozs7WUFqRkwsU0FBUyxTQUFDO2dCQUNULFNBQVMsRUFBRSxDQUFDLFVBQVUsQ0FBQztnQkFDdkIsUUFBUSxFQUFFLFdBQVc7Z0JBQ3JCLE1BQU0sRUFBRTtvQkFDTjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztTQXlCSztpQkFDTjtnQkFDRCxRQUFRLEVBQUU7Ozs7Ozs7O0tBUVA7YUFDSjs7OztZQTdDUSxVQUFVOzs7d0JBK0NoQixLQUFLO3VCQUVMLE1BQU07d0JBQ04sTUFBTTs0QkFFTixTQUFTLFNBQUMsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgU2ltcGxlQ2hhbmdlLFxuICBWaWV3Q2hpbGRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcblxuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL3Byb3ZpZGVycy9tYXBTZXJ2aWNlJ1xuaW1wb3J0IHsgQk1hcEluc3RhbmNlLCBNYXBPcHRpb25zIH0gZnJvbSAnLi4vdHlwZXMvTWFwJ1xuXG5pbXBvcnQgeyBudWxsQ2hlY2sgfSBmcm9tICcuLi9oZWxwZXJzL3ZhbGlkYXRlJ1xuXG5AQ29tcG9uZW50KHtcbiAgcHJvdmlkZXJzOiBbTWFwU2VydmljZV0sXG4gIHNlbGVjdG9yOiAnYmFpZHUtbWFwJyxcbiAgc3R5bGVzOiBbXG4gICAgYFxuICAgICAgICAuYmFpZHUtbWFwLWluc3RhbmNlIHtcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICAgICAgZGlzcGxheTogbm9uZTtcbiAgICAgICAgfVxuICAgICAgICAuYmFpZHUtbWFwLW9mZmxpbmUge1xuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRTZFNkU2O1xuICAgICAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICAgICAgZGlzcGxheTogbm9uZTtcbiAgICAgICAgfVxuICAgICAgICAuYmFpZHUtbWFwLW9mZmxpbmUgbGFiZWwge1xuICAgICAgICAgICAgZm9udFNpemU6IDMwcHg7XG4gICAgICAgICAgICBtYXJnaW46IDA7XG4gICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgICAgICB0b3A6IDUwJTtcbiAgICAgICAgICAgIGxlZnQ6IDUwJTtcbiAgICAgICAgICAgIG1hcmdpbi1yaWdodDogLTUwJTtcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xuICAgICAgICB9XG4gICAgICAgIC50cmFuY2x1ZGUtY29udGVudCB7XG4gICAgICAgICAgICBkaXNwbGF5OiBub25lO1xuICAgICAgICB9XG4gICAgICAgIGBcbiAgXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2ICNtYXBpbnN0YW5jZSBjbGFzcz1cImJhaWR1LW1hcC1pbnN0YW5jZVwiPjwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJiYWlkdS1tYXAtb2ZmbGluZVwiPlxuICAgICAgICA8bGFiZWw+e3sgJ05PX05FVFdPUksnIH19PC9sYWJlbD5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwidHJhbmNsdWRlLWNvbnRlbnRcIj5cbiAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIDwvZGl2PlxuICAgIGBcbn0pXG5leHBvcnQgY2xhc3MgTWFwQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBwcml2YXRlIG9wdGlvbnM6IE1hcE9wdGlvbnNcblxuICBAT3V0cHV0KCkgcHJpdmF0ZSBsb2FkZWQgPSBuZXcgRXZlbnRFbWl0dGVyKClcbiAgQE91dHB1dCgpIHByaXZhdGUgY2xpY2tlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKVxuXG4gIEBWaWV3Q2hpbGQoJ21hcGluc3RhbmNlJykgcHJpdmF0ZSBtYXBJbnN0YW5jZTogRWxlbWVudFJlZlxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3NlcnZpY2U6IE1hcFNlcnZpY2UpIHt9XG5cbiAgcHVibGljIG5nT25Jbml0KCkge1xuICAgIG51bGxDaGVjayh0aGlzLm9wdGlvbnMsICdvcHRpb25zIGlzIHJlcXVpcmVkIGZvciA8YmFpZHUtbWFwPicpXG4gICAgbnVsbENoZWNrKHRoaXMub3B0aW9ucy5jZW50ZXJBbmRab29tLCAnb3B0aW9ucy5jZW50ZXJBbmRab29tIGlzIHJlcXVpcmVkIGZvciA8YmFpZHUtbWFwPicpXG5cbiAgICB0aGlzLl9zZXJ2aWNlXG4gICAgICAuY3JlYXRlTWFwKHRoaXMubWFwSW5zdGFuY2UubmF0aXZlRWxlbWVudCwgdGhpcy5vcHRpb25zKVxuICAgICAgLnRoZW4obWFwID0+IHtcbiAgICAgICAgdGhpcy5sb2FkZWQuZW1pdChtYXApXG4gICAgICAgIHJldHVybiBtYXBcbiAgICAgIH0pXG4gICAgICAudGhlbihtYXAgPT4ge1xuICAgICAgICB0aGlzLmFkZExpc3RlbmVyKG1hcClcbiAgICAgIH0pXG4gIH1cblxuICBwdWJsaWMgbmdPbkNoYW5nZXMoY2hhbmdlczogeyBbcHJvcGVydHlOYW1lOiBzdHJpbmddOiBTaW1wbGVDaGFuZ2UgfSkge1xuICAgIGNvbnN0IG9wdHMgPSBjaGFuZ2VzLm9wdGlvbnMuY3VycmVudFZhbHVlIGFzIE1hcE9wdGlvbnNcbiAgICBpZiAoIW9wdHMpIHtcbiAgICAgIHJldHVybiBjb25zb2xlLndhcm4oJ01hcE9wdGlvbnMgY2hhbmdlIHdhcyBpZ25vcmVkIHNpbmNlIHlvdSBhcmUgcGFzc2luZyBlbXB0eSB2YWx1ZScpXG4gICAgfVxuICAgIHRoaXMuX3NlcnZpY2Uuc2V0T3B0aW9ucyhvcHRzKVxuICB9XG5cbiAgcHVibGljIG5nT25EZXN0cm95KCkge1xuICAgIGNvbnNvbGUubG9nKCdvbiBtYXAgZGVzdHJveScpXG4gIH1cblxuICBwcml2YXRlIGFkZExpc3RlbmVyKG1hcDogQk1hcEluc3RhbmNlKSB7XG4gICAgbWFwLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGU6IGFueSkgPT4ge1xuICAgICAgdGhpcy5jbGlja2VkLmVtaXQoZSlcbiAgICB9KVxuICB9XG59XG4iXX0=