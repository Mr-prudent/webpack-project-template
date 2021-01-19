$(function () {
  getProductList();
  addBtnHandle();
  $('.compare-panel .close').click(function () {
    $(".compare-panel").slideUp();
  });

  $(".compare-panel .clear-all").click(function () {
    let productList = [];
    let cacheList = localStorage.getItem('productCachePC');
    if (cacheList != null) {
      productList = JSON.parse(cacheList);
    }
    productList.forEach((item) => {
      $(`.compare-action.pro-id-${item.id}`).html(`<input class="compare-action-check" type="checkbox"> <label class="checkLabel"></label> <span>Add to Inquiry</span>`)
      $(`.compare-action.pro-id-${item.id}`).attr('onclick', 'addCache(this)');
    });
    localStorage.clear("productCachePC");
    getProductList();
  });

  $('.compare-panel .contact-button').click(function () {
    window.location = ('http'+'://' + window.location.hostname + '/inquiry');
  })
})

function addCache(el) {
  let productList = [];
  let proData = {
    id: null,
    url: '',
    image: '',
    name: ''
  };
  let proIdClass = $(el).attr('class').split(' ')[1];
  let elFaDom = $(el).parents(`.${proIdClass}`)[0];
  $(elFaDom).addClass('pro-checked');
  proData.id = parseInt(proIdClass.split('-')[2]);
  proData.url = $(elFaDom).find('a').attr('href');
  proData.image = $(elFaDom).find('img').attr('src');
  proData.name = $(elFaDom).find('.pro-name').text();
  $(el).parents(`.${proIdClass}`)[1];
  let cacheList = localStorage.getItem('productCachePC');
  if (cacheList !== null) {
    productList = JSON.parse(cacheList);
  }

  if (productList.length >= 5) {
    toastr.warning("The number of products is limited to five or less.");
    getProductList();
    return;
  }

  let hasPro = productList.some((item) => item.id == proData.id);

  if (!hasPro) {
    productList.unshift(proData);
    localStorage.setItem('productCachePC', JSON.stringify(productList));
  }
  $(el).html(`<input class="compare-action-check" type="checkbox" checked> <label class="checkLabel"></label> <span>Added to Inquiry</span>`);
  $(el).attr('onclick', 'removeCache(this)')
  getProductList();
}

function removeCache(el) {
  let proIdClass = $(el).attr('class').split(' ')[1];
  let elFaDom = $(el).parents(`.${proIdClass}`)[0];
  $(elFaDom).removeClass('pro-checked');
  let proId = parseInt(proIdClass.split('-')[2]);
  let productList = [];
  let cacheList = localStorage.getItem('productCachePC');
  if (cacheList !== null) {
    productList = JSON.parse(cacheList);
  }
  productList.forEach((item, index) => {
    if (item.id == proId) {
      productList.splice(index, 1);
      localStorage.setItem('productCachePC', JSON.stringify(productList));
    }
  });
  $(`li.pro-id-${proId} .compare-action`).html('<input class="compare-action-check" type="checkbox"> <label class="checkLabel"></label> <span>Add to Inquiry</span>');
  $(`li.pro-id-${proId} .compare-action`).attr('onclick', 'addCache(this)');
  getProductList();
}

function getProductList() {
  $("#productChache_listPC").html('');
  let productList = [];
  let cacheList = localStorage.getItem('productCachePC');
  if (cacheList !== null) {
    productList = JSON.parse(cacheList);
  }
  if (productList.length > 0) {
    $(".compare-panel").slideDown();
  } else {
    $(".compare-panel").slideUp();
  }
  let addWrap = $('<div class="selected-all"></div>')
  $('.prolist-0 li, .prolist-1 li').removeClass('pro-checked');
  productList.forEach((item) => {
    $(`li.pro-id-${item.id}`).addClass('pro-checked');
    let addDom = `<div class="selected-item"><div class="item-box"><div class="item-clear"><i class="ic-close pro-id-${item.id}" onclick="removeCache(this)"></i></div><a class="item-content" href="${item.url}"><div class="item-img"><img src="${item.image}" alt="${item.name}"></div><div class="item-title">${item.name}</div></a></div></div>`
    addWrap.append(addDom);
  })
  $("#productChache_listPC").append(addWrap);
  $(".compare-checked").html(productList.length);
}

function addBtnHandle() {
  let productList = [];
  let cacheList = localStorage.getItem('productCachePC');
  if (cacheList != null) {
    productList = JSON.parse(cacheList);
  }
  productList.forEach((item) => {
    $(`.compare-action.pro-id-${item.id}`).html(`<input class="compare-action-check" type="checkbox" checked> <label class="checkLabel"></label> <span>Added to Inquiry</span>`);
    $(`.compare-action.pro-id-${item.id}`).attr('onclick', 'removeCache(this)');
  });
}