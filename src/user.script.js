// ==UserScript==
// @name         易-知乎Nice
// @namespace    chensuiyi
// @version      0.0.1
// @description  易-知乎Nice
// @author       https://chensuiyi.com
// @match        *://zhihu.com/*
// @match        *://*.zhihu.com/*
// @run-at       document-idle
// @grant        unsafeWindow
// @grant        GM_addStyle
// @grant        GM_addElement
// @grant        GM_listValues
// @grant        GM_addValueChangeListener
// @grant        GM_removeValueChangeListener
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_log
// @grant        GM_getResourceText
// @grant        GM_getResourceURL
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM_openInTab
// @grant        GM_xmlhttpRequest
// @grant        GM_download
// @grant        GM_getTab
// @grant        GM_saveTab
// @grant        GM_getTabs
// @grant        GM_notification
// @grant        GM_setClipboard
// @grant        GM_info

// ==/UserScript==

(function () {
    try {
        GM_addStyle(`/*index.css*/`);
        document.body.insertAdjacentHTML('beforeend', `/*index.html*/`);
        /*vue.js*/
        /*jquery.js*/
        /*dayjs.js*/
        /*index.js*/
    } catch (err) {
        GM_log(err);
    }
})();
