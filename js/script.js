//initialize swiper pachage

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
//end swiper

// center elemnt in right
$('body').on('click', '.swiper-button-prev, .swiper-button-next', function () {
  $('.section-drag-tow .swiper-slide').each(function (indexSwiper) {
    if($(this).hasClass('swiper-slide-active')) {
      var height = ($(this).parent().find('.drag-old .space-element').length * 15)
      $(this).find('.element-drag span').each(function () {
        if($(this).hasClass('old-document-drag')) {
          $(this).addClass('cursor')
        }
      })
      var count = (height + 20) + 'px'
      $(this).find('.drag-old').css('top', 'calc(50% - '+count+')')
    } else {
      $(this).find('.element-drag span').each(function () {
        if($(this).hasClass('old-document-drag')) {
          $(this).removeClass('cursor')
        }
      })
      $(this).parent().find('.drag-old .old-document-drag').find('i').each(function () {
        if($(this).hasClass('trash-drag')) {
          $(this).fadeOut('slow').remove()
        }
      })
      var height = $(this).find('.drag-old .space-element').length * 15
      var count = height + 'px'
      $(this).find('.drag-old').css('top', 'calc(50% - '+count+')')
    }
  })
})
// end function

// fancybox applique on image and zoom icon
$('.zoom, .image-fancybox').on('click', function() {
  $.fancybox.open($(this).parents('.swiper-slide').find('.document-new'), {
    touch: false
  });
});
// end fancybox

var objectDragDrop = [] // collection data document
var objectDragDropID = [] // collection data document
// application drag on drop html 5
function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

// drag document to new document
function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  var dragOver = ev.target.id
  var append = false
  if($('#'+data).length && $('#'+dragOver).length) {
    var old = $('#'+data).data('number')
    var newElem = $('#'+dragOver).data('new')

    var old_id = $('#'+data).data('id')
    var newElem_id = $('#'+dragOver).data('id')

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
      var cursor = ''
      if($('#'+dragOver).parent().hasClass('swiper-slide-active')) {
        cursor = 'cursor'
      }
      $('#'+dragOver).parent().find('.drag-old').append("<span class='space-element'><span class='old-document-drag "+cursor+"'>"+$('#'+data).data('number')+"</span></span>")
      var zoom = 0
      if($('#'+dragOver).parent().find('.drag-old .zoom').css('display') != 'none') {
        zoom = 24
      }
      var count = ($('#'+dragOver).parent().find('.drag-old .old-document-drag').length * 15 + zoom ) + 'px'
      $('#'+dragOver).parent().find('.drag-old').css('top', 'calc(50% - '+count+')')
    }
  }
  activetedSaveData()
}

// mouse enter for trash show
$('body').on('mouseenter', '.swiper-slide-active .old-document-drag', function () {
  if($(this).parent('.space-element').find('i').length == 0) {
    var old = $(this).text()
    $('.space-element').find('.trash-drag').each(function () {
      $(this).fadeOut('slow').remove()
    })
    $(this).parent('.space-element').append('<i class="trash-drag fa fa-trash-o" data-value="'+old+'"></i>').find('.trash-drag').fadeIn('slow').css("display","block");
  }
})

// mouse leave trash to hide it
$('body').on('mouseleave', '.swiper-slide-active .space-element .trash-drag', function () {
  if($(this).hasClass('trash-drag')) {
    $(this).fadeOut('slow').remove()
  }
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
                      var parent = $(this).parent('.drag-old')
                      parent.find('.trash-drag').fadeOut('slow').remove()
                      $(this).fadeOut('slow').remove()
                      var count = 0+ 'px'
                      if(parent.find('.old-document-drag').length != 0) {
                        var count = (parent.find('.old-document-drag').length * 15 + 24 ) + 'px'
                      }
                      parent.css('top', 'calc(50% - '+count+')')
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
// save data collection
$('.save').click(function () {
  console.table(objectDragDrop);
  console.table(objectDragDropID);
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
    $(this).css('top', 'calc(50%)')
  })
  console.table(objectDragDropID);
  console.table(objectDragDrop);
})
