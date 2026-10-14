
(async function(){
var cfg=window.FBCFG,ADMIN=window.ADMINMAIL,P='https://www.gstatic.com/firebasejs/10.14.1/';
var m=await Promise.all([import(P+'firebase-app.js'),import(P+'firebase-auth.js'),import(P+'firebase-firestore.js')]),A=m[0],Au=m[1],F=m[2];
var app=A.initializeApp(cfg,'crm'),auth=Au.getAuth(app),db=F.getFirestore(app),rows=[];
var $=function(i){return document.getElementById(i)};
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function fecha(t){try{return t.toDate().toLocaleDateString('es-ES')}catch(e){return ''}}
function racha(r){return r&&r.progreso&&r.progreso.rk?r.progreso.rk.n:0}
function testsTot(r){var t=(r.progreso&&r.progreso.tests)||{},n=0;for(var k in t)n+=t[k];return n}
function lecc(r){return Object.keys((r.progreso&&r.progreso.done)||{}).length}
function bucket(e){e=+e;return e<14?'<14':e<=17?'14-17':e<=24?'18-24':e<=34?'25-34':e<=44?'35-44':e<=54?'45-54':'55+'}
function render(){var q=($('q').value||'').toLowerCase(),mk=$('mk').value,list=rows.filter(function(r){return(!q||(r.nombre+' '+r.correo+' '+(r.etiqueta||'')+' '+(r.notas||'')).toLowerCase().indexOf(q)>=0)&&(!mk||(mk==='si')===!!r.marketing)});
var ed={};rows.forEach(function(r){var b=bucket(r.edad);ed[b]=(ed[b]||0)+1});
$('st').innerHTML='<div class=card><b>'+rows.length+'</b> usuarios · <b>'+rows.filter(function(r){return r.marketing}).length+'</b> aceptan novedades · racha media <b>'+(rows.length?(rows.reduce(function(a,r){return a+racha(r)},0)/rows.length).toFixed(1):0)+'</b> · tests totales <b>'+rows.reduce(function(a,r){return a+testsTot(r)},0)+'</b><br>Edades: '+Object.keys(ed).map(function(k){return k+': '+ed[k]}).join(' · ')+'</div>';
$('tb').innerHTML=list.map(function(r){return '<tr><td>'+esc(r.nombre)+'</td><td>'+esc(r.correo)+'</td><td>'+esc(r.edad)+'</td><td>'+(r.marketing?'✅':'—')+'</td><td>'+fecha(r.creado)+'</td><td>'+racha(r)+'</td><td>'+lecc(r)+'</td><td>'+testsTot(r)+'</td><td><input data-id="'+r.id+'" data-f="etiqueta" value="'+esc(r.etiqueta)+'" size=10></td><td><input data-id="'+r.id+'" data-f="notas" value="'+esc(r.notas)+'" size=24></td></tr>'}).join('');
document.querySelectorAll('#tb input').forEach(function(i){i.onchange=function(){var o={};o[i.dataset.f]=i.value;F.setDoc(F.doc(db,'usuarios',i.dataset.id),o,{merge:true});var r=rows.find(function(x){return x.id===i.dataset.id});if(r)r[i.dataset.f]=i.value}})}
async function load(){var s=await F.getDocs(F.collection(db,'usuarios'));rows=s.docs.map(function(d){var o=d.data();o.id=d.id;return o}).filter(function(r){return r.correo});rows.sort(function(a,b){return racha(b)-racha(a)});$('app').style.display='block';$('lg').style.display='none';render()}
function csv(only){var l=rows.filter(function(r){return !only||r.marketing});var h=['nombre','correo','edad','novedades','alta','racha','lecciones','tests','etiqueta','notas'];var t=[h.join(',')].concat(l.map(function(r){return [r.nombre,r.correo,r.edad,r.marketing?'si':'no',fecha(r.creado),racha(r),lecc(r),testsTot(r),r.etiqueta||'',r.notas||''].map(function(x){return '"'+String(x==null?'':x).replace(/"/g,'""')+'"'}).join(',')}));var b=new Blob(['\ufeff'+t.join('\n')],{type:'text/csv'}),a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=only?'usuarios-con-permiso-de-novedades.csv':'usuarios.csv';a.click()}
$('q').oninput=render;$('mk').onchange=render;$('c1').onclick=function(){csv(false)};$('c2').onclick=function(){csv(true)};
$('lg').onclick=function(){Au.signInWithPopup(auth,new Au.GoogleAuthProvider()).catch(function(){$('msg').textContent='No se pudo iniciar sesión.'})};
Au.onAuthStateChanged(auth,function(u){if(!u)return;if(u.email!==ADMIN){$('msg').textContent='Esta cuenta no tiene acceso al CRM.';Au.signOut(auth);return}load().catch(function(e){$('msg').textContent='Error al cargar: '+e.message})});
})();
