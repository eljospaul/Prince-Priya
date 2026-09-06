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
        audio.volume = 0.5;

        /*
          Set the music source only after the user clicks.
          This prevents the browser from requesting ambient.mp3
          when the page first loads.
        */
        if (!audio.src || audio.src === window.location.href) {
          audio.src =
            './assets/ambient.mp3';
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

/* =========================
   Language Selector
   English / Tamil / Hindi
========================= */
const translations = {
  en: {
    loader: 'PREPARING YOUR INVITATION',
    preludeEyebrow: 'A wedding invitation · 2026',
    openInvitation: 'Open the invitation',
    tapBegin: 'tap to begin the story',
    navStory: 'Story', navPromise: 'Promise', navWedding: 'Wedding', navRsvp: 'RSVP',
    sound: 'sound',
    heroEyebrow: 'Together with their families',
    heroScript: 'two hearts · one promise · forever',
    heroDate: 'FRIDAY · 16 OCTOBER 2026 · 5:30 PM · HOTEL BHIMAS, CHENNAI',
    heroScroll: 'SCROLL TO REVEAL <i></i>',
    promiseTitle: 'THE PROMISE',
    mark10: '“Therefore what God has<br>joined together,<br>let no one separate.”',
    markRef: 'MARK 10:9',
    eccl: '“A threefold cord is not quickly broken.”',
    filmChapter: 'CHAPTER II · THE COUPLE',
    filmTitle: 'Here begins<br><em>forever.</em>',
    countTitle: 'THE DAY IS DRAWING NEAR',
    countHeading: 'Until we say<br><em>“I do”</em>',
    days: 'DAYS', hours: 'HOURS', minutes: 'MINUTES', seconds: 'SECONDS',
    countDate: 'Friday · 16 October 2026',
    saveDate: 'SAVE THE DATE', weddingTitle: 'The Wedding',
    holyMatrimony: 'HOLY MATRIMONY', ceremony: 'Wedding Ceremony', dateFull: '16 October 2026',
    time530: '5:30pm', time700: '7:00pm', opposite: 'Opposite to SIMS Hospital',
    venue1: 'Crown Hall<br>Bhimaas Temple Tree Hotel<br>100 ft Road, Vadapalani, Chennai – 600026<br><small>Opposite to SIMS Hospital</small>',
    venue2: 'At the same premises<br>Crown Hall, Bhimaas Temple Tree Hotel<br>100 ft Road, Vadapalani, Chennai',
    viewMap: 'VIEW ON MAP ↗', afterCeremony: 'AFTER THE CEREMONY', reception: 'Reception', directions: 'GET DIRECTIONS ↗',
    blessingsTitle: 'WITH BLESSINGS AND GRACE', presence: 'In the Presence of',
    leaderName1: 'His Excellency<br>Rev. Johnson Ramachandran', leader1: 'Senior Pastor, Ebenezer AG Church, Delhi NCR',
    leaderName2: 'His Excellency<br>Rev. Dr. E. Alwin Thomas', leader2: 'Founder of Ruah Ministries',
    leaderName3: 'His Excellency<br>Rev. Rabi Fletcher', leader3: 'Senior Pastor, Emmanuel AG Church, Port Blair, Andaman &amp; Nicobar Islands',
    ministry: 'The wedding ceremony will be consecrated under the aegis of <b>Ruah Ministries</b>.',
    grace: 'BY THE GRACE OF GOD', covenant: 'Two lives.<br><em>One covenant.</em>',
    blessingText: 'With grateful hearts, Prince and Priya invites you to witness and celebrate their union as they begin their married life in faith, love and fellowship.',
    psalm: '“The LORD has done great things for us, and we are filled with joy.”<br>— PSALM 126:3',
    compliments: 'WITH BEST COMPLIMENTS FROM', rsvp: 'RSVP',
    rsvpText: 'We cannot wait to celebrate this blessed beginning with you.',
    backTop: 'BACK TO THE BEGINNING ↑'
  },
  ta: {
    loader: 'உங்கள் அழைப்பிதழைத் தயாரிக்கிறோம்',
    preludeEyebrow: 'திருமண அழைப்பிதழ் · 2026',
    openInvitation: 'அழைப்பிதழைத் திறக்கவும்',
    tapBegin: 'கதையைத் தொடங்க தட்டவும்',
    navStory: 'கதை', navPromise: 'வாக்குறுதி', navWedding: 'திருமணம்', navRsvp: 'RSVP',
    sound: 'sound',
    heroEyebrow: 'அவர்களின் குடும்பங்களுடன் இணைந்து',
    heroScript: 'இரு இதயங்கள் · ஒரு வாக்குறுதி · என்றென்றும்',
    heroDate: 'வெள்ளிக்கிழமை · 16 அக்டோபர் 2026 · மாலை 5:30',
    heroScroll: 'தொடர்ந்து பார்க்க கீழே செல்லவும் <i></i>',
    promiseTitle: 'வாக்குறுதி',
    mark10: '“தேவன் இணைத்ததை<br>மனிதன் பிரிக்காதிருக்கக்கடவன்.”',
    markRef: 'மாற்கு 10:9',
    eccl: '“மூன்று இழைகளால் ஆன கயிறு எளிதில் அறுந்துபோகாது.”',
    filmChapter: 'அத்தியாயம் II · தம்பதியர்',
    filmTitle: 'இங்கே தொடங்குகிறது<br><em>என்றென்றும்.</em>',
    countTitle: 'அந்த நாள் நெருங்குகிறது',
    countHeading: '“நாம் மணமக்களாகும்”<br><em>அந்த நேரம் வரை</em>',
    days: 'நாட்கள்', hours: 'மணிநேரம்', minutes: 'நிமிடங்கள்', seconds: 'விநாடிகள்',
    countDate: 'வெள்ளிக்கிழமை · 16 அக்டோபர் 2026',
    saveDate: 'தேதியை நினைவில் கொள்ளுங்கள்', weddingTitle: 'திருமணம்',
    holyMatrimony: 'திருமண சடங்கு', ceremony: 'திருமண விழா', dateFull: '16 அக்டோபர் 2026',
    time530: 'மாலை 5:30', time700: 'மாலை 7:00', opposite: 'SIMS மருத்துவமனைக்கு எதிரில்',
    venue1: 'கிரவுன் ஹால்<br>பீமாஸ் டெம்பிள் ட்ரீ ஹோட்டல்<br>100 அடி சாலை, வடபழனி, சென்னை – 600026<br><small>SIMS மருத்துவமனைக்கு எதிரில்</small>',
    venue2: 'அதே வளாகத்தில்<br>கிரவுன் ஹால், பீமாஸ் டெம்பிள் ட்ரீ ஹோட்டல்<br>100 அடி சாலை, வடபழனி, சென்னை',
    viewMap: 'வரைபடத்தில் பார்க்க ↗', afterCeremony: 'திருமணத்திற்குப் பிறகு', reception: 'வரவேற்பு', directions: 'வழியைப் பெறவும் ↗',
    blessingsTitle: 'ஆசீர்வாதங்களுடனும் கிருபையுடனும்', presence: 'இவர்களின் முன்னிலையில்',
    leaderName1: 'மாண்புமிகு<br>Rev. Johnson Ramachandran', leader1: 'மூத்த போதகர், Ebenezer AG Church, Delhi NCR',
    leaderName2: 'மாண்புமிகு<br>Rev. Dr. E. Alwin Thomas', leader2: 'Ruah Ministries நிறுவனர்',
    leaderName3: 'மாண்புமிகு<br>Rev. Rabi Fletcher', leader3: 'மூத்த போதகர், Emmanuel AG Church, Port Blair, Andaman &amp; Nicobar Islands',
    ministry: '<b>Ruah Ministries</b> தலைமையில் திருமண விழா அர்ப்பணிக்கப்படுகிறது.',
    grace: 'தேவனுடைய கிருபையால்', covenant: 'இரு வாழ்க்கைகள்.<br><em>ஒரு உடன்படிக்கை.</em>',
    blessingText: 'நன்றியுள்ள இதயங்களுடன், Prince மற்றும் Priya தங்கள் திருமண வாழ்க்கையை விசுவாசம், அன்பு மற்றும் ஐக்கியத்தில் தொடங்கும் இந்த மகிழ்ச்சியான தருணத்தை உங்களுடன் கொண்டாட அழைக்கிறார்கள்.',
    psalm: '“கர்த்தர் நமக்குப் பெரிய காரியங்களைச் செய்தார்; அதனால் நாம் மகிழ்ச்சியாயிருக்கிறோம்.”<br>— சங்கீதம் 126:3',
    compliments: 'அன்பான வாழ்த்துகளுடன்', rsvp: 'RSVP',
    rsvpText: 'இந்த ஆசீர்வதிக்கப்பட்ட தொடக்கத்தை உங்களுடன் கொண்டாட ஆவலுடன் காத்திருக்கிறோம்.',
    backTop: 'தொடக்கத்திற்குத் திரும்ப ↑'
  },
  hi: {
    loader: 'आपके निमंत्रण की तैयारी हो रही है',
    preludeEyebrow: 'विवाह निमंत्रण · 2026',
    openInvitation: 'निमंत्रण खोलें',
    tapBegin: 'कहानी शुरू करने के लिए टैप करें',
    navStory: 'कहानी', navPromise: 'वचन', navWedding: 'विवाह', navRsvp: 'RSVP',
    sound: 'sound',
    heroEyebrow: 'अपने परिवारों के साथ',
    heroScript: 'दो दिल · एक वचन · हमेशा के लिए',
    heroDate: 'शुक्रवार · 16 अक्टूबर 2026 · शाम 5:30 बजे',
    heroScroll: 'आगे देखने के लिए नीचे स्क्रॉल करें <i></i>',
    promiseTitle: 'वचन',
    mark10: '“जिसे परमेश्वर ने जोड़ा है,<br>उसे कोई मनुष्य अलग न करे।”',
    markRef: 'मरकुस 10:9',
    eccl: '“तीन तार की डोरी जल्दी नहीं टूटती।”',
    filmChapter: 'अध्याय II · यह जोड़ा',
    filmTitle: 'यहाँ से शुरू होता है<br><em>हमेशा के लिए।</em>',
    countTitle: 'वह दिन करीब आ रहा है',
    countHeading: 'जब हम कहेंगे<br><em>“ हाँ, हम स्वीकार करते हैं”</em>',
    days: 'दिन', hours: 'घंटे', minutes: 'मिनट', seconds: 'सेकंड',
    countDate: 'शुक्रवार · 16 अक्टूबर 2026',
    saveDate: 'तारीख याद रखें', weddingTitle: 'विवाह',
    holyMatrimony: 'पवित्र विवाह', ceremony: 'विवाह समारोह', dateFull: '16 अक्टूबर 2026',
    time530: 'शाम 5:30 बजे', time700: 'शाम 7:00 बजे', opposite: 'SIMS अस्पताल के सामने',
    venue1: 'क्राउन हॉल<br>भीमास टेम्पल ट्री होटल<br>100 फीट रोड, वडापलानी, चेन्नई – 600026<br><small>SIMS अस्पताल के सामने</small>',
    venue2: 'उसी परिसर में<br>क्राउन हॉल, भीमास टेम्पल ट्री होटल<br>100 फीट रोड, वडापलानी, चेन्नई',
    viewMap: 'मानचित्र पर देखें ↗', afterCeremony: 'समारोह के बाद', reception: 'स्वागत समारोह', directions: 'दिशा प्राप्त करें ↗',
    blessingsTitle: 'आशीर्वाद और अनुग्रह के साथ', presence: 'इनकी उपस्थिति में',
    leaderName1: 'माननीय<br>Rev. Johnson Ramachandran', leader1: 'Senior Pastor, Ebenezer AG Church, Delhi NCR',
    leaderName2: 'माननीय<br>Rev. Dr. E. Alwin Thomas', leader2: 'Founder of Ruah Ministries',
    leaderName3: 'माननीय<br>Rev. Rabi Fletcher', leader3: 'Senior Pastor, Emmanuel AG Church, Port Blair, Andaman &amp; Nicobar Islands',
    ministry: '<b>Ruah Ministries</b> के तत्वावधान में विवाह समारोह पवित्र किया जाएगा।',
    grace: 'परमेश्वर के अनुग्रह से', covenant: 'दो जीवन।<br><em>एक वाचा।</em>',
    blessingText: 'कृतज्ञ हृदयों से, Prince और Priya आपको आमंत्रित करते हैं कि आप उनके मिलन के साक्षी बनें और उनके विश्वास, प्रेम और संगति से भरे वैवाहिक जीवन के शुभारंभ का उत्सव मनाएँ।',
    psalm: '“यहोवा ने हमारे लिये बड़े बड़े काम किये हैं; इस कारण हम आनन्दित हैं।”<br>— भजन संहिता 126:3',
    compliments: 'सादर शुभकामनाओं सहित', rsvp: 'RSVP',
    rsvpText: 'इस आशीषित नई शुरुआत को आपके साथ मनाने के लिए हम उत्सुक हैं।',
    backTop: 'शुरुआत पर वापस जाएँ ↑'
  }
};

function setLanguage(lang) {
  if (!translations[lang]) lang = 'en';
  const dict = translations[lang];
  document.documentElement.lang = lang === 'ta' ? 'ta' : lang === 'hi' ? 'hi' : 'en';
  document.body.dataset.lang = lang;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (dict[key] !== undefined) el.innerHTML = dict[key];
  });

  const current = document.querySelector('.lang-current');
  if (current) current.textContent = lang.toUpperCase();

  const title = {
    en: 'Prince & Priya — Wedding Invitation',
    ta: 'Prince & Priya — திருமண அழைப்பிதழ்',
    hi: 'Prince & Priya — विवाह निमंत्रण'
  };
  document.title = title[lang];
  localStorage.setItem('weddingLanguage', lang);
}

const languageToggle = $('#languageToggle');
const languageMenu = $('#languageMenu');

if (languageToggle && languageMenu) {
  languageToggle.addEventListener('click', e => {
    e.stopPropagation();
    languageMenu.classList.toggle('open');
  });

  languageMenu.querySelectorAll('[data-lang]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      setLanguage(btn.dataset.lang);
      languageMenu.classList.remove('open');
    });
  });

  document.addEventListener('click', () => {
    languageMenu.classList.remove('open');
  });
}

setLanguage(localStorage.getItem('weddingLanguage') || 'en');
