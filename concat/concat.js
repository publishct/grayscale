"use strict";

!function (a) {
  function e() {
    100 < a("#mainNav").offset().top ? a("#mainNav").addClass("navbar-shrink") : a("#mainNav").removeClass("navbar-shrink");
  }

  a('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
    if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
      var e = a(this.hash);
      if ((e = e.length ? e : a("[name=" + this.hash.slice(1) + "]")).length) return a("html, body").animate({
        scrollTop: e.offset().top - 70
      }, 1e3, "easeInOutExpo"), !1;
    }
  }), a(".js-scroll-trigger").click(function () {
    a(".navbar-collapse").collapse("hide");
  }), a("body").scrollspy({
    target: "#mainNav",
    offset: 100
  }), e(), a(window).scroll(e);
}(jQuery), function (a) {
  function e() {
    100 < a("#mainNav").offset().top ? a("#mainNav").addClass("navbar-shrink") : a("#mainNav").removeClass("navbar-shrink");
  }

  a('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
    if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
      var e = a(this.hash);
      if ((e = e.length ? e : a("[name=" + this.hash.slice(1) + "]")).length) return a("html, body").animate({
        scrollTop: e.offset().top - 70
      }, 1e3, "easeInOutExpo"), !1;
    }
  }), a(".js-scroll-trigger").click(function () {
    a(".navbar-collapse").collapse("hide");
  }), a("body").scrollspy({
    target: "#mainNav",
    offset: 100
  }), e(), a(window).scroll(e);
}(jQuery);

var Pageflip = function (e) {
  return (e = function e(_e, a) {
    this.pages = a, this.audioUrl = "page-flip.mp3", this.transitionMs = 500, this.hasPrevPage = !1, this.hasNextPage = !0, this.leftHiddenPage = -3, this.leftOverleaf = -2, this.leftPage = -1, this.rightPage = 0, this.rightOverleaf = 1, this.rightHiddenPage = 2;
    var i = this;
    this._el(_e).element.innerHTML = "\n        <div id=\"page-flip\"><span class='page-flip-loader'></span></div>\n      ", this.preloadPages(function () {
      i.preloadAudio(), i.buildMarkup(_e), i.renderPages(), i.addClickOnGrabbers();
    });
  }).prototype.preloadPages = function (e) {
    for (var a = this, i = [], t = 0, s = 0; s < this.pages.length; s++) {
      i[s] = new Image(), i[s].onload = function () {
        ++t === a.pages.length && e();
      }, i[s].src = a.pages[s];
    }
  }, e.prototype.preloadAudio = function () {
    this.audio = new Audio(), this.audio.preload = "auto", this.audio.src = this.audioUrl;
  }, e.prototype.organizePages = function (e) {
    var a = this,
        i = this._el(".page-left"),
        t = this._el(".page-right");

    "prev" === e ? (this.leftHiddenPage <= -1 && i.addClass("reduce-to-left"), this.addPage(this.leftHiddenPage, ".hidden-left-page"), this.addPage(this.leftOverleaf, ".prev-page"), this.leftHiddenPage -= 2, this.leftOverleaf -= 2, this.leftPage -= 2, this.rightPage -= 2, this.rightOverleaf -= 2, this.rightHiddenPage -= 2) : (this.rightHiddenPage >= this.pages.length && t.addClass("reduce-to-right"), this.addPage(this.rightHiddenPage, ".hidden-right-page"), this.addPage(this.rightOverleaf, ".next-page"), this.leftHiddenPage += 2, this.leftOverleaf += 2, this.leftPage += 2, this.rightPage += 2, this.rightOverleaf += 2, this.rightHiddenPage += 2), this.leftOverleaf <= -1 ? (i.addClass("disable-click"), this.hasPrevPage = !1) : (i.removeClass("disable-click"), this.hasPrevPage = !0), this.rightOverleaf > this.pages.length ? (t.addClass("disable-click"), this.hasNextPage = !1) : (t.removeClass("disable-click"), this.hasNextPage = !0), this.delayTransition(function () {
      a.renderPages();
    });
  }, e.prototype.renderPages = function () {
    this.addPage(this.leftPage, ".page-left"), this.addPage(this.rightPage, ".page-right");
  }, e.prototype.addClickOnGrabbers = function () {
    var e = this,
        a = this._el(".page-left .page-grabber").element,
        i = this._el(".page-right .page-grabber").element;

    a.addEventListener("click", function () {
      e.leftGrabberOnClick();
    }, !1), i.addEventListener("click", function () {
      e.rightGrabberOnClick();
    }, !1), this._el(".page-left").addClass("disable-click");
  }, e.prototype.leftGrabberOnClick = function () {
    var e, a, i, t, s;
    (this.hasPrevPage || this.isTurningPage) && (this.audio.play(), this.isTurningPage = !0, a = (e = this)._el(".prev-page"), i = this._el(".left-brightness"), t = this._el(".hidden-left-page"), s = this._el(".page-grabber"), a.addClass("turning-prev-page"), i.addClass("turning-right"), t.addClass("show-hidden-left-page"), s.addClass("hide-page-fold"), e.organizePages("prev"), this.delayTransition(function () {
      a.removeClass("turning-prev-page"), i.removeClass("turning-right"), t.removeClass("show-hidden-left-page"), s.removeClass("hide-page-fold"), e._el(".page-left").removeClass("reduce-to-left"), e.reset();
    }));
  }, e.prototype.rightGrabberOnClick = function () {
    var e, a, i, t, s;
    (this.hasNextPage || this.isTurningPage) && (this.audio.play(), this.isTurningPage = !0, a = (e = this)._el(".next-page"), i = this._el(".right-brightness"), t = this._el(".hidden-right-page"), s = this._el(".page-grabber"), a.addClass("turning-next-page"), i.addClass("turning-left"), t.addClass("show-hidden-right-page"), s.addClass("hide-page-fold"), e.organizePages("next"), this.delayTransition(function () {
      a.removeClass("turning-next-page"), i.removeClass("turning-left"), t.removeClass("show-hidden-right-page"), s.removeClass("hide-page-fold"), e._el(".page-right").removeClass("reduce-to-right"), e.reset();
    }));
  }, e.prototype.delayTransition = function (e) {
    setTimeout(function () {
      e();
    }, this.transitionMs);
  }, e.prototype.addPage = function (e, a) {
    void 0 !== this.pages[e] ? this._el(a).element.style.backgroundImage = 'url("' + this.pages[e] + '")' : this._el(a).element.style.backgroundImage = null;
  }, e.prototype.reset = function () {
    this.audio.pause(), this.audio.currentTime = 0, this.isTurningPage = !1;
  }, e.prototype.buildMarkup = function (e) {
    this._el("#page-flip").element.innerHTML = '\n        <div class="pages-container">\n          <div class="hidden-left-page"></div>\n          <div class="left-brightness"></div>\n          <div class="prev-page"></div>\n          <div class="page-left">\n            <div class="page-grabber">\n              <div class="page-fold"></div>\n            </div>\n            <div class="page-middle"></div>\n          </div>\n          <div class="page-right">\n            <div class="page-middle"></div>\n            <div class="page-grabber">\n              <div class="page-fold"></div>\n            </div>\n          </div>\n          <div class="next-page"></div>\n          <div class="right-brightness"></div>\n          <div class="hidden-right-page"></div>\n        </div>\n      ';
  }, e.prototype._el = function (e) {
    return this.element, {
      element: document.querySelector(e),
      addClass: function addClass(e) {
        return this.element.classList.add(e), this;
      },
      removeClass: function removeClass(e) {
        return this.element.classList.remove(e), this;
      }
    };
  }, e;
}();

!function (a) {
  a('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
    if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
      var e = a(this.hash);
      if ((e = e.length ? e : a("[name=" + this.hash.slice(1) + "]")).length) return a("html, body").animate({
        scrollTop: e.offset().top - 70
      }, 1e3, "easeInOutExpo"), !1;
    }
  }), a(".js-scroll-trigger").click(function () {
    a(".navbar-collapse").collapse("hide");
  }), a("body").scrollspy({
    target: "#mainNav",
    offset: 100
  });

  function e() {
    100 < a("#mainNav").offset().top ? a("#mainNav").addClass("navbar-shrink") : a("#mainNav").removeClass("navbar-shrink");
  }

  e(), a(window).scroll(e);
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