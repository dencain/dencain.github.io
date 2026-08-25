//framework
const $ = (s) => {
  const e = document.querySelectorAll(s);
  return {
    attr(attribute, value) {e.forEach(el => el.setAttribute(attribute, value)); return this;},

    css(property, value) {e.forEach(el => el.style[property] = value); return this;},
    addClass(className) {e.forEach(el => el.classList.add(className)); return this;},
    removeClass(className) {e.forEach(el => el.classList.remove(className)); return this;},
    hide() {e.forEach(el => el.style.display = 'none'); return this;},
    show() {e.forEach(el => el.style.display = ''); return this;},
    
    html(content) {e.forEach(el => el.innerHTML = content); return this;},
    text(str) {e.forEach(el => el.textContent = str); return this;},

    append(content) {e.forEach(el => el.insertAdjacentHTML('beforeend', content)); return this;},
    prepend(content) {e.forEach(el => el.insertAdjacentHTML('afterbegin', content)); return this;},
    before(content) {e.forEach(el => el.insertAdjacentHTML('beforebegin', content)); return this;},
    after(content) {e.forEach(el => el.insertAdjacentHTML('afterend', content)); return this;},

    remove() {e.forEach(el => el.remove()); return this;},

    on(event, callback) {e.forEach(el => el.addEventListener(event, callback)); return this;},
    get(index) {return index !== undefined ? e[index] : Array.from(e);}
  };
};

//load
$('body').append('<div id="load" data-nosnippet aria-hidden="true"><span>Загрузка</span><span>Не ждать</span></div>');
function load() {$('#load').remove();}
$('#load > span:last-of-type').on('click', load);

//init
import('/core/extensions/aos.js');
import('/core/extensions/swiper.js');
import('/core/extensions/ticker.js');

if (window.matchMedia('(orientation: landscape)').matches) {
  import('/core/extensions/cursor.js');
  import('/core/extensions/ash.js');
  import('/core/extensions/boil.js');

  function imports() {
    $('.cursor').css('z-index', '7');
    $('.ash').css('z-index', '1');
    $('.boil').css('z-index', '2');
    
    $('header').css('z-index', '3');
    $('#nav').css('z-index', '4');
    $('#progress').css('z-index', '5');
    $('#load').css('z-index', '6');
  }
  
  window.addEventListener('load', function() {imports();});
}

$('head').append('<style></style>');
$('hr, h2, #how_we_do li, #about > img, #projects figcaption').addClass('aos');

//Nav
function nav_in() {$('#nav, header').addClass('active'); $('#nav').attr('onclick', 'nav_out()');}
function nav_out() {$('#nav, header').removeClass('active'); $('#nav').attr('onclick', 'nav_in()');}
$('header a').on('click', nav_out);
if (window.matchMedia('(orientation: portrait)').matches) {$('body').append('<div id="nav" title="Навигация" onclick="nav_in()"></div>');}

let lastScrollY = window.scrollY;
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {$('header:not(header.active), #nav:not(#nav.active)').addClass('hide');}
      else {$('header:not(header.active), #nav:not(#nav.active)').removeClass('hide');}
      lastScrollY = currentScrollY;
      ticking = false;
    });
    ticking = true;
  }
});

//Radio
//$('body').append('<audio src="https://das-edge62-live365-dal03.cdnstream.com/a36201"></audio>');
//https://das-edge62-live365-dal03.cdnstream.com/a36201 (Aadvark)
//https://manager4.streamradio.fr/bluescaferadio (Lyon)
//$('nav > div').append('<div title="Бриганд FM" onclick="radio()"><div></div></div>');

function radio() {const audio = document.querySelector('audio'); if (audio.paused) {audio.play();} else {audio.pause();}}

//Page Progress
window.addEventListener('scroll', () => {$('#progress').css('width', ((window.scrollY || document.documentElement.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight)) * 100 + '%');});
$('body').append('<div id="progress"></div>');

//What We Did
function projects() {$('#projects div').css('max-height', 'initial'); $('#projects span').remove();}
const ticker = document.querySelector('#customers > div'); if (ticker) {ticker.innerHTML += ticker.innerHTML;}

//<aside id="payment"><a href="https://brigand.vip/">Оплата</a></aside><aside id="privilege"><a href="https://brigand.vip/">Привелегии</a></aside><aside id="terms-of-use"><a href="https://brigand.vip/">Условия использования</a></aside><aside id="privacy-policy"><a href="https://brigand.vip/">Политика приватности</a></aside><aside id="dcma"><a href="https://brigand.vip/">DCMA</a></aside><aside id="gdpr"><a href="https://brigand.vip/">GDPR</a></aside>

//background: [color] [image] [repeat] [attachment] [position] / [size] [origin] [clip];
//background: #202020 url('hero.jpg') no-repeat fixed center / cover padding-box border-box;
//& > div:last-of-type {position: fixed; top: 0%; left: 0%; z-index: -1; width: 100%; height: 100%; background: rgba(32, 32, 32, 0.75);}

//& > img:last-of-type {position: fixed; top: 50%; left: 50%; transform: translate(-50%,-50%); z-index: -1; object-fit: cover; width: 100%; height: 100%; pointer-events: none; filter: brightness(87.5%);}

//display: flex; flex-direction: column; justify-content: center; align-items: center; column-count: 4;
//grid-column: span 2; grid-row: span 2;

//First 3
//& > ul:nth-of-type(-n+3) {width: 100%; margin: initial; & li:not(& li:last-of-type) {margin-bottom: 0.75rem;}}
//<video autoplay muted loop playsinline><source src="/media/index/top.mp4" type="video/mp4"></video>
//linear-gradient(90deg, transparent 0%, rgba(0, 0, 0, 0.75) 25%, rgba(0, 0, 0, 0.75) 75%, transparent 100%);

//@media (prefers-color-scheme: light), (prefers-color-scheme: dark) {}
//@media (orientation: landscape) and (min-width: 80rem) {}
//@media (orientation: portrait) {}
//all: revert;
//@import url('/core/components/layouts/what_we_did.css') layer(components);
//padding-top: env(safe-area-inset-top); padding-bottom: env(safe-area-inset-bottom); padding-left: env(safe-area-inset-left); padding-right: env(safe-area-inset-right);
//₽μm®™/m² =A2/453.592*500 =C2*0.0000393700787*1000
//←❮❯→

//DOM Ready
document.addEventListener('DOMContentLoaded', function() {});
//Full
window.addEventListener('load', function() {
  load();
});