/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { toGeolocationOptions, toMapTypeControlOptions, toNavigationControlOptions, toOverviewMapControlOptions, toScaleControlOptions } from '../helpers/transformer';
import { nullCheck } from '../helpers/validate';
import { MapService } from '../providers/mapService';
export class ControlComponent {
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
        nullCheck(this.type, 'type is required for <control>');
        this._service
            .addControl(() => {
            this.control = this.createControl(this.type, this.options);
            return this.control;
        })
            .then(({ control }) => {
            this.loaded.emit(control);
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._service.removeControl(this.control);
    }
    /**
     * @param {?} type
     * @param {?} options
     * @return {?}
     */
    createControl(type, options) {
        if (type === 'navigation') {
            return new window.BMap.NavigationControl(toNavigationControlOptions(options));
        }
        if (type === 'overviewmap') {
            return new window.BMap.OverviewMapControl(toOverviewMapControlOptions(options));
        }
        if (type === 'scale') {
            return new window.BMap.ScaleControl(toScaleControlOptions(options));
        }
        if (type === 'maptype') {
            return new window.BMap.MapTypeControl(toMapTypeControlOptions(options));
        }
        if (type === 'geolocation') {
            return new window.BMap.GeolocationControl(toGeolocationOptions(options));
        }
        if (type === 'panorama') {
            return new window.BMap.PanoramaControl();
        }
        throw new Error(`Unsupported type:${type} of control`);
    }
}
ControlComponent.decorators = [
    { type: Directive, args: [{
                selector: 'control'
            },] },
];
/** @nocollapse */
ControlComponent.ctorParameters = () => [
    { type: MapService, },
];
ControlComponent.propDecorators = {
    "type": [{ type: Input },],
    "options": [{ type: Input },],
    "loaded": [{ type: Output },],
};
function ControlComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    ControlComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    ControlComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    ControlComponent.propDecorators;
    /** @type {?} */
    ControlComponent.prototype.type;
    /** @type {?} */
    ControlComponent.prototype.options;
    /** @type {?} */
    ControlComponent.prototype.loaded;
    /** @type {?} */
    ControlComponent.prototype.control;
    /** @type {?} */
    ControlComponent.prototype._service;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyMi1iYWlkdS1tYXAvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2NvbnRyb2wuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFxQixNQUFNLGVBQWUsQ0FBQTtBQUV6RixPQUFPLEVBQ0wsb0JBQW9CLEVBQ3BCLHVCQUF1QixFQUN2QiwwQkFBMEIsRUFDMUIsMkJBQTJCLEVBQzNCLHFCQUFxQixFQUN0QixNQUFNLHdCQUF3QixDQUFBO0FBQy9CLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQTtBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0seUJBQXlCLENBQUE7QUFNcEQsTUFBTTs7OztJQVFKLFlBQW9CLFFBQW9CO1FBQXBCLGFBQVEsR0FBUixRQUFRLENBQVk7c0JBSmIsSUFBSSxZQUFZLEVBQUU7S0FJRDs7OztJQUVyQyxRQUFRO1FBQ2IsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsZ0NBQWdDLENBQUMsQ0FBQTtRQUV0RCxJQUFJLENBQUMsUUFBUTthQUNWLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDZixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7WUFDMUQsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUE7U0FDcEIsQ0FBQzthQUNELElBQUksQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUNwQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtTQUMxQixDQUFDLENBQUE7Ozs7O0lBR0MsV0FBVztRQUNoQixJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7Ozs7Ozs7SUFHbkMsYUFBYSxDQUFDLElBQWlCLEVBQUUsT0FBK0I7UUFDdEUsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDMUIsTUFBTSxDQUFDLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQywwQkFBMEIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFBO1NBQzlFO1FBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLGFBQWEsQ0FBQyxDQUFDLENBQUM7WUFDM0IsTUFBTSxDQUFDLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQywyQkFBMkIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFBO1NBQ2hGO1FBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDckIsTUFBTSxDQUFDLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMscUJBQXFCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQTtTQUNwRTtRQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLE1BQU0sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLHVCQUF1QixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUE7U0FDeEU7UUFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLEtBQUssYUFBYSxDQUFDLENBQUMsQ0FBQztZQUMzQixNQUFNLENBQUMsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUE7U0FDekU7UUFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQztZQUN4QixNQUFNLENBQUMsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFBO1NBQ3pDO1FBQ0QsTUFBTSxJQUFJLEtBQUssQ0FBQyxvQkFBb0IsSUFBSSxhQUFhLENBQUMsQ0FBQTs7OztZQWpEekQsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxTQUFTO2FBQ3BCOzs7O1lBTFEsVUFBVTs7O3FCQU9oQixLQUFLO3dCQUNMLEtBQUs7dUJBRUwsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXG5cbmltcG9ydCB7XG4gIHRvR2VvbG9jYXRpb25PcHRpb25zLFxuICB0b01hcFR5cGVDb250cm9sT3B0aW9ucyxcbiAgdG9OYXZpZ2F0aW9uQ29udHJvbE9wdGlvbnMsXG4gIHRvT3ZlcnZpZXdNYXBDb250cm9sT3B0aW9ucyxcbiAgdG9TY2FsZUNvbnRyb2xPcHRpb25zXG59IGZyb20gJy4uL2hlbHBlcnMvdHJhbnNmb3JtZXInXG5pbXBvcnQgeyBudWxsQ2hlY2sgfSBmcm9tICcuLi9oZWxwZXJzL3ZhbGlkYXRlJ1xuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL3Byb3ZpZGVycy9tYXBTZXJ2aWNlJ1xuaW1wb3J0IHsgQkNvbnRyb2wsIENvbnRyb2xUeXBlIH0gZnJvbSAnLi4vdHlwZXMvQ29udHJvbCdcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnY29udHJvbCdcbn0pXG5leHBvcnQgY2xhc3MgQ29udHJvbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgQElucHV0KCkgcHJpdmF0ZSB0eXBlOiBDb250cm9sVHlwZVxuICBASW5wdXQoKSBwcml2YXRlIG9wdGlvbnM6IHsgW2tleTogc3RyaW5nXTogYW55IH1cblxuICBAT3V0cHV0KCkgcHJpdmF0ZSBsb2FkZWQgPSBuZXcgRXZlbnRFbWl0dGVyKClcblxuICBwcml2YXRlIGNvbnRyb2w6IEJDb250cm9sXG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfc2VydmljZTogTWFwU2VydmljZSkge31cblxuICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgbnVsbENoZWNrKHRoaXMudHlwZSwgJ3R5cGUgaXMgcmVxdWlyZWQgZm9yIDxjb250cm9sPicpXG5cbiAgICB0aGlzLl9zZXJ2aWNlXG4gICAgICAuYWRkQ29udHJvbCgoKSA9PiB7XG4gICAgICAgIHRoaXMuY29udHJvbCA9IHRoaXMuY3JlYXRlQ29udHJvbCh0aGlzLnR5cGUsIHRoaXMub3B0aW9ucylcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udHJvbFxuICAgICAgfSlcbiAgICAgIC50aGVuKCh7IGNvbnRyb2wgfSkgPT4ge1xuICAgICAgICB0aGlzLmxvYWRlZC5lbWl0KGNvbnRyb2wpXG4gICAgICB9KVxuICB9XG5cbiAgcHVibGljIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX3NlcnZpY2UucmVtb3ZlQ29udHJvbCh0aGlzLmNvbnRyb2wpXG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUNvbnRyb2wodHlwZTogQ29udHJvbFR5cGUsIG9wdGlvbnM6IHsgW2tleTogc3RyaW5nXTogYW55IH0pOiBCQ29udHJvbCB7XG4gICAgaWYgKHR5cGUgPT09ICduYXZpZ2F0aW9uJykge1xuICAgICAgcmV0dXJuIG5ldyB3aW5kb3cuQk1hcC5OYXZpZ2F0aW9uQ29udHJvbCh0b05hdmlnYXRpb25Db250cm9sT3B0aW9ucyhvcHRpb25zKSlcbiAgICB9XG4gICAgaWYgKHR5cGUgPT09ICdvdmVydmlld21hcCcpIHtcbiAgICAgIHJldHVybiBuZXcgd2luZG93LkJNYXAuT3ZlcnZpZXdNYXBDb250cm9sKHRvT3ZlcnZpZXdNYXBDb250cm9sT3B0aW9ucyhvcHRpb25zKSlcbiAgICB9XG4gICAgaWYgKHR5cGUgPT09ICdzY2FsZScpIHtcbiAgICAgIHJldHVybiBuZXcgd2luZG93LkJNYXAuU2NhbGVDb250cm9sKHRvU2NhbGVDb250cm9sT3B0aW9ucyhvcHRpb25zKSlcbiAgICB9XG4gICAgaWYgKHR5cGUgPT09ICdtYXB0eXBlJykge1xuICAgICAgcmV0dXJuIG5ldyB3aW5kb3cuQk1hcC5NYXBUeXBlQ29udHJvbCh0b01hcFR5cGVDb250cm9sT3B0aW9ucyhvcHRpb25zKSlcbiAgICB9XG4gICAgaWYgKHR5cGUgPT09ICdnZW9sb2NhdGlvbicpIHtcbiAgICAgIHJldHVybiBuZXcgd2luZG93LkJNYXAuR2VvbG9jYXRpb25Db250cm9sKHRvR2VvbG9jYXRpb25PcHRpb25zKG9wdGlvbnMpKVxuICAgIH1cbiAgICBpZiAodHlwZSA9PT0gJ3Bhbm9yYW1hJykge1xuICAgICAgcmV0dXJuIG5ldyB3aW5kb3cuQk1hcC5QYW5vcmFtYUNvbnRyb2woKVxuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IoYFVuc3VwcG9ydGVkIHR5cGU6JHt0eXBlfSBvZiBjb250cm9sYClcbiAgfVxufVxuIl19