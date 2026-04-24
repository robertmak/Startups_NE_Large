(function(){
'use strict';
if(window._startupsNELoaded)return;
window._startupsNELoaded=true;

function getIframes(){
return document.querySelectorAll('iframe[id^="startups-ne-"]');
}

function killSpacing(el){
if(!el)return;
el.style.cssText+=';margin:0!important;padding:0!important;border:0!important;line-height:0!important;font-size:0!important;display:block!important;outline:0!important;';
}

function resize(){
var iframes=getIframes();
iframes.forEach(function(iframe){
var wrapper=iframe.parentElement;
var width=wrapper?wrapper.offsetWidth:iframe.offsetWidth;

if(width<=480){
iframe.style.cssText+=';height:520px!important;';
}else if(width<=768){
iframe.style.cssText+=';height:460px!important;';
}else{
iframe.style.cssText+=';height:300px!important;';
}

iframe.style.cssText+=';display:block!important;border:none!important;margin:0!important;padding:0!important;overflow:hidden!important;max-width:100%!important;line-height:0!important;outline:0!important;';
iframe.setAttribute('scrolling','no');

if(wrapper&&wrapper.getAttribute('data-startups-embed')==='true'){
killSpacing(wrapper);

// Also kill spacing on blog wrappers above the embed div
var parent=wrapper.parentElement;
if(parent){
var prev=wrapper.previousElementSibling;
var next=wrapper.nextElementSibling;
// Remove bottom margin from element before iframe
if(prev)prev.style.cssText+=';margin-bottom:0!important;';
// Remove top margin from element after iframe
if(next)next.style.cssText+=';margin-top:0!important;';
}
}
});
}

window.addEventListener('message',function(event){
if(!event.data||event.data.type!=='startups-ne-resize')return;
var iframe=null;
if(event.data.id)iframe=document.getElementById(event.data.id);
if(!iframe){
var iframes=getIframes();
for(var i=0;i<iframes.length;i++){
try{if(iframes[i].contentWindow===event.source){iframe=iframes[i];break;}}catch(e){}
}
}
if(iframe&&event.data.height)iframe.style.height=event.data.height+'px';
});

resize();

var resizeTimer;
window.addEventListener('resize',function(){
clearTimeout(resizeTimer);
resizeTimer=setTimeout(resize,100);
});

var mutTimer;
var observer=new MutationObserver(function(){
clearTimeout(mutTimer);
mutTimer=setTimeout(resize,100);
});
observer.observe(document.body,{childList:true,subtree:true});
})();
