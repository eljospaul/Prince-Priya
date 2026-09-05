const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Loader */
addEventListener("load", () => setTimeout(() => $("#loader").classList.add("done"), 700));

/* Envelope transition + start music */
$("#open").addEventListener("click", async () => {

  /* Start music immediately from the user's seal click */
  const audio = $("#audio");

  try {
    audio.volume = 0.7;
    await audio.play();
    $("#sound").classList.add("playing");
    $("#sound").innerHTML = "♫ <span>music on</span>";
  } catch (err) {
    console.log("Audio could not autoplay:", err);
  }

  /* Open the envelope */
  $("#open").classList.add("opened");

  setTimeout(() => {
    $("#prelude").style.transition =
      "opacity 1.1s cubic-bezier(.16,1,.3,1), transform 1.1s cubic-bezier(.16,1,.3,1)";

    $("#prelude").style.opacity = "0";
    $("#prelude").style.transform = "scale(1.045)";

    $("#invitation").classList.add("on");
    document.body.classList.remove("locked");
    $(".topbar").classList.add("visible");

    setTimeout(() => {
      $("#prelude").style.display = "none";
    }, 1100);

  }, 650);
});

/* Golden particle field */
const canvas = $("#particles"), ctx = canvas.getContext("2d"); let W, H, D, pts = [];
function resize() { D = Math.min(devicePixelRatio || 1, 2); W = innerWidth; H = innerHeight; canvas.width = W * D; canvas.height = H * D; canvas.style.width = W + "px"; canvas.style.height = H + "px"; ctx.setTransform(D, 0, 0, D, 0, 0) }
function seed() { pts = Array.from({ length: Math.min(150, Math.floor(innerWidth / 7)) }, () => ({ x: Math.random() * W, y: Math.random() * H, r: .35 + Math.random() * 1.5, a: .12 + Math.random() * .65, v: .15 + Math.random() * .55, phase: Math.random() * 6.28 })) }
function particles(t = 0) { ctx.clearRect(0, 0, W, H); for (const p of pts) { p.y -= p.v; if (p.y < -5) p.y = H + 5; p.x += Math.sin(t * .00035 + p.phase) * .12; let glow = Math.sin(t * .002 + p.phase) * .35 + .65; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fillStyle = `rgba(224,190,112,${p.a * glow})`; ctx.fill() } if (!reduce) requestAnimationFrame(particles) }
addEventListener("resize", () => { resize(); seed() }); resize(); seed(); particles();

/* Countdown */
const wedding = new Date("2026-10-16T17:30:00+05:30");
function pad(n) { return String(Math.max(0, n)).padStart(2, "0") }
function countdown() { let s = Math.max(0, Math.floor((wedding - Date.now()) / 1000)); $("#days").textContent = pad(Math.floor(s / 86400)); $("#hours").textContent = pad(s % 86400 / 3600 | 0); $("#mins").textContent = pad(s % 3600 / 60 | 0); $("#secs").textContent = pad(s % 60) }
countdown(); setInterval(countdown, 1000);

/* Reveals */
const observer = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); observer.unobserve(e.target) } }), { threshold: .12 });
$$(".reveal").forEach(x => observer.observe(x));

/* Hero depth + cursor */
const hero = $(".hero"), gbg = $(".hero-bg"), gp = $(".groom"), bp = $(".bride"), hc = $(".hero-center");
function heroScroll() {
  if (reduce) return;
  let r = hero.getBoundingClientRect(), p = Math.max(0, Math.min(1, -r.top / Math.max(1, hero.offsetHeight - innerHeight)));
  gbg.style.transform = `translate3d(0,${p * -6}%,0) scale(1.06)`;
  gp.style.transform = `translate3d(${-p * 9}vw,${p * 10}px,0) rotate(${-4 - p * 3}deg)`;
  bp.style.transform = `translate3d(${p * 9}vw,${p * 10}px,0) rotate(${4 + p * 3}deg)`;
  hc.style.transform = `translate3d(0,${p * 45}px,0) scale(${1 - p * .08})`;
}
addEventListener("scroll", heroScroll, { passive: true }); heroScroll();

/* Convergence */
const cs = $(".convergence"), cg = $(".con-groom"), cb = $(".con-bride"), cc = $(".con-couple"), ct = $(".convergence-title");
function convergence() {
  if (reduce) return;
  let r = cs.getBoundingClientRect(), max = Math.max(1, cs.offsetHeight - innerHeight), p = Math.max(0, Math.min(1, -r.top / max));
  $(".convergence-bg").style.transform = `translate3d(0,${(p - .5) * -10}%,0) scale(1.08)`;
  cg.style.transform = `translate3d(${p * 42}vw,${-50 - p * 3}%,0) rotate(${-6 + p * 7}deg)`;
  cb.style.transform = `translate3d(${-p * 42}vw,${-50 - p * 3}%,0) rotate(${6 - p * 7}deg)`;
  cc.style.opacity = Math.min(1, p * 1.7); cc.style.transform = `translate(-50%,-50%) scale(${.55 + p * .48})`;
  ct.style.opacity = String(Math.max(0, 1 - p * 2.3)); ct.style.transform = `translateY(${-p * 20}px)`;
  $(".con-caption").style.opacity = String(Math.max(0, (p - .62) * 2.6));
}
addEventListener("scroll", convergence, { passive: true }); convergence();

/* Sticky storyboard */
const story = $(".story"), scenes = $$(".scene"), storyNo = $("#storyNo"), storyBar = $(".story-line i");
function storyScroll() {
  let r = story.getBoundingClientRect(), max = Math.max(1, story.offsetHeight - innerHeight), p = Math.max(0, Math.min(1, -r.top / max));
  let idx = Math.min(3, Math.floor(p * 4)); scenes.forEach((s, i) => s.classList.toggle("active", i === idx)); storyNo.textContent = String(idx + 1).padStart(2, "0"); storyBar.style.height = `${Math.max(25, p * 100)}%`;
}
addEventListener("scroll", storyScroll, { passive: true }); storyScroll();

/* Film reveal */
const film = $(".film"), filmImage = $(".film-image");
function filmScroll() {
  if (reduce) return;
  let r = film.getBoundingClientRect(), max = Math.max(1, film.offsetHeight - innerHeight), p = Math.max(0, Math.min(1, -r.top / max));
  filmImage.style.transform = `translate3d(0,${(p - .5) * -8}%,0) scale(${1.25 - p * .2})`;
  $(".film-copy").style.transform = `translateY(${(p - .5) * -25}px)`;
}
addEventListener("scroll", filmScroll, { passive: true }); filmScroll();

/* Memory cards fly toward camera */
const mem = $(".memories"), cards = $$(".reel-card");
function memoryScroll() {
  if (reduce) return;
  let r = mem.getBoundingClientRect(), max = Math.max(1, mem.offsetHeight - innerHeight), p = Math.max(0, Math.min(1, -r.top / max));
  cards.forEach((c, i) => {
    const start = i * .15, q = Math.max(0, Math.min(1, (p - start) / .38));
    const side = i % 2 ? 1 : -1;
    c.style.transform = `translate3d(${side * (1 - q) * 35}vw,${(0.5 - q) * 70}vh,${q * 40}px) rotate(${side * (1 - q) * 9}deg) scale(${.72 + q * .28})`;
    c.style.opacity = q < .02 ? 0 : 1;
  });
  $(".reel-progress b").textContent = String(Math.min(5, Math.floor(p * 5) + 1)).padStart(2, "0");
}
addEventListener("scroll", memoryScroll, { passive: true }); memoryScroll();

/* Sound control */
$("#sound").addEventListener("click", async () => {
  const audio = $("#audio");

  try {
    if (audio.paused) {
      await audio.play();
      $("#sound").classList.add("playing");
      $("#sound").innerHTML = "♫ <span>music on</span>";
    } else {
      audio.pause();
      $("#sound").classList.remove("playing");
      $("#sound").innerHTML = "♫ <span>music off</span>";
    }
  } catch (err) {
    console.log("Audio error:", err);
  }
});

/* Desktop pointer parallax */
if (!reduce && matchMedia("(pointer:fine)").matches) {
  hero.addEventListener("pointermove", e => {
    const r = hero.getBoundingClientRect(), x = e.clientX / r.width - .5, y = e.clientY / r.height - .5;
    hc.style.transform = `translate3d(${x * 10}px,${y * 6}px,0)`;
    $(".hl1").style.transform = `translate3d(${x * -20}px,${y * -15}px,0)`;
    $(".hl2").style.transform = `translate3d(${x * 16}px,${y * 12}px,0)`;
  });
}
