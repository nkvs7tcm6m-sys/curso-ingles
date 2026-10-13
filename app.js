
var AUD=null;fetch(window.ROOT+'audio/index.json').then(function(r){return r.json()}).then(function(j){AUD=j}).catch(function(){});

function LS(k,v){try{if(v===undefined)return JSON.parse(localStorage.getItem(k));localStorage.setItem(k,JSON.stringify(v))}catch(e){return null}}
function ckSet(v){LS('ck',v);document.getElementById('ck').style.display='none';loadAds()}
function loadAds(){if(LS('ck')==='yes'&&window.ADSENSE&&!window.__ads){window.__ads=1;var s=document.createElement('script');s.async=1;s.src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client='+window.ADSENSE;s.crossOrigin='anonymous';document.head.appendChild(s);document.querySelectorAll('[data-ad]').forEach(function(d){d.innerHTML='<ins class="adsbygoogle" style="display:block" data-ad-client="'+window.ADSENSE+'" data-ad-format="auto" data-full-width-responsive="true"></ins>';(window.adsbygoogle=window.adsbygoogle||[]).push({})})}}
if(!LS('ck'))document.getElementById('ck').style.display='block';loadAds();
function done(){return LS('done')||{}}
function today(){var d=new Date();return d.getFullYear()+'-'+('0'+(d.getMonth()+1)).slice(-2)+'-'+('0'+d.getDate()).slice(-2)}
function yest(){var d=new Date(Date.now()-864e5);return d.getFullYear()+'-'+('0'+(d.getMonth()+1)).slice(-2)+'-'+('0'+d.getDate()).slice(-2)}
function rk(){var r=LS('rk')||{last:'',n:0,hoy:0};if(r.last!==today()){if(r.last&&r.last!==yest())r.n=0;r.hoy=0}return r}
function bump(){var r=rk(),t=today();if(r.last!==t){r.n=(r.last===yest()?r.n:0)+1;r.last=t;r.hoy=0}r.hoy++;LS('rk',r);showRk();if(r.hoy===3)toast('🎯 ¡Meta del día cumplida! Racha: '+r.n+' día'+(r.n>1?'s':''))}
function showRk(){var e=document.getElementById('rk');if(!e)return;var r=rk();e.innerHTML='🔥 Racha: <b>'+r.n+'</b> · Hoy: <b>'+Math.min(r.hoy,3)+'/3</b> tests'}
function errs(){return LS('err')||[]}
function qk(q){return q.p+'|'+q.say+'|'+q.o.join('/')}
function addErr(q){var a=errs().filter(function(x){return qk(x)!==qk(q)});a.unshift(q);LS('err',a.slice(0,80))}
function delErr(q){LS('err',errs().filter(function(x){return qk(x)!==qk(q)}))}
document.addEventListener('DOMContentLoaded',function(){showRk();var c=document.getElementById('cont'),l=LS('last');if(c&&l)c.innerHTML='<a class="btn" href="'+window.ROOT+'leccion/'+('0'+l).slice(-2)+'.html">▶ Continuar donde lo dejaste (lección '+(l>20?l-20:l)+')</a>'});
function markDone(id){var d=done();d[id]=1;LS('done',d)}
function speak(t,l){try{if(window.CANSPEAK&&!window.CANSPEAK()){toast('🔇 Hay un vídeo sonando. El audio del test se activa al pausar o silenciar el vídeo.');return}if(AUD&&AUD[t]){if(window.__a)window.__a.pause();window.__a=new Audio(window.ROOT+'audio/'+AUD[t]);window.__a.playbackRate=LS('slow')?0.75:1;window.__a.play();return}}catch(e){}}
function toast(m){var d=document.getElementById('toast');if(!d){d=document.createElement('div');d.id='toast';d.style.cssText='position:fixed;left:50%;bottom:70px;transform:translateX(-50%);background:#222;color:#fff;padding:12px 18px;border-radius:12px;z-index:20;max-width:90%;text-align:center;font-size:15px';document.body.appendChild(d)}d.textContent=m;d.style.display='block';clearTimeout(window.__t);window.__t=setTimeout(function(){d.style.display='none'},3500)}
function shuffle(a){for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t}return a}
function runQuiz(el,Q,opt){opt=opt||{};var i=0,sc=0,lock=0;function show(){if(i>=Q.length){var p=Math.round(100*sc/Q.length);el.innerHTML='<h2>Resultado: '+sc+' / '+Q.length+' ('+p+'%)</h2><p>'+(p>=70?'🎉 ¡Aprobado!':'💪 Repásalo y vuelve a intentarlo.')+'</p>'+(opt.noRetry?'':'<button class="btn" onclick="location.reload()">Repetir</button>');if(opt.onEnd)opt.onEnd(p);return}
var q=Q[i];lock=0;var h='<div class="bar"><i style="width:'+(100*i/Q.length)+'%"></i></div><p><small>Pregunta '+(i+1)+' de '+Q.length+(q.tag?' · '+q.tag:'')+'</small></p><h2>'+(q.emo||'')+' '+(q.p||'')+'</h2>'+(q.h?'<p><small>'+q.h+'</small></p>':'')+(q.say&&q.listen?'<button class="btn sec" onclick="speak(Q['+i+'].say)">🔊 Escuchar</button>':'');
q.o.forEach(function(o,k){h+='<button class="opt" data-k="'+k+'">'+o+'</button>'});el.innerHTML=h;if(q.listen)speak(q.say);
el.querySelectorAll('.opt').forEach(function(b){b.onclick=function(){if(lock)return;lock=1;var k=+b.dataset.k;if(opt.onAns)opt.onAns(q,k===q.ok);if(k===q.ok){sc++;b.classList.add('ok')}else{b.classList.add('bad');el.querySelectorAll('.opt')[q.ok].classList.add('ok')}if(q.say&&!q.listen)speak(q.say);setTimeout(function(){i++;show()},1300)}})}window.Q=Q;show()}
