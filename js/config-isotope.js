(function ($) {
    'use strict';

    /*[ Isotope ]
    ===========================================================*/

    try {

        var $isotopeWrapper = $('.js-isotope-wrapper');

        $isotopeWrapper.each(function () {
            var that = $(this);
            var isotopeFilter = that.find('.iostope-filter');
            var isotopeContent = that.find('.isotope-content');

            // init Isotope
            $(window).on('load', function () {
                var $iso = isotopeContent.isotope({
                    itemSelector: '.isotope-item',
                    percentPosition: true,
                    animationEngine : 'best-available',
                    masonry: {
                        columnWidth: '.isotope-item-sizer',
                        horizontalOrder: true
                    }
                });

                $iso.imagesLoaded().progress( function() {
                    $iso.isotope('layout');
                });

                $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
                    $iso.isotope('layout');
                })
            });

            isotopeFilter.on('click', 'li', function () {
                isotopeContent.isotope({filter: $(this).attr('data-filter')});
            });

            isotopeFilter.on('click', 'li', function () {
                isotopeFilter.find('.active').removeClass('active');
                $(this).addClass('active');
            });


        });

    } catch(err) {
        console.log(err)
    }
})(jQuery);