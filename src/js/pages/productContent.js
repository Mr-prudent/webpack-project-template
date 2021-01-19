import 'swiper/swiper-bundle.css';
import Swiper, { Navigation, Pagination } from 'swiper';
import { browserType } from '../../lib/util/tools.js';

Swiper.use([Navigation, Pagination]);

const swiperOption = {
  pagination: {
    el: '#gallery .swiper-pagination',
    clickable: true,
  },
  on: {
    slideChangeTransitionStart: function () {
      let i = this.activeIndex + 1;
      $(".banner-page .page-now").html(i);
    },
    init: function () {
      $('.preview-container').css('visibility', 'visible');
    }
  }
}
$(function () {
  $(".banner-page .page-all").html($('#gallery .swiper-slide').length);
  if (browserType() && $(window).width() < 768 && $('#gallery').length > 0) {
    // 移动端预览
    const productReviewSwiper = new Swiper('#gallery', swiperOption);
  }
  // 询盘页
  $('.btn.send').on('click', function () {
    let top = $('.send-inquiry').offset().top - $('header nav').height()-40
    $('html, body').animate({
      scrollTop: top,
      easing: "swing",
    }, 500);
  });

  $('.pdown2').addClass('hvr-shutter-out-vertical');
})