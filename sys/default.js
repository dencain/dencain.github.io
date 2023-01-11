if (window.matchMedia('(orientation: portrait)').matches) {
	if ($(window).width() >= 1080) {$('video').append('<source src="media/home/p1080.webm" type="video/webm">');} else
	if ($(window).width() >= 720) {$('video').append('<source src="media/home/p720.mp4" type="video/mp4">');} else
	if ($(window).width() >= 480) {$('video').append('<source src="media/home/p480.mp4" type="video/mp4">');} else
	if ($(window).width() < 480) {$('video').append('<source src="media/home/p360.mp4" type="video/mp4">');}
}
if (window.matchMedia('(orientation: landscape)').matches) {
	$('body').prepend('<div id="cur"></div><div id="cur2"></div>');
	if ($(window).width() >= 1920) {$('video').append('<source src="media/home/l1080.webm" type="video/webm">');} else
	if ($(window).width() >= 1280) {$('video').append('<source src="media/home/l720.mp4" type="video/mp4">');} else
	if ($(window).width() >= 853) {$('video').append('<source src="media/home/l480.mp4" type="video/mp4">');} else
	if ($(window).width() < 853) {$('video').append('<source src="media/home/l360.mp4" type="video/mp4">');}
}

function contact(){
	$('.main > span, .main > p').css('display','none');
	$('.contact').css('display','block');
	setTimeout(function() {$('.contact > p').css('opacity','1');}, 500);
	setTimeout(function() {$('.via li:nth-of-type(1)').css('opacity','1');}, 750);
	setTimeout(function() {$('.via li:nth-of-type(2)').css('opacity','1');}, 1000);
	setTimeout(function() {$('.via li:nth-of-type(3)').css('opacity','1');}, 1250);
	setTimeout(function() {$('.contact').css('border-color','#F0F0F0');}, 1750);
}

//Cursor
const cur = document.getElementById('cur');
const cur2 = document.getElementById('cur2');
document.addEventListener('mousemove', (ev) => {cur.style.transform = `translateY(${ev.clientY - 8}px)`; cur.style.transform += `translateX(${ev.clientX - 8}px)`; cur2.style.transform = `translateY(${ev.clientY - 32}px)`; cur2.style.transform += `translateX(${ev.clientX - 32}px)`;}, false);
$('a, .ctf').on({mouseenter: function (e){$('#cur, #cur2').addClass('active');}, mouseleave: function (e){$('#cur, #cur2').removeClass('active');}});

$(window).bind('load', function(){
	$('.loader').remove();
});