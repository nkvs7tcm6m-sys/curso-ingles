
(function(){
var tests=null,player=null,first=true;
function cnt(){return (LS('tests')||{})[LES]||0}
function setCnt(c){var t=LS('tests')||{};t[LES]=c;LS('tests',t);if(c>=3)markDone(LES);showCnt();gate()}
function showCnt(){var e=document.getElementById('cnt');if(e)e.innerHTML='Tests completados en esta lección: <b>'+cnt()+'</b> · Hay '+(tests?tests.length:12)+' tests distintos de 10 preguntas. Haz los que quieras: cuantos más, mejor lo aprendes.'}
function gate(){var g=document.getElementById('gate'),c=cnt();if(c>=3){g.innerHTML='<b>✅ Lección desbloqueada.</b> Has hecho '+c+' tests. <p><a class="btn" href="'+NXT+'">Siguiente lección →</a></p>'}else{g.innerHTML='<b>🔒 Siguiente lección bloqueada.</b> Completa 3 tests de 10 preguntas (llevas '+c+'/3). Mientras tanto puedes seguir viendo el vídeo.<p><button class="btn" disabled>Siguiente lección →</button></p>'}}
window.CANSPEAK=function(){var p=window.YTP||player;if(!p||!p.getPlayerState)return true;try{var s=p.getPlayerState();return !((s===1||s===3)&&!p.isMuted())}catch(e){return true}};
setInterval(function(){if(!window.CANSPEAK()&&window.__a&&!window.__a.paused)window.__a.pause()},300);
function startTest(){var el=document.getElementById('q');var i=cnt()%tests.length;runQuiz(el,tests[i],{noRetry:1,onEnd:function(p){setCnt(cnt()+1);var d=document.createElement('p');d.innerHTML='<button class="btn" id="nx">Siguiente test →</button> <small>Otro test distinto, sin parar el vídeo.</small>';el.appendChild(d);document.getElementById('nx').onclick=startTest}})}
fetch('../datos/leccion-'+('0'+LES).slice(-2)+'.json').then(function(r){return r.json()}).then(function(j){tests=j;showCnt();startTest()});
showCnt();gate();
if(VIDID){var s=document.createElement('script');s.src='https://www.youtube.com/iframe_api';document.head.appendChild(s);
window.onYouTubeIframeAPIReady=function(){player=window.YTPREAL=new YT.Player('yt',{videoId:VIDID,playerVars:{rel:0,playsinline:1,modestbranding:1},events:{onStateChange:function(e){if(e.data===1){if(first){first=false;try{player.unMute();player.setVolume(100)}catch(x){}}if(window.__a)window.__a.pause()}}}})}}
})();
