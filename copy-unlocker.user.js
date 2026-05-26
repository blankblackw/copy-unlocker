// ==UserScript==
// @name         全网复制粘贴解放
// @namespace    https://github.com/copy-liberator
// @version      1.0.0
// @description  解除所有网站的右键、选择、复制、粘贴、剪切限制
// @author       CopyLiberator
// @match        *://*/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function toast() {
        var d = document.createElement('div');
        d.textContent = '✅ 复制已解锁';
        Object.assign(d.style, {
            position:'fixed', bottom:'20px', right:'20px', zIndex:'2147483647',
            background:'#4caf50', color:'#fff', padding:'10px 20px', borderRadius:'6px',
            fontSize:'14px', fontFamily:'sans-serif', boxShadow:'0 2px 8px rgba(0,0,0,.3)',
            opacity:'1', transition:'opacity .5s', pointerEvents:'none'
        });
        document.documentElement.appendChild(d);
        setTimeout(function(){ d.style.opacity='0'; }, 2500);
        setTimeout(function(){ d.remove(); }, 3000);
    }

    function unlock() {
        var events = ['copy','cut','paste','selectstart','contextmenu','dragstart','mousedown','mouseup','keydown','keyup'];
        var stop = function(e){ e.stopImmediatePropagation(); };
        events.forEach(function(ev){
            document.addEventListener(ev, function(e){ e.stopPropagation(); }, true);
            window.addEventListener(ev, function(e){ e.stopPropagation(); }, true);
        });

        var style = document.createElement('style');
        style.textContent = '*{user-select:auto !important;-webkit-user-select:auto !important;-moz-user-select:auto !important;-ms-user-select:auto !important;}';
        document.documentElement.appendChild(style);

        Object.defineProperty(document, 'onselectstart', {get:function(){return null;},set:function(){},configurable:false});
        Object.defineProperty(document, 'oncontextmenu', {get:function(){return null;},set:function(){},configurable:false});
        Object.defineProperty(document, 'oncopy', {get:function(){return null;},set:function(){},configurable:false});
        Object.defineProperty(document, 'oncut', {get:function(){return null;},set:function(){},configurable:false});
        Object.defineProperty(document, 'onpaste', {get:function(){return null;},set:function(){},configurable:false});
        Object.defineProperty(document, 'ondragstart', {get:function(){return null;},set:function(){},configurable:false});
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function(){
            unlock();
            toast();
        });
    } else {
        unlock();
        toast();
    }
})();
