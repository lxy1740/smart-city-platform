/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { isNull } from '../helpers/object';
import { toIcon, toMarkerOptions, toPoint, toSize } from '../helpers/transformer';
import { nullCheck } from '../helpers/validate';
import { MapService } from '../providers/mapService';
export class MarkerComponent {
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
        nullCheck(this.point, 'point is required for <marker>');
        this._service
            .addOverlay(() => {
            return (this.marker = new window.BMap.Marker(toPoint(this.point), toMarkerOptions(this.options)));
        })
            .then(({ map }) => {
            this.loaded.emit(this.marker);
            this.addListener(this.marker, map);
        })
            .then(() => {
            // workaround: it's weird that postion is set while constructing phase will make click event not working
            this.marker.setPosition(new window.BMap.Point(this.point.lng, this.point.lat));
        });
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes["point"] && !changes["point"].isFirstChange()) {
            this.marker.setPosition(toPoint(changes["point"].currentValue));
        }
        if (changes["options"] && !changes["options"].isFirstChange()) {
            this.setOptions(changes["options"].currentValue);
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._service.removeOverlay(this.marker);
    }
    /**
     * @param {?} options
     * @return {?}
     */
    setOptions(options) {
        if (isNull(options)) {
            return;
        }
        if (!isNull(options.offset)) {
            this.marker.setOffset(toSize(options.offset));
        }
        if (!isNull(options.icon)) {
            this.marker.setIcon(toIcon(options.icon.imageUrl, options.icon.size, options.icon));
        }
        if (!isNull(options.enableMassClear)) {
            this.marker[(options.enableMassClear ? 'enable' : 'disable') + 'MassClear']();
        }
        if (!isNull(options.enableDragging)) {
            this.marker[(options.enableDragging ? 'enable' : 'disable') + 'Dragging']();
        }
        if (!isNull(options.rotation)) {
            this.marker.setRotation(options.rotation);
        }
        if (!isNull(options.shadow)) {
            this.marker.setShadow(toIcon(options.shadow.imageUrl, options.shadow.size, options.shadow));
        }
        if (!isNull(options.title)) {
            this.marker.setTitle(options.title);
        }
    }
    /**
     * @param {?} marker
     * @param {?} map
     * @return {?}
     */
    addListener(marker, map) {
        marker.addEventListener('click', (e) => {
            this.clicked.emit({
                e,
                map,
                marker
            });
        });
    }
}
MarkerComponent.decorators = [
    { type: Directive, args: [{
                selector: 'marker'
            },] },
];
/** @nocollapse */
MarkerComponent.ctorParameters = () => [
    { type: MapService, },
];
MarkerComponent.propDecorators = {
    "point": [{ type: Input },],
    "options": [{ type: Input },],
    "loaded": [{ type: Output },],
    "clicked": [{ type: Output },],
};
function MarkerComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MarkerComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MarkerComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    MarkerComponent.propDecorators;
    /** @type {?} */
    MarkerComponent.prototype.point;
    /** @type {?} */
    MarkerComponent.prototype.options;
    /** @type {?} */
    MarkerComponent.prototype.loaded;
    /** @type {?} */
    MarkerComponent.prototype.clicked;
    /** @type {?} */
    MarkerComponent.prototype.marker;
    /** @type {?} */
    MarkerComponent.prototype._service;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXIyLWJhaWR1LW1hcC8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvbWFya2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUlMLE1BQU0sRUFFUCxNQUFNLGVBQWUsQ0FBQTtBQUV0QixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sbUJBQW1CLENBQUE7QUFDMUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxlQUFlLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHdCQUF3QixDQUFBO0FBQ2pGLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQTtBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0seUJBQXlCLENBQUE7QUFRcEQsTUFBTTs7OztJQVNKLFlBQW9CLFFBQW9CO1FBQXBCLGFBQVEsR0FBUixRQUFRLENBQVk7c0JBTGIsSUFBSSxZQUFZLEVBQUU7dUJBQ2pCLElBQUksWUFBWSxFQUFFO0tBSUY7Ozs7SUFFckMsUUFBUTtRQUNiLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLGdDQUFnQyxDQUFDLENBQUE7UUFFdkQsSUFBSSxDQUFDLFFBQVE7YUFDVixVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ2YsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsZUFBZSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUE7U0FDbEcsQ0FBQzthQUNELElBQUksQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRTtZQUNoQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7WUFDN0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFBO1NBQ25DLENBQUM7YUFDRCxJQUFJLENBQUMsR0FBRyxFQUFFOztZQUVULElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO1NBQy9FLENBQUMsQ0FBQTs7Ozs7O0lBR0MsV0FBVyxDQUFDLE9BQWlEO1FBQ2xFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sYUFBVSxDQUFDLE9BQU8sVUFBTyxhQUFhLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDcEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLE9BQU8sVUFBTyxZQUFZLENBQUMsQ0FBQyxDQUFBO1NBQzdEO1FBQ0QsRUFBRSxDQUFDLENBQUMsT0FBTyxlQUFZLENBQUMsT0FBTyxZQUFTLGFBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN4RCxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sWUFBUyxZQUFZLENBQUMsQ0FBQTtTQUM5Qzs7Ozs7SUFHSSxXQUFXO1FBQ2hCLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTs7Ozs7O0lBR2xDLFVBQVUsQ0FBQyxPQUFzQjtRQUN2QyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLE1BQU0sQ0FBQTtTQUNQO1FBQ0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM1QixJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUE7U0FDOUM7UUFDRCxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFCLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtTQUNwRjtRQUNELEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsV0FBVyxDQUFDLEVBQUUsQ0FBQTtTQUM5RTtRQUNELEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsVUFBVSxDQUFDLEVBQUUsQ0FBQTtTQUM1RTtRQUNELEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDOUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFBO1NBQzFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM1QixJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUE7U0FDNUY7UUFDRCxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQTtTQUNwQzs7Ozs7OztJQUdLLFdBQVcsQ0FBQyxNQUFlLEVBQUUsR0FBaUI7UUFDcEQsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFDLENBQU0sRUFBRSxFQUFFO1lBQzFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO2dCQUNoQixDQUFDO2dCQUNELEdBQUc7Z0JBQ0gsTUFBTTthQUNQLENBQUMsQ0FBQTtTQUNILENBQUMsQ0FBQTs7OztZQTlFTCxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLFFBQVE7YUFDbkI7Ozs7WUFQUSxVQUFVOzs7c0JBU2hCLEtBQUs7d0JBQ0wsS0FBSzt1QkFFTCxNQUFNO3dCQUNOLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgU2ltcGxlQ2hhbmdlXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXG5cbmltcG9ydCB7IGlzTnVsbCB9IGZyb20gJy4uL2hlbHBlcnMvb2JqZWN0J1xuaW1wb3J0IHsgdG9JY29uLCB0b01hcmtlck9wdGlvbnMsIHRvUG9pbnQsIHRvU2l6ZSB9IGZyb20gJy4uL2hlbHBlcnMvdHJhbnNmb3JtZXInXG5pbXBvcnQgeyBudWxsQ2hlY2sgfSBmcm9tICcuLi9oZWxwZXJzL3ZhbGlkYXRlJ1xuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL3Byb3ZpZGVycy9tYXBTZXJ2aWNlJ1xuaW1wb3J0IHsgQk1hcEluc3RhbmNlIH0gZnJvbSAnLi4vdHlwZXMvTWFwJ1xuaW1wb3J0IHsgQk1hcmtlciwgTWFya2VyT3B0aW9ucyB9IGZyb20gJy4uL3R5cGVzL01hcmtlcidcbmltcG9ydCB7IFBvaW50IH0gZnJvbSAnLi4vdHlwZXMvUG9pbnQnXG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ21hcmtlcidcbn0pXG5leHBvcnQgY2xhc3MgTWFya2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpIHByaXZhdGUgcG9pbnQ6IFBvaW50XG4gIEBJbnB1dCgpIHByaXZhdGUgb3B0aW9uczogTWFya2VyT3B0aW9uc1xuXG4gIEBPdXRwdXQoKSBwcml2YXRlIGxvYWRlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKVxuICBAT3V0cHV0KCkgcHJpdmF0ZSBjbGlja2VkID0gbmV3IEV2ZW50RW1pdHRlcigpXG5cbiAgcHJpdmF0ZSBtYXJrZXI6IEJNYXJrZXJcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zZXJ2aWNlOiBNYXBTZXJ2aWNlKSB7fVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICBudWxsQ2hlY2sodGhpcy5wb2ludCwgJ3BvaW50IGlzIHJlcXVpcmVkIGZvciA8bWFya2VyPicpXG5cbiAgICB0aGlzLl9zZXJ2aWNlXG4gICAgICAuYWRkT3ZlcmxheSgoKSA9PiB7XG4gICAgICAgIHJldHVybiAodGhpcy5tYXJrZXIgPSBuZXcgd2luZG93LkJNYXAuTWFya2VyKHRvUG9pbnQodGhpcy5wb2ludCksIHRvTWFya2VyT3B0aW9ucyh0aGlzLm9wdGlvbnMpKSlcbiAgICAgIH0pXG4gICAgICAudGhlbigoeyBtYXAgfSkgPT4ge1xuICAgICAgICB0aGlzLmxvYWRlZC5lbWl0KHRoaXMubWFya2VyKVxuICAgICAgICB0aGlzLmFkZExpc3RlbmVyKHRoaXMubWFya2VyLCBtYXApXG4gICAgICB9KVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAvLyB3b3JrYXJvdW5kOiBpdCdzIHdlaXJkIHRoYXQgcG9zdGlvbiBpcyBzZXQgd2hpbGUgY29uc3RydWN0aW5nIHBoYXNlIHdpbGwgbWFrZSBjbGljayBldmVudCBub3Qgd29ya2luZ1xuICAgICAgICB0aGlzLm1hcmtlci5zZXRQb3NpdGlvbihuZXcgd2luZG93LkJNYXAuUG9pbnQodGhpcy5wb2ludC5sbmcsIHRoaXMucG9pbnQubGF0KSlcbiAgICAgIH0pXG4gIH1cblxuICBwdWJsaWMgbmdPbkNoYW5nZXMoY2hhbmdlczogeyBbcHJvcGVydHlOYW1lOiBzdHJpbmddOiBTaW1wbGVDaGFuZ2UgfSkge1xuICAgIGlmIChjaGFuZ2VzLnBvaW50ICYmICFjaGFuZ2VzLnBvaW50LmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgdGhpcy5tYXJrZXIuc2V0UG9zaXRpb24odG9Qb2ludChjaGFuZ2VzLnBvaW50LmN1cnJlbnRWYWx1ZSkpXG4gICAgfVxuICAgIGlmIChjaGFuZ2VzLm9wdGlvbnMgJiYgIWNoYW5nZXMub3B0aW9ucy5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMuc2V0T3B0aW9ucyhjaGFuZ2VzLm9wdGlvbnMuY3VycmVudFZhbHVlKVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9zZXJ2aWNlLnJlbW92ZU92ZXJsYXkodGhpcy5tYXJrZXIpXG4gIH1cblxuICBwcml2YXRlIHNldE9wdGlvbnMob3B0aW9uczogTWFya2VyT3B0aW9ucyk6IHZvaWQge1xuICAgIGlmIChpc051bGwob3B0aW9ucykpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBpZiAoIWlzTnVsbChvcHRpb25zLm9mZnNldCkpIHtcbiAgICAgIHRoaXMubWFya2VyLnNldE9mZnNldCh0b1NpemUob3B0aW9ucy5vZmZzZXQpKVxuICAgIH1cbiAgICBpZiAoIWlzTnVsbChvcHRpb25zLmljb24pKSB7XG4gICAgICB0aGlzLm1hcmtlci5zZXRJY29uKHRvSWNvbihvcHRpb25zLmljb24uaW1hZ2VVcmwsIG9wdGlvbnMuaWNvbi5zaXplLCBvcHRpb25zLmljb24pKVxuICAgIH1cbiAgICBpZiAoIWlzTnVsbChvcHRpb25zLmVuYWJsZU1hc3NDbGVhcikpIHtcbiAgICAgIHRoaXMubWFya2VyWyhvcHRpb25zLmVuYWJsZU1hc3NDbGVhciA/ICdlbmFibGUnIDogJ2Rpc2FibGUnKSArICdNYXNzQ2xlYXInXSgpXG4gICAgfVxuICAgIGlmICghaXNOdWxsKG9wdGlvbnMuZW5hYmxlRHJhZ2dpbmcpKSB7XG4gICAgICB0aGlzLm1hcmtlclsob3B0aW9ucy5lbmFibGVEcmFnZ2luZyA/ICdlbmFibGUnIDogJ2Rpc2FibGUnKSArICdEcmFnZ2luZyddKClcbiAgICB9XG4gICAgaWYgKCFpc051bGwob3B0aW9ucy5yb3RhdGlvbikpIHtcbiAgICAgIHRoaXMubWFya2VyLnNldFJvdGF0aW9uKG9wdGlvbnMucm90YXRpb24pXG4gICAgfVxuICAgIGlmICghaXNOdWxsKG9wdGlvbnMuc2hhZG93KSkge1xuICAgICAgdGhpcy5tYXJrZXIuc2V0U2hhZG93KHRvSWNvbihvcHRpb25zLnNoYWRvdy5pbWFnZVVybCwgb3B0aW9ucy5zaGFkb3cuc2l6ZSwgb3B0aW9ucy5zaGFkb3cpKVxuICAgIH1cbiAgICBpZiAoIWlzTnVsbChvcHRpb25zLnRpdGxlKSkge1xuICAgICAgdGhpcy5tYXJrZXIuc2V0VGl0bGUob3B0aW9ucy50aXRsZSlcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFkZExpc3RlbmVyKG1hcmtlcjogQk1hcmtlciwgbWFwOiBCTWFwSW5zdGFuY2UpIHtcbiAgICBtYXJrZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZTogYW55KSA9PiB7XG4gICAgICB0aGlzLmNsaWNrZWQuZW1pdCh7XG4gICAgICAgIGUsXG4gICAgICAgIG1hcCxcbiAgICAgICAgbWFya2VyXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cbiJdfQ==