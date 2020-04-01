// common.js
function getNumber(str) {
    return parseInt(str.replace(/\s/g, ''));
}

function number_format(number, decimals, dec_point, thousands_sep) {
    var i, j, kw, kd, km;
    if (isNaN(decimals = Math.abs(decimals))) {
        decimals = 2;
    }
    if (dec_point == undefined) {
        dec_point = ",";
    }
    if (thousands_sep == undefined) {
        thousands_sep = ".";
    }
    i = parseInt(number = (+number || 0).toFixed(decimals)) + "";
    if ((j = i.length) > 3) {
        j = j % 3;
    } else {
        j = 0;
    }
    km = (j ? i.substr(0, j) + thousands_sep : "");
    kw = i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands_sep);
    kd = (decimals ? dec_point + Math.abs(number - i).toFixed(decimals).replace(/-/, 0).slice(2) : "");
    return km + kw + kd;
}

function prettify(num) {
    var n = num.toString();
    return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ');
}

function imageResize(src) {
    $('img').not('.logo__img').attr('src', src);
}
// imageResize('https://loremflickr.com/320/440');

const wWidth = $(window).width();

$('.cnt__btn').on('click', function (e) {
    let btn = $(this),
        cnt = btn.closest('.cnt'),
        count = cnt.find('.cnt__input'),
        val = count.val();
    if (btn.hasClass('cnt__plus')) {
        val++
    } else {
        if (val > 1) {
            val--
        }
    }
    count.val(val);

    if (btn.hasClass('order__cnt-btn')) {
        calcTotal();
    }
});