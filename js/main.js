// load imag not on  dragOver
$('img').each(function () {
  $(this).addClass('not-drag')
})
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
  },
  noSwipingSelector: ".space-pic"
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

interact('.dropzone-drag').dropzone({
  accept: '.drag-document',
  ondrop: function (event) {
    var dragOver = $(event.target)
    if(dragOver.length > 0 && (dragOver.data('new') != '' && typeof dragOver.data('new') != 'undefiend') )
    var old = drag.data('number')
    var newElem = dragOver.data('new')
    var old_id = drag.data('id')
    var newElem_id = dragOver.data('id')
    var append = false
    var exist = false

    if(objectDragDrop.length > 0) {
      objectDragDrop.map((item, key) => {
        if(item.new == newElem) {
          if(typeof objectDragDrop[key]['old'] == 'undefiend') {
            objectDragDrop[key]['old'] = []
            objectDragDropID[key]['old'] = []
          }
          if(objectDragDrop[key]['old'].includes(old)) {
            append = true
          } else {
            objectDragDrop[key]['old'].push(old)
            objectDragDropID[key]['old'].push(old_id)
          }
          exist = true
        }
      })
      if(!exist) {
        objectDragDrop.push({new: newElem})
        objectDragDrop[objectDragDrop.length - 1]['old'] = []
        objectDragDrop[objectDragDrop.length - 1]['old'].push(old)

        objectDragDropID.push({new: newElem_id})
        objectDragDropID[objectDragDropID.length - 1]['old'] = []
        objectDragDropID[objectDragDropID.length - 1]['old'].push(old_id)
      }
    } else {
      objectDragDrop.push({new: newElem})
      objectDragDrop[0]['old'] = []
      objectDragDrop[0]['old'].push(old)

      objectDragDropID.push({new: newElem_id})
      objectDragDropID[0]['old'] = []
      objectDragDropID[0]['old'].push(old_id)
    }

    if(!append) {
      dragOver.parents('.swiper-slide ').find('.side-one .drag-old').append("<span class='space-element'><span class='old-document-drag'>"+old+"</span></span>")
    }
    activetedSaveData()
    checkImgAncien()
  }
});


var objectDragDrop = [] // collection data document
var objectDragDropID = [] // collection data document


function activetedSaveData() {
  existObject = []
  $('.section-drag-one .swiper-slide').each(function () {
    var number = $(this).find('img').attr('data-number')
    if(typeof number != 'undefiend' && number != '') {
      existObject.push(number)
    }
  })
  objectDragDrop.map(item => {
    item.old.map(nbr => {
      index = existObject.indexOf(String(nbr))
      if(index != -1) {
        $('img').each(function () {
          if($(this).data('number') == nbr) {
            $(this).removeClass('not-drag').addClass('done-drag')
          }
        })
        existObject.splice(index, 1)
      }
    })
  })
  if(existObject.length > 0) {
    $('button.save').attr('disabled', true)
  } else {
    $('button.save').attr('disabled', false)
  }
}


$('body').on('mouseenter', '.swiper-slide-active .space-element .old-document-drag', function () {
  if($(this).parent('.space-element').find('i').length == 0) {
    var old = $(this).text()
    $('.space-element').find('.trash-drag').each(function () {
      $(this).fadeOut('slow').remove()
    })
    $(this).parent('.space-element').append('<i class="trash-drag fa fa-trash-o" data-value="'+old+'"></i>').find('.trash-drag').fadeIn('slow').css("display","inline-block");
  }
})

// mouse leave trash to hide it
$('body').on('mouseleave', '.swiper-slide-active .space-element .old-document-drag, .swiper-slide-active .space-element .trash-drag', function () {
  if($(this).hasClass('trash-drag')) {
    $(this).fadeOut('slow').remove()
  }
  // else if($(this).parents('.space-element').find('.trash-drag').length > 0 && $(this).hasClass('trash-drag')) {
  //   $(this).parents('.space-element').find('.trash-drag').fadeOut('slow').remove()
  // }
})


// delete document drag
$('body').on('click', '.swiper-slide-active .trash-drag', function () {
  var old = $(this).attr('data-value')
  var newDoc = ''
  if(typeof old != 'undefiend' && old != '') {
    $('.swiper-slide').each(function () {
      if($(this).hasClass('swiper-slide-active')) {
        newDoc = $(this).find('img').data('new')
        if(typeof newDoc != "undefiend" && newDoc != '') {
          objectDragDrop.map((item, key) => {
            if(item.new == newDoc) {
              for( i = 0; i < item.old.length; i++){
                if ( item.old[i] == old) {
                  $(this).find('.drag-old span').each(function () {
                    if(old == $(this).text()) {
                      $('img').each(function () {
                        if($(this).data('number') == old) {
                          $(this).removeClass('done-drag').addClass('not-drag')
                        }
                      })
                      var parent = $(this).parent('.drag-old')
                      parent.find('.trash-drag').fadeOut('slow').remove()
                      $(this).fadeOut('slow').remove()
                      checkImgAncien ()
                    }
                  })
                  objectDragDrop[key].old.splice(i, 1);
                  objectDragDropID[key].old.splice(i, 1);
                  activetedSaveData()
                }
              }
            }
          })
        }
      }
    })
  }
  old = ''
})

// document nouveau

function checkImgAncien () {
  $('.swiper-container-2 .swiper-slide').each(function () {
      if($(this).find('.side-one .drag-old .space-element').length > 0) {
        $(this).find('img').removeClass('not-drag').addClass('done-drag')
      } else {
        $(this).find('img').removeClass('done-drag').addClass('not-drag')
      }
  })
}
// save data collection
$('.save').click(function () {
  console.log(objectDragDrop);
  console.log(objectDragDropID);
})

// reset data collection
$('.cancel').click(function () {
  objectDragDrop = []
  objectDragDropID = []
  $('.drag-old').each(function () {
    $(this).find('span:not(.zoom)').each(function () {
      if(!$(this).hasClass('trash-drag')) {
        $(this).fadeOut('slow').remove()
      }
    })
  })
  activetedSaveData()
  console.log(objectDragDropID);
  console.log(objectDragDrop);
})
// fancybox applique on image and zoom icon
$('.zoom').on('click', function() {
  $.fancybox.open($(this).parents('.swiper-slide').find('.document-new'), {
    touch: false
  });
});
// end fancybox
