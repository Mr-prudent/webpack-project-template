// 引入样式
// import 'normalize.css';
// import 'animate.css';
import "../iconfont/iconfont.css";
// import '../scss/index.scss';
import "toastr/build/toastr.min.css";

// 页面js
import "./pages/home.js";
import "./pages/products.js";
import "./pages/productContent.js";
import * as toastr from "toastr";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

// 公用方法
import { fixedDom, stickyDom } from "../lib/util/layout.js";
import {
  displaySubMenu,
  hideSubMenu,
  preview,
  PSearch,
} from "../lib/util/common.js";
import { browserType, noSliding, detectOrient } from "../lib/util/tools.js";

// 引入模块
import LazyLoad from "vanilla-lazyload";
import ScrollReveal from "scrollreveal";
import BScroll from "@better-scroll/core";
import ScrollBar from "@better-scroll/scroll-bar";

toastr.options = {
  closeButton: false,
  debug: false,
  newestOnTop: false,
  progressBar: false,
  positionClass: "toast-top-center",
  preventDuplicates: false,
  onclick: null,
  showDuration: "300",
  hideDuration: "500",
  timeOut: "1300",
  extendedTimeOut: "1000",
  showEasing: "swing",
  hideEasing: "linear",
  showMethod: "fadeIn",
  hideMethod: "fadeOut",
};

window.toastr = toastr;
window.PSearch = PSearch;
window.NProgress = NProgress;
NProgress.configure({
  showSpinner: false,
  minimum: 0.2,
  easeing: "swing",
  speed: 1000,
  trickleRate: 0.2,
});
// 页面初始化后
$(function () {
  ScrollReveal().reveal(".hot-pro ul li", {
    mobile: false,
    distance: "50px",
    origin: "bottom",
    interval: 150,
    easing: "ease",
    duration: 1000,
  });
  ScrollReveal().reveal(".about-title", {
    reset: true,
    distance: "60px",
    origin: "top",
    duration: 2000,
    easing: "ease",
  });
  ScrollReveal().reveal(".common-title", {
    reset: true,
    distance: "60px",
    origin: "top",
    duration: 1500,
    easing: "ease",
  });
  ScrollReveal().reveal(".about-text", {
    reset: true,
    distance: "60px",
    origin: "bottom",
    duration: 1500,
    easing: "ease",
  });
  ScrollReveal().reveal(".news ul li", {
    distance: "50px",
    origin: "bottom",
    interval: 150,
    easing: "ease",
    duration: 1000,
  });
  // foot-item ul
  ScrollReveal().reveal(".foot-item ul", {
    reset: true,
    distance: "50px",
    origin: "bottom",
    easing: "ease",
    duration: 1000,
  });
  ScrollReveal().reveal(".banner-title", {
    reset: true,
    distance: "50px",
    origin: "top",
    duration: 1000,
    delay: 100,
  });

  ScrollReveal().reveal(".map-info td", {
    reset: true,
    interval: 30,
    delay: 80,
  });
  // 使用lazyLoad
  const lazyLoadInstance = new LazyLoad({
    element_selector: ".lazy",
  });

  // 导航栏悬浮事件
  window.displaySubMenu = displaySubMenu;
  window.hideSubMenu = hideSubMenu;

  // 点击移动至页面顶部
  $(".top-btn").css("display", "none");
  $(".top-btn").on("click", () => {
    $("html, body").animate(
      {
        scrollTop: 0,
        easing: "swing",
      },
      500
    );
  });

  // 移动端点击显示菜单
  $(".nav-btn").on("click", function () {
    $(this).toggleClass("toggle-animate");
    if ($("nav ul").css("right") != "0px") {
      $("nav>ul").animate({ right: "0" }, 300);
      $(".sm-mask").fadeIn(200);
      noSliding(true); // 禁止滑动
    } else {
      $("nav>ul").animate({ right: "-80vw" }, 300);
      $(".sm-mask").fadeOut(200);
      noSliding(false); // 允许滑动
    }
  });

  $(".sf-menu .LiLevel1 i").on("click", function () {
    $(this).toggleClass("active");
    $(this).parent().children("ul").slideToggle();
  });

  // 移动端导航栏子菜单添加符号以及点击操作, 搜索输入框显示
  if (browserType()) {
    $(".submenu")
      .parent()
      .find(">a")
      .after(
        '<i class="iconfont icon-angle-right slide-submenu" aria-hidden="true"></i>'
      );
    $("nav .slide-submenu").on("click", function () {
      $(this).next().slideToggle(300);
      $(this).toggleClass("slide-active");
    });
  }

  // 商品预览
  preview();

  // 移动端横屏提醒
  if (browserType() && $(window).width() < 768) {
    // 横屏显示提示
    detectOrient();
  }

  // 默认展开产品分类栏
  $("#liproducts").find(".slide-submenu").trigger("click");

  if (browserType() && $(window).width() < 768) {
    if ($(".pro-scroll-wrapper").length > 0) {
      BScroll.use(ScrollBar);
      // 滚动
      let bs = new BScroll(".pro-scroll-wrapper", {
        scrollX: true,
        scrollY: false,
        click: true,
        scrollbar: {
          fade: false,
          interactive: false,
        },
      });
    }
    // 移动多国语言选择框
    $('.head-nav > ul').append($('#xyz'));
    $('#xyz').css('display', 'block');
  }

  $('.xyz12 .up').on("click", function() {
    $(this).toggleClass('dp');
    $('.xyz12 ul li:nth-of-type(n+2)').slideToggle(300);
  })

  // 监听屏幕滚动事件
  $(window).on("scroll", function () {
    if (browserType() === 0) {
      stickyDom(".head", 50);
      fixedDom(".top-btn", 500);
    }
    if ($(window).scrollTop() > 100) {
      $(".mobile-bottom").css({
        position: "fixed",
        bottom: "0",
      });
      if (browserType() === 1) {
        $(".compare-panel").css("bottom", "16vw");
      }
    } else {
      $(".mobile-bottom").css({
        position: "static",
      });
      $(".compare-panel").css("bottom", "0");
    }
    let headHeight = $(".head").height();
    // if (
    //   $(".common-side").length > 0 &&
    //   $(window).scrollTop() + headHeight > $(".common-side").offset().top
    // ) {
    //   let domWidth = $(".common-side").outerWidth();
    //   let domLeft = $(".common-side").offset().left;
    //   if ($(".side-float").length <= 0) {
    //     let sideDom = $('<div class="side-float"></div>');
    //     $("body").append(sideDom);
    //   }
    //   if ($(".side-float > div").length <= 0) {
    //     $('.side-float').append($(".common-side > div"));
    //     $(".side-float").css({
    //       position: "fixed",
    //       top: `${headHeight}px`,
    //       left: `${domLeft}px`,
    //       width: `${domWidth}px`,
    //     });
    //   }
    // } else {
    //   $(".common-side").append($(".side-float > div"));
    // }
  });
});
