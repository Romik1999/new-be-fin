$(document).ready(function () {

    $(".tpl-faq-item__title").click(function () {
        if ($(this).hasClass("active")) {
            $(this)
                .removeClass("active")
                .siblings(".tpl-faq-item__text").slideUp()
                .closest(".tpl-faq-item").find(".tpl-faq-item__icon").removeClass("active")
        } else {
            $(this)
                .addClass("active")
                .siblings(".tpl-faq-item__text").slideDown()
                .closest(".tpl-faq-item").find(".tpl-faq-item__icon").addClass("active")
                .closest(".tpl-faq__item").addClass("active")
                .siblings(".tpl-faq__item.active").removeClass("active")
                .find(".tpl-faq-item__text").slideUp()
                .closest(".tpl-faq-item").find(".tpl-faq-item__icon").removeClass("active")
        }
    });

    const reviews = new Swiper('.tpl-reviews-slider', {
        slidesPerView: 2,
        spaceBetween: 30,
        loop: true,
        navigation: {
            nextEl: '.tpl-reviews__arrow_next',
            prevEl: '.tpl-reviews__arrow_prev',
        },
        breakpoints: {
            300: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            576: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
        },
    });

    // calc
    var sumIntervals = {
        1000: {
            [0]: {approvalPercent: 99},
        },
        15000: {
            [0]: {approvalPercent: 89},
        },
        35000: {
            [0]: {approvalPercent: 87},
        },
        50000: {
            [0]: {approvalPercent: 83},
        },
        100000: {
            [0]: {approvalPercent: 76},
        },
        200000: {
            [0]: {approvalPercent: 72},
        },
        300000: {
            [0]: {approvalPercent: 63},
        },
        400000: {
            [0]: {approvalPercent: 56},
        },
        100000000: {
            [0]: {approvalPercent: 50},
        },
    };
    var $calcForm = $('.tpl-form-calc');
    $calcForm.each(function (index, elem) {
        var calc = new Calc($(elem), [], sumIntervals);
        calc.init();
    });

    let status = $('input#coincidence').attr("checked");
    if (status === 'checked') {
        $('.tpl-form__dop').hide();
    } else {
        $('.tpl-form__dop').show();
    }

    $('.field-confirmationform-coincidence .tpl-checkbox__label').click(function () {
        if ($(this).find('input').prop('checked')) {
            $('.tpl-form__dop').hide();
        } else {
            $('.tpl-form__dop').show();
        }
    });


    var _Seconds = $('.tpl-timer span').text(), int;
    int = setInterval(function() {
        if (_Seconds > 0) {
            _Seconds--;
            $('.tpl-timer span').text(_Seconds);
        } else {
            clearInterval(int);
        }
    }, 1000);
});

function maskPhone(e) {
    const mask = /\+7 \(\d{3}\) \d{3} \d{2} \d{2}/;
    var valSize = e.target.value.trim().replace(/\D/g, "").length;
    e = e || window.event;
    var key = e.keyCode || e.which;
    key = String.fromCharCode(key);
    var regex = /[0-9]|\+/;
    if (!regex.test(key)) {
        e.returnValue = false;
        if (e.preventDefault) e.preventDefault();
    } else {
        if (valSize !== 0 && key === "+") {
            e.returnValue = false;
            return;
        }
        if (valSize === 0) {
            if (key === "8" || key === "7") {
                e.target.value = "+7";
                e.returnValue = false;
            } else if (key === "9") {
                e.target.value = "+7 (9";
                e.returnValue = false;
            } else if (key !== "+") {
                e.target.value = "+7 (9";
            } else if (key === "+" && e.target.value === "+") {
                e.returnValue = false;
            }
        } else if (valSize === 1) {
            e.target.value = "+7 (9";
            if (key === "9") {
                e.returnValue = false;
            }
        } else if (valSize === 4) {
            if (e.target.value.slice(-1) === ")") {
                e.target.value = e.target.value.trim() + " ";
            } else if (e.target.value.slice(-1) === " ") {
                return;
            } else e.target.value = e.target.value.trim() + ") ";
        } else if (valSize === 7 || valSize === 9) {
            if (e.target.value.slice(-1) === " ") {
                return;
            } else e.target.value = e.target.value.trim() + " ";
        } else if (valSize === 11) {
            e.returnValue = false;
        }
    }
}

function onPastePhone(e) {
    e.preventDefault();
    const mask = /(7|8)(9\d{2})(\d{3})(\d{2})(\d{2})/;
    var phone = e.clipboardData.getData('text/plain').replace(/\D/g, "");
    if (!mask.test(phone)) {
        e.returnValue = false;
        return;
    }
    var matched = phone.match(mask);
    e.target.value = "+7 (" + matched[2] + ") " + matched[3] + " " + matched[4] + " " + matched[5];
    e.returnValue = false;
}