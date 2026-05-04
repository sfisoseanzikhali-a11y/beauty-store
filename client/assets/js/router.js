(function () {
  const page = window.location.pathname
    .replace(/\.html$/, '')
    .replace(/^\//, '') || 'index';

  function load(src, cb) {
    const s = document.createElement('script');
    s.src = src;
    if (cb) s.onload = cb;
    document.head.appendChild(s);
  }

  function withCart(pageFile) {
    load('/assets/js/cart.js', function () {
      load('/assets/js/pages/' + pageFile + '.js');
    });
  }

  if (page === '' || page === 'index') {
    load('/assets/js/pages/home.js');
  } else if (page === 'cart') {
    withCart('cart-page');
  } else if (page === 'checkout') {
    withCart('checkout');
  } else if (page === 'product') {
    withCart('product');
  } else if (page === 'order-success') {
    load('/assets/js/pages/order-success.js');
  } else {
    load('/assets/js/pages/home.js');
  }
})();
