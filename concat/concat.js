"use strict";

!function (e) {
  function a() {
    100 < e("#mainNav").offset().top ? e("#mainNav").addClass("navbar-shrink") : e("#mainNav").removeClass("navbar-shrink");
  }

  e('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
    if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
      var a = e(this.hash);
      if ((a = a.length ? a : e("[name=" + this.hash.slice(1) + "]")).length) return e("html, body").animate({
        scrollTop: a.offset().top - 70
      }, 1e3, "easeInOutExpo"), !1;
    }
  }), e(".js-scroll-trigger").click(function () {
    e(".navbar-collapse").collapse("hide");
  }), e("body").scrollspy({
    target: "#mainNav",
    offset: 100
  }), a(), e(window).scroll(a);
}(jQuery), function (e) {
  e('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
    if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
      var a = e(this.hash);
      if ((a = a.length ? a : e("[name=" + this.hash.slice(1) + "]")).length) return e("html, body").animate({
        scrollTop: a.offset().top - 70
      }, 1e3, "easeInOutExpo"), !1;
    }
  }), e(".js-scroll-trigger").click(function () {
    e(".navbar-collapse").collapse("hide");
  }), e("body").scrollspy({
    target: "#mainNav",
    offset: 100
  });

  function a() {
    100 < e("#mainNav").offset().top ? e("#mainNav").addClass("navbar-shrink") : e("#mainNav").removeClass("navbar-shrink");
  }

  a(), e(window).scroll(a);
}(jQuery);
"use strict";

var Pageflip = function (fn) {
  'use strict';

  fn = function fn(mainElement, pages) {
    this.pages = pages;
    this.audioUrl = 'page-flip.mp3';
    this.transitionMs = 500;
    this.hasPrevPage = false;
    this.hasNextPage = true;
    this.leftHiddenPage = -3;
    this.leftOverleaf = -2;
    this.leftPage = -1;
    this.rightPage = 0;
    this.rightOverleaf = 1;
    this.rightHiddenPage = 2;

    var _this = this;

    this._el(mainElement).element.innerHTML = "\n        <div id=\"page-flip\"><span class='page-flip-loader'></span></div>\n      ";
    this.preloadPages(function () {
      _this.preloadAudio();

      _this.buildMarkup(mainElement);

      _this.renderPages();

      _this.addClickOnGrabbers();
    });
  };

  fn.prototype.preloadPages = function (callback) {
    var _this = this,
        images = [],
        loaded = 0;

    for (var i = 0; i < this.pages.length; i++) {
      images[i] = new Image();

      images[i].onload = function () {
        if (++loaded === _this.pages.length) callback();
      };

      images[i].src = _this.pages[i];
    }
  };

  fn.prototype.preloadAudio = function () {
    this.audio = new Audio();
    this.audio.preload = 'auto';
    this.audio.src = this.audioUrl;
  };

  fn.prototype.organizePages = function (direction) {
    var _this = this,
        $pageLeft = this._el('.page-left'),
        $pageRight = this._el('.page-right');

    if (direction === 'prev') {
      if (this.leftHiddenPage <= -1) {
        $pageLeft.addClass('reduce-to-left');
      }

      this.addPage(this.leftHiddenPage, '.hidden-left-page');
      this.addPage(this.leftOverleaf, '.prev-page');
      this.leftHiddenPage -= 2;
      this.leftOverleaf -= 2;
      this.leftPage -= 2;
      this.rightPage -= 2;
      this.rightOverleaf -= 2;
      this.rightHiddenPage -= 2;
    } else {
      if (this.rightHiddenPage >= this.pages.length) {
        $pageRight.addClass('reduce-to-right');
      }

      this.addPage(this.rightHiddenPage, '.hidden-right-page');
      this.addPage(this.rightOverleaf, '.next-page');
      this.leftHiddenPage += 2;
      this.leftOverleaf += 2;
      this.leftPage += 2;
      this.rightPage += 2;
      this.rightOverleaf += 2;
      this.rightHiddenPage += 2;
    }

    if (this.leftOverleaf <= -1) {
      $pageLeft.addClass('disable-click');
      this.hasPrevPage = false;
    } else {
      $pageLeft.removeClass('disable-click');
      this.hasPrevPage = true;
    }

    if (this.rightOverleaf > this.pages.length) {
      $pageRight.addClass('disable-click');
      this.hasNextPage = false;
    } else {
      $pageRight.removeClass('disable-click');
      this.hasNextPage = true;
    }

    this.delayTransition(function () {
      _this.renderPages();
    });
  };

  fn.prototype.renderPages = function () {
    this.addPage(this.leftPage, '.page-left');
    this.addPage(this.rightPage, '.page-right');
  };

  fn.prototype.addClickOnGrabbers = function () {
    var _this = this,
        $leftGrabber = this._el('.page-left .page-grabber').element,
        $rightGrabber = this._el('.page-right .page-grabber').element;

    $leftGrabber.addEventListener('click', function () {
      _this.leftGrabberOnClick();
    }, false);
    $rightGrabber.addEventListener('click', function () {
      _this.rightGrabberOnClick();
    }, false);

    this._el('.page-left').addClass('disable-click');
  };

  fn.prototype.leftGrabberOnClick = function () {
    if (!this.hasPrevPage && !this.isTurningPage) return;
    this.audio.play();
    this.isTurningPage = true;

    var _this = this,
        $prevPage = this._el('.prev-page'),
        $leftBrightness = this._el('.left-brightness'),
        $hiddenLeftPage = this._el('.hidden-left-page'),
        $pageGrabber = this._el('.page-grabber');

    $prevPage.addClass('turning-prev-page');
    $leftBrightness.addClass('turning-right');
    $hiddenLeftPage.addClass('show-hidden-left-page');
    $pageGrabber.addClass('hide-page-fold');

    _this.organizePages('prev');

    this.delayTransition(function () {
      $prevPage.removeClass('turning-prev-page');
      $leftBrightness.removeClass('turning-right');
      $hiddenLeftPage.removeClass('show-hidden-left-page');
      $pageGrabber.removeClass('hide-page-fold');

      _this._el('.page-left').removeClass('reduce-to-left');

      _this.reset();
    });
  };

  fn.prototype.rightGrabberOnClick = function () {
    if (!this.hasNextPage && !this.isTurningPage) return;
    this.audio.play();
    this.isTurningPage = true;

    var _this = this,
        $nextPage = this._el('.next-page'),
        $rightBrightness = this._el('.right-brightness'),
        $hiddenRightPage = this._el('.hidden-right-page'),
        $pageGrabber = this._el('.page-grabber');

    $nextPage.addClass('turning-next-page');
    $rightBrightness.addClass('turning-left');
    $hiddenRightPage.addClass('show-hidden-right-page');
    $pageGrabber.addClass('hide-page-fold');

    _this.organizePages('next');

    this.delayTransition(function () {
      $nextPage.removeClass('turning-next-page');
      $rightBrightness.removeClass('turning-left');
      $hiddenRightPage.removeClass('show-hidden-right-page');
      $pageGrabber.removeClass('hide-page-fold');

      _this._el('.page-right').removeClass('reduce-to-right');

      _this.reset();
    });
  };

  fn.prototype.delayTransition = function (callback) {
    setTimeout(function () {
      callback();
    }, this.transitionMs);
  };

  fn.prototype.addPage = function (page, selector) {
    if (this.pages[page] !== undefined) {
      this._el(selector).element.style.backgroundImage = 'url("' + this.pages[page] + '")';
    } else {
      this._el(selector).element.style.backgroundImage = null;
    }
  };

  fn.prototype.reset = function () {
    this.audio.pause();
    this.audio.currentTime = 0;
    this.isTurningPage = false;
  };

  fn.prototype.buildMarkup = function (mainElement) {
    this._el('#page-flip').element.innerHTML = "\n        <div class=\"pages-container\">\n          <div class=\"hidden-left-page\"></div>\n          <div class=\"left-brightness\"></div>\n          <div class=\"prev-page\"></div>\n          <div class=\"page-left\">\n            <div class=\"page-grabber\">\n              <div class=\"page-fold\"></div>\n            </div>\n            <div class=\"page-middle\"></div>\n          </div>\n          <div class=\"page-right\">\n            <div class=\"page-middle\"></div>\n            <div class=\"page-grabber\">\n              <div class=\"page-fold\"></div>\n            </div>\n          </div>\n          <div class=\"next-page\"></div>\n          <div class=\"right-brightness\"></div>\n          <div class=\"hidden-right-page\"></div>\n        </div>\n      ";
  };

  fn.prototype._el = function (selector) {
    this.element;
    return {
      element: document.querySelector(selector),
      addClass: function addClass(className) {
        this.element.classList.add(className);
        return this;
      },
      removeClass: function removeClass(className) {
        this.element.classList.remove(className);
        return this;
      }
    };
  };

  return fn;
}(function () {});
"use strict";

/*!
    * Start Bootstrap - Grayscale v6.0.3 (https://startbootstrap.com/theme/grayscale)
    * Copyright 2013-2020 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-grayscale/blob/master/LICENSE)
    */
(function ($) {
  "use strict"; // Start of use strict
  // Smooth scrolling using jQuery easing

  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
    if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");

      if (target.length) {
        $("html, body").animate({
          scrollTop: target.offset().top - 70
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  }); // Closes responsive menu when a scroll trigger link is clicked

  $(".js-scroll-trigger").click(function () {
    $(".navbar-collapse").collapse("hide");
  }); // Activate scrollspy to add active class to navbar items on scroll

  $("body").scrollspy({
    target: "#mainNav",
    offset: 100
  }); // Collapse Navbar

  var navbarCollapse = function navbarCollapse() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  }; // Collapse now if page is not at top


  navbarCollapse(); // Collapse the navbar when page is scrolled

  $(window).scroll(navbarCollapse);
})(jQuery); // End of use strict