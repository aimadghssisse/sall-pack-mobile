//initialize swiper when document ready
var mySwiper = new Swiper ('.swiper-container', {
  // Optional parameters
  direction: 'vertical',
  initialSlide: 1,
  slidesPerView: 3,
  centeredSlides: true,
  fadeEffect: {
    crossFade: true
  },
  simulateTouch: false,
  loop: false,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  }
})

var mySwiper = new Swiper ('.swiper-container-2', {
  // Optional parameters
  direction: 'vertical',
  initialSlide: 1,
  slidesPerView: 3,
  centeredSlides: true,
  fadeEffect: {
    crossFade: true
  },
  simulateTouch: false,
  loop: false,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  }
})
//end swiper

const position = { x: 0, y: 0 }
var drag = null

interact('.drag-document').draggable({
  listeners: {
    start (event) {
      console.log('start')
    },
    move (event) {
      position.x += event.dx
      position.y += event.dy
      $(event.target).addClass('absolute-position')
      drag = $(event.target)
      event.target.style.transform =
        `translate(${position.x}px, ${position.y}px)`

    },
    end (event) {
        console.log(event);
        position.x = 0
        position.y = 0
        drag.addClass('animate').css({'transform': 'translate(0px, 0px)'})
        setTimeout(function(){
          drag.removeClass('absolute-position')
        }, 60);
        setTimeout(function(){
          drag.removeClass('animate').removeClass('absolute-position')
        }, 1000);

    }
  }
})

interact('.dropzone').dropzone({
  accept: '.drag-document',
  ondrop: function (event) {
    console.log(event.target);
  }
});
