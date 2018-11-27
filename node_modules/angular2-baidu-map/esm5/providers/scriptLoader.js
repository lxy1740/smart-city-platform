/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { isString } from '../helpers/object';
/** @enum {number} */
var LOADING_STATE = {
    NON: 0,
    LOADED: 1,
    LOADING: 2,
};
export { LOADING_STATE };
LOADING_STATE[LOADING_STATE.NON] = "NON";
LOADING_STATE[LOADING_STATE.LOADED] = "LOADED";
LOADING_STATE[LOADING_STATE.LOADING] = "LOADING";
var ScriptLoaderConfig = /** @class */ (function () {
    function ScriptLoaderConfig() {
        this.ak = '';
    }
    return ScriptLoaderConfig;
}());
export { ScriptLoaderConfig };
function ScriptLoaderConfig_tsickle_Closure_declarations() {
    /** @type {?} */
    ScriptLoaderConfig.prototype.ak;
}
window._scriptLoadState = {};
window._loadingCallbacks = {};
var ScriptLoader = /** @class */ (function () {
    function ScriptLoader() {
    }
    /**
     * @param {?} url
     * @param {?=} isMain
     * @param {?=} cb
     * @return {?}
     */
    ScriptLoader.prototype.load = /**
     * @param {?} url
     * @param {?=} isMain
     * @param {?=} cb
     * @return {?}
     */
    function (url, isMain, cb) {
        if (isMain === void 0) { isMain = false; }
        var /** @type {?} */ scriptKey = isString(url) ? url : url['key'];
        var /** @type {?} */ scriptUrls = isString(url) ? [url] : url['scripts'];
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
            window.baidumapinit = function () {
                window._scriptLoadState[scriptKey] = LOADING_STATE.LOADED;
                switchDisplay('baidu-map .baidu-map-instance', 'block');
                switchDisplay('baidu-map .baidu-map-offline', 'none');
                window._loadingCallbacks[scriptKey].forEach(function (c) {
                    c();
                });
            };
        }
        appendScriptsTag(scriptKey, scriptUrls, isMain);
    };
    ScriptLoader.decorators = [
        { type: Injectable },
    ];
    return ScriptLoader;
}());
export { ScriptLoader };
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
    var /** @type {?} */ leftObj = {
        count: urls.length
    };
    urls.forEach(function (url) {
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
    var /** @type {?} */ script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.onerror = function () {
        if (isMain) {
            switchDisplay('baidu-map .baidu-map-offline', 'block');
            switchDisplay('baidu-map .baidu-map-instance', 'none');
        }
        document.body.removeChild(script);
        setTimeout(function () {
            appendScriptTag(scriptKey, url, isMain, leftObj);
        }, 30000);
    };
    if (!isMain) {
        script.onload = function () {
            leftObj.count--;
            if (leftObj.count) {
                return;
            }
            window._scriptLoadState[scriptKey] = LOADING_STATE.LOADED;
            window._loadingCallbacks[scriptKey].forEach(function (c) {
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
    Array.prototype.slice.call(document.querySelectorAll(selector)).forEach(function (node) {
        node.style.display = state;
    });
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyaXB0TG9hZGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhcjItYmFpZHUtbWFwLyIsInNvdXJjZXMiOlsicHJvdmlkZXJzL3NjcmlwdExvYWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQTtBQUMxQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sbUJBQW1CLENBQUE7Ozs7Ozs7Ozs7O0FBUzVDLElBQUE7O2tCQUNzQixFQUFFOzs2QkFYeEI7SUFZQyxDQUFBO0FBRkQsOEJBRUM7Ozs7O0FBRUQsTUFBTSxDQUFDLGdCQUFnQixHQUFHLEVBQUUsQ0FBQTtBQUM1QixNQUFNLENBQUMsaUJBQWlCLEdBQUcsRUFBRSxDQUFBOzs7Ozs7Ozs7O0lBSXBCLDJCQUFJOzs7Ozs7Y0FBQyxHQUF3QixFQUFFLE1BQXVCLEVBQUUsRUFBYztRQUF2Qyx1QkFBQSxFQUFBLGNBQXVCO1FBQzNELHFCQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ2xELHFCQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQTtRQUV6RCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLEtBQUssYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDaEUsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDWCxhQUFhLENBQUMsK0JBQStCLEVBQUUsT0FBTyxDQUFDLENBQUE7Z0JBQ3ZELGFBQWEsQ0FBQyw4QkFBOEIsRUFBRSxNQUFNLENBQUMsQ0FBQTthQUN0RDtZQUNELE1BQU0sQ0FB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QUFNLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLEdBQUcsYUFBYSxDQUFDLE1BQU0sQ0FBQTtZQUN6RCxNQUFNLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUMsQ0FBYTtnQkFDeEQsQ0FBQyxFQUFFLENBQUE7YUFDSixDQUFDLENBQUE7U0FDSCxDQUFBO0tBQ0Y7SUFDRCxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtDQUNsQzs7Ozs7O0FBRUQsdUJBQXVCLFFBQWdCLEVBQUUsS0FBYTtJQUNwRCxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBaUI7UUFDeEYsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFBO0tBQzNCLENBQUMsQ0FBQTtDQUNIIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXG5pbXBvcnQgeyBpc1N0cmluZyB9IGZyb20gJy4uL2hlbHBlcnMvb2JqZWN0J1xuaW1wb3J0IHsgU2NyaXB0VHlwZSB9IGZyb20gJy4uL3R5cGVzL1NjcmlwdCdcblxuZXhwb3J0IGVudW0gTE9BRElOR19TVEFURSB7XG4gIE5PTiA9IDAsXG4gIExPQURFRCA9IDEsXG4gIExPQURJTkcgPSAyXG59XG5cbmV4cG9ydCBjbGFzcyBTY3JpcHRMb2FkZXJDb25maWcge1xuICBwdWJsaWMgYWs6IHN0cmluZyA9ICcnXG59XG5cbndpbmRvdy5fc2NyaXB0TG9hZFN0YXRlID0ge31cbndpbmRvdy5fbG9hZGluZ0NhbGxiYWNrcyA9IHt9XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTY3JpcHRMb2FkZXIge1xuICBwdWJsaWMgbG9hZCh1cmw6IHN0cmluZyB8IFNjcmlwdFR5cGUsIGlzTWFpbjogYm9vbGVhbiA9IGZhbHNlLCBjYjogKCkgPT4gdm9pZCk6IHZvaWQge1xuICAgIGNvbnN0IHNjcmlwdEtleSA9IGlzU3RyaW5nKHVybCkgPyB1cmwgOiB1cmxbJ2tleSddXG4gICAgY29uc3Qgc2NyaXB0VXJscyA9IGlzU3RyaW5nKHVybCkgPyBbdXJsXSA6IHVybFsnc2NyaXB0cyddXG5cbiAgICBpZiAod2luZG93Ll9zY3JpcHRMb2FkU3RhdGVbc2NyaXB0S2V5XSA9PT0gTE9BRElOR19TVEFURS5MT0FERUQpIHtcbiAgICAgIGlmIChpc01haW4pIHtcbiAgICAgICAgc3dpdGNoRGlzcGxheSgnYmFpZHUtbWFwIC5iYWlkdS1tYXAtaW5zdGFuY2UnLCAnYmxvY2snKVxuICAgICAgICBzd2l0Y2hEaXNwbGF5KCdiYWlkdS1tYXAgLmJhaWR1LW1hcC1vZmZsaW5lJywgJ25vbmUnKVxuICAgICAgfVxuICAgICAgcmV0dXJuIGNiKClcbiAgICB9XG4gICAgaWYgKCF3aW5kb3cuX2xvYWRpbmdDYWxsYmFja3Nbc2NyaXB0S2V5XSkge1xuICAgICAgd2luZG93Ll9sb2FkaW5nQ2FsbGJhY2tzW3NjcmlwdEtleV0gPSBbXVxuICAgIH1cbiAgICBpZiAod2luZG93Ll9zY3JpcHRMb2FkU3RhdGVbc2NyaXB0S2V5XSA9PT0gTE9BRElOR19TVEFURS5MT0FESU5HKSB7XG4gICAgICB3aW5kb3cuX2xvYWRpbmdDYWxsYmFja3Nbc2NyaXB0S2V5XS5wdXNoKGNiKVxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHdpbmRvdy5fc2NyaXB0TG9hZFN0YXRlW3NjcmlwdEtleV0gPSBMT0FESU5HX1NUQVRFLkxPQURJTkdcbiAgICB3aW5kb3cuX2xvYWRpbmdDYWxsYmFja3Nbc2NyaXB0S2V5XS5wdXNoKGNiKVxuXG4gICAgaWYgKGlzTWFpbikge1xuICAgICAgd2luZG93LmJhaWR1bWFwaW5pdCA9ICgpID0+IHtcbiAgICAgICAgd2luZG93Ll9zY3JpcHRMb2FkU3RhdGVbc2NyaXB0S2V5XSA9IExPQURJTkdfU1RBVEUuTE9BREVEXG4gICAgICAgIHN3aXRjaERpc3BsYXkoJ2JhaWR1LW1hcCAuYmFpZHUtbWFwLWluc3RhbmNlJywgJ2Jsb2NrJylcbiAgICAgICAgc3dpdGNoRGlzcGxheSgnYmFpZHUtbWFwIC5iYWlkdS1tYXAtb2ZmbGluZScsICdub25lJylcbiAgICAgICAgd2luZG93Ll9sb2FkaW5nQ2FsbGJhY2tzW3NjcmlwdEtleV0uZm9yRWFjaCgoYzogKCkgPT4gdm9pZCkgPT4ge1xuICAgICAgICAgIGMoKVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgICBhcHBlbmRTY3JpcHRzVGFnKHNjcmlwdEtleSwgc2NyaXB0VXJscywgaXNNYWluKVxuICB9XG59XG5cbmZ1bmN0aW9uIGFwcGVuZFNjcmlwdHNUYWcoc2NyaXB0S2V5OiBzdHJpbmcsIHVybHM6IEFycmF5PHN0cmluZz4sIGlzTWFpbjogYm9vbGVhbikge1xuICBjb25zdCBsZWZ0T2JqID0ge1xuICAgIGNvdW50OiB1cmxzLmxlbmd0aFxuICB9XG4gIHVybHMuZm9yRWFjaCh1cmwgPT4ge1xuICAgIGFwcGVuZFNjcmlwdFRhZyhzY3JpcHRLZXksIHVybCwgaXNNYWluLCBsZWZ0T2JqKVxuICB9KVxufVxuXG5mdW5jdGlvbiBhcHBlbmRTY3JpcHRUYWcoc2NyaXB0S2V5OiBzdHJpbmcsIHVybDogc3RyaW5nLCBpc01haW46IGJvb2xlYW4sIGxlZnRPYmo6IHsgY291bnQ6IG51bWJlciB9KSB7XG4gIGNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpXG4gIHNjcmlwdC50eXBlID0gJ3RleHQvamF2YXNjcmlwdCdcbiAgc2NyaXB0LnNyYyA9IHVybFxuICBzY3JpcHQub25lcnJvciA9ICgpID0+IHtcbiAgICBpZiAoaXNNYWluKSB7XG4gICAgICBzd2l0Y2hEaXNwbGF5KCdiYWlkdS1tYXAgLmJhaWR1LW1hcC1vZmZsaW5lJywgJ2Jsb2NrJylcbiAgICAgIHN3aXRjaERpc3BsYXkoJ2JhaWR1LW1hcCAuYmFpZHUtbWFwLWluc3RhbmNlJywgJ25vbmUnKVxuICAgIH1cbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHNjcmlwdClcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgYXBwZW5kU2NyaXB0VGFnKHNjcmlwdEtleSwgdXJsLCBpc01haW4sIGxlZnRPYmopXG4gICAgfSwgMzAwMDApXG4gIH1cblxuICBpZiAoIWlzTWFpbikge1xuICAgIHNjcmlwdC5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICBsZWZ0T2JqLmNvdW50LS1cbiAgICAgIGlmIChsZWZ0T2JqLmNvdW50KSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgd2luZG93Ll9zY3JpcHRMb2FkU3RhdGVbc2NyaXB0S2V5XSA9IExPQURJTkdfU1RBVEUuTE9BREVEXG4gICAgICB3aW5kb3cuX2xvYWRpbmdDYWxsYmFja3Nbc2NyaXB0S2V5XS5mb3JFYWNoKChjOiAoKSA9PiB2b2lkKSA9PiB7XG4gICAgICAgIGMoKVxuICAgICAgfSlcbiAgICB9XG4gIH1cbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JpcHQpXG59XG5cbmZ1bmN0aW9uIHN3aXRjaERpc3BsYXkoc2VsZWN0b3I6IHN0cmluZywgc3RhdGU6IHN0cmluZykge1xuICBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSkuZm9yRWFjaCgobm9kZTogSFRNTEVsZW1lbnQpID0+IHtcbiAgICBub2RlLnN0eWxlLmRpc3BsYXkgPSBzdGF0ZVxuICB9KVxufVxuIl19