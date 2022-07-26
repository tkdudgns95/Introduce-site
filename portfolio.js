/* HEADER */

window.onload = function() {scrollFunction()}; // 윈도우가 로드되었을 때 scrollFunction 호출됨.
window.onscroll = function() {scrollFunction()}; // 윈도우에서 스크롤 이벤트가 발생 할 때 마다 호출되는 함수.

function scrollFunction() { // 스크롤이 될 때 네비게이션바가 어떻게 보여질지 보여주는 함수.

    var header = document.getElementById('header'); // header객체를 가져옴.

    if(document.documentElement.scrollTop > 70) { // scrollTop 의 값이 70을 넘었을때,(스크롤을 아래로 내리다 보면 70을 넘게된다.)

        if(!header.classList.contains('navbar-fixed')) { // 헤더라는 객체에 navbar-fixed가 없다면,
            header.classList.add('navbar-fixed'); // 헤더 클래스 리스트에 navbar-fixed라는 함수를 추가하고,
            document.getElementsByTagName('body')[0].style.marginTop = '70px'; // body 객체를 가지고와서, marginTop에 70px를 넣어줌. (고로, 위로부터 70px가 떨어지게됨.)
            header.style.display = 'none'; // 헤더 스타일의 디스플레이 값을 none으로 바꿔주고,
            setTimeout(function(){ // setTimeout 함수
                header.style.display = 'block'; /* 40 밀리세컨드 이후에 호출되도록 하고, 헤더에 스타의 디스플레이 값을 block으로 넣어줌.(display ='none' 이후, 아주 짧은 순간 이후에 
                     다시 블럭처리를 함으로써 페이드(Fade) 효과를 주기 위함이다. */ 
            }, 40);
        }
    } else // scrollTop의 값이 70을 넘지 않는다면,
    
    {
        if(header.classList.contains('navbar-fixed')) { // 그리고, 헤더에 navbar-fixed라는 클래스가 있다면,
            header.classList.remove('navbar-fixed'); // 헤더에서 navbar-fixed를 제거해주고,
            document.getElementsByTagName('body')[0].style.marginTop = '0'; // body객체를 가지고와서, marginTop의 값을 0으로 설정해줌.
        }

    }
}

function menuToggle() { // 메뉴 토글버튼을 눌렀을 때 호출되는 함수.
    document.getElementById('menu').classList.toggle('show'); // menu 객체를 가져오고, 클래스 리스트에서 show라는 클래스를 토글시킴.
} // 토글은 show라는 클래스가 없으면 추가를 하고, 있으면 제거를 해주는 함수.

document.getElementById('toggleBtn').addEventListener('click', menuToggle); // 토글버튼을 눌렀을때(toggleBtn) 클릭이벤트가 발생하면, menutoggle함수를 호출함.





/* WELCOME AREA */
var imageSlideIndex = 1;

showImageSlides(imageSlideIndex);

function imageSlideTimer() {
    plusImageSlides(1);
}

var imageTimer = setInterval(imageSlideTimer, 3000);

function plusImageSlides(n) {
    clearInterval(imageTimer);
    imageTimer = setInterval(imageSlideTimer, 3000);

    showImageSlides(imageSlideIndex += n);
}

function currentImageSlide(n) {
    clearInterval(imageTimer);
    imageTimer = setInterval(imageSlideTimer, 3000);
    
    showImageSlides(imageSlideIndex = n);

}

function showImageSlides(n) {
    var i;
    var slides = document.getElementsByClassName('image-slide');
    var dots = document.getElementsByClassName('dot');
    if(n > slides.length) { imageSlideIndex = 1}
    if(n < 1) { imageSlideIndex = slides.length }
    for(i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }
    for(i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(' active', '');
    }
    slides[imageSlideIndex - 1].style.display = 'block';
    dots[imageSlideIndex - 1].className += ' active';

}

document.getElementById('imagePrev').addEventListener('click', plusImageSlides.bind(null, -1));
document.getElementById('imageNext').addEventListener('click', plusImageSlides.bind(null, 1));

document.getElementById('firstDot').addEventListener('click', currentImageSlide.bind(null, 1));
document.getElementById('secondDot').addEventListener('click', currentImageSlide.bind(null, 2));
document.getElementById('thirdDot').addEventListener('click', currentImageSlide.bind(null, 3));
document.getElementById('forthDot').addEventListener('click', currentImageSlide.bind(null, 4));

/* PORTFOLIO AREA */
filterSelection('all');

function filterSelection(id) {
    var x, i;

    x = document.getElementsByClassName('listItem');
    for(i=0; i<x.length;i++) {
        removeClass(x[i], 'active');
    }
    addclass(document.getElementById(id), 'active');

    x = document.getElementsByClassName('filterItem');
    if(id == 'all') id = '';
    for(i=0;i<x.length;i++) {
        removeClass(x[i], 'show');
        if(x[i].className.indexOf(id) > -1) {
            addclass(x[i], 'show');
        }
    }
}

function addclass(element, name) {
    if(element.className.indexOf(name) == -1 ) {
        element.className += " " + name;
    }
}

function removeClass(element, name) {
    var arr;
    arr = element.className.split(" ");

    while(arr.indexOf(name) > -1) {
        arr.splice(arr.indexOf(name), 1);
    }

    element.className = arr.join(" ");
}

document.getElementById('all').addEventListener('click', filterSelection.bind(null, 'all'));
document.getElementById('uiux').addEventListener('click', filterSelection.bind(null, 'uiux'));
document.getElementById('java').addEventListener('click', filterSelection.bind(null, 'java'));
document.getElementById('db').addEventListener('click', filterSelection.bind(null, 'db'));

function viewPortfolio(event) {
    var polyNode = event.target;

    if(polyNode.tagName.toLowerCase() == 'i') { polyNode = polyNode.parentNode; }

    var overlayNode = polyNode;
    var imageNode = overlayNode.nextElementSibling;

    var itemNode = overlayNode.parentNode;
    var mainNode = itemNode.nextElementSibling;
    var subNode = mainNode.nextElementSibling;
    var textNode = subNode.nextElementSibling;

    document.getElementById('modalImage').src = imageNode.src;
    document.getElementById('modalMain').innerHTML = mainNode.innerHTML;
    document.getElementById('modalSub').innerHTML = subNode.innerHTML;
    document.getElementById('modalText').innerHTML = textNode.innerHTML;

    document.getElementById('portfolioModal').style.display = 'block';
}

document.getElementById('modalClose').addEventListener('click', function(){
    document.getElementById('portfolioModal').style.display = 'none';


});

var filterItems = document.getElementsByClassName('overlay');

for(var i=0;i<filterItems.length;i++) {
    filterItems[i].addEventListener('click', viewPortfolio);
}

/* REIVEW AREA */
var reviewSlideIndex = 0;

function reviewSlideTimer() {
    plusReviewSlides(1);

}

var reviewTimer = setInterval(reviewSlideTimer, 5000); 



function plusReviewSlides(n) {
    clearInterval(reviewTimer);
    reviewTimer = setInterval(reviewSlideTimer, 5000);
    showReviewSlides(reviewSlideIndex += n);
}

function showReviewSlides(n) {
    var i;
    var review_slides = document.getElementsByClassName('review-slide');

    if(n > review_slides.length - 3) {
        reviewSlideIndex = 0;
    }

    if(n < 0) {
        reviewSlideIndex = review_slides.length - 3;
    }

    for(i = 0; i < review_slides.length; i++) {
        removeClass(review_slides[i], 'show');
        removeClass(review_slides[i], 'res-show');
        addclass(review_slides[i], 'hide');
    }

    removeClass(review_slides[reviewSlideIndex], 'hide');
    addclass(review_slides[reviewSlideIndex], 'res-show');
    removeClass(review_slides[reviewSlideIndex+1], 'hide');
    addclass(review_slides[reviewSlideIndex+1], 'show');
    removeClass(review_slides[reviewSlideIndex+2], 'hide');
    addclass(review_slides[reviewSlideIndex+2], 'show');
}

document.getElementById('reviewPrev').addEventListener('click', plusReviewSlides.bind(null, -1));
document.getElementById('reviewNext').addEventListener('click', plusReviewSlides.bind(null, 1));

/* NAVBAR ANCHOR */

function moveTo(id) {
    if(id == 'brand') {
        window.scrollTo(0, 0);
    } else {
        window.scrollTo(0, document.getElementById(id).offsetTop - 70);
    }

    document.getElementById('menu').classList.remove('show');
}



document.getElementById('navbarBrand').addEventListener('click', moveTo.bind(null, 'brand'));
document.getElementById('navbarAbout').addEventListener('click', moveTo.bind(null, 'about'));
document.getElementById('navbarService').addEventListener('click', moveTo.bind(null, 'service'));
document.getElementById('navbarPortfolio').addEventListener('click', moveTo.bind(null, 'portfolio'));
document.getElementById('navbarReview').addEventListener('click', moveTo.bind(null, 'review'));