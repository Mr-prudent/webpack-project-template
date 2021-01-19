let shareJs = (function () {
  let hasShareDom = $('.share-btn-list').length > 0 ? true : false;
  if (!hasShareDom) {
    document.writeln('<div class="share-btn-list"><div class="share-btn facebook" data-type="facebook"></div><div class="share-btn twitter" data-type="twitter"></div><div class="share-btn linkedin" data-type="linkedin"></div><div class="share-btn pinterest" data-type="pinterest"></div></div>');
  }
  $(function () {
    if (hasShareDom) {
      $('.share-btn-list').html('<div class="share-btn facebook" data-type="facebook"></div><div class="share-btn twitter" data-type="twitter"></div><div class="share-btn linkedin" data-type="linkedin"></div><div class="share-btn pinterest" data-type="pinterest"></div>');
    }
    $('.share-btn').on('click', function () {
      const shareUrl = window.location.href;
      const shareType = $(this).data('type');
      const metaData = {
        url: shareUrl,
        origin: location.origin,
        title: getMetaContentByName('title') || document.title || '',
        source: getMetaContentByName('site_name') || document.title || '',
        description: getMetaContentByName('description') || '',
        image: getMetaContentByName('image') || ''
      };

      let goUrl = makeUrl(shareType, metaData);
      openUrl(goUrl);
    })
  });
  function makeUrl(type, metaData) {
    let resultUrl;
    switch (type) {
      case 'facebook':
        resultUrl = `https://www.facebook.com/sharer/sharer.php?kid_directed_site=0&u=${metaData.url}`;
        break;
      case 'twitter':
        resultUrl = `https://twitter.com/intent/tweet?text=${metaData.title}&url=${metaData.url}&via=${metaData.origin}`;
        break;
      case 'linkedin':
        resultUrl = `http://www.linkedin.com/shareArticle?mini=true&ro=true&title=${metaData.title}&url=${metaData.url}&summary=${metaData.description}&source=${metaData.source}&armin=armin`;
        break;
      case 'pinterest':
        resultUrl = `http://www.pinterest.com/pin/create/button/?url=${metaData.url}&media=${metaData.image}&description=${metaData.description}`;
        break;
    }
    return resultUrl;
  }
  function openUrl(url) {
    // 窗口大小：
    const iHeight = 800;
    const iWidth = 600;

    let iTop = (window.screen.availHeight - 30 - iHeight) / 2;
    let iLeft = (window.screen.availWidth - 10 - iWidth) / 2;
    window.open(url, 'newwindow', `height=${iHeight},width=${iWidth},top=${iTop},left=${iLeft},resizable=yes,location=no,status=no`)
  }
  function getMetaContentByName(name) {
    let content = '';
    $('meta').each(function () {
      if ($(this).attr('property') === `og:${name}`) {
        content = $(this).attr('content');
      }
    })
    return content;
  }
})();