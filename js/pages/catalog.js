//header.js
$(function () {

    // VARIABLES
    const rangeFrom = $('.range__input_from'),
        rangeTo = $('.range__input_to'),
        range = $('.range__slider'),
        rangeMin = range.data('min'),
        rangeMax = range.data('max'),
        form = $('.filters');

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

    //ввод цифр в поля
    $('.range__input').on('keypress', function (e) {
        if (e.key.match(/[^0-9]/g) || (this.value == 0 && e.key == 0)) {
            e.preventDefault();
        }
    });

    //Изменение данных
    $('.range__input').on('input', function (e) {
        let $this = $(this),
            val = '',
            from = getNumber(rangeFrom.val()),
            to = getNumber(rangeTo.val());

        if ($this.hasClass('range__input_from')) {
            if (from < rangeMin) {
                from = rangeMin;
            } else if (from > to) {
                from = to;
            }
            val = from;
        } else {
            if (to > rangeMax) {
                to = rangeMax;
            } else if (to < from) {
                to = from;
            }
            val = to;
        }

        let valPretty = prettify(val);

        rangeSlider.update({
            from: from,
            to: to
        });

        $this.val(valPretty);
    });

    //Изменение чеков
    $('.check__input').on('change', function (e) {
        let $this = $(this),
            filter = $this.closest('.filter');

        let checked = checkFilter(filter);

        if (checked) {
            filter.addClass('filled');
        } else {
            filter.removeClass('filled');
        }

    });

    //Сброс фильтра
    $('.filter__clear').on('click', function (e) {
        e.preventDefault();
        let $this = $(this),
            filter = $this.closest('.filter');

        clearFilter(filter);
    });

    //Сброс фильтров
    $('.filters__reset').on('click', function (e) {
        let btn = $(this),
            form = btn.closest('.filters');
        form.trigger('reset');
        rangeUpdate();

        $('.filter').each(function (x, i) {
            clearFilter($(i));
        });
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
    function rangeUpdate() {
        let from = getNumber(rangeFrom.val()),
            to = getNumber(rangeTo.val());

        rangeSlider.update({
            from: from,
            to: to
        });
    }

    function checkFilter(filter) {
        let checks = filter.find('.check__input'),
            checked = false;

        checks.each(function (x, i) {
            if (i.checked) {
                checked = true;
            }
        });

        return checked;
    }

    function clearFilter(filter) {
        let checks = filter.find('.check__input');

        checks.each(function (x, i) {
            i.checked = false;
        });
        filter.removeClass('filled');
    }

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
    $(".range__slider").ionRangeSlider({
        prettify_enabled: true,
        skin: 'round',
        hide_from_to: true,
        // hide_min_max: true,
        onChange: function (data) {
            rangeFrom.val(data.from_pretty);
            rangeTo.val(data.to_pretty);
        },
        onFinish: function (data) {
            //ToDo Здесь должень быть ajax на получение товаров
        },
    });
    let rangeSlider = $(".range__slider").data("ionRangeSlider");

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