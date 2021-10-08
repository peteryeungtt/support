(function ($) {
    $.fn.accordion = function (duration) {
        if (duration == null)
        this.find("[data-type='accordion-section']").each(function () {
            var content = $(this).find("[data-type='accordion-section-body']");
            var title = $(this).find("[data-type='accordion-section-title']");
            title.addClass("header-default");
            content.addClass("content-default");
            title.append("<i class='fa fa-plus-circle right'></i>")
            title.click(function () {
                if (content.css("display") == "none") {
                    $("[data-type='accordion-section-title']").each(function () {
                        $(this).removeClass("header-active");
                        $(this).find("i").removeClass("fa-minus-circle");
                        $(this).find("i").addClass("fa-plus-circle");
                    });
                    $(this).addClass("header-active");
                    $("[data-type='accordion-section-body']").each(function () {
                        $(this).hide(duration);
                    });
                    content.show(duration);
                    title.find("i").addClass("fa-minus-circle");
                    title.find("i").removeClass("fa-plus-circle");
                } else {
                    content.hide(duration);
                    title.removeClass("header-active");
                    title.find("i").removeClass("fa-minus-circle");
                    title.find("i").addClass("fa-plus-circle");
                }
            });
        });

        /*Make search*/
        $("[data-type='accordion-search']").keyup(function () {
            var expression = false;
            var value = $(this).val();
            var finder = "";
            if (value.indexOf("\"") > -1 && value.lastIndexOf("\"") > 0) {
                finder = value.substring(eval(value.indexOf("\"")) + 1, value.lastIndexOf("\""));
                expression = true;
            }
            $("[data-type='accordion-section']").each(function () {
                var title = $(this).find("[data-type='accordion-section-title']").text();
                if (expression) {
                    if ($(this).text().toLowerCase().search(finder.toLowerCase()) == -1) {
                        $(this).hide();
                    } else {
                        $(this).show();
                    }
                } else {
                    if (title.toLowerCase().indexOf(value.toLowerCase()) < 0) {
                        $(this).hide();
                    } else {
                        $(this).show();
                    }
                }
            });
        });


        $("[data-type='accordion-filter']").change(function () {
            var selected = $(this).select().val();
            $("[data-type='accordion-section']").each(function () {
                $(this).show();
                if (selected != "default") {
                    if ($(this).attr("data-filter") != selected) {
                        if ($(this).css("display") == "block")
                            $(this).hide();
                    }
                }
            });
        });
        return this;
    };
})(jQuery);
