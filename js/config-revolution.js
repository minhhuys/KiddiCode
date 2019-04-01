(function ($) {
    'use strict';

    /*[ REVOLUTION ]
    ===========================================================*/

    try {
        var revControl = $('.js-rev');
        revControl.each(function () {
            var that = $(this);
            var option = {
                layout: 'auto',
                arrows: true,
                stylearrow: 'uranus',
                hideonleavearrow: false,
                bullets: true,
                stylebullet: 'hermes',
                hideonleavebullet: false,
                hoffbullet: 0,
                voffbullet: 20,
                spacebullet: 5,
                lhoffarrow: 0,
                lvoffarrow: 0,
                rhoffarrow: 0,
                rvoffarrow: 0,
                delay: 5000,
                height: 500,
                fullscreenalignforce: 'off'
            };

            for (var k in option) {
                if (option.hasOwnProperty(k)) {
                    if (that.attr('data-rev-' + k) != null) {
                        option[k] = that.data('rev-' + k);
                    }
                }
            }

            that.show().revolution({
                sliderLayout: option.layout,
                responsiveLevels: [1201, 1200, 992, 768, 576],
                gridwidth:[1170, 930, 690, 510, 576],
                gridheight: [option.height, option.height, option.height, option.height],
                visibilityLevels:[1201, 1200, 992, 768, 576],
                delay: option.delay,
                fullScreenOffsetContainer: ".header-mobile",
                disableProgressBar: "on",
                navigation: {
                    onHoverStop: "off",
                    arrows: {
                        enable: option.arrows,
                        style: option.stylearrow,
                        hide_onleave: option.hideonleavearrow,
                        left: {
                            h_offset: option.lhoffarrow,
                            v_offset: option.lvoffarrow
                        },
                        right: {
                            h_offset: option.rhoffarrow,
                            v_offset: option.rvoffarrow
                        }
                    },

                    bullets: {
                        enable: option.bullets,
                        style: option.stylebullet,
                        hide_onleave: option.hideonleavebullet,
                        h_align: 'center',
                        v_align: 'bottom',
                        h_offset: option.hoffbullet,
                        v_offset: option.voffbullet,
                        space: option.spacebullet
                    }
                }
            });
        });

        $('.au-mouse-wheel').on('click', function (e) {
            $('html').animate({scrollTop: $($(this).attr("href")).offset().top - 65}, 800);
            e.preventDefault();
        });
    } catch (err) {
        console.log(err);
    }


})(jQuery);