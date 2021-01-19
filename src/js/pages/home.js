import 'swiper/swiper-bundle.css';
import Swiper, { Navigation, Pagination, Lazy, Autoplay } from 'swiper';
import { browserType } from '../../lib/util/tools.js';

Swiper.use([Navigation, Pagination, Lazy, Autoplay]);

$(function () {
  // 使用swiper
  const mySwiper = new Swiper('#swiper-banner', {
    loop: true,
    pagination: {
      el: '.swiper-pagination',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    autoplay: {
      delay: 3000,
    },
  });

  let partSwiperOption = {
    autoplay: true,
    loop: true,
    slidesPerView: 4,
    slidesPerGroup: 4,
    spaceBetween: 50,
    pagination: {
      el: '.swiper-part-pagination',
    },
    lazy: true
  }

  if (browserType() && $(window).width() <= 768) {
    partSwiperOption.slidesPerView = 2;
    partSwiperOption.slidesPerGroup = 2;
    partSwiperOption.spaceBetween = 10;
  }

  // swiper-part
  const myPartSwiper = new Swiper('#swiper-part', partSwiperOption);
})
