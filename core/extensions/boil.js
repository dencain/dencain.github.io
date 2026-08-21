$('style').append('svg:has(> defs > #boil) {position: absolute; width: 0%; height: 0%; overflow: hidden;}');
$('body').append('<svg><defs><filter id="boil"><feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="1" result="noise"/><feDisplacementMap in="SourceGraphic" in2="noise" scale="3.75" xChannelSelector="R" yChannelSelector="G"/></filter></defs></svg>');

$('style').append('.boil {position: fixed; top: 0; left: 0; z-index: 2; width: 100%; height: 100%; pointer-events: none; backdrop-filter: url(#boil);}');
$('body').append('<div class="boil"></div>');

function animateBoil() {
    const randomVal = 0.04 + Math.random() * 0.03;
    $('#boil > feTurbulence').attr('baseFrequency', randomVal);
    requestAnimationFrame(animateBoil);
}

animateBoil();