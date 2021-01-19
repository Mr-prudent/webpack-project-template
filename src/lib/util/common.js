// 公共方法
import { browserType } from './tools';
import { debounce } from '../util/tools';

export const displaySubMenu = (e) => {
  let result = browserType();
  if (!result) {
    $(e).find('.submenu').css('transform', 'rotateX(0)');
    $(e).find('.submenu').css('opacity', '1');
    // PC端
  } else {
    return;
  }
};

export const hideSubMenu = (e) => {
  let result = browserType();
  if (!result) {
    // PC端
    $(e).find('.submenu').css('transform', 'rotateX(90deg)');
    $(e).find('.submenu').css('opacity', '0');
  } else {
    return;
  }
};

export const preview = () => {
    const viewNum = 5;
    const moveNum = 1;
    const moveTime = 400;

    // 获取元素和数据
    let thumbnailBoxItem = $('.thumbnail-box .wrapper .item');
    let thumbnailBox = $('.thumbnail-box');
    let thumbnailBoxWrapper = $('.thumbnail-box .wrapper');
    let thumbnailBoxNextBtn = $('.thumbnail-box a.btn.btn-next');
    let thumbnailBoxPrevBtn = $('.thumbnail-box a.btn.btn-prev');
    let bigBox = $('.preview-container .big-box');
    let bigBoxImg = bigBox.find('img');
    let smallBox = $('.preview-container .small-box');
    let smallBoxMask = $('.preview-container .small-box .hover');
    let picNum = thumbnailBoxItem.length;

    // 相关数据计算
    let tempLength = 0;
    let moveLength = thumbnailBoxItem.eq(0).outerWidth(true) * moveNum;
    let countLength = (picNum - viewNum) * moveLength;

    if (picNum == 0) {
      bigBox.remove();
      thumbnailBox.remove();
      smallBoxMask.remove();
    }

    if (countLength < 5) {
      $(".thumbnail-box a.btn.btn-prev").addClass("btn-prev_disabled");
      $(".thumbnail-box a.btn.btn-next").addClass("btn_next_disabled");
    } else {
      $(".thumbnail-box a.btn.btn-next").removeClass("btn_next_disabled")
    }

    // 点击下一张
    thumbnailBoxNextBtn.on('click', function () {
      if (tempLength < countLength) {
        if ((countLength - tempLength) > moveLength) {
          thumbnailBoxWrapper.animate({ marginLeft: "-=" + moveLength + "px" }, moveTime);
          tempLength += moveLength;
        } else {
          thumbnailBoxWrapper.animate({ marginLeft: "-=" + (countLength - tempLength) + "px" }, moveTime);
          tempLength += (countLength - tempLength);
        }
      }
      if (countLength > viewNum) {
        $(".btn-prev").removeClass("btn_prev_disabled");
      }
      if (tempLength == countLength) {
        $(".btn-next").addClass("btn_next_disabled")
      }
    })

    // 点击上一张
    thumbnailBoxPrevBtn.on('click', function () {
      if (tempLength > 0) {
        if (tempLength > moveLength) {
          thumbnailBoxWrapper.animate({ marginLeft: "+=" + moveLength + "px" }, moveTime);
          tempLength -= moveLength;
        } else {
          thumbnailBoxWrapper.animate({ marginLeft: "+=" + tempLength + "px" }, moveTime);
          tempLength = 0;
        }
      }
      if (tempLength < countLength) {
        $(".btn-next").removeClass("btn_next_disabled")
      }
      //当上一张图片为第一张，上一张按钮不可点击
      if (tempLength == 0) {
        $(".btn-prev").addClass("btn_prev_disabled")
      }
    })

    // 选择图片
    thumbnailBoxItem.on('mouseenter', function () {
      thumbnailBoxItem.removeClass('item-cur');
      let hoverItem = $(this);
      hoverItem.addClass('item-cur');
      smallBox.find('img').attr('src', hoverItem.find('img').attr('src'));
      bigBox.find('img').attr('src', hoverItem.find('img').attr('src'));
    })

    smallBox.on('mouseenter', function () {
      bigBox.fadeIn(200);
      smallBoxMask.fadeIn(200);

      // *鼠标移动事件
      $(this).on('mousemove', function (e) {
        let offsetPosition = {
          left: e.clientX - $(this).offset().left - smallBoxMask.width() / 2,
          top: e.clientY - $(this).offset().top - smallBoxMask.height() / 2 + $(window).scrollTop()
        };
        if (offsetPosition.left < 0) {
          offsetPosition.left = 0;
        } else if (offsetPosition.left > $(this).width() - smallBoxMask.width()) {
          offsetPosition.left = $(this).width() - smallBoxMask.width();
        }

        if (offsetPosition.top < 0) {
          offsetPosition.top = 0;
        } else if (offsetPosition.top > $(this).height() - smallBoxMask.height()) {
          offsetPosition.top = $(this).height() - smallBoxMask.height();
        }
        smallBoxMask.css(offsetPosition);
        let scaleX = smallBoxMask.position().left / (smallBox.width() - smallBoxMask.width());
        let scaleY = smallBoxMask.position().top / (smallBox.height() - smallBoxMask.height());
        let scroll_l = scaleX * (bigBoxImg.width() - bigBox.width());
        let scroll_t = scaleY * (bigBoxImg.height() - bigBox.height());

        bigBox.scrollLeft(scroll_l).scrollTop(scroll_t);
      })
    })

    smallBox.on('mouseleave', function () {
      bigBox.fadeOut(200);
      smallBox.find('.hover').fadeOut(200);
    })
};

export const PSearch = () => {
  let e = $.trim($("#txtSearch").val());
  return "" == e ? (toastr.warning("Please enter product name!")) : !(e.length <= 1) && (!(e.indexOf("<") > -1 || e.indexOf(">") > -1) && (e = e.replace("/", "XieXian"), void (location.href = "http://" + document.domain + "/search/" + encodeURIComponent(e.replace(/\+/g, "((()))")) + ".html")))
}