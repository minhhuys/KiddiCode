(function ($) {
    'use strict';

    /*[ NoUISlider Config ]
    ===========================================================*/

    try {
        var html5Slider = document.getElementById('pricepicker');
        if (html5Slider !== null) {
            noUiSlider.create(html5Slider, {
                start: [ 10, 62 ],
                connect: true,
                step: 1,
                range: {
                    'min': 10,
                    'max': 100
                }
            });
            var nodes = [document.getElementById('lower-value'), document.getElementById('upper-value')];
            html5Slider.noUiSlider.on('update', function( values, handle ) {
                nodes[handle].innerHTML = "$" + values[handle];
            });
        }

    } catch (err) {
        console.log(err);
    }


})(jQuery);