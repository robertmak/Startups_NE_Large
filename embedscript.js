(function(){
'use strict';
if(window._startupsNELoaded)return;
window._startupsNELoaded=true;

function get(){
return document.querySelectorAll('iframe[id^="startups-ne-"]');
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
w.style.cssText='width:100%!important;max-width:100%!important;margin:0!important;padding:0!important;line-height:0!important;font-size:0!important;border:0!important;outline:0!important;display:block!important;overflow:hidden!important;';

// Walk up and kill margins on all parent wrappers until we hit body or a main container
var parent=w.parentElement;
while(parent&&parent!==document.body){
var tag=parent.tagName.toLowerCase();
// Stop at main content containers
if(tag==='main'||tag==='article'||tag==='section'||parent.id==='content'||parent.id==='main'||parent.classList.contains('entry-content')||parent.classList.contains('post-content')||parent.classList.contains('page-content')||parent.classList.contains('article-content')||parent.classList.contains('w-richtext')){
break;
}
// Kill margins on intermediate wrappers (WordPress/Webflow add these)
var ps=window.getComputedStyle(parent);
if(parseInt(ps.marginTop)>0||parseInt(ps.marginBottom)>0||parseInt(ps.paddingTop)>8||parseInt(ps.paddingBottom)>8){
parent.style.cssText+=';margin-top:0!important;margin-bottom:0!important;padding-top:0!important;padding-bottom:0!important;';
}
parent=parent.parentElement;
}

// Kill margins on direct siblings
var el=w.previousElementSibling;
while(el){
var cs=window.getComputedStyle(el);
var mb=parseInt(cs.marginBottom);
if(mb>0){
el.style.marginBottom='0px';
el.style.setProperty('margin-bottom','0px','important');
}
// Only fix the closest sibling
break;
}

el=w.nextElementSibling;
while(el){
var cs2=window.getComputedStyle(el);
var mt=parseInt(cs2.marginTop);
if(mt>0){
el.style.marginTop='0px';
el.style.setProperty('margin-top','0px','important');
}
break;
}
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
f.style.setProperty('height',e.data.height+'px','important');
}
});

resize();

get().forEach(function(f){f.addEventListener('load',resize)});

var rT;
window.addEventListener('resize',function(){clearTimeout(rT);rT=setTimeout(resize,50)});

var mT;
new MutationObserver(function(){clearTimeout(mT);mT=setTimeout(resize,50)}).observe(document.body,{childList:true,subtree:true});
})();
