(function(){
'use strict';
if(window._startupsNELoaded)return;
window._startupsNELoaded=true;

function get(){
return document.querySelectorAll('iframe[id^="startups-ne-"]');
}

function styleFrame(f){
f.style.width='100%';
f.style.maxWidth='100%';
f.style.display='block';
f.style.border='0';
f.style.overflow='hidden';
f.setAttribute('scrolling','no');
}

function init(){
get().forEach(function(f){styleFrame(f)});
}

window.addEventListener('message',function(e){
if(!e.data||e.data.type!=='startups-ne-resize')return;
var frames=get();
frames.forEach(function(f){
try{
if(f.contentWindow===e.source){
f.style.height=e.data.height+'px';
}
}catch(err){}
});
});

init();

get().forEach(function(f){
f.addEventListener('load',function(){styleFrame(f)});
});

var mT;
new MutationObserver(function(){
clearTimeout(mT);
mT=setTimeout(init,100);
}).observe(document.body,{childList:true,subtree:true});
})();
