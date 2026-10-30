const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* =========================
   Loader
========================= */
window.addEventListener('load', () => {
  const loader = $('#loader');
  if (loader) {
    setTimeout(() => loader.classList.add('done'), 700);
  }
});


/* =========================
   Envelope + Music
========================= */
const openButton = $('#open');

if (openButton) {
  openButton.addEventListener('click', () => {

    /* Start music WITHOUT waiting for it */
    const audio = $('#audio');

    if (audio) {
      try {
        audio.volume = 0.7;

        /*
          Set the music source only after the user clicks.
          This prevents the browser from requesting ambient.mp3
          when the page first loads.
        */
        if (!audio.src || audio.src === window.location.href) {
          audio.src =
            'https://eljospaul.github.io/Prince-Priya/v1/assets/ambient.mp3';
        }

        const playPromise = audio.play();

        if (playPromise) {
          playPromise
            .then(() => {
              const sound = $('#sound');

              if (sound) {
                sound.classList.add('playing');
                sound.innerHTML = '♫ <span>music on</span>';
              }
            })
            .catch(err => {
              console.log('Music could not start:', err);
            });
        }

      } catch (err) {
        console.log('Audio error:', err);
      }
    }


    /* Start envelope animation immediately */
    openButton.classList.add('opened');


    /* Reveal invitation */
    setTimeout(() => {

      const prelude = $('#prelude');
      const invitation = $('#invitation');
      const topbar = $('.topbar');

      if (prelude) {
        prelude.style.transition =
          'opacity .8s cubic-bezier(.16,1,.3,1), ' +
          'transform .8s cubic-bezier(.16,1,.3,1)';

        prelude.style.opacity = '0';
        prelude.style.transform = 'scale(1.025)';
      }

      if (invitation) {
        invitation.classList.add('on');
      }

      document.body.classList.remove('locked');

      if (topbar) {
        topbar.classList.add('visible');
      }

      setTimeout(() => {
        if (prelude) {
          prelude.style.display = 'none';
        }
      }, 800);

    }, 450);

  });
}


/* =========================
   Golden Particles
========================= */
const canvas = $('#particles');

let ctx = null;
let W = 0;
let H = 0;
let D = 1;
let pts = [];

if (canvas) {

  ctx = canvas.getContext('2d');

  function resize() {
    D = Math.min(window.devicePixelRatio || 1, 2);

    W = window.innerWidth;
    H = window.innerHeight;

    canvas.width = W * D;
    canvas.height = H * D;

    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';

    ctx.setTransform(D, 0, 0, D, 0, 0);
  }


  function seed() {
    pts = Array.from(
      {
        length: Math.min(
          110,
          Math.floor(window.innerWidth / 8)
        )
      },
      () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        r: 0.35 + Math.random() * 1.5,
        a: 0.12 + Math.random() * 0.65,
        v: 0.15 + Math.random() * 0.55,
        phase: Math.random() * 6.28
      })
    );
  }


  function particles(t = 0) {

    if (!ctx) return;

    ctx.clearRect(0, 0, W, H);

    for (const p of pts) {

      p.y -= p.v;

      if (p.y < -5) {
        p.y = H + 5;
      }

      p.x += Math.sin(
        t * 0.00035 + p.phase
      ) * 0.12;

      const glow =
        Math.sin(
          t * 0.002 + p.phase
        ) * 0.35 + 0.65;

      ctx.beginPath();

      ctx.arc(
        p.x,
        p.y,
        p.r,
        0,
        Math.PI * 2
      );

      ctx.fillStyle =
        `rgba(224,190,112,${p.a * glow})`;

      ctx.fill();
    }

    if (!reduce) {
      requestAnimationFrame(particles);
    }
  }


  window.addEventListener('resize', () => {
    resize();
    seed();
  });

  resize();
  seed();
  particles();
}


/* =========================
   Countdown
========================= */
const wedding =
  new Date('2026-10-16T17:30:00+05:30');

function pad(n) {
  return String(Math.max(0, n)).padStart(2, '0');
}


function countdown() {

  const days = $('#days');
  const hours = $('#hours');
  const mins = $('#mins');
  const secs = $('#secs');

  /* Don't crash if countdown isn't on the page */
  if (!days || !hours || !mins || !secs) return;

  let s = Math.max(
    0,
    Math.floor(
      (wedding - Date.now()) / 1000
    )
  );

  days.textContent =
    pad(Math.floor(s / 86400));

  hours.textContent =
    pad(Math.floor((s % 86400) / 3600));

  mins.textContent =
    pad(Math.floor((s % 3600) / 60));

  secs.textContent =
    pad(s % 60);
}

countdown();
setInterval(countdown, 1000);


/* =========================
   Scroll Reveals
========================= */
const revealElements = $$('.reveal');

if ('IntersectionObserver' in window) {

  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add('visible');

            observer.unobserve(entry.target);
          }

        });

      },
      {
        threshold: 0.12
      }
    );

  revealElements.forEach(el => {
    observer.observe(el);
  });

} else {

  revealElements.forEach(el => {
    el.classList.add('visible');
  });

}


/* =========================
   Hero Parallax
========================= */
const hero = $('.hero');
const hbg = $('.hero-bg');
const photo = $('.hero-photo-wrap');
const hc = $('.hero-center');

function heroScroll() {

  if (reduce || !hero) return;

  const r =
    hero.getBoundingClientRect();

  const max =
    Math.max(
      1,
      hero.offsetHeight -
      window.innerHeight
    );

  const p =
    Math.max(
      0,
      Math.min(
        1,
        -r.top / max
      )
    );

  if (hbg) {
    hbg.style.transform =
      `translate3d(0,${p * -6}%,0) scale(1.06)`;
  }

  if (photo) {
    photo.style.transform =
      `translate3d(0,${p * 10}%,0)
       rotateX(${p * 2}deg)
       scale(${1 + p * 0.03})`;
  }

  if (hc) {
    hc.style.transform =
      `translate3d(0,${p * 55}px,0)
       scale(${1 - p * 0.08})`;
  }
}


/* =========================
   Sticky Story
========================= */
const story = $('.story');
const scenes = $$('.scene');
const storyNo = $('#storyNo');
const storyBar = $('.story-line i');
const storyPhoto = $('.story-photo');


function storyScroll() {

  /*
    IMPORTANT:
    If .story doesn't exist, simply stop.
    This fixes your exact:
    "null is not an object"
    error.
  */
  if (!story) return;

  const r =
    story.getBoundingClientRect();

  const max =
    Math.max(
      1,
      story.offsetHeight -
      window.innerHeight
    );

  const p =
    Math.max(
      0,
      Math.min(
        1,
        -r.top / max
      )
    );

  const idx =
    Math.min(
      2,
      Math.floor(p * 3)
    );


  scenes.forEach((scene, i) => {

    scene.classList.toggle(
      'active',
      i === idx
    );

  });


  if (storyNo) {
    storyNo.textContent =
      String(idx + 1).padStart(2, '0');
  }


  if (storyBar) {
    storyBar.style.height =
      `${Math.max(25, p * 100)}%`;
  }


  if (!reduce && storyPhoto) {

    storyPhoto.style.transform =
      `scale(${1.12 + p * 0.08})
       translate3d(0,${p * -3}%,0)`;

  }
}


/* =========================
   Film Zoom
========================= */
const film = $('.film');
const filmImage = $('.film-image');
const filmCopy = $('.film-copy');


function filmScroll() {

  if (reduce || !film) return;

  const r =
    film.getBoundingClientRect();

  const max =
    Math.max(
      1,
      film.offsetHeight -
      window.innerHeight
    );

  const p =
    Math.max(
      0,
      Math.min(
        1,
        -r.top / max
      )
    );


  if (filmImage) {

    filmImage.style.transform =
      `translate3d(0,${(p - .5) * -8}%,0)
       scale(${1.25 - p * .2})`;

  }


  if (filmCopy) {

    filmCopy.style.transform =
      `translateY(${(p - .5) * -25}px)`;

  }
}


/* =========================
   Optimized Scroll Handler
========================= */

let scrollTicking = false;

function handleScroll() {

  if (scrollTicking) return;

  scrollTicking = true;

  requestAnimationFrame(() => {

    heroScroll();
    storyScroll();
    filmScroll();

    scrollTicking = false;

  });
}

window.addEventListener(
  'scroll',
  handleScroll,
  { passive: true }
);

heroScroll();
storyScroll();
filmScroll();


/* =========================
   Sound Button
========================= */
const sound = $('#sound');

if (sound) {

  sound.addEventListener(
    'click',
    async () => {

      const audio = $('#audio');

      if (!audio) return;

      try {

        if (audio.paused) {

          await audio.play();

          sound.classList.add('playing');

          sound.innerHTML =
            '♫ <span>music on</span>';

        } else {

          audio.pause();

          sound.classList.remove(
            'playing'
          );

          sound.innerHTML =
            '♫ <span>music off</span>';

        }

      } catch (e) {

        console.log(
          'Audio error:',
          e
        );

      }

    }
  );

}


/* =========================
   Desktop Depth
========================= */
if (
  !reduce &&
  window.matchMedia('(pointer:fine)').matches &&
  hero &&
  photo
) {

  const hl1 = $('.hl1');
  const hl2 = $('.hl2');

  hero.addEventListener(
    'pointermove',
    e => {

      const r =
        hero.getBoundingClientRect();

      const x =
        e.clientX / r.width - 0.5;

      const y =
        e.clientY / r.height - 0.5;


      photo.style.transform =
        `translate3d(${x * 12}px,${y * 7}px,0)
         rotateX(${y * -3}deg)
         rotateY(${x * 3}deg)`;


      if (hl1) {

        hl1.style.transform =
          `translate3d(${x * -20}px,${y * -15}px,0)`;

      }


      if (hl2) {

        hl2.style.transform =
          `translate3d(${x * 16}px,${y * 12}px,0)`;

      }

    }
  );

}