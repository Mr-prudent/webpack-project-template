'use strict';
function ownKeys(e, t) {
  var n,
    r = Object.keys(e);
  return (
    Object.getOwnPropertySymbols &&
      ((n = Object.getOwnPropertySymbols(e)),
      t &&
        (n = n.filter(function (t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable;
        })),
      r.push.apply(r, n)),
    r
  );
}
function _objectSpread(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = null != arguments[t] ? arguments[t] : {};
    t % 2
      ? ownKeys(Object(n), !0).forEach(function (t) {
          _defineProperty(e, t, n[t]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
      : ownKeys(Object(n)).forEach(function (t) {
          Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
        });
  }
  return e;
}
function _defineProperty(t, e, n) {
  return (
    e in t
      ? Object.defineProperty(t, e, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (t[e] = n),
    t
  );
}
var fbtip, sendData;
function clearForm() {
  $('#in-name').val(''),
    $('#in-email').val(''),
    $('#in-content').val(''),
    $('#in-phone').val(''),
    $('#in-title').val(''),
    $('#in-company').val('');
}
function sendInquiry() {
  var t = formValidated();
  if (($(this).attr('disabled', 'disabled'), t)) {
    var e,
      n = {
        email: $.trim($('#in-email').val()),
        name: $.trim($('#in-name').val()),
        phone: $.trim($('#in-phone').val()),
        content: $.trim($('#in-content').val()),
        title: $.trim($('#in-title').val()),
        proId: $.trim($('#productID').val()),
        company: $.trim($('#in-company').val()),
      };
    for (e in n) n[e] = escape(n[e]);
    var r = [],
      t = localStorage.getItem('productCachePC');
    '[]' != t && null != t && (r = JSON.parse(t));
    var a = '';
    r.forEach(function (t) {
      a = '' == a ? t.id : a + ',' + t.id;
    }),
      $.ajax({
        type: 'POST',
        url: '/OutOpen/AddInquiry',
        data: _objectSpread(_objectSpread({}, n), {}, { pageUrl: document.URL, proidlist: a }),
        dataType: 'json',
        error: function () {
          toastr.error($lang.msgSendFailed);
          removeLoading();
        },
        success: function (t) {
          $(this).removeAttr('disabled', 'disabled'),
            '1' == t
              ? (toastr.success($lang.msgSendSucess), clearForm())
              : '2' == t
              ? toastr.info($lang.msgSameContent)
              : '3' == t
              ? (location.href = '/Code')
              : '4' == t
              ? toastr.info($lang.msgSensitiveContent)
              : '5' == t
              ? toastr.info($lang.msgtoolongcontent)
              : '-1' == t
              ? toastr.info($lang.msgFrequentlyContent)
              : toastr.info($lang.msgSendFailed);
          endLoading();
        },
        beforeSend: function () {
          startLoading();
        },
        complete: function () {
          removeLoading();
        },
        async: !1,
      });
  }
  return !1;
}
function showAlert(t) {
  768 < $(window).width()
    ? (clearInterval(fbtip),
      $('#feedback-title').text(window.location.host),
      $('#feedback-text').text(t),
      $('.feedback-tips').fadeIn(200),
      (fbtip = setInterval(closefeedbackTips, 3e3)))
    : alert(t);
}
function closefeedbackTips() {
  $('.feedback-tips').fadeOut(200);
}
function formValidated() {
  var t = !0;
  return (
    $('.inquiry-form input, .inquiry-form textarea').each(function () {
      $(this).validate() || (t = !1);
    }),
    t
  );
}

function startLoading() {
  NProgress.start();
}
function endLoading() {
  NProgress.done();
}
function removeLoading() {
  NProgress.done();
  NProgress.remove();
}
$(function () {
  $('.inquiry-form input, .inquiry-form textarea').on('blur', function () {
    $(this).validate();
  }),
    $('.send-inquiry .send-btn').on('click', function () {
      sendInquiry();
    });
}),
  ($.fn.validate = function () {
    var t = !0,
      e = $(this).attr('id'),
      n = $(this).val();
    return (
      'in-email' == e
        ? '' === n
          ? ((t = !1), $(this).addClass('input-error'), toastr.warning($lang.msgInputEmail))
          : /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(n)
          ? $(this).removeClass('input-error')
          : ((t = !1), $(this).addClass('input-error'), toastr.warning($lang.msgCheckEmail))
        : 'in-name' == e
        ? 400 < n.length
          ? (toastr.warning($lang.msgTooLongName), $(this).addClass('input-error'), (t = !1))
          : $('in-name').removeClass('input-error')
        : 'in-content' == e
        ? '' === n
          ? (toastr.warning($lang.msgInputContent), $(this).addClass('input-error'), (t = !1))
          : 2e3 < n.length
          ? (toastr.warning($lang.msgTooLongContent), $(this).addClass('input-error'), (t = !1))
          : $(this).removeClass('input-error')
        : 'in-title' == e &&
          (340 < n.length
            ? (toastr.warning($lang.msgTooLongTitle), $(this).addClass('input-error'), (t = !1))
            : $(this).removeClass('input-error')),
      t
    );
  });
