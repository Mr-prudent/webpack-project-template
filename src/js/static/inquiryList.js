$(function () {
  setProList();
  $('.pro-item-del').on('click', function () {
    let removeId = $(this).parents('.inquiry-pro-item').data('id');
    $(this).parents('.inquiry-pro-item').remove();
    removeCache(removeId);
  })
});

function removeCache(id) {
  let productList = [];
  let cacheList = localStorage.getItem('productCachePC');
  if (cacheList != null) {
    productList = JSON.parse(cacheList);
  }
  productList.forEach((item, index) => {
    if (item.id == id) {
      productList.splice(index, 1);
      if (productList.length == 0) {
        $('.inquiry-pro-list').css('display', 'none');
      }
      localStorage.setItem('productCachePC', JSON.stringify(productList));
    }
  })
}

function setProList() {
  let productList = [];
  let cacheList = localStorage.getItem('productCachePC');
  if (cacheList != '[]' && cacheList != null) {
    productList = JSON.parse(cacheList);
    $('.inquiry-pro-list').css('display', 'block');
  }
  productList.forEach((item) => {
    $('.inquiry-pro-list').append(`<div class="inquiry-pro-item" data-id="${item.id}"><div class="pro-item-img"><a href="${item.url}"><img src="${item.image}" alt="${item.name}"></a></div><div class="pro-item-name">Product name:<p><a href="${item.url}">${item.name}</a></p></div><div class="pro-item-del"><i class="ic-close"></i></div></div>`);
  });
}