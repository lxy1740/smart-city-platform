/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @record
 */
export function BControlConstructor() { }
function BControlConstructor_tsickle_Closure_declarations() {
    /* TODO: handle strange member:
    new (opts: any): BControl
    */
}
/**
 * @record
 */
export function BControl() { }
function BControl_tsickle_Closure_declarations() {
}
/**
 * @record
 */
export function BNavigationControlConstructor() { }
function BNavigationControlConstructor_tsickle_Closure_declarations() {
    /* TODO: handle strange member:
    new (opts: BNavigationControlOptions): BNavigationControl
    */
}
/**
 * @record
 */
export function BOverviewMapControlConstructor() { }
function BOverviewMapControlConstructor_tsickle_Closure_declarations() {
    /* TODO: handle strange member:
    new (opts: BOverviewMapControlOptions): BOverviewMapControl
    */
}
/**
 * @record
 */
export function BScaleControlConstructor() { }
function BScaleControlConstructor_tsickle_Closure_declarations() {
    /* TODO: handle strange member:
    new (opts: BScaleControlOptions): BScaleControl
    */
}
/**
 * @record
 */
export function BMapTypeControlConstructor() { }
function BMapTypeControlConstructor_tsickle_Closure_declarations() {
    /* TODO: handle strange member:
    new (opts: BMapTypeControlOptions): BMapTypeControl
    */
}
/**
 * @record
 */
export function BGeolocationConstructor() { }
function BGeolocationConstructor_tsickle_Closure_declarations() {
    /* TODO: handle strange member:
    new (opts: BGeolocationControlOptions): BGeolocationControl
    */
}
/**
 * @record
 */
export function BPanoramaControlConstructor() { }
function BPanoramaControlConstructor_tsickle_Closure_declarations() {
    /* TODO: handle strange member:
    new (): BPanoramaControlControl
    */
}
/**
 * @record
 */
export function BNavigationControl() { }
function BNavigationControl_tsickle_Closure_declarations() {
    /** @type {?} */
    BNavigationControl.prototype.getType;
    /** @type {?} */
    BNavigationControl.prototype.setType;
}
/**
 * @record
 */
export function BOverviewMapControl() { }
function BOverviewMapControl_tsickle_Closure_declarations() {
    /** @type {?} */
    BOverviewMapControl.prototype.changeView;
    /** @type {?} */
    BOverviewMapControl.prototype.setSize;
    /** @type {?} */
    BOverviewMapControl.prototype.getSize;
}
/**
 * @record
 */
export function BScaleControl() { }
function BScaleControl_tsickle_Closure_declarations() {
    /** @type {?} */
    BScaleControl.prototype.getUnit;
    /** @type {?} */
    BScaleControl.prototype.setUnit;
}
/**
 * @record
 */
export function BMapTypeControl() { }
function BMapTypeControl_tsickle_Closure_declarations() {
}
/**
 * @record
 */
export function BGeolocationControl() { }
function BGeolocationControl_tsickle_Closure_declarations() {
    /** @type {?} */
    BGeolocationControl.prototype.location;
    /** @type {?} */
    BGeolocationControl.prototype.getAddressComponent;
}
/**
 * @record
 */
export function BPanoramaControlControl() { }
function BPanoramaControlControl_tsickle_Closure_declarations() {
}
/**
 * @record
 */
export function ControlOptions() { }
function ControlOptions_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    ControlOptions.prototype.anchor;
    /** @type {?|undefined} */
    ControlOptions.prototype.offset;
}
/**
 * @record
 */
export function BControlOptions() { }
function BControlOptions_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    BControlOptions.prototype.anchor;
    /** @type {?|undefined} */
    BControlOptions.prototype.offset;
}
/**
 * @record
 */
export function NavigationControlOptions() { }
function NavigationControlOptions_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    NavigationControlOptions.prototype.type;
    /** @type {?|undefined} */
    NavigationControlOptions.prototype.showZoomInfo;
    /** @type {?|undefined} */
    NavigationControlOptions.prototype.enableGeolocation;
}
/**
 * @record
 */
export function BNavigationControlOptions() { }
function BNavigationControlOptions_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    BNavigationControlOptions.prototype.type;
    /** @type {?|undefined} */
    BNavigationControlOptions.prototype.showZoomInfo;
    /** @type {?|undefined} */
    BNavigationControlOptions.prototype.enableGeolocation;
}
/**
 * @record
 */
export function OverviewMapControlOptions() { }
function OverviewMapControlOptions_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    OverviewMapControlOptions.prototype.size;
    /** @type {?|undefined} */
    OverviewMapControlOptions.prototype.isOpen;
}
/**
 * @record
 */
export function BOverviewMapControlOptions() { }
function BOverviewMapControlOptions_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    BOverviewMapControlOptions.prototype.size;
    /** @type {?|undefined} */
    BOverviewMapControlOptions.prototype.isOpen;
}
/**
 * @record
 */
export function ScaleControlOptions() { }
function ScaleControlOptions_tsickle_Closure_declarations() {
}
/**
 * @record
 */
export function BScaleControlOptions() { }
function BScaleControlOptions_tsickle_Closure_declarations() {
}
/**
 * @record
 */
export function MapTypeControlOptions() { }
function MapTypeControlOptions_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    MapTypeControlOptions.prototype.type;
}
/**
 * @record
 */
export function BMapTypeControlOptions() { }
function BMapTypeControlOptions_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    BMapTypeControlOptions.prototype.type;
}
/**
 * @record
 */
export function GeolocationControlOptions() { }
function GeolocationControlOptions_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    GeolocationControlOptions.prototype.showAddressBar;
    /** @type {?|undefined} */
    GeolocationControlOptions.prototype.enableAutoLocation;
    /** @type {?|undefined} */
    GeolocationControlOptions.prototype.locationIcon;
}
/**
 * @record
 */
export function BGeolocationControlOptions() { }
function BGeolocationControlOptions_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    BGeolocationControlOptions.prototype.showAddressBar;
    /** @type {?|undefined} */
    BGeolocationControlOptions.prototype.enableAutoLocation;
    /** @type {?|undefined} */
    BGeolocationControlOptions.prototype.locationIcon;
}
/** @enum {number} */
const ControlAnchor = {
    BMAP_ANCHOR_TOP_LEFT: 0,
    BMAP_ANCHOR_TOP_RIGHT: 1,
    BMAP_ANCHOR_BOTTOM_LEFT: 2,
    BMAP_ANCHOR_BOTTOM_RIGHT: 3,
};
export { ControlAnchor };
ControlAnchor[ControlAnchor.BMAP_ANCHOR_TOP_LEFT] = "BMAP_ANCHOR_TOP_LEFT";
ControlAnchor[ControlAnchor.BMAP_ANCHOR_TOP_RIGHT] = "BMAP_ANCHOR_TOP_RIGHT";
ControlAnchor[ControlAnchor.BMAP_ANCHOR_BOTTOM_LEFT] = "BMAP_ANCHOR_BOTTOM_LEFT";
ControlAnchor[ControlAnchor.BMAP_ANCHOR_BOTTOM_RIGHT] = "BMAP_ANCHOR_BOTTOM_RIGHT";
/** @enum {number} */
const NavigationControlType = {
    BMAP_NAVIGATION_CONTROL_LARGE: 0,
    BMAP_NAVIGATION_CONTROL_SMALL: 1,
    BMAP_NAVIGATION_CONTROL_PAN: 2,
    BMAP_NAVIGATION_CONTROL_ZOOM: 3,
};
export { NavigationControlType };
NavigationControlType[NavigationControlType.BMAP_NAVIGATION_CONTROL_LARGE] = "BMAP_NAVIGATION_CONTROL_LARGE";
NavigationControlType[NavigationControlType.BMAP_NAVIGATION_CONTROL_SMALL] = "BMAP_NAVIGATION_CONTROL_SMALL";
NavigationControlType[NavigationControlType.BMAP_NAVIGATION_CONTROL_PAN] = "BMAP_NAVIGATION_CONTROL_PAN";
NavigationControlType[NavigationControlType.BMAP_NAVIGATION_CONTROL_ZOOM] = "BMAP_NAVIGATION_CONTROL_ZOOM";
/** @enum {number} */
const MapTypeControlType = {
    BMAP_MAPTYPE_CONTROL_HORIZONTAL: 0,
    BMAP_MAPTYPE_CONTROL_DROPDOWN: 1,
    BMAP_MAPTYPE_CONTROL_MAP: 2,
};
export { MapTypeControlType };
MapTypeControlType[MapTypeControlType.BMAP_MAPTYPE_CONTROL_HORIZONTAL] = "BMAP_MAPTYPE_CONTROL_HORIZONTAL";
MapTypeControlType[MapTypeControlType.BMAP_MAPTYPE_CONTROL_DROPDOWN] = "BMAP_MAPTYPE_CONTROL_DROPDOWN";
MapTypeControlType[MapTypeControlType.BMAP_MAPTYPE_CONTROL_MAP] = "BMAP_MAPTYPE_CONTROL_MAP";
/** @enum {string} */
const LengthUnit = {
    BMAP_UNIT_METRIC: 'metric',
    BMAP_UNIT_IMPERIAL: 'us',
};
export { LengthUnit };
/**
 * @record
 */
export function AddressComponent() { }
function AddressComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    AddressComponent.prototype.streetNumber;
    /** @type {?} */
    AddressComponent.prototype.street;
    /** @type {?} */
    AddressComponent.prototype.district;
    /** @type {?} */
    AddressComponent.prototype.city;
    /** @type {?} */
    AddressComponent.prototype.province;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udHJvbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXIyLWJhaWR1LW1hcC8iLCJzb3VyY2VzIjpbInR5cGVzL0NvbnRyb2wudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3NCQXVJcUIsUUFBUTt3QkFDTixJQUFJIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQkljb24sIEljb24gfSBmcm9tICcuL0ljb24nXG5pbXBvcnQgeyBCU2l6ZSwgU2l6ZSB9IGZyb20gJy4vU2l6ZSdcblxuZXhwb3J0IGludGVyZmFjZSBCQ29udHJvbENvbnN0cnVjdG9yIHtcbiAgbmV3IChvcHRzOiBhbnkpOiBCQ29udHJvbFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEJDb250cm9sIHt9XG5cbmV4cG9ydCBpbnRlcmZhY2UgQk5hdmlnYXRpb25Db250cm9sQ29uc3RydWN0b3IgZXh0ZW5kcyBCQ29udHJvbENvbnN0cnVjdG9yIHtcbiAgbmV3IChvcHRzOiBCTmF2aWdhdGlvbkNvbnRyb2xPcHRpb25zKTogQk5hdmlnYXRpb25Db250cm9sXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQk92ZXJ2aWV3TWFwQ29udHJvbENvbnN0cnVjdG9yIGV4dGVuZHMgQkNvbnRyb2xDb25zdHJ1Y3RvciB7XG4gIG5ldyAob3B0czogQk92ZXJ2aWV3TWFwQ29udHJvbE9wdGlvbnMpOiBCT3ZlcnZpZXdNYXBDb250cm9sXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQlNjYWxlQ29udHJvbENvbnN0cnVjdG9yIGV4dGVuZHMgQkNvbnRyb2xDb25zdHJ1Y3RvciB7XG4gIG5ldyAob3B0czogQlNjYWxlQ29udHJvbE9wdGlvbnMpOiBCU2NhbGVDb250cm9sXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQk1hcFR5cGVDb250cm9sQ29uc3RydWN0b3IgZXh0ZW5kcyBCQ29udHJvbENvbnN0cnVjdG9yIHtcbiAgbmV3IChvcHRzOiBCTWFwVHlwZUNvbnRyb2xPcHRpb25zKTogQk1hcFR5cGVDb250cm9sXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQkdlb2xvY2F0aW9uQ29uc3RydWN0b3IgZXh0ZW5kcyBCQ29udHJvbENvbnN0cnVjdG9yIHtcbiAgbmV3IChvcHRzOiBCR2VvbG9jYXRpb25Db250cm9sT3B0aW9ucyk6IEJHZW9sb2NhdGlvbkNvbnRyb2xcbn1cblxuZXhwb3J0IGludGVyZmFjZSBCUGFub3JhbWFDb250cm9sQ29uc3RydWN0b3IgZXh0ZW5kcyBCQ29udHJvbENvbnN0cnVjdG9yIHtcbiAgbmV3ICgpOiBCUGFub3JhbWFDb250cm9sQ29udHJvbFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEJOYXZpZ2F0aW9uQ29udHJvbCBleHRlbmRzIEJDb250cm9sIHtcbiAgZ2V0VHlwZSgpOiBOYXZpZ2F0aW9uQ29udHJvbFR5cGVcbiAgc2V0VHlwZSh0eXBlOiBOYXZpZ2F0aW9uQ29udHJvbFR5cGUpOiB2b2lkXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQk92ZXJ2aWV3TWFwQ29udHJvbCBleHRlbmRzIEJDb250cm9sIHtcbiAgY2hhbmdlVmlldygpOiB2b2lkXG4gIHNldFNpemUoc2l6ZTogQlNpemUpOiB2b2lkXG4gIGdldFNpemUoKTogQlNpemVcbn1cblxuZXhwb3J0IGludGVyZmFjZSBCU2NhbGVDb250cm9sIGV4dGVuZHMgQkNvbnRyb2wge1xuICBnZXRVbml0KCk6IExlbmd0aFVuaXRcbiAgc2V0VW5pdCh1bml0OiBMZW5ndGhVbml0KTogdm9pZFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEJNYXBUeXBlQ29udHJvbCBleHRlbmRzIEJDb250cm9sIHt9XG5cbmV4cG9ydCBpbnRlcmZhY2UgQkdlb2xvY2F0aW9uQ29udHJvbCBleHRlbmRzIEJDb250cm9sIHtcbiAgbG9jYXRpb24oKTogdm9pZFxuICBnZXRBZGRyZXNzQ29tcG9uZW50KCk6IEFkZHJlc3NDb21wb25lbnRcbn1cblxuZXhwb3J0IGludGVyZmFjZSBCUGFub3JhbWFDb250cm9sQ29udHJvbCBleHRlbmRzIEJDb250cm9sIHt9XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29udHJvbE9wdGlvbnMge1xuICBhbmNob3I/OiBDb250cm9sQW5jaG9yXG4gIG9mZnNldD86IFNpemVcbn1cblxuZXhwb3J0IGludGVyZmFjZSBCQ29udHJvbE9wdGlvbnMge1xuICBhbmNob3I/OiBDb250cm9sQW5jaG9yXG4gIG9mZnNldD86IEJTaXplXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTmF2aWdhdGlvbkNvbnRyb2xPcHRpb25zIGV4dGVuZHMgQ29udHJvbE9wdGlvbnMge1xuICB0eXBlPzogTmF2aWdhdGlvbkNvbnRyb2xUeXBlXG4gIHNob3dab29tSW5mbz86IGJvb2xlYW5cbiAgZW5hYmxlR2VvbG9jYXRpb24/OiBib29sZWFuXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQk5hdmlnYXRpb25Db250cm9sT3B0aW9ucyBleHRlbmRzIEJDb250cm9sT3B0aW9ucyB7XG4gIHR5cGU/OiBOYXZpZ2F0aW9uQ29udHJvbFR5cGVcbiAgc2hvd1pvb21JbmZvPzogYm9vbGVhblxuICBlbmFibGVHZW9sb2NhdGlvbj86IGJvb2xlYW5cbn1cblxuZXhwb3J0IGludGVyZmFjZSBPdmVydmlld01hcENvbnRyb2xPcHRpb25zIGV4dGVuZHMgQ29udHJvbE9wdGlvbnMge1xuICBzaXplPzogU2l6ZVxuICBpc09wZW4/OiBib29sZWFuXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQk92ZXJ2aWV3TWFwQ29udHJvbE9wdGlvbnMgZXh0ZW5kcyBCQ29udHJvbE9wdGlvbnMge1xuICBzaXplPzogQlNpemVcbiAgaXNPcGVuPzogYm9vbGVhblxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNjYWxlQ29udHJvbE9wdGlvbnMgZXh0ZW5kcyBDb250cm9sT3B0aW9ucyB7fVxuXG5leHBvcnQgaW50ZXJmYWNlIEJTY2FsZUNvbnRyb2xPcHRpb25zIGV4dGVuZHMgQkNvbnRyb2xPcHRpb25zIHt9XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWFwVHlwZUNvbnRyb2xPcHRpb25zIHtcbiAgdHlwZT86IE1hcFR5cGVDb250cm9sVHlwZVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEJNYXBUeXBlQ29udHJvbE9wdGlvbnMge1xuICB0eXBlPzogTWFwVHlwZUNvbnRyb2xUeXBlXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgR2VvbG9jYXRpb25Db250cm9sT3B0aW9ucyBleHRlbmRzIENvbnRyb2xPcHRpb25zIHtcbiAgc2hvd0FkZHJlc3NCYXI/OiBib29sZWFuXG4gIGVuYWJsZUF1dG9Mb2NhdGlvbj86IGJvb2xlYW5cbiAgbG9jYXRpb25JY29uPzogSWNvblxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEJHZW9sb2NhdGlvbkNvbnRyb2xPcHRpb25zIGV4dGVuZHMgQkNvbnRyb2xPcHRpb25zIHtcbiAgc2hvd0FkZHJlc3NCYXI/OiBib29sZWFuXG4gIGVuYWJsZUF1dG9Mb2NhdGlvbj86IGJvb2xlYW5cbiAgbG9jYXRpb25JY29uPzogQkljb25cbn1cblxuZXhwb3J0IGVudW0gQ29udHJvbEFuY2hvciB7XG4gIEJNQVBfQU5DSE9SX1RPUF9MRUZUID0gMCxcbiAgQk1BUF9BTkNIT1JfVE9QX1JJR0hUID0gMSxcbiAgQk1BUF9BTkNIT1JfQk9UVE9NX0xFRlQgPSAyLFxuICBCTUFQX0FOQ0hPUl9CT1RUT01fUklHSFQgPSAzXG59XG5cbmV4cG9ydCBlbnVtIE5hdmlnYXRpb25Db250cm9sVHlwZSB7XG4gIEJNQVBfTkFWSUdBVElPTl9DT05UUk9MX0xBUkdFID0gMCxcbiAgQk1BUF9OQVZJR0FUSU9OX0NPTlRST0xfU01BTEwgPSAxLFxuICBCTUFQX05BVklHQVRJT05fQ09OVFJPTF9QQU4gPSAyLFxuICBCTUFQX05BVklHQVRJT05fQ09OVFJPTF9aT09NID0gM1xufVxuXG5leHBvcnQgZW51bSBNYXBUeXBlQ29udHJvbFR5cGUge1xuICBCTUFQX01BUFRZUEVfQ09OVFJPTF9IT1JJWk9OVEFMID0gMCxcbiAgQk1BUF9NQVBUWVBFX0NPTlRST0xfRFJPUERPV04gPSAxLFxuICBCTUFQX01BUFRZUEVfQ09OVFJPTF9NQVAgPSAyXG59XG5cbmV4cG9ydCBlbnVtIExlbmd0aFVuaXQge1xuICBCTUFQX1VOSVRfTUVUUklDID0gJ21ldHJpYycsXG4gIEJNQVBfVU5JVF9JTVBFUklBTCA9ICd1cydcbn1cblxuZXhwb3J0IGludGVyZmFjZSBBZGRyZXNzQ29tcG9uZW50IHtcbiAgc3RyZWV0TnVtYmVyOiBzdHJpbmdcbiAgc3RyZWV0OiBzdHJpbmdcbiAgZGlzdHJpY3Q6IHN0cmluZ1xuICBjaXR5OiBzdHJpbmdcbiAgcHJvdmluY2U6IHN0cmluZ1xufVxuXG5leHBvcnQgdHlwZSBDb250cm9sVHlwZSA9ICduYXZpZ2F0aW9uJyB8ICdvdmVydmlld21hcCcgfCAnc2NhbGUnIHwgJ21hcHR5cGUnIHwgJ2dlb2xvY2F0aW9uJyB8ICdwYW5vcmFtYSdcbiJdfQ==