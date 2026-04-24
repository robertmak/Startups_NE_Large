(function(){
'use strict';
if(window._startupsNELoaded)return;
window._startupsNELoaded=true;

function get(){
return document.querySelectorAll('iframe[id^="startups-ne-"]');
}

function kill(el){
if(!el)return;
el.style.cssText+=';margin:0!important;padding:0!important;border:0!important;line-height:0!important;font-size:0!important;display:block!important;outline:0!important;';
}

function resize(){
get().forEach(function(f){
var w=f.parentElement;
var width=w?w.offsetWidth:f.offsetWidth;
var h;

if(width<=480)h=520;
else if(width<=768)h=460;
else h=300;

f.style.cssText='display:block!important;border:none!important;margin:0!important;padding:0!important;overflow:hidden!important;max-width:100%!important;min-width:100%!important;line-height:0!important;outline:0!important;width:100%!important;height:'+h+'px!important;';
f.setAttribute('scrolling','no');

if(w&&w.getAttribute('data-startups-embed')==='true'){
kill(w);
var prev=w.previousElementSibling;
var next=w.nextElementSibling;
if(prev)prev.style.cssText+=';margin-bottom:0!important;padding-bottom:0!important;';
if(next)next.style.cssText+=';margin-top:0!important;padding-top:0!important;';
}
});
}

window.addEventListener('message',function(e){
if(!e.data||e.data.type!=='startups-ne-resize')return;
var f=null;
if(e.data.id)f=document.getElementById(e.data.id);
if(!f){
var all=get();
for(var i=0;i<all.length;i++){
try{if(all[i].contentWindow===e.source){f=all[i];break;}}catch(err){}
}
}
if(f&&e.data.height){
f.style.height=e.data.height+'px!important';
}
});

resize();

get().forEach(function(f){
f.addEventListener('load',resize);
});

var rT;
window.addEventListener('resize',function(){
clearTimeout(rT);
rT=setTimeout(resize,50);
});

var mT;
new MutationObserver(function(){
clearTimeout(mT);
mT=setTimeout(resize,50);
}).observe(document.body,{childList:true,subtree:true});
})();
