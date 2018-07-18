/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @record
 */
export function BMarkerClustererConstructor() { }
function BMarkerClustererConstructor_tsickle_Closure_declarations() {
    /* TODO: handle strange member:
    new (map: BMapInstance, options?: BMarkerClustererOptions): BMarkerClusterer
    */
}
/**
 * @record
 */
export function BMarkerClusterer() { }
function BMarkerClusterer_tsickle_Closure_declarations() {
    /** @type {?} */
    BMarkerClusterer.prototype.addMarker;
    /** @type {?} */
    BMarkerClusterer.prototype.addMarkers;
    /** @type {?} */
    BMarkerClusterer.prototype.clearMarkers;
    /** @type {?} */
    BMarkerClusterer.prototype.getClustersCount;
    /** @type {?} */
    BMarkerClusterer.prototype.getGridSize;
    /** @type {?} */
    BMarkerClusterer.prototype.getMap;
    /** @type {?} */
    BMarkerClusterer.prototype.getMarkers;
    /** @type {?} */
    BMarkerClusterer.prototype.getMaxZoom;
    /** @type {?} */
    BMarkerClusterer.prototype.getMinClusterSize;
    /** @type {?} */
    BMarkerClusterer.prototype.getStyles;
    /** @type {?} */
    BMarkerClusterer.prototype.isAverageCenter;
    /** @type {?} */
    BMarkerClusterer.prototype.removeMarker;
    /** @type {?} */
    BMarkerClusterer.prototype.removeMarkers;
    /** @type {?} */
    BMarkerClusterer.prototype.setGridSize;
    /** @type {?} */
    BMarkerClusterer.prototype.setMaxZoom;
    /** @type {?} */
    BMarkerClusterer.prototype.setMinClusterSize;
    /** @type {?} */
    BMarkerClusterer.prototype.setStyles;
}
/**
 * @record
 */
export function BMarkerClustererOptions() { }
function BMarkerClustererOptions_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    BMarkerClustererOptions.prototype.markers;
    /** @type {?|undefined} */
    BMarkerClustererOptions.prototype.girdSize;
    /** @type {?|undefined} */
    BMarkerClustererOptions.prototype.maxZoom;
    /** @type {?|undefined} */
    BMarkerClustererOptions.prototype.minClusterSize;
    /** @type {?|undefined} */
    BMarkerClustererOptions.prototype.isAverangeCenter;
    /** @type {?|undefined} */
    BMarkerClustererOptions.prototype.styles;
}
/**
 * @record
 */
export function MarkerClustererOptions() { }
function MarkerClustererOptions_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    MarkerClustererOptions.prototype.markers;
    /** @type {?|undefined} */
    MarkerClustererOptions.prototype.girdSize;
    /** @type {?|undefined} */
    MarkerClustererOptions.prototype.maxZoom;
    /** @type {?|undefined} */
    MarkerClustererOptions.prototype.minClusterSize;
    /** @type {?|undefined} */
    MarkerClustererOptions.prototype.isAverangeCenter;
    /** @type {?|undefined} */
    MarkerClustererOptions.prototype.styles;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFya2VyQ2x1c3RlcmVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhcjItYmFpZHUtbWFwLyIsInNvdXJjZXMiOlsidHlwZXMvTWFya2VyQ2x1c3RlcmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCTWFya2VyLCBNYXJrZXIgfSBmcm9tICcuL01hcmtlcidcbmltcG9ydCB7IEJUZXh0SWNvblN0eWxlLCBUZXh0SWNvblN0eWxlIH0gZnJvbSAnLi9UZXh0SWNvbk92ZXJsYXknXG5pbXBvcnQgeyBCTWFwSW5zdGFuY2UgfSBmcm9tICcuL01hcCdcblxuZXhwb3J0IGludGVyZmFjZSBCTWFya2VyQ2x1c3RlcmVyQ29uc3RydWN0b3Ige1xuICBuZXcgKG1hcDogQk1hcEluc3RhbmNlLCBvcHRpb25zPzogQk1hcmtlckNsdXN0ZXJlck9wdGlvbnMpOiBCTWFya2VyQ2x1c3RlcmVyXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQk1hcmtlckNsdXN0ZXJlciB7XG4gIGFkZE1hcmtlcihtYXJrZXI6IEJNYXJrZXIpOiB2b2lkXG4gIGFkZE1hcmtlcnMobWFya2VyczogQXJyYXk8Qk1hcmtlcj4pOiB2b2lkXG4gIGNsZWFyTWFya2VycygpOiB2b2lkXG4gIGdldENsdXN0ZXJzQ291bnQoKTogbnVtYmVyXG4gIGdldEdyaWRTaXplKCk6IG51bWJlclxuICBnZXRNYXAoKTogQk1hcEluc3RhbmNlXG4gIGdldE1hcmtlcnMoKTogQXJyYXk8Qk1hcmtlcj5cbiAgZ2V0TWF4Wm9vbSgpOiBudW1iZXJcbiAgZ2V0TWluQ2x1c3RlclNpemUoKTogbnVtYmVyXG4gIGdldFN0eWxlcygpOiBBcnJheTxCVGV4dEljb25TdHlsZT5cbiAgaXNBdmVyYWdlQ2VudGVyKCk6IGJvb2xlYW5cbiAgcmVtb3ZlTWFya2VyKG1hcmtlcjogQk1hcmtlcik6IGJvb2xlYW5cbiAgcmVtb3ZlTWFya2VycyhtYXJrZXJzOiBBcnJheTxCTWFya2VyPik6IGJvb2xlYW5cbiAgc2V0R3JpZFNpemUoZ3JpZFNpemU6IG51bWJlcik6IHZvaWRcbiAgc2V0TWF4Wm9vbShtYXhab29tOiBudW1iZXIpOiB2b2lkXG4gIHNldE1pbkNsdXN0ZXJTaXplKHNpemU6IG51bWJlcik6IHZvaWRcbiAgc2V0U3R5bGVzKHN0eWxlczogQXJyYXk8QlRleHRJY29uU3R5bGU+KTogdm9pZFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEJNYXJrZXJDbHVzdGVyZXJPcHRpb25zIHtcbiAgbWFya2Vycz86IEFycmF5PEJNYXJrZXI+XG4gIGdpcmRTaXplPzogbnVtYmVyXG4gIG1heFpvb20/OiBudW1iZXJcbiAgbWluQ2x1c3RlclNpemU/OiBudW1iZXJcbiAgaXNBdmVyYW5nZUNlbnRlcj86IGJvb2xlYW5cbiAgc3R5bGVzPzogQXJyYXk8QlRleHRJY29uU3R5bGU+XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWFya2VyQ2x1c3RlcmVyT3B0aW9ucyB7XG4gIG1hcmtlcnM/OiBBcnJheTxNYXJrZXI+XG4gIGdpcmRTaXplPzogbnVtYmVyXG4gIG1heFpvb20/OiBudW1iZXJcbiAgbWluQ2x1c3RlclNpemU/OiBudW1iZXJcbiAgaXNBdmVyYW5nZUNlbnRlcj86IGJvb2xlYW5cbiAgc3R5bGVzPzogQXJyYXk8VGV4dEljb25TdHlsZT5cbn1cbiJdfQ==