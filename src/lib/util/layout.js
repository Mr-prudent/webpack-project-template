// 布局类js, 一些依靠js实现的效果等

import $ from 'jquery';
import { browserType } from './tools';

// 粘性布局
export const stickyDom = function (el, top) {
  const elDom = $(el);
  if ($(window).scrollTop() > top) {
    elDom.css({
      'height': '60px',
      'box-shadow': '0 2px 6px rgba(0,0,0,.2)'
    });
  } else {
    elDom.css({
      'height': '80px'
    });
  }
};

// 固定布局
// TODO: 布局固定， 需改成不固定
export const fixedDom = function (el, top = 50, bottom = 100) {
  const elDom = $(el);
  let isMobile = browserType();
  if (isMobile === 1) {
    return;
  }
  if ($(window).scrollTop() > top) {
    elDom.css({
      'display': 'flex',
      'position': 'fixed',
      'bottom': `${bottom}px`,
      'right': '24px'
    });
  } else {
    elDom.css('display', 'none');
  }
}