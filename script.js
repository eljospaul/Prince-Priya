const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Loader */
addEventListener('load',()=>setTimeout(()=>$('#loader').classList.add('done'),700));

/* Envelope transition + music from the seal click */
$('#open').addEventListener('click',async()=>{
  const audio=$('#audio');
  try{
    audio.volume=.7;
    if(!audio.currentSrc || audio.readyState===0){
      const fallback='https://eljospaul.github.io/Prince-Priya/assets/ambient.mp3';
      audio.src=fallback;
      audio.load();
    }
    await audio.play();
    $('#sound').classList.add('playing');
    $('#sound').innerHTML='♫ <span>music on</span>';
  }catch(e){console.log('Audio could not autoplay:',e)}
  $('#open').classList.add('opened');
  setTimeout(()=>{
    $('#prelude').style.transition='opacity 1.1s cubic-bezier(.16,1,.3,1),transform 1.1s cubic-bezier(.16,1,.3,1)';
    $('#prelude').style.opacity='0';$('#prelude').style.transform='scale(1.045)';
    $('#invitation').classList.add('on');document.body.classList.remove('locked');$('.topbar').classList.add('visible');
    setTimeout(()=>$('#prelude').style.display='none',1100);
  },650);
});

/* Golden particles */
const canvas=$('#particles'),ctx=canvas.getContext('2d');let W,H,D,pts=[];
function resize(){D=Math.min(devicePixelRatio||1,2);W=innerWidth;H=innerHeight;canvas.width=W*D;canvas.height=H*D;canvas.style.width=W+'px';canvas.style.height=H+'px';ctx.setTransform(D,0,0,D,0,0)}
function seed(){pts=Array.from({length:Math.min(135,Math.floor(innerWidth/7))},()=>({x:Math.random()*W,y:Math.random()*H,r:.35+Math.random()*1.5,a:.12+Math.random()*.65,v:.15+Math.random()*.55,phase:Math.random()*6.28}))}
function particles(t=0){ctx.clearRect(0,0,W,H);for(const p of pts){p.y-=p.v;if(p.y<-5)p.y=H+5;p.x+=Math.sin(t*.00035+p.phase)*.12;const glow=Math.sin(t*.002+p.phase)*.35+.65;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle=`rgba(224,190,112,${p.a*glow})`;ctx.fill()}if(!reduce)requestAnimationFrame(particles)}
addEventListener('resize',()=>{resize();seed()});resize();seed();particles();

/* Countdown */
const wedding=new Date('2026-10-16T17:30:00+05:30');
function pad(n){return String(Math.max(0,n)).padStart(2,'0')}
function countdown(){let s=Math.max(0,Math.floor((wedding-Date.now())/1000));$('#days').textContent=pad(Math.floor(s/86400));$('#hours').textContent=pad(s%86400/3600|0);$('#mins').textContent=pad(s%3600/60|0);$('#secs').textContent=pad(s%60)}
countdown();setInterval(countdown,1000);

/* Reveals */
const observer=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.12});
$$('.reveal').forEach(x=>observer.observe(x));

/* Hero parallax */
const hero=$('.hero'),hbg=$('.hero-bg'),photo=$('.hero-photo-wrap'),hc=$('.hero-center');
function heroScroll(){
  if(reduce)return;
  const r=hero.getBoundingClientRect(),p=Math.max(0,Math.min(1,-r.top/Math.max(1,hero.offsetHeight-innerHeight)));
  hbg.style.transform=`translate3d(0,${p*-6}%,0) scale(1.06)`;
  photo.style.transform=`translate3d(0,${p*10}%,0) rotateX(${p*2}deg) scale(${1+p*.03})`;
  hc.style.transform=`translate3d(0,${p*55}px,0) scale(${1-p*.08})`;
}
addEventListener('scroll',heroScroll,{passive:true});heroScroll();

/* Sticky story slides */
const story=$('.story'),scenes=$$('.scene'),storyNo=$('#storyNo'),storyBar=$('.story-line i'),storyPhoto=$('.story-photo');
function storyScroll(){
  const r=story.getBoundingClientRect(),max=Math.max(1,story.offsetHeight-innerHeight),p=Math.max(0,Math.min(1,-r.top/max));
  const idx=Math.min(2,Math.floor(p*3));
  scenes.forEach((s,i)=>s.classList.toggle('active',i===idx));
  storyNo.textContent=String(idx+1).padStart(2,'0');storyBar.style.height=`${Math.max(25,p*100)}%`;
  if(!reduce)storyPhoto.style.transform=`scale(${1.12+p*.08}) translate3d(0,${p*-3}%,0)`;
}
addEventListener('scroll',storyScroll,{passive:true});storyScroll();

/* Film zoom */
const film=$('.film'),filmImage=$('.film-image');
function filmScroll(){if(reduce)return;const r=film.getBoundingClientRect(),max=Math.max(1,film.offsetHeight-innerHeight),p=Math.max(0,Math.min(1,-r.top/max));filmImage.style.transform=`translate3d(0,${(p-.5)*-8}%,0) scale(${1.25-p*.2})`;$('.film-copy').style.transform=`translateY(${(p-.5)*-25}px)`}
addEventListener('scroll',filmScroll,{passive:true});filmScroll();

/* Sound control */
$('#sound').addEventListener('click',async()=>{const a=$('#audio');try{if(a.paused){await a.play();$('#sound').classList.add('playing');$('#sound').innerHTML='♫ <span>music on</span>'}else{a.pause();$('#sound').classList.remove('playing');$('#sound').innerHTML='♫ <span>music off</span>'}}catch(e){console.log('Audio error:',e)}});

/* Desktop depth */
if(!reduce&&matchMedia('(pointer:fine)').matches){hero.addEventListener('pointermove',e=>{const r=hero.getBoundingClientRect(),x=e.clientX/r.width-.5,y=e.clientY/r.height-.5;photo.style.transform=`translate3d(${x*12}px,${y*7}px,0) rotateX(${y*-3}deg) rotateY(${x*3}deg)`;$('.hl1').style.transform=`translate3d(${x*-20}px,${y*-15}px,0)`;$('.hl2').style.transform=`translate3d(${x*16}px,${y*12}px,0)`})}
