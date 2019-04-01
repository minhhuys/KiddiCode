(function ($) {
    // USE STRICT
    "use strict";


    //-------------------------------------------------------
    // Header
    //-------------------------------------------------------

    try {
        // Hamburger Menu
        $('.hamburger').on('click', function () {
            $(this).toggleClass('is-active');
            $('.navbar-mobile').slideToggle('500');
        });
        $('.navbar-mobile__list li.has-sub > a').on('click', function () {
            var dropdown = $(this).siblings('ul.navbar-mobile__child');
            $(this).toggleClass('active');
            $(dropdown).slideToggle('500');
            return false;
        });
    } catch (err) {
        console.log(err)
    }

    try {
        // Header sticky
        var headerWrapper = $(".js-header-1");

        headerWrapper.each(function () {
            var that = $(this);
            var headerbar = that.find('.header__bar');

            var headerbarOffsetTop = headerbar.offset().top;
            var headerbarHeight = headerbar.outerHeight();

            headerbar.after("<div class='header__holder'></div>");

            $(window).on('scroll', function () {
                if ($(window).scrollTop() > headerbarOffsetTop) {
                    $('.header__holder').css('height', headerbarHeight);
                    headerbar.addClass('header--fixed');
                } else {
                    headerbar.removeClass("header--fixed");
                    $('.header__holder').css('height', 0);
                }
            });
        });
    } catch (error) {
        console.log(error);
    }


})(jQuery);
