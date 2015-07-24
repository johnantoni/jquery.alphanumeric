(function ($) {
    $.fn.alphanumeric = function (p) {
        var input = $(this),
            //add new letter (ñ, for spanish keyboard) (Felipe Pincheira A.)
            // + french letter 
            az = 'aàáâãäåæbcçdeèéêëfghiìíîïjklmnñoðòóôõöpqrstuùúûüvwxyýÿz',
            options = $.extend({
                //add new characters (¡°¬´¨) (Felipe Pincheira A.)
                ichars: '!@#$%^&*()+=[]\\\';,/{}|":<>?~`.- _¡°¬´¨²€ƒ^‰¥£¢¦§¨ø',
                nchars: '',
                allow: ''
            }, p),
            s = options.allow.split(''),
            i = 0,
            ch,
            regex;

        for (i; i < s.length; i++) {
            if (options.ichars.indexOf(s[i]) != -1) {
                s[i] = '\\' + s[i];
            }
        }

        if (options.nocaps) {
            options.nchars += az.toUpperCase();
        }

        if (options.allcaps) {
            options.nchars += az;
        }

        options.allow = s.join('|');

        regex = new RegExp(options.allow, 'gi');
        ch = (options.ichars + options.nchars).replace(regex, '');

        input
            .keypress(function (e) {

                var key = String.fromCharCode(!e.charCode ? e.which : e.charCode);

                if (ch.indexOf(key) != -1 && !e.ctrlKey) {
                    e.preventDefault();
                }

            })
            .blur(function () {

                var value = input.val(),
                    j = 0;

                for (j; j < value.length; j++) {
                    if (ch.indexOf(value[j]) != -1) {
                        input.val('');
                        return false;
                    }
                }
                return false;
            });

        return input;

    };

    $.fn.numeric = function (p) {
        //add new letter (ñ, for spanish keyboard) (Felipe Pincheira A.)
        var az = 'aàáâãäåæbcçdeèéêëfghiìíîïjklmnñoðòóôõöpqrstuùúûüvwxyýÿz',
            aZ = az.toUpperCase();

        return this.each(function () {
            $(this).alphanumeric($.extend({ nchars: az + aZ }, p));
        });
    };

    $.fn.alpha = function (p) {
        var nm = '1234567890';
        return this.each(function () {
            $(this).alphanumeric($.extend({ nchars: nm }, p));
        });
    };
})(jQuery);
