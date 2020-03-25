//header.js
$(function () {

    // VARIABLES
    const wrapper = $('.wrapper'),
        aside = $('.aside'),
        header = $('header.header'),
        headerFixed = $('.header_fixed');

    // EVENTS
    // Фиксированная шапка
    // if (wWidth < 1540) {
    //     addFixedHeader();
    // }

    $(window).on('scroll', function (e) {
        let height = header.outerHeight(),
            scrollTop = $(this).scrollTop();

        if (scrollTop > height) {
            headerFixed.addClass('active');
        } else {
            headerFixed.removeClass('active');
        }

    });
    //Открытие aside
    $('.jsMenuOpen').on('click', function (e) {
        e.preventDefault();
        openMenu();
    });

    //Закрытие aside
    $('body').on('click', function (e) {
        let target = $(e.target);

        if (wWidth<1540){
            if ((target.closest('.mmenu').length == 0 && target.closest('.jsMenuOpen').length == 0) || target.closest('.jSMenuClose').length > 0) {
                closeMenu();
            }
        } else {
            if ((target.closest('.aside').length == 0 && target.closest('.jsMenuOpen').length == 0) || target.closest('.jSMenuClose').length > 0) {
                closeMenu();
            }
        }
    });


    // FUNCTIONS
    function openMenu() {
        if (wWidth < 1540) {
            let menu = $('.mmenu');
            menu.addClass('active');
        } else {
            aside.addClass('active');
        }
    }

    function closeMenu() {
        if (wWidth < 1540) {
            let menu = $('.mmenu');
            menu.removeClass('active');
        } else {
            aside.removeClass('active');
        }
    }

    function addFixedHeader() {
        // debugger;
        // let clone = header.clone();
        // clone.removeClass('header_absolute').addClass('header_fixed');
        // wrapper.append(clone);
    }

    //VENDORS


});