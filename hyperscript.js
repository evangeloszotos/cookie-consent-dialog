parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"YTWZ":[function(require,module,exports) {
module.exports=function(e){var t=String.prototype.split,n=/()??/.exec("")[1]===e;return function(l,r,i){if("[object RegExp]"!==Object.prototype.toString.call(r))return t.call(l,r,i);var o,p,s,c,g=[],u=(r.ignoreCase?"i":"")+(r.multiline?"m":"")+(r.extended?"x":"")+(r.sticky?"y":""),x=0;r=new RegExp(r.source,u+"g");for(l+="",n||(o=new RegExp("^"+r.source+"$(?!\\s)",u)),i=i===e?-1>>>0:i>>>0;(p=r.exec(l))&&!((s=p.index+p[0].length)>x&&(g.push(l.slice(x,p.index)),!n&&p.length>1&&p[0].replace(o,function(){for(var t=1;t<arguments.length-2;t++)arguments[t]===e&&(p[t]=e)}),p.length>1&&p.index<l.length&&Array.prototype.push.apply(g,p.slice(1)),c=p[0].length,x=s,g.length>=i));)r.lastIndex===p.index&&r.lastIndex++;return x===l.length?!c&&r.test("")||g.push(""):g.push(l.slice(x)),g.length>i?g.slice(0,i):g}}();
},{}],"IVhz":[function(require,module,exports) {
var r=[].indexOf;module.exports=function(e,n){if(r)return e.indexOf(n);for(var f=0;f<e.length;++f)if(e[f]===n)return f;return-1};
},{}],"RZfE":[function(require,module,exports) {
var n=require("indexof");function t(t){var u=t.classList;if(u)return u;var i={add:o,remove:a,contains:c,toggle:function(n){return c(n)?(a(n),!1):(o(n),!0)},toString:function(){return t.className},length:0,item:function(n){return l()[n]||null}};return i;function o(t){var r=l();n(r,t)>-1||(r.push(t),f(r))}function a(t){var r=l(),e=n(r,t);-1!==e&&(r.splice(e,1),f(r))}function c(t){return n(l(),t)>-1}function l(){return r(t.className.split(" "),e)}function f(n){var r=n.length;t.className=n.join(" "),i.length=r;for(var e=0;e<n.length;e++)i[e]=n[e];delete n[r]}}function r(n,t){for(var r=[],e=0;e<n.length;e++)t(n[e])&&r.push(n[e]);return r}function e(n){return!!n}module.exports=t;
},{"indexof":"IVhz"}],"na5f":[function(require,module,exports) {

},{}],"TFY9":[function(require,module,exports) {
var e=require("browser-split"),t=require("class-list"),n="undefined"==typeof window?require("html-element"):window,r=n.document,i=n.Text;function o(){var n=[];function o(){var o=[].slice.call(arguments),s=null;function u(o){var c,p;if(null==o);else if("string"==typeof o)s?s.appendChild(c=r.createTextNode(o)):(p=e(o,/([\.#]?[^\s#.]+)/),/^\.|#/.test(p[1])&&(s=r.createElement("div")),l(p,function(e){var n=e.substring(1,e.length);e&&(s?"."===e[0]?t(s).add(n):"#"===e[0]&&s.setAttribute("id",n):s=r.createElement(e))}));else if("number"==typeof o||"boolean"==typeof o||o instanceof Date||o instanceof RegExp)s.appendChild(c=r.createTextNode(o.toString()));else if(a(o))l(o,u);else if(f(o))s.appendChild(c=o);else if(o instanceof i)s.appendChild(c=o);else if("object"==typeof o)for(var d in o)if("function"==typeof o[d])/^on\w+/.test(d)?function(e,t){s.addEventListener?(s.addEventListener(e.substring(2),t[e],!1),n.push(function(){s.removeEventListener(e.substring(2),t[e],!1)})):(s.attachEvent(e,t[e]),n.push(function(){s.detachEvent(e,t[e])}))}(d,o):(s[d]=o[d](),n.push(o[d](function(e){s[d]=e})));else if("style"===d)if("string"==typeof o[d])s.style.cssText=o[d];else for(var h in o[d])!function(e,t){if("function"==typeof t)s.style.setProperty(e,t()),n.push(t(function(t){s.style.setProperty(e,t)}));else var r=o[d][e].match(/(.*)\W+!important\W*$/);r?s.style.setProperty(e,r[1],"important"):s.style.setProperty(e,o[d][e])}(h,o[d][h]);else if("attrs"===d)for(var y in o[d])s.setAttribute(y,o[d][y]);else"data-"===d.substr(0,5)?s.setAttribute(d,o[d]):s[d]=o[d];else if("function"==typeof o){y=o();s.appendChild(c=f(y)?y:r.createTextNode(y)),n.push(o(function(e){f(e)&&c.parentElement?(c.parentElement.replaceChild(e,c),c=e):c.textContent=e}))}return c}for(;o.length;)u(o.shift());return s}return o.cleanup=function(){for(var e=0;e<n.length;e++)n[e]();n.length=0},o}var s=module.exports=o();function f(e){return e&&e.nodeName&&e.nodeType}function l(e,t){if(e.forEach)return e.forEach(t);for(var n=0;n<e.length;n++)t(e[n],n)}function a(e){return"[object Array]"==Object.prototype.toString.call(e)}s.context=o;
},{"browser-split":"YTWZ","class-list":"RZfE","html-element":"na5f"}],"n3qS":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=function(e){return"string"==typeof e&&e.length>0},t=function(e,t){return e[0]===t},r=function(r){return e(r)&&(t(r,".")||t(r,"#"))},o=function(e){return function(t){return function(o){for(var a=arguments.length,n=Array(a>1?a-1:0),i=1;i<a;i++)n[i-1]=arguments[i];return r(o)?e.apply(void 0,[t+o].concat(n)):void 0===o?e(t):e.apply(void 0,[t,o].concat(n))}}},a=["a","abbr","acronym","address","applet","area","article","aside","audio","b","base","basefont","bdi","bdo","bgsound","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","command","content","data","datalist","dd","del","details","dfn","dialog","dir","div","dl","dt","element","em","embed","fieldset","figcaption","figure","font","footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","iframe","image","img","input","ins","isindex","kbd","keygen","label","legend","li","link","listing","main","map","mark","marquee","math","menu","menuitem","meta","meter","multicol","nav","nextid","nobr","noembed","noframes","noscript","object","ol","optgroup","option","output","p","param","picture","plaintext","pre","progress","q","rb","rbc","rp","rt","rtc","ruby","s","samp","script","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","svg","table","tbody","td","template","textarea","tfoot","th","thead","time","title","tr","track","tt","u","ul","var","video","wbr","xmp"];exports.default=function(e){var t=o(e),n={TAG_NAMES:a,isSelector:r,createTag:t};return a.forEach(function(e){n[e]=t(e)}),n},module.exports=exports.default;
},{}],"Focm":[function(require,module,exports) {
"use strict";var e=t(require("hyperscript")),r=t(require("hyperscript-helpers"));function t(e){return e&&e.__esModule?e:{default:e}}window.hyperscript=e.default,window.hyperscriptHelpers=r.default;
},{"hyperscript":"TFY9","hyperscript-helpers":"n3qS"}]},{},["Focm"], null)
//# sourceMappingURL=/index.js.map