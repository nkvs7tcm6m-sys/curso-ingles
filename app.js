
var AUD=null;fetch(window.ROOT+'audio/index.json').then(function(r){return r.json()}).then(function(j){AUD=j}).catch(function(){});

function LS(k,v){try{if(v===undefined)return JSON.parse(localStorage.getItem(k));localStorage.setItem(k,JSON.stringify(v))}catch(e){return null}}
function ckSet(v){LS('ck',v);document.getElementById('ck').style.display='none';loadAds()}
function loadAds(){if(LS('ck')==='yes'&&window.ADSENSE&&!window.__ads){window.__ads=1;var s=document.createElement('script');s.async=1;s.src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client='+window.ADSENSE;s.crossOrigin='anonymous';document.head.appendChild(s);document.querySelectorAll('[data-ad]').forEach(function(d){d.innerHTML='<ins class="adsbygoogle" style="display:block" data-ad-client="'+window.ADSENSE+'" data-ad-format="auto" data-full-width-responsive="true"></ins>';(window.adsbygoogle=window.adsbygoogle||[]).push({})})}}
if(!LS('ck'))document.getElementById('ck').style.display='block';loadAds();
function done(){return LS('done')||{}}
function markDone(id){var d=done();d[id]=1;LS('done',d)}
function speak(t,l){try{if(AUD&&AUD[t]){speechSynthesis.cancel();if(window.__a)window.__a.pause();window.__a=new Audio(window.ROOT+'audio/'+AUD[t]);window.__a.play();return}var u=new SpeechSynthesisUtterance(t);u.lang=l||'en-US';u.rate=.9;speechSynthesis.cancel();speechSynthesis.speak(u)}catch(e){}}
function shuffle(a){for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t}return a}
function runQuiz(el,Q,opt){opt=opt||{};var i=0,sc=0,lock=0;function show(){if(i>=Q.length){var p=Math.round(100*sc/Q.length);el.innerHTML='<h2>Resultado: '+sc+' / '+Q.length+' ('+p+'%)</h2><p>'+(p>=70?'🎉 ¡Aprobado!':'💪 Repásalo y vuelve a intentarlo.')+'</p><button class="btn" onclick="location.reload()">Repetir</button>';if(opt.onEnd)opt.onEnd(p);return}
var q=Q[i];lock=0;var h='<div class="bar"><i style="width:'+(100*i/Q.length)+'%"></i></div><p><small>Pregunta '+(i+1)+' de '+Q.length+(q.tag?' · '+q.tag:'')+'</small></p><h2>'+(q.emo||'')+' '+(q.p||'')+'</h2>'+(q.h?'<p><small>'+q.h+'</small></p>':'')+(q.say&&q.listen?'<button class="btn sec" onclick="speak(Q['+i+'].say)">🔊 Escuchar</button>':'');
q.o.forEach(function(o,k){h+='<button class="opt" data-k="'+k+'">'+o+'</button>'});el.innerHTML=h;if(q.listen)speak(q.say);
el.querySelectorAll('.opt').forEach(function(b){b.onclick=function(){if(lock)return;lock=1;var k=+b.dataset.k;if(k===q.ok){sc++;b.classList.add('ok')}else{b.classList.add('bad');el.querySelectorAll('.opt')[q.ok].classList.add('ok')}if(q.say&&!q.listen)speak(q.say);setTimeout(function(){i++;show()},1300)}})}window.Q=Q;show()}
