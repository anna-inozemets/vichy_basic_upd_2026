// main variables that used in code
const slideContainer = document.querySelector('.slide__container')
const rotateBlock = document.querySelector('.rotate__block');
const agreementButton = document.querySelector('.agree');
const nextSlideButton = document.querySelector('.arrow--next');
const prevSlideButton = document.querySelector('.arrow--prev');

// additional variables for timeout Ids
let nextButtonTimeout;
let prevButtonTimeout;
let lastSlideActionTimeout;

// additional variables for arrows
const hiddenArrowClass = 'hidden';
let nextArrowDelay = 2.25;

// additional varibles for slides
const totalSlideAmount = 40;
const pathNames = Array.from(
  { length: totalSlideAmount }, (_, i) => ({ count: i + 1, pathName:`./slides/slide--${i + 1}.html` })
);

// additional function for detecting correct font-size
function heightDetect(percent) {
  const height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

  return (percent * (height - 6)) / 100;
}
function widthDetect(percent) {
  const width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

  return (percent * width) / 100;
}
function setResponsiveFontSize() {
  $('.slide__container').css({
    'font-size': `clamp(1px, ${heightDetect(0.925925)}px,${widthDetect(0.520833)}px)`
  });
  $('.arrows').css({
    'font-size': `clamp(1px, ${heightDetect(0.925925)}px,${widthDetect(0.520833)}px)`
  });
}

// function for action after last slide
function lastSlideAction() {
  let id = $('#presentation', window.parent.document).attr('data-id');
  let $url = $('#presentation', window.parent.document).attr('data-request-url');
  let href = $('#presentation', window.parent.document).attr('data-href');
  let $token = $('meta[name="csrf-token"]', window.parent.document).attr('content');
  $.ajaxSetup({
    headers: {
      'X-CSRF-TOKEN': $token
    }
  });
  $.ajax({
    type: "POST",
    url: $url,
    data: {"id": id},
    success: function (data) {
      if (data !== false) {
        parent.location.href = href;
      }
    },
    error: function (data) {
      console.log(data);
    }
  });
}

// function that animate number from 0 to correct num
function animateNumber(delay) {
  const allElements = document.querySelectorAll('[data-number]');

  allElements.forEach(el => {
    const targetNumber = Number(el.getAttribute('data-number'));

    gsap.to(el, {
      duration: 2.5,
      innerHTML: targetNumber,
      delay,
      onUpdate: () => {
        el.innerHTML = Math.round(el.innerHTML);
      },
      onComplete: () => {
        el.innerHTML = targetNumber;
      }
    });
  });
}

// object that store manipulations with slides
const slideActions = {
  1: () => {
    gsap.from('.slide--1__right h1', { opacity: 0, duration: 0.75, delay: 1, y: 40 });
    gsap.from('.slide--1__right h2', { opacity: 0, duration: 0.75, delay: 1.25, y: 40 });
    nextArrowDelay = 2.25;
  },
  2: () => {
    gsap.from('.slide--2__block--1', { opacity: 0, duration: 0.75, delay: 1, x: 40 });
    gsap.from('.slide--2__block--2', { opacity: 0, duration: 0.75, delay: 1.25, x: 40 });
    nextArrowDelay = 2.25;
  },
  3: () => {
    gsap.from('.slide--3__block--1', { opacity: 0, duration: 0.75, delay: 1, y: -90 });
    gsap.from('.slide--3__block--2', { opacity: 0, duration: 0.75, delay: 1.5, y: -90 });
    gsap.from('.slide--3__block--3', { opacity: 0, duration: 0.75, delay: 2, y: -90 });
    gsap.from('.slide--3__block--4', { opacity: 0, duration: 0.75, delay: 2.5, y: -90 });
    gsap.from('.slide--3__block--5', { opacity: 0, duration: 0.75, delay: 3, y: -90 });
    nextArrowDelay = 4;
  },
  4: () => {
    $('.arrow--prev').removeClass('arrow--white');
    $('.arrow--next').removeClass('arrow--white');
    gsap.from('.slide--4__left', { opacity: 0, duration: 0.75, delay: 1, x: -45 });
    gsap.from('.slide--4__right', { opacity: 0, duration: 0.75, delay: 1, x: 45 });
    nextArrowDelay = 2;
  },
  5: () => {
    $('.arrow--prev').addClass('arrow--white');
    $('.arrow--next').addClass('arrow--white');
    gsap.from('.slide--5__right', { opacity: 0, duration: 0.75, delay: 1, x: 90 });
    gsap.from('.slide--5__left img', { opacity: 0, duration: 0.75, delay: 1.5, y: -90 });
    nextArrowDelay = 2.5;
  },
  6: () => {
    $('.arrow--prev').removeClass('arrow--white');
    $('.arrow--next').removeClass('arrow--white');
    gsap.from('.slide--6__left img.formula--1', { opacity: 0, duration: 0.75, delay: 1, scale: 0.5 });
    gsap.from('.slide--6__left img.formula--2', { opacity: 0, duration: 0.75, delay: 1.25, scale: 0.5 });
    gsap.from('.slide--6__right', { opacity: 0, duration: 0.75, delay: 1.75, y: 45 });
    nextArrowDelay = 2.75;
  },
  7: () => {
    gsap.from('.slide--7__left-content', { opacity: 0, duration: 0.75, delay: 1, y: -60 });
    gsap.from('.slide--7__right-content', { opacity: 0, duration: 0.75, delay: 1, y: 60 });
    nextArrowDelay = 2;
  },
  8: () => {
    gsap.from('.slide--8__left h2, .slide--8__left h3', { opacity: 0, duration: 0.75, delay: 1 });
    gsap.from('.slide--8__block--1 img', { opacity: 0, duration: 0.75, delay: 1.5, scale: 0.5 });
    gsap.from('.slide--8__block--2 img', { opacity: 0, duration: 0.75, delay: 1.75, scale: 0.5 });
    gsap.from('.slide--8__block--3 img', { opacity: 0, duration: 0.75, delay: 2, scale: 0.5 });
    gsap.from('.slide--8__block--4 img', { opacity: 0, duration: 0.75, delay: 2.25, scale: 0.5 });
    gsap.from('.slide--8__block--5 img', { opacity: 0, duration: 0.75, delay: 2.5, scale: 0.5 });
    gsap.from('.slide--8__block--6 img', { opacity: 0, duration: 0.75, delay: 2.75, scale: 0.5 });
    gsap.from('.slide--8__block--7 img', { opacity: 0, duration: 0.75, delay: 3, scale: 0.5 });
    gsap.from('.slide--8__left .line-horizontal', { opacity: 0, duration: 0.75, delay: 3.5, scaleX: 0 });
    gsap.from('.slide--8__left .percent-block', { opacity: 0, duration: 0.75, delay: 4 });
    nextArrowDelay = 5;
  },
  9: () => {
    gsap.from('.slide--9__right-logos', { opacity: 0, duration: 0.75, delay: 1 });
    gsap.from('.slide--9__right-text', { opacity: 0, duration: 0.75, delay: 1.5 });
    gsap.from('.slide--9__phone--1', { opacity: 0, duration: 0.75, delay: 2, y: 40 });
    gsap.from('.slide--9__phone--2', { opacity: 0, duration: 0.75, delay: 2.25, y: -40 });
    gsap.from('.slide--9__phone--3', { opacity: 0, duration: 0.75, delay: 2.5, y: 40 });
    gsap.from('.slide--9__phone--4', { opacity: 0, duration: 0.75, delay: 2.75, y: -40 });
    gsap.from('.slide--9__qr', { opacity: 0, duration: 0.75, delay: 3.25, y: 40 });
    nextArrowDelay = 4.25;
  },
  10: () => {
    gsap.from('.slide--10__formula--1', { opacity: 0, duration: 0.75, delay: 1, scale: 0.5 });
    gsap.from('.slide--10__formula--2', { opacity: 0, duration: 0.75, delay: 1.25, scale: 0.5 });
    gsap.from('.slide--10__formula--3', { opacity: 0, duration: 0.75, delay: 1.5, scale: 0.5 });
    gsap.from('.slide--10__formula--4', { opacity: 0, duration: 0.75, delay: 1.75, scale: 0.5 });
    gsap.from('.slide--10__ing--1', { opacity: 0, duration: 0.75, delay: 2.25, x: 25 });
    gsap.from('.slide--10__ing--2', { opacity: 0, duration: 0.75, delay: 2.5, x: 25 });
    gsap.from('.slide--10__ing--3', { opacity: 0, duration: 0.75, delay: 2.75, x: 25 });
    gsap.from('.slide--10__ing--4', { opacity: 0, duration: 0.75, delay: 3, x: 25 });
    gsap.from('.slide--10__ing--5', { opacity: 0, duration: 0.75, delay: 3.25, x: 25 });
    gsap.from('.slide--10__ing--6', { opacity: 0, duration: 0.75, delay: 3.5, x: 25 });
    gsap.from('.slide--10__ing--7', { opacity: 0, duration: 0.75, delay: 3.75, x: 25 });
    gsap.from('.slide--10__ing--8', { opacity: 0, duration: 0.75, delay: 4, x: 25 });
    gsap.from('.slide--10__ing--9', { opacity: 0, duration: 0.75, delay: 4.25, x: 25 });
    nextArrowDelay = 5.25;
  },
  11: () => {
    $('.arrow--prev').removeClass('arrow--white');
    $('.arrow--next').removeClass('arrow--white');
    gsap.from('.slide--11__center', { opacity: 0, duration: 0.75, delay: 1 });
    gsap.from('.slide--11__left', { opacity: 0, duration: 0.75, delay: 1.5, x: -30 });
    gsap.from('.slide--11__right', { opacity: 0, duration: 0.75, delay: 1.5, x: 30 });
    nextArrowDelay = 2.5;
  },
  12: () => {
    $('.arrow--prev').addClass('arrow--white');
    $('.arrow--next').removeClass('arrow--white');
    gsap.from('.slide--12__right h2, .slide--12__right h3', { opacity: 0, duration: 0.75, delay: 1 });
    gsap.from('.slide--12__right h4.animate-1', { opacity: 0, duration: 0.75, delay: 1.5 });
    gsap.from('.slide--12__ing--1', { opacity: 0, duration: 0.75, delay: 1.75 });
    gsap.from('.slide--12__ing--2', { opacity: 0, duration: 0.75, delay: 2 });
    gsap.from('.slide--12__ing--3', { opacity: 0, duration: 0.75, delay: 2.25 });
    gsap.from('.slide--12__ing--4', { opacity: 0, duration: 0.75, delay: 2.5 });
    gsap.from('.slide--12__ings + h4', { opacity: 0, duration: 0.75, delay: 3 });
    gsap.from('.slide--12__right ul', { opacity: 0, duration: 0.75, delay: 3.25 });
    nextArrowDelay = 4.25;
  },
  13: () => {
    $('.arrow--prev').addClass('arrow--white');
    $('.arrow--next').addClass('arrow--white');
    gsap.from('.slide--13__block--1', { opacity: 0, duration: 0.75, delay: 1, y: 50 });
    gsap.from('.slide--13__block--2', { opacity: 0, duration: 0.75, delay: 1.5, y: 50 });
    gsap.from('.slide--13__block--3', { opacity: 0, duration: 0.75, delay: 2, y: 50 });
    gsap.from('.slide--13__block--4', { opacity: 0, duration: 0.75, delay: 2.5, y: 50 });
    gsap.from('.slide--13__block--5', { opacity: 0, duration: 0.75, delay: 3, y: 50 });
    gsap.from('.slide--13__block--6', { opacity: 0, duration: 0.75, delay: 3.5, y: 50 });
    nextArrowDelay = 4.5;
  },
  14: () => {
    $('.arrow--prev').addClass('arrow--white');
    $('.arrow--next').removeClass('arrow--white');
    gsap.from('.slide--14__right h2, .slide--14__right h3, .slide--14__right h4', { opacity: 0, duration: 0.75, delay: 1 });
    gsap.from('.slide--14__ings', { opacity: 0, duration: 0.75, delay: 1.5, x: -30 });
    gsap.from('.slide--14__nums', { opacity: 0, duration: 0.75, delay: 1.5, x: 30 });
    nextArrowDelay = 2.5;
  },
  15: () => {
    $('.arrow--prev').addClass('arrow--white');
    $('.arrow--next').addClass('arrow--white');
    gsap.from('.slide--15__block--1', { opacity: 0, duration: 0.75, delay: 1, y: 50 });
    gsap.from('.slide--15__block--2', { opacity: 0, duration: 0.75, delay: 1.5, y: 50 });
    gsap.from('.slide--15__block--3', { opacity: 0, duration: 0.75, delay: 2, y: 50 });
    nextArrowDelay = 3;
  },
  16: () => {
    $('.arrow--prev').removeClass('arrow--white');
    $('.arrow--next').removeClass('arrow--white');
    gsap.from('.slide--16__content .block-group', { opacity: 0, duration: 0.75, delay: 1, y: 50 });
    gsap.from('.slide--16__block--4', { opacity: 0, duration: 0.75, delay: 1.5, y: 50 });
    gsap.from('.slide--16__block--5', { opacity: 0, duration: 0.75, delay: 2, y: 50 });
    gsap.from('.slide--16__block--6', { opacity: 0, duration: 0.75, delay: 2.5, y: 50 });
    gsap.from('.slide--16__block--7', { opacity: 0, duration: 0.75, delay: 3, y: 50 });
    nextArrowDelay = 4;
  },
  17: () => {
    gsap.from('.slide--17__right h2, .slide--17__right h3', { opacity: 0, duration: 0.75, delay: 1 });
    gsap.from('.slide--17__right-block p.num, .slide--17__right-block p.text', { opacity: 0, duration: 0.75, delay: 1.5 });
    gsap.from('.slide--17__right-block .line', { opacity: 0, duration: 0.75, delay: 1.5, scaleY: 0 });
    nextArrowDelay = 2.5;
  },
  18: () => {
    gsap.from('.slide--18__block--1', { opacity: 0, duration: 0.75, delay: 1, x: 50 });
    gsap.from('.slide--18__block--2', { opacity: 0, duration: 0.75, delay: 1.5, x: 50 });
    gsap.from('.slide--18__block--3', { opacity: 0, duration: 0.75, delay: 2, x: 50 });
    gsap.from('.slide--18__block--4', { opacity: 0, duration: 0.75, delay: 2.5, x: 50 });
    gsap.from('.slide--18__block--5', { opacity: 0, duration: 0.75, delay: 3, x: 50 });
    nextArrowDelay = 4;
  },
  19: () => {
    $('.arrow--prev').removeClass('arrow--white');
    $('.arrow--next').removeClass('arrow--white');
    gsap.from('.slide--19__right h2, .slide--19__right h3', { opacity: 0, duration: 0.75, delay: 1 });
    gsap.from('.slide--19__ings', { opacity: 0, duration: 0.75, delay: 1.5, x: -20 });
    gsap.from('.slide--19__nums', { opacity: 0, duration: 0.75, delay: 1.5, x: 20 });
    gsap.from('.slide--19__right h4', { opacity: 0, duration: 0.75, delay: 1.5, y: 15 });
    nextArrowDelay = 2.5;
  },
  20: () => {
    $('.arrow--prev').addClass('arrow--white');
    $('.arrow--next').addClass('arrow--white');
    gsap.from('.slide--20__block--1', { opacity: 0, duration: 0.75, delay: 1, y: 50 });
    gsap.from('.slide--20__block--2', { opacity: 0, duration: 0.75, delay: 1.5, y: 50 });
    gsap.from('.slide--20__block--3', { opacity: 0, duration: 0.75, delay: 2, y: 50 });
    gsap.from('.slide--20__block--4', { opacity: 0, duration: 0.75, delay: 2.5, y: 50 });
    gsap.from('.slide--20__block--5', { opacity: 0, duration: 0.75, delay: 3, y: 50 });
    gsap.from('.slide--20__block--6', { opacity: 0, duration: 0.75, delay: 3.5, y: 50 });
    gsap.from('.slide--20__block--7', { opacity: 0, duration: 0.75, delay: 4, y: 50 });
    gsap.from('.slide--20__block--8', { opacity: 0, duration: 0.75, delay: 4.5, y: 50 });
    nextArrowDelay = 5.5;
  },
  21: () => {
    $('.arrow--prev').addClass('arrow--white');
    $('.arrow--next').removeClass('arrow--white');
    gsap.from('.slide--21__right h2, .slide--21__right h3', { opacity: 0, duration: 0.75, delay: 1 });
    gsap.from('.slide--21__ings', { opacity: 0, duration: 0.75, delay: 1.5, x: -30 });
    gsap.from('.slide--21__blocks-wrapper', { opacity: 0, duration: 0.75, delay: 1.5, x: 30 });
    nextArrowDelay = 2.5;
  },
  22: () => {
    $('.arrow--prev').removeClass('arrow--white');
    $('.arrow--next').removeClass('arrow--white');
    gsap.from('.slide--22__content .block-group--1', { opacity: 0, duration: 0.75, delay: 1, y: -30 });
    gsap.from('.slide--22__content .block-group--2', { opacity: 0, duration: 0.75, delay: 1.5, y: -30 });
    gsap.from('.slide--22__content .block-group--3', { opacity: 0, duration: 0.75, delay: 2, y: -30 });
    gsap.from('.slide--22__content .block-group--4', { opacity: 0, duration: 0.75, delay: 2.5, y: -30 });
    nextArrowDelay = 3.5;
  },
  23: () => {
    gsap.from('.slide--23__ing--1', { opacity: 0, duration: 0.75, delay: 1 });
    gsap.from('.slide--23__ing--2', { opacity: 0, duration: 0.75, delay: 1.25 });
    gsap.from('.slide--23__ing--3', { opacity: 0, duration: 0.75, delay: 1.5 });
    gsap.from('.slide--23__skins', { opacity: 0, duration: 0.75, delay: 2 });
    gsap.from('.slide--23__blocks ul', { opacity: 0, duration: 0.75, delay: 2.25 });
    nextArrowDelay = 3.25;
  },
  24: () => {
    gsap.from('.slide--24__content .block-group--1', { opacity: 0, duration: 0.75, delay: 1, y: -30 });
    gsap.from('.slide--24__content .block-group--2', { opacity: 0, duration: 0.75, delay: 1.5, y: -30 });
    nextArrowDelay = 2.5;
  },
  25: () => {
    $('.arrow--prev').removeClass('arrow--white');
    $('.arrow--next').removeClass('arrow--white');
    gsap.from('.slide--25__right h2, .slide--25__right h3', { opacity: 0, duration: 0.75, delay: 1 });
    gsap.from('.slide--25__right-bottom', { opacity: 0, duration: 0.75, delay: 1.5, y: 30 });
    nextArrowDelay = 2.5;
  },
  26: () => {
    $('.arrow--prev').addClass('arrow--white');
    $('.arrow--next').removeClass('arrow--white');
    gsap.from('.slide--26__right h2, .slide--26__right h3', { opacity: 0, duration: 0.75, delay: 1 });
    gsap.from('.slide--26__right-block', { opacity: 0, duration: 0.75, delay: 1.5 });
    gsap.from('.slide--26__right h4, .slide--26__percents', { opacity: 0, duration: 0.75, delay: 2 });
    nextArrowDelay = 3;
  },
  27: () => {
    $('.arrow--prev').addClass('arrow--white');
    $('.arrow--next').addClass('arrow--white');
    gsap.from('.slide--27__block--1', { opacity: 0, duration: 0.75, delay: 1, y: 50 });
    gsap.from('.slide--27__block--2', { opacity: 0, duration: 0.75, delay: 1.5, y: 50 });
    gsap.from('.slide--27__block--3', { opacity: 0, duration: 0.75, delay: 2, y: 50 });
    gsap.from('.slide--27__block--4', { opacity: 0, duration: 0.75, delay: 2.5, y: 50 });
    gsap.from('.slide--27__block--5', { opacity: 0, duration: 0.75, delay: 3, y: 50 });
    gsap.from('.slide--27__block--6', { opacity: 0, duration: 0.75, delay: 3.5, y: 50 });
    nextArrowDelay = 4.5;
  },
  28: () => {
    $('.arrow--prev').removeClass('arrow--white');
    $('.arrow--next').removeClass('arrow--white');
    gsap.from('.slide--28__ing--1', { opacity: 0, duration: 0.75, delay: 1 });
    gsap.from('.slide--28__ing--2', { opacity: 0, duration: 0.75, delay: 1.25 });
    gsap.from('.slide--28__ing--3', { opacity: 0, duration: 0.75, delay: 1.5 });
    gsap.from('.slide--28__ing--4', { opacity: 0, duration: 0.75, delay: 1.75 });
    gsap.from('.slide--28__ing--5', { opacity: 0, duration: 0.75, delay: 2 });

    gsap.from('.slide--28__melasyl', { opacity: 0, duration: 0.75, delay: 2.5 });
    gsap.from('.slide--28__num--1', { opacity: 0, duration: 0.75, delay: 2.75 });
    gsap.from('.slide--28__num--2', { opacity: 0, duration: 0.75, delay: 3 });
    nextArrowDelay = 4;
  },
  29: () => {
    gsap.from('.slide--29__block--1', { opacity: 0, duration: 0.75, delay: 1, y: 50 });
    gsap.from('.slide--29__block--2', { opacity: 0, duration: 0.75, delay: 1.5, y: 50 });
    gsap.from('.slide--29__block--3', { opacity: 0, duration: 0.75, delay: 2, y: 50 });
    gsap.from('.slide--29__block--4', { opacity: 0, duration: 0.75, delay: 2.5, y: 50 });
    nextArrowDelay = 3.5;
  },
  30: () => {
    $('.arrow--prev').removeClass('arrow--white');
    $('.arrow--next').removeClass('arrow--white');
    gsap.from('.slide--30__right img.men', { opacity: 0, duration: 0.75, delay: 1 });
    gsap.from('.slide--30__right-content', { opacity: 0, duration: 0.75, delay: 1.5, x: 50 });
    nextArrowDelay = 2.5;
  },
  31: () => {
    $('.arrow--prev').addClass('arrow--white');
    $('.arrow--next').addClass('arrow--white');
    gsap.from('.slide--31__block--1', { opacity: 0, duration: 0.75, delay: 1, y: 50 });
    gsap.from('.slide--31__block--2', { opacity: 0, duration: 0.75, delay: 1.5, y: 50 });
    gsap.from('.slide--31__block--3', { opacity: 0, duration: 0.75, delay: 2, y: 50 });
    gsap.from('.slide--31__block--4', { opacity: 0, duration: 0.75, delay: 2.5, y: 50 });
    gsap.from('.slide--31__block--5', { opacity: 0, duration: 0.75, delay: 3, y: 50 });
    nextArrowDelay = 4;
  },
  32: () => {
    $('.arrow--prev').removeClass('arrow--white');
    $('.arrow--next').removeClass('arrow--white');
    gsap.from('.slide--32__netlock-wrapper', { opacity: 0, duration: 0.75, delay: 1 });
    gsap.from('.slide--32__right .line', { opacity: 0, duration: 0.75, delay: 1.5, scaleX: 0 });
    gsap.from('.slide--32__icons', { opacity: 0, duration: 0.75, delay: 2 });
    nextArrowDelay = 3;
  },
  33: () => {
    gsap.from('.slide--33__block--1', { opacity: 0, duration: 0.75, delay: 1, y: -30 });
    gsap.from('.slide--33__block--2', { opacity: 0, duration: 0.75, delay: 1.5, y: -30 });
    gsap.from('.slide--33__block--3', { opacity: 0, duration: 0.75, delay: 2, y: -30 });
    gsap.from('.slide--33__block--4', { opacity: 0, duration: 0.75, delay: 2.5, y: -30 });
    gsap.from('.slide--33__block--5', { opacity: 0, duration: 0.75, delay: 3, y: -30 });
    gsap.from('.slide--33__block--6', { opacity: 0, duration: 0.75, delay: 3.5, y: -30 });
    gsap.from('.slide--33__block--7', { opacity: 0, duration: 0.75, delay: 4, y: -30 });
    gsap.from('.slide--33__block--8', { opacity: 0, duration: 0.75, delay: 4.5, y: -30 });
    nextArrowDelay = 5.5;
  },
  34: () => {
    gsap.from('.slide--34__block--1', { opacity: 0, duration: 0.75, delay: 1, y: -30 });
    gsap.from('.slide--34__block--2', { opacity: 0, duration: 0.75, delay: 1.5, y: -30 });
    gsap.from('.slide--34__block--3', { opacity: 0, duration: 0.75, delay: 2, y: -30 });
    gsap.from('.slide--34__block--4', { opacity: 0, duration: 0.75, delay: 2.5, y: -30 });
    gsap.from('.slide--34__block--5', { opacity: 0, duration: 0.75, delay: 3, y: -30 });
    gsap.from('.slide--34__block--6', { opacity: 0, duration: 0.75, delay: 3.5, y: -30 });
    gsap.from('.slide--34__block--7', { opacity: 0, duration: 0.75, delay: 4, y: -30 });
    nextArrowDelay = 5;
  },
  35: () => {
    gsap.from('.slide--35__block--1', { opacity: 0, duration: 0.75, delay: 1, x: 50 });
    gsap.from('.slide--35__block--2', { opacity: 0, duration: 0.75, delay: 1.5, x: 50 });
    gsap.from('.slide--35__block--3', { opacity: 0, duration: 0.75, delay: 2, x: 50 });
    nextArrowDelay = 3;
  },
  36: () => {
    gsap.from('.slide--36 .block-group--1', { opacity: 0, duration: 0.75, delay: 1, scale: 0.5 });
    gsap.from('.slide--36 .block-group--2', { opacity: 0, duration: 0.75, delay: 1.5, scale: 0.5 });
    gsap.from('.slide--36 .block-group--3', { opacity: 0, duration: 0.75, delay: 2, scale: 0.5 });
    nextArrowDelay = 3;
  },
  37: () => {
    gsap.from('.slide--37 .block-group--1', { opacity: 0, duration: 0.75, delay: 1, scale: 0.5 });
    gsap.from('.slide--37 .block-group--2', { opacity: 0, duration: 0.75, delay: 1.5, scale: 0.5 });
    gsap.from('.slide--37 .block-group--3', { opacity: 0, duration: 0.75, delay: 2, scale: 0.5 });
    nextArrowDelay = 3;
  },
  38: () => {
    gsap.from('.slide--38__block--1', { opacity: 0, duration: 0.75, delay: 1, y: -30 });
    gsap.from('.slide--38__block--2', { opacity: 0, duration: 0.75, delay: 1.5, y: 30 });
    gsap.from('.slide--38__block--3', { opacity: 0, duration: 0.75, delay: 2, y: -30 });
    gsap.from('.slide--38__block--4', { opacity: 0, duration: 0.75, delay: 2.5, y: 30 });
    nextArrowDelay = 3.5;
  },
  39: () => {
    $('.arrow--prev').removeClass('arrow--white');
    clearTimeout(lastSlideActionTimeout);
    gsap.from('.slide--39__block--1', { opacity: 0, duration: 0.75, delay: 1, y: 30 });
    gsap.from('.slide--39__block--2', { opacity: 0, duration: 0.75, delay: 1.5, y: -30 });
    gsap.from('.slide--39__block--3', { opacity: 0, duration: 0.75, delay: 2, y: 30 });
    gsap.from('.slide--39__block--4', { opacity: 0, duration: 0.75, delay: 2.5, y: -30 });
    nextArrowDelay = 3.5;
  },
  40: () => {
    $('.arrow--prev').addClass('arrow--white');
    gsap.from('.slide--40__right-content', { opacity: 0, duration: 0.75, delay: 1 });
    gsap.delayedCall(3, function () {
      $('.slide--40 button.close-presentation').addClass('visible');
    });

    $('.slide--40 button.close-presentation').on('click', function() {
      $(this).addClass('clicked');
      lastSlideAction();
    })
  },
}
// function that add animation for element
function animateSlide(slideNum = 1) {
  gsap.from('.slide', { opacity: 0, duration: 0.75 });

  slideActions[slideNum]();
}
// function that detect oriental of device
function updateRotateBlockVisibility() {
  const isPortrait = window.matchMedia('(orientation: portrait)').matches;

  $(rotateBlock).toggleClass('visible', isPortrait);
}
// function that load slide without reloading page
async function loadComponent(componentPathName, slideNum) {
  const response = await fetch(componentPathName);
  const data = await response.text();

  slideContainer.innerHTML = data;
  animateSlide(slideNum);
}
// function that update info about prev/next button
function updateNavigationButtons(currentSlide) {
  clearTimeout(nextButtonTimeout);
  clearTimeout(prevButtonTimeout);

  $(nextSlideButton).addClass(hiddenArrowClass);
  $(prevSlideButton).addClass(hiddenArrowClass);

  switch (currentSlide) {
    case 0:
      break;
    case 1:
      $(nextSlideButton).removeClass(hiddenArrowClass);
      break;
    case totalSlideAmount:
      $(prevSlideButton).removeClass(hiddenArrowClass);
      break;
    default:
      nextButtonTimeout = setTimeout(() => {
        $(nextSlideButton).removeClass(hiddenArrowClass);
        $(prevSlideButton).removeClass(hiddenArrowClass);
      }, nextArrowDelay * 1000);
  }
}
// function that change slide on the screen
async function changeSlide(direction) {
  const currentSlideNum = slideContainer.getAttribute('data-current-slide');

  let newSlideNum;

  if (direction === 'next') {
    newSlideNum = Number(currentSlideNum) + 1;
  } else if (direction === 'prev') {
    newSlideNum = Number(currentSlideNum) - 1;
  }

  const { pathName } = pathNames.find(pathNameInfo => pathNameInfo.count === +newSlideNum);

  await loadComponent(pathName, newSlideNum);

  slideContainer.setAttribute('data-current-slide', newSlideNum);
  updateNavigationButtons(newSlideNum);
}

//window and document listeners
$(document).ready(function () {
  setResponsiveFontSize();
  updateRotateBlockVisibility();
});
$(window).on('resize', function () {
  setResponsiveFontSize();
  updateRotateBlockVisibility();
});
$(window).on('orientationchange', function () {
  updateRotateBlockVisibility();
});

// button listeners
$(agreementButton).on('click', () => {
  loadComponent(pathNames[0].pathName);
  slideContainer.setAttribute('data-current-slide', 1);
  updateNavigationButtons(1);
});
$(nextSlideButton).on('click', () => {
  changeSlide('next')
})
$(prevSlideButton).on('click', () => {
  changeSlide('prev')
});