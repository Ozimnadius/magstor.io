//product.js
$(function () {

    // VARIABLES

    // EVENTS
    $('.product__sw').on('click', function (e) {
        let sw = $(this),
            id = sw.data('id'),
            sws = $('.product__sw').not(sw),
            tab = $('.product__tab[data-id='+id+']'),
            tabs = $('.product__tab').not(tab);

        sws.removeClass('active');
        sw.addClass('active');
        tabs.removeClass('active');
        tab.addClass('active');

    });

    // FUNCTIONS

    //VENDORS
    const pslider = document.querySelector('.pslider');
    if (pslider) {
        let productSlider = new Swiper('.pslider__container', {
            slidesPerView: 3,
            direction: 'horizontal',
            loop: true,
            effect: 'slide',
            slideToClickedSlide: true,
            spaceBetween: -1,
            watchOverflow: true,
            // Navigation arrows
            navigation: {
                nextEl: '.pslider__next',
                prevEl: '.pslider__prev',
            },
            breakpoints: {
                // when window width is >= 320px
                767.99: {
                    spaceBetween: 0,
                    direction: 'vertical',
                },

            },
            on: {
                slideChange: function () {
                    let slide = $(this.slides[this.activeIndex]),
                        src = slide.data('src');
                    $('.product__img-img').attr('src',src);
                },

            },
        });
    }

    const precom = document.querySelector('.precom__slider');
    if (precom) {
        let productSlider = new Swiper('.precom__container', {
            slidesPerView: 2,
            effect: 'slide',
            spaceBetween: -1,
            watchOverflow: true,
            // Navigation arrows
            navigation: {
                nextEl: '.precom__next',
                prevEl: '.precom__prev',
            },
            breakpoints: {
                // when window width is >= 320px
                767.99: {
                    slidesPerView: 3,
                },
                // when window width is >= 1200px
                1199.99: {
                    slidesPerView: 5,
                },
            }
        });
    }


});