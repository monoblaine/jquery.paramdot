//ş
/**
 * jQuery.param metodunun alternatifidir. Nesneleri serialize ederken
 * `ahmet[fieldAdi]` yazmak yerine `ahmet.fieldAdi` yazar.
 *
 * Author: Serhan Apaydın
 */
(function ($) {
    'use strict';

    var r20 = /%20/g,
        rbracket = /\[\]$/;

    function buildParams (prefix, obj, add) {
        if ($.isArray(obj)) {
            // Serialize array item.
            $.each(obj, function (i, v) {
                if (rbracket.test(prefix)) {
                    // Treat each array item as a scalar.
                    add(prefix, v);
                }
                else {
                    // If array item is non-scalar (array or object), encode its
                    // numeric index to resolve deserialization ambiguity issues.
                    buildParams(prefix + '[' + (typeof v === 'object' ? i : '') + ']', v, add);
                }
            });
        }
        else if ($.type(obj) === 'object') {
            // Serialize object item.
            for (var name in obj) {
                buildParams(prefix + '.' + name, obj[name], add);
            }
        }
        else {
            // Serialize scalar item.
            add(prefix, obj);
        }
    }

    $.paramdot = function (data) {
        var s = [],
            add = function (key, value) {
                // If value is a function, invoke it and return its value
                value = $.isFunction(value) ? value() : value;
                s[s.length] = encodeURIComponent(key) + '=' + encodeURIComponent(value);
            };

        // If an array was passed in, assume that it is an array of form elements.
        if ($.isArray(data) || (data.jquery && !$.isPlainObject(data))) {
            // Serialize the form elements
            $.each(data, function () {
                add(this.name, this.value);
            });
        }
        else {
            // If traditional, encode the "old" way (the way 1.3.2 or older
            // did it), otherwise encode params recursively.
            for (var prefix in data) {
                buildParams(prefix, data[prefix], add);
            }
        }

        // Return the resulting serialization
        return s.join('&').replace(r20, '+');
    };
})(jQuery);
