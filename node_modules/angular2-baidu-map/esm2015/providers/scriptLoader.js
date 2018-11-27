/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { isString } from '../helpers/object';
/** @enum {number} */
const LOADING_STATE = {
    NON: 0,
    LOADED: 1,
    LOADING: 2,
};
export { LOADING_STATE };
LOADING_STATE[LOADING_STATE.NON] = "NON";
LOADING_STATE[LOADING_STATE.LOADED] = "LOADED";
LOADING_STATE[LOADING_STATE.LOADING] = "LOADING";
export class ScriptLoaderConfig {
    constructor() {
        this.ak = '';
    }
}
function ScriptLoaderConfig_tsickle_Closure_declarations() {
    /** @type {?} */
    ScriptLoaderConfig.prototype.ak;
}
window._scriptLoadState = {};
window._loadingCallbacks = {};
export class ScriptLoader {
    /**
     * @param {?} url
     * @param {?=} isMain
     * @param {?=} cb
     * @return {?}
     */
    load(url, isMain = false, cb) {
        const /** @type {?} */ scriptKey = isString(url) ? url : url['key'];
        const /** @type {?} */ scriptUrls = isString(url) ? [url] : url['scripts'];
        if (window._scriptLoadState[scriptKey] === LOADING_STATE.LOADED) {
            if (isMain) {
                switchDisplay('baidu-map .baidu-map-instance', 'block');
                switchDisplay('baidu-map .baidu-map-offline', 'none');
            }
            return cb();
        }
        if (!window._loadingCallbacks[scriptKey]) {
            window._loadingCallbacks[scriptKey] = [];
        }
        if (window._scriptLoadState[scriptKey] === LOADING_STATE.LOADING) {
            window._loadingCallbacks[scriptKey].push(cb);
            return;
        }
        window._scriptLoadState[scriptKey] = LOADING_STATE.LOADING;
        window._loadingCallbacks[scriptKey].push(cb);
        if (isMain) {
            window.baidumapinit = () => {
                window._scriptLoadState[scriptKey] = LOADING_STATE.LOADED;
                switchDisplay('baidu-map .baidu-map-instance', 'block');
                switchDisplay('baidu-map .baidu-map-offline', 'none');
                window._loadingCallbacks[scriptKey].forEach((c) => {
                    c();
                });
            };
        }
        appendScriptsTag(scriptKey, scriptUrls, isMain);
    }
}
ScriptLoader.decorators = [
    { type: Injectable },
];
function ScriptLoader_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    ScriptLoader.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    ScriptLoader.ctorParameters;
}
/**
 * @param {?} scriptKey
 * @param {?} urls
 * @param {?} isMain
 * @return {?}
 */
function appendScriptsTag(scriptKey, urls, isMain) {
    const /** @type {?} */ leftObj = {
        count: urls.length
    };
    urls.forEach(url => {
        appendScriptTag(scriptKey, url, isMain, leftObj);
    });
}
/**
 * @param {?} scriptKey
 * @param {?} url
 * @param {?} isMain
 * @param {?} leftObj
 * @return {?}
 */
function appendScriptTag(scriptKey, url, isMain, leftObj) {
    const /** @type {?} */ script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.onerror = () => {
        if (isMain) {
            switchDisplay('baidu-map .baidu-map-offline', 'block');
            switchDisplay('baidu-map .baidu-map-instance', 'none');
        }
        document.body.removeChild(script);
        setTimeout(() => {
            appendScriptTag(scriptKey, url, isMain, leftObj);
        }, 30000);
    };
    if (!isMain) {
        script.onload = () => {
            leftObj.count--;
            if (leftObj.count) {
                return;
            }
            window._scriptLoadState[scriptKey] = LOADING_STATE.LOADED;
            window._loadingCallbacks[scriptKey].forEach((c) => {
                c();
            });
        };
    }
    document.body.appendChild(script);
}
/**
 * @param {?} selector
 * @param {?} state
 * @return {?}
 */
function switchDisplay(selector, state) {
    Array.prototype.slice.call(document.querySelectorAll(selector)).forEach((node) => {
        node.style.display = state;
    });
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyaXB0TG9hZGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhcjItYmFpZHUtbWFwLyIsInNvdXJjZXMiOlsicHJvdmlkZXJzL3NjcmlwdExvYWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQTtBQUMxQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sbUJBQW1CLENBQUE7Ozs7Ozs7Ozs7O0FBUzVDLE1BQU07O2tCQUNnQixFQUFFOztDQUN2Qjs7Ozs7QUFFRCxNQUFNLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxDQUFBO0FBQzVCLE1BQU0sQ0FBQyxpQkFBaUIsR0FBRyxFQUFFLENBQUE7QUFHN0IsTUFBTTs7Ozs7OztJQUNHLElBQUksQ0FBQyxHQUF3QixFQUFFLFNBQWtCLEtBQUssRUFBRSxFQUFjO1FBQzNFLHVCQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ2xELHVCQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQTtRQUV6RCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLEtBQUssYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDaEUsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDWCxhQUFhLENBQUMsK0JBQStCLEVBQUUsT0FBTyxDQUFDLENBQUE7Z0JBQ3ZELGFBQWEsQ0FBQyw4QkFBOEIsRUFBRSxNQUFNLENBQUMsQ0FBQTthQUN0RDtZQUNELE1BQU0sQ0FBQyxFQUFFLEVBQUUsQ0FBQTtTQUNaO1FBQ0QsRUFBRSxDQUFDLENB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QU0sQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsR0FBRyxhQUFhLENBQUMsTUFBTSxDQUFBO1lBQ3pELE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFhLEVBQUUsRUFBRTtnQkFDNUQsQ0FBQyxFQUFFLENBQUE7YUFDSixDQUFDLENBQUE7U0FDSCxDQUFBO0tBQ0Y7SUFDRCxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtDQUNsQzs7Ozs7O0FBRUQsdUJBQXVCLFFBQWdCLEVBQUUsS0FBYTtJQUNwRCxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBaUIsRUFBRSxFQUFFO1FBQzVGLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQTtLQUMzQixDQUFDLENBQUE7Q0FDSCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJ1xuaW1wb3J0IHsgaXNTdHJpbmcgfSBmcm9tICcuLi9oZWxwZXJzL29iamVjdCdcbmltcG9ydCB7IFNjcmlwdFR5cGUgfSBmcm9tICcuLi90eXBlcy9TY3JpcHQnXG5cbmV4cG9ydCBlbnVtIExPQURJTkdfU1RBVEUge1xuICBOT04gPSAwLFxuICBMT0FERUQgPSAxLFxuICBMT0FESU5HID0gMlxufVxuXG5leHBvcnQgY2xhc3MgU2NyaXB0TG9hZGVyQ29uZmlnIHtcbiAgcHVibGljIGFrOiBzdHJpbmcgPSAnJ1xufVxuXG53aW5kb3cuX3NjcmlwdExvYWRTdGF0ZSA9IHt9XG53aW5kb3cuX2xvYWRpbmdDYWxsYmFja3MgPSB7fVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2NyaXB0TG9hZGVyIHtcbiAgcHVibGljIGxvYWQodXJsOiBzdHJpbmcgfCBTY3JpcHRUeXBlLCBpc01haW46IGJvb2xlYW4gPSBmYWxzZSwgY2I6ICgpID0+IHZvaWQpOiB2b2lkIHtcbiAgICBjb25zdCBzY3JpcHRLZXkgPSBpc1N0cmluZyh1cmwpID8gdXJsIDogdXJsWydrZXknXVxuICAgIGNvbnN0IHNjcmlwdFVybHMgPSBpc1N0cmluZyh1cmwpID8gW3VybF0gOiB1cmxbJ3NjcmlwdHMnXVxuXG4gICAgaWYgKHdpbmRvdy5fc2NyaXB0TG9hZFN0YXRlW3NjcmlwdEtleV0gPT09IExPQURJTkdfU1RBVEUuTE9BREVEKSB7XG4gICAgICBpZiAoaXNNYWluKSB7XG4gICAgICAgIHN3aXRjaERpc3BsYXkoJ2JhaWR1LW1hcCAuYmFpZHUtbWFwLWluc3RhbmNlJywgJ2Jsb2NrJylcbiAgICAgICAgc3dpdGNoRGlzcGxheSgnYmFpZHUtbWFwIC5iYWlkdS1tYXAtb2ZmbGluZScsICdub25lJylcbiAgICAgIH1cbiAgICAgIHJldHVybiBjYigpXG4gICAgfVxuICAgIGlmICghd2luZG93Ll9sb2FkaW5nQ2FsbGJhY2tzW3NjcmlwdEtleV0pIHtcbiAgICAgIHdpbmRvdy5fbG9hZGluZ0NhbGxiYWNrc1tzY3JpcHRLZXldID0gW11cbiAgICB9XG4gICAgaWYgKHdpbmRvdy5fc2NyaXB0TG9hZFN0YXRlW3NjcmlwdEtleV0gPT09IExPQURJTkdfU1RBVEUuTE9BRElORykge1xuICAgICAgd2luZG93Ll9sb2FkaW5nQ2FsbGJhY2tzW3NjcmlwdEtleV0ucHVzaChjYilcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICB3aW5kb3cuX3NjcmlwdExvYWRTdGF0ZVtzY3JpcHRLZXldID0gTE9BRElOR19TVEFURS5MT0FESU5HXG4gICAgd2luZG93Ll9sb2FkaW5nQ2FsbGJhY2tzW3NjcmlwdEtleV0ucHVzaChjYilcblxuICAgIGlmIChpc01haW4pIHtcbiAgICAgIHdpbmRvdy5iYWlkdW1hcGluaXQgPSAoKSA9PiB7XG4gICAgICAgIHdpbmRvdy5fc2NyaXB0TG9hZFN0YXRlW3NjcmlwdEtleV0gPSBMT0FESU5HX1NUQVRFLkxPQURFRFxuICAgICAgICBzd2l0Y2hEaXNwbGF5KCdiYWlkdS1tYXAgLmJhaWR1LW1hcC1pbnN0YW5jZScsICdibG9jaycpXG4gICAgICAgIHN3aXRjaERpc3BsYXkoJ2JhaWR1LW1hcCAuYmFpZHUtbWFwLW9mZmxpbmUnLCAnbm9uZScpXG4gICAgICAgIHdpbmRvdy5fbG9hZGluZ0NhbGxiYWNrc1tzY3JpcHRLZXldLmZvckVhY2goKGM6ICgpID0+IHZvaWQpID0+IHtcbiAgICAgICAgICBjKClcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gICAgYXBwZW5kU2NyaXB0c1RhZyhzY3JpcHRLZXksIHNjcmlwdFVybHMsIGlzTWFpbilcbiAgfVxufVxuXG5mdW5jdGlvbiBhcHBlbmRTY3JpcHRzVGFnKHNjcmlwdEtleTogc3RyaW5nLCB1cmxzOiBBcnJheTxzdHJpbmc+LCBpc01haW46IGJvb2xlYW4pIHtcbiAgY29uc3QgbGVmdE9iaiA9IHtcbiAgICBjb3VudDogdXJscy5sZW5ndGhcbiAgfVxuICB1cmxzLmZvckVhY2godXJsID0+IHtcbiAgICBhcHBlbmRTY3JpcHRUYWcoc2NyaXB0S2V5LCB1cmwsIGlzTWFpbiwgbGVmdE9iailcbiAgfSlcbn1cblxuZnVuY3Rpb24gYXBwZW5kU2NyaXB0VGFnKHNjcmlwdEtleTogc3RyaW5nLCB1cmw6IHN0cmluZywgaXNNYWluOiBib29sZWFuLCBsZWZ0T2JqOiB7IGNvdW50OiBudW1iZXIgfSkge1xuICBjb25zdCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKVxuICBzY3JpcHQudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnXG4gIHNjcmlwdC5zcmMgPSB1cmxcbiAgc2NyaXB0Lm9uZXJyb3IgPSAoKSA9PiB7XG4gICAgaWYgKGlzTWFpbikge1xuICAgICAgc3dpdGNoRGlzcGxheSgnYmFpZHUtbWFwIC5iYWlkdS1tYXAtb2ZmbGluZScsICdibG9jaycpXG4gICAgICBzd2l0Y2hEaXNwbGF5KCdiYWlkdS1tYXAgLmJhaWR1LW1hcC1pbnN0YW5jZScsICdub25lJylcbiAgICB9XG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChzY3JpcHQpXG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGFwcGVuZFNjcmlwdFRhZyhzY3JpcHRLZXksIHVybCwgaXNNYWluLCBsZWZ0T2JqKVxuICAgIH0sIDMwMDAwKVxuICB9XG5cbiAgaWYgKCFpc01haW4pIHtcbiAgICBzY3JpcHQub25sb2FkID0gKCkgPT4ge1xuICAgICAgbGVmdE9iai5jb3VudC0tXG4gICAgICBpZiAobGVmdE9iai5jb3VudCkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIHdpbmRvdy5fc2NyaXB0TG9hZFN0YXRlW3NjcmlwdEtleV0gPSBMT0FESU5HX1NUQVRFLkxPQURFRFxuICAgICAgd2luZG93Ll9sb2FkaW5nQ2FsbGJhY2tzW3NjcmlwdEtleV0uZm9yRWFjaCgoYzogKCkgPT4gdm9pZCkgPT4ge1xuICAgICAgICBjKClcbiAgICAgIH0pXG4gICAgfVxuICB9XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2NyaXB0KVxufVxuXG5mdW5jdGlvbiBzd2l0Y2hEaXNwbGF5KHNlbGVjdG9yOiBzdHJpbmcsIHN0YXRlOiBzdHJpbmcpIHtcbiAgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpLmZvckVhY2goKG5vZGU6IEhUTUxFbGVtZW50KSA9PiB7XG4gICAgbm9kZS5zdHlsZS5kaXNwbGF5ID0gc3RhdGVcbiAgfSlcbn1cbiJdfQ==