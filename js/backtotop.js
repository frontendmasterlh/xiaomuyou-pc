(function () {
  var backtotop = document.getElementById("backtotop");

  var timer;

  // 监听返回顶部的点击
  backtotop.onclick = function () {
    clearInterval(timer);
    timer = setInterval(() => {
      document.documentElement.scrollTop -= 100;

      if (document.documentElement.scrollTop <= 0) {
        clearInterval(timer);
      }
    }, 20);
  };

  //   监听页面滚动
  window.onscroll = function () {
    //   卷动值
    var scrollTop = document.documentElement.scrollTop || window.scrollY;

    if (scrollTop == 0) {
      backtotop.style.display = "none";
    } else {
      backtotop.style.display = "block";
    }
  };
})();
