//Condor version 1.3
(function ($) {
    $.fn.condor = function (options) {
        var settings = $.extend({
                maxInputs: 10,
                uniqueNames: true,
                namePrefix: 'inputs',
                inactiveHint: 'add input',
                activeHint: '',
                activeIcon: 'linkify',
                inactiveClass: 'condor-add',
                activeClass: 'condor-active',
                filledClass: 'condor-filled',
                addCallback: function () {},
                activateCallback: function () {},
                inputType: 'text'
            }, options),
            target = this,
            numInputs = 0;

        function addField(hint, parentclass, childclass) {
            target.append("<div class='field " + parentclass + " '><div class='ui left icon input " + childclass + "'><input type='" + settings.inputType + "' placeholder='" + settings.inactiveHint + "'><i class='plus icon'></i></div></div>");
        }

        function makeActive(field) {
            var index = numInputs,
                name = settings.namePrefix + '-' + index,
                input = $(settings.inactiveClass + " input");
            numInputs += 1;
            $(settings.inactiveClass + " > div").removeClass('inverted');
            $(settings.inactiveClass + " i").removeClass('plus');
            $(settings.inactiveClass + " i").addClass(settings.activeIcon);
            input.attr('placeholder', settings.activeHint);
            if (settings.uniqueNames) {
                input.attr('name', name);
            } else {
                input.attr('name', settings.namePrefix);
            }
            $(field).unbind();
            $(input).unbind();
            $(field).removeClass(settings.inactiveClass);
            $(field).addClass(settings.activeClass);

            //Bind a thing that detects when the field gets filled
            input.bind("propertychange keyup input paste", function (event) {
                // If no longer an empty string
                if ($(this).val() !== '') {

                    field.addClass(settings.filledClass);

                    input.unbind("propertychange keyup input paste blur");
                    if (numInputs < settings.maxInputs) {
                        addInactiveField(numInputs);
                    }

                    input.blur(function () {
                        if (($(this).val() === '') && (numInputs > 1)) {
                            $(this).unbind();
                            $(this).parent().parent().remove();
                            numInputs -= 1;
                        }
                    });
                }
            });

            input.blur(function () {
                if (($(this).val() === '') && (numInputs > 1)) {
                    $(this).unbind();
                    $(this).parent().parent().remove();
                    numInputs -= 1;

                    if (numInputs < settings.maxInputs) {
                        addInactiveField(numInputs);
                    }
                }
            });

            settings.activateCallback.call();
        }

        function addInactiveField(id) {
            addField('add another link', 'condor-add', 'inverted');
            var field = $(".condor-add"),
                input = $(".condor-add input");
            $(input).click(function () {
                $(this).unbind("click");
                $(input).unbind("focusin");
                makeActive(this);
            });
            $(input).focusin(function () {
                $(this).unbind("focusin");
                $(field).unbind("click");
                makeActive(field);
            });
            settings.addCallback.call();
            return field;
        }

        addInactiveField(numInputs);
        makeActive($(".condor-add"));
    }

}(jQuery));