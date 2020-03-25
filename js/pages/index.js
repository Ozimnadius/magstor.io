//index.js
$(function () {

// VARIABLES

    // EVENTS

    // FUNCTIONS

    //VENDORS
    const ibanner = document.querySelector('.ibanner__slider');
    if (ibanner) {
        let ibannerSlider = new Swiper('.ibanner__container', {
            slidesPerView: 1,
            effect: 'slide',
            spaceBetween: 10,
            loop: true,
            watchOverflow: true,
            // Navigation arrows
            navigation: {
                nextEl: '.ibanner__next',
                prevEl: '.ibanner__prev',
            },
            // If we need pagination
            pagination: {
                el: '.ibanner__pag',
                clickable: true
            },
        });
    }
    const islider = document.querySelector('.islider');
    if (ibanner) {
        let ibannerSlider = new Swiper('.islider', {
            slidesPerView: 1,
            effect: 'slide',
            loop: true,
            spaceBetween: 0,
            watchOverflow: true,
            autoplay: {
                delay: 5000,
            },
            breakpoints: {
                // when window width is >= 320px
                767.99: {
                    slidesPerView: 2,
                    spaceBetween: 20
                },
                // when window width is >= 1200px
                1199.99: {
                    slidesPerView: 4,
                },
            }
        });
    }



});