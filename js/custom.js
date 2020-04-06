$(function () {
    // VARIABLES
    const rangeFrom = $('.range__input_from'),
        rangeTo = $('.range__input_to'),
        range = $('.range__slider'),
        rangeMin = range.data('min'),
        rangeMax = range.data('max');



    // EVENTS
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


});

//popup.js
$(function () {
    let popup = $('.popup'),
        popupWrapper = popup.find('.popup__wrapper');


    $('.jsCall').on('click', function (e) {
        e.preventDefault();
        let $this = $(this),
            template = $(document.querySelector('#tmpl').content),
            html = template.find('.callback').clone();

        popupWrapper.html(html);
        popup.addClass('active');
        $('.form').validate(
            {
                rules: {
                    name: "required",
                    tel: "required"
                },
                messages: {
                    name: "Необходимо указать Ваше имя",
                    tel: "Необходимо указать номер телефона"
                },
                errorPlacement: function (error, element) {
                    element[0].placeholder = error[0].innerText;
                },
                submitHandler: function (form) {
                    //ToDo здесь должен быть ajax, при успешной отправке данных перелистывается на следующий слайд
                    success();
                },
            }
        );
    });

    $('.jsBuy').on('click', function (e) {
        e.preventDefault();
        let $this = $(this),
            template = $(document.querySelector('#tmpl').content),
            html = template.find('.callbuy').clone();

        popupWrapper.html(html);
        popup.addClass('active');
        $('.form').validate(
            {
                rules: {
                    name: "required",
                    tel: "required"
                },
                messages: {
                    name: "Необходимо указать Ваше имя",
                    tel: "Необходимо указать номер телефона"
                },
                submitHandler: function (form) {
                    //ToDo здесь должен быть ajax, при успешной отправке данных перелистывается на следующий слайд
                    success();
                },
                errorPlacement: function (error, element) {
                    element[0].placeholder = error[0].innerText;
                }
            }
        );
    });

    popup.on('click', function (e) {
        let target = $(e.target);

        if (target.closest('.popup__wrapper').length === 0){
            popup.removeClass('active');
        }
    });

    $('body').on('click', '.jsCloseForm', function (e) {
        e.preventDefault();
        popup.removeClass('active');
    });

    function success() {
        let template = $(document.querySelector('#tmpl').content),
            html = template.find('.success').clone();
        popupWrapper.html(html);
    }

});