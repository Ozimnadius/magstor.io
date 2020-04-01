//catalog.js
$(function () {

    // VARIABLES
    const form = $('.filters');

    // EVENTS
    //Раскрытие фильтров
    $('.filter__btn').on('click', function (e) {
        e.preventDefault();

        let $this = $(this),
            filter = $this.closest('.filter'),
            bottom = filter.find('.filter__bottom'),
            filters = $('.filter').not(filter),
            filtersBottom = $('.filter__bottom').not(bottom);


        filters.removeClass('active');
        filtersBottom.slideUp(300);
        bottom.slideToggle(300);
        filter.toggleClass('active');
    });

    //Закрытие фильтров
    $('body').on('click', function (e) {
        let target = $(e.target);
        if (target.closest('.filter').length == 0) {
            closeFilters();
        }

        if (target.closest('.filters').length == 0 && target.closest('.jsFiltersOpen').length == 0) {
            closeForm();
        }
    });


    //Открытие формы фильтров
    $('.jsFiltersOpen').on('click', function (e) {
        openForm();
    });

    //Закрытие формы фильтров
    $('.jsFiltersClose').on('click', function (e) {
       closeForm();
    });

    // FUNCTIONS
    function closeFilters() {
        let filters = $('.filter'),
            filtersBottom = $('.filter__bottom');


        filters.removeClass('active');
        filtersBottom.slideUp(300);
    }

    function openForm() {
        form.addClass('active');
    }

    function closeForm() {
        form.removeClass('active');
    }


    //VENDORS
    //Если планшет или мобила, то клик отрабатывает как стандартный ховер
    if (device.tablet() || device.mobile()) {
        $('.jsHoverLink').on('click', function (e) {
            e.preventDefault();
            let link = $(this),
                item = link.closest('.jsHoverItem');

            $(this).trigger('hover');
        });
    }

});