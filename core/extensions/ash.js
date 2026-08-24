const getRandomValue = (a) => a[Math.floor(Math.random() * a.length)];
const AshSize = ['0.5rem', '0.75rem', '1rem', '1.25rem', '1.5rem', '1.75rem', '2rem'];
const AshDuration = ['5s', '5.5s', '6s', '6.5s', '7s', '7.5s', '8s', '8.5s', '9s', '9.5s', '10s'];
const AshDelay = ['0.25s', '0.5s', '0.75s', '1s', '1.25s', '1.5s', '1.75s', '2s', '2.25s', '2.5s', '2.75s', '3s', '3.25s', '3.5s', '3.75s', '4s', '4.25s', '4.5s', '4.75s', '5s', '5.25s', '5.5s', '5.75s', '6s', '6.25s', '6.5s', '6.75s', '7s', '7.25s', '7.5s', '7.75s', '8s', '8.25s', '8.5s', '8.75s', '9s', '9.25s', '9.5s', '9.75s', '10s'];
const AshRotate = ['3.75deg', '7.5deg', '11.25deg', '15deg', '18.75deg', '22.5deg', '26.25deg', '30deg'];
const AshTranslateX = ['-50vw', '-45vw', '-40vw', '-35vw', '-30vw', '-25vw', '-20vw', '-15vw', '-10vw', '-5vw', '0vw', '5vw', '10vw', '15vw', '20vw', '25vw', '30vw', '35vw', '40vw', '45vw', '50vw', '55vw', '60vw', '65vw', '70vw', '75vw', '80vw', '85vw', '90vw', '95vw', '100vw', '105vw', '110vw', '115vw', '120vw', '125vw', '130vw', '135vw', '140vw', '145vw', '150vw'];
const AshTranslateYf = ['101vh', '102vh', '103vh', '104vh', '105vh', '106vh', '107vh', '108vh', '109vh', '110vh'];
const AshTranslateYt = ['-101vh', '-102vh', '-103vh', '-104vh', '-105vh', '-106vh', '-107vh', '-108vh', '-109vh', '-110vh'];
const AshScale = ['1.5s', '1.75s', '2s', '2.25s', '2.5s', '2.75s', '3s'];
const AshScaleDuration = ['7s', '7.5s', '8s', '8.5s', '9s', '9.5s', '10s', '10.5s', '11s', '11.5s', '12s', '12.5s'];

$('style').append('.ash {position: fixed; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; pointer-events: none; & > div {position: absolute; transform: translate(-10vw); & > div {width: 100%; height: 100%; border-radius: 50%; background-image: radial-gradient(rgba(255, 255, 0, 1) 10%, rgba(255, 0, 0, 1) 10%, transparent 37.5%);}} & div {animation-iteration-count: infinite !important; animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1.2) !important; will-change: transform;} @keyframes AshScale {0% {transform: scale(1);} 50% {transform: scale(0.5);} 100% {transform: scale(1);}}}');
$('body').append('<div class="ash"></div>');

let Ashes = 150;
for (let i = 0; i < Ashes; i++) {$('.ash').append('<div><div></div></div>');}
let totalCount = 0;

for (let i = 0; i < Ashes; i++) {totalCount++; $('style').append('@keyframes AshTranslate' + totalCount + ' ' + '{from {transform: perspective(24rem) rotate3d(1, 1, 1, ' + getRandomValue(AshRotate) + ') translate3d(' + getRandomValue(AshTranslateX) + ',' + getRandomValue(AshTranslateYf) + ',0);} to {opacity: 0; transform: rotate(' + getRandomValue(AshRotate) + ') translate3d(' + getRandomValue(AshTranslateX) + ',' + getRandomValue(AshTranslateYt) + ',0);}}');}
document.querySelectorAll('.ash > div').forEach((e, i) => {const n = i + 1; e.style.cssText += 'animation: AshTranslate' + `${n}` + ' ' + getRandomValue(AshDuration) + ' ' + getRandomValue(AshDelay) + ';';});
document.querySelectorAll('.ash > div').forEach((e, i) => {const n = i + 1; e.style.cssText += 'width:' + ' ' + getRandomValue(AshSize) + '; ' + 'height:' + ' ' + getRandomValue(AshSize) + ';';});
document.querySelectorAll('.ash > div > div').forEach((e, i) => {const n = i + 1; e.style.cssText += 'animation: AshScale' + ' ' + getRandomValue(AshScale) + ' ' + getRandomValue(AshScale) + ';';});