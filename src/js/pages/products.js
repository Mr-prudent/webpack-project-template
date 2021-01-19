import { browserType } from '../../lib/util/tools.js';

$('.pro-filter, .products-content .filter-box').on('mouseenter', function () {
  displayFilterBox();
})

$('.pro-filter, .products-content .filter-box').on('mouseleave', function () {
  hideFilterBox();
})

function hideFilterBox() {
  if (!browserType()) {
    $('.products-content .filter-box').css({
      'transform': 'rotateX(90deg)',
      'opacity': '0'
    });
  }
}

function displayFilterBox() {
  if (!browserType()) {
    $('.products-content .filter-box').css({
      'transform': 'rotateX(0)',
      'opacity': '1'
    });
  }
}

let innerHeight = $('.pro-type-list').innerHeight();
let containerHeight = $('.filter-box').height();

if (innerHeight > containerHeight) {
  $('.filter-box').on('scroll', function (e) {
    if (true) {
      if (e.target.scrollTop > 5) {
        $('.filter-box .scrollTip').fadeOut(300);
      } else {
        $('.filter-box .scrollTip').fadeIn(300);
      }
    }
  })
} else {
  $('.filter-box .scrollTip').hide();
}

$(function () {

  if ($('.pro-type-list>ul li').length == 0) {
    $('.pro-filter, .filter-box').remove();
  }

  if (browserType()) {
    const letterReg = /[a-z]/i
    $('.common-pages span, .common-pages a').each(function () {
      if (letterReg.test($(this).text())) {
        $(this).remove();
      }
    })
  }

  if ($('.seo-key').length > 0 && $('.seo-key').text().trim() == '') {
    $('.seo-key').remove()
  }
})