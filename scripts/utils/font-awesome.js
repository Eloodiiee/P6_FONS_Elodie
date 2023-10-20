window.FontAwesomeKitConfig={asyncLoading:{enabled:!0},autoA11y:{enabled:!0},baseUrl:"https://ka-f.fontawesome.com",baseUrlKit:"https://kit.fontawesome.com",detectConflictsUntil:null,iconUploads:{},id:132644791,license:"pro",method:"css",minify:{enabled:!0},token:"836a2159df",v4FontFaceShim:{enabled:!0},v4shim:{enabled:!0},v5FontFaceShim:{enabled:!0},version:"6.1.2"},function(t){"function"==typeof define&&define.amd?define("kit-loader",t):t()}((function(){"use strict";function t(e){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(e)}function e(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function n(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,o)}return n}function o(t){for(var o=1;o<arguments.length;o++){var r=null!=arguments[o]?arguments[o]:{};o%2?n(Object(r),!0).forEach((function(n){e(t,n,r[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):n(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function r(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,o=Array(e);n<e;n++)o[n]=t[n];return o}function i(t,e){var n=e&&e.addOn||"",o=e&&e.baseFilename||t.license+n,r=e&&e.minify?".min":"",i=e&&e.fileSuffix||t.method,c=e&&e.subdir||t.method;return t.baseUrl+"/releases/"+("latest"===t.version?"latest":"v".concat(t.version))+"/"+c+"/"+o+r+"."+i}function c(t,e){var n="."+Array.prototype.join.call(e||["fa"],",."),o=t.querySelectorAll(n);Array.prototype.forEach.call(o,(function(e){var n=e.getAttribute("title");e.setAttribute("aria-hidden","true");var o=!e.nextElementSibling||!e.nextElementSibling.classList.contains("sr-only");if(n&&o){var r=t.createElement("span");r.innerHTML=n,r.classList.add("sr-only"),e.parentNode.insertBefore(r,e.nextSibling)}}))}var a,u=function(){},s="undefined"!=typeof global&&void 0!==global.process&&"function"==typeof global.process.emit,f="undefined"==typeof setImmediate?setTimeout:setImmediate,d=[];function l(){for(var t=0;t<d.length;t++)d[t][0](d[t][1]);d=[],a=!1}function h(t,e){d.push([t,e]),a||(a=!0,f(l,0))}function m(t){var e=t.owner,n=e._state,o=e._data,r=t[n],i=t.then;if("function"==typeof r){n="fulfilled";try{o=r(o)}catch(t){y(i,t)}}p(i,o)||("fulfilled"===n&&b(i,o),"rejected"===n&&y(i,o))}function p(e,n){var o;try{if(e===n)throw TypeError("A promises callback cannot return that same promise.");if(n&&("function"==typeof n||"object"===t(n))){var r=n.then;if("function"==typeof r)return r.call(n,(function(t){o||(o=!0,n===t?v(e,t):b(e,t))}),(function(t){o||(o=!0,y(e,t))})),!0}}catch(t){return o||y(e,t),!0}return!1}function b(t,e){t!==e&&p(t,e)||v(t,e)}function v(t,e){"pending"===t._state&&(t._state="settled",t._data=e,h(w,t))}function y(t,e){"pending"===t._state&&(t._state="settled",t._data=e,h(A,t))}function g(t){t._then=t._then.forEach(m)}function w(t){t._state="fulfilled",g(t)}function A(t){t._state="rejected",g(t),!t._handled&&s&&global.process.emit("unhandledRejection",t._data,t)}function S(t){global.process.emit("rejectionHandled",t)}function O(t){if("function"!=typeof t)throw TypeError("Promise resolver "+t+" is not a function");if(this instanceof O==0)throw TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");this._then=[],function(t,e){function n(t){y(e,t)}try{t((function(t){b(e,t)}),n)}catch(t){n(t)}}(t,this)}O.prototype={constructor:O,_state:"pending",_then:null,_data:void 0,_handled:!1,then:function(t,e){var n={owner:this,then:new this.constructor(u),fulfilled:t,rejected:e};return!e&&!t||this._handled||(this._handled=!0,"rejected"===this._state&&s&&h(S,this)),"fulfilled"===this._state||"rejected"===this._state?h(m,n):this._then.push(n),n.then},catch:function(t){return this.then(null,t)}},O.all=function(t){if(!Array.isArray(t))throw TypeError("You must pass an array to Promise.all().");return new O((function(e,n){var o=[],r=0;function i(t){return r++,function(n){o[t]=n,--r||e(o)}}for(var c,a=0;a<t.length;a++)(c=t[a])&&"function"==typeof c.then?c.then(i(a),n):o[a]=c;r||e(o)}))},O.race=function(t){if(!Array.isArray(t))throw TypeError("You must pass an array to Promise.race().");return new O((function(e,n){for(var o,r=0;r<t.length;r++)(o=t[r])&&"function"==typeof o.then?o.then(e,n):e(o)}))},O.resolve=function(e){return e&&"object"===t(e)&&e.constructor===O?e:new O((function(t){t(e)}))},O.reject=function(t){return new O((function(e,n){n(t)}))};var j="function"==typeof Promise?Promise:O;function F(t,e){var n=e.fetch,o=e.XMLHttpRequest,r=e.token,i=t;return"URLSearchParams"in window?(i=new URL(t)).searchParams.set("token",r):i=i+"?token="+encodeURIComponent(r),i=i.toString(),new j((function(t,e){if("function"==typeof n)n(i,{mode:"cors",cache:"default"}).then((function(t){if(t.ok)return t.text();throw Error("")})).then((function(e){t(e)})).catch(e);else if("function"==typeof o){var r=new o;r.addEventListener("loadend",(function(){this.responseText?t(this.responseText):e(Error(""))})),["abort","error","timeout"].map((function(t){r.addEventListener(t,(function(){e(Error(""))}))})),r.open("GET",i),r.send()}else e(Error(""))}))}function E(t,e){var n=document.createElement("SCRIPT"),o=document.createTextNode(t);return n.appendChild(o),n.referrerPolicy="strict-origin",e.id&&n.setAttribute("id",e.id),e&&e.detectingConflicts&&e.detectionIgnoreAttr&&n.setAttributeNode(document.createAttribute(e.detectionIgnoreAttr)),n}function _(t){var e,n=[],o=document,r=(o.documentElement.doScroll?/^loaded|^c/:/^loaded|^i|^c/).test(o.readyState);r||o.addEventListener("DOMContentLoaded",e=function(){for(o.removeEventListener("DOMContentLoaded",e),r=1;e=n.shift();)e()}),r?setTimeout(t,0):n.push(t)}try{if(window.FontAwesomeKitConfig){var C=window.FontAwesomeKitConfig,P={detectingConflicts:C.detectConflictsUntil&&new Date<=new Date(C.detectConflictsUntil),detectionIgnoreAttr:"data-fa-detection-ignore",fetch:window.fetch,token:C.token,XMLHttpRequest:window.XMLHttpRequest,document:document},U=document.currentScript,k=U?U.parentElement:document.head;(function(){var t,e,n,a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},u=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return"js"===a.method?(t=a,(e=u).autoA11y=t.autoA11y.enabled,"pro"===t.license&&(e.autoFetchSvg=!0,e.fetchSvgFrom=t.baseUrl+"/releases/"+("latest"===t.version?"latest":"v".concat(t.version))+"/svgs",e.fetchUploadedSvgFrom=t.uploadsUrl),n=[],t.v4shim.enabled&&n.push(new j((function(n,r){F(i(t,{addOn:"-v4-shims",minify:t.minify.enabled}),e).then((function(t){n(E(t,o(o({},e),{},{id:"fa-v4-shims"})))})).catch(r)}))),n.push(new j((function(n,r){F(i(t,{minify:t.minify.enabled}),e).then((function(t){var r,i,c,a;n((r=E(t,o(o({},e),{},{id:"fa-main"})),c=(i=e)&&void 0!==i.autoFetchSvg?i.autoFetchSvg:void 0,void 0!==(a=i&&void 0!==i.autoA11y?i.autoA11y:void 0)&&r.setAttribute("data-auto-a11y",a?"true":"false"),c&&(r.setAttributeNode(document.createAttribute("data-auto-fetch-svg")),r.setAttribute("data-fetch-svg-from",i.fetchSvgFrom),r.setAttribute("data-fetch-uploaded-svg-from",i.fetchUploadedSvgFrom)),r))})).catch(r)}))),j.all(n)):"css"===a.method?function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:function(){},a=e.document||a,u=c.bind(c,a,["fa","fab","fas","far","fal","fad","fak"]),s=Object.keys(t.iconUploads||{}).length>0;t.autoA11y.enabled&&n(u);var f=[{id:"fa-main",addOn:void 0}];t.v4shim&&t.v4shim.enabled&&f.push({id:"fa-v4-shims",addOn:"-v4-shims"}),t.v5FontFaceShim&&t.v5FontFaceShim.enabled&&f.push({id:"fa-v5-font-face",addOn:"-v5-font-face"}),t.v4FontFaceShim&&t.v4FontFaceShim.enabled&&f.push({id:"fa-v4-font-face",addOn:"-v4-font-face"}),s&&f.push({id:"fa-kit-upload",customCss:!0});var d=f.map((function(n){return new j((function(c,a){var u;F(n.customCss?(u=t).baseUrlKit+"/"+u.token+"/"+u.id+"/kit-upload.css":i(t,{addOn:n.addOn,minify:t.minify.enabled}),e).then((function(i){var a,u,s,f,d;c((a=i,u=o(o({},e),{},{baseUrl:t.baseUrl,version:t.version,id:n.id,contentFilter:function(t,e){var n,o,i,c;return n=t,o=e.baseUrl,i=e.version,c=n,[[/(url\("?)\.\.\/\.\.\/\.\./g,function(t,e){return"".concat(e).concat(o)}],[/(url\("?)\.\.\/webfonts/g,function(t,e){return"".concat(e).concat(o,"/releases/v").concat(i,"/webfonts")}],[/(url\("?)https:\/\/kit-free([^.])*\.fontawesome\.com/g,function(t,e){return"".concat(e).concat(o)}]].forEach((function(t){var e,n=function(t){if(Array.isArray(t))return t}(e=t)||function(t,e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t)){var n=[],o=!0,r=!1,i=void 0;try{for(var c,a=t[Symbol.iterator]();!(o=(c=a.next()).done)&&(n.push(c.value),2!==n.length);o=!0);}catch(t){r=!0,i=t}finally{try{o||null==a.return||a.return()}finally{if(r)throw i}}return n}}(e)||function(t,e){if(t){if("string"==typeof t)return r(t,2);var n=Object.prototype.toString.call(t).slice(8,-1);if("Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return r(t,2)}}(e)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(),o=n[0],i=n[1];c=c.replace(o,i)})),c}}),s=u.contentFilter||function(t,e){return t},f=document.createElement("style"),d=document.createTextNode(s(a,u)),f.appendChild(d),f.media="all",u.id&&f.setAttribute("id",u.id),u&&u.detectingConflicts&&u.detectionIgnoreAttr&&f.setAttributeNode(document.createAttribute(u.detectionIgnoreAttr)),f))})).catch(a)}))}));return j.all(d)}(a,u,(function(t){_(t),"undefined"!=typeof MutationObserver&&new MutationObserver(t).observe(document,{childList:!0,subtree:!0})})):void 0})(C,P).then((function(t){t.map((function(t){try{k.insertBefore(t,U?U.nextSibling:null)}catch(e){k.appendChild(t)}})),P.detectingConflicts&&U&&_((function(){U.setAttributeNode(document.createAttribute(P.detectionIgnoreAttr));var t,e,n,o=(t=C,e=P,n=document.createElement("script"),e&&e.detectionIgnoreAttr&&n.setAttributeNode(document.createAttribute(e.detectionIgnoreAttr)),n.src=i(t,{baseFilename:"conflict-detection",fileSuffix:"js",subdir:"js",minify:t.minify.enabled}),n);document.body.appendChild(o)}))})).catch((function(t){console.error("".concat("Font Awesome Kit:"," ").concat(t))}))}}catch(t){console.error("".concat("Font Awesome Kit:"," ").concat(t))}}));