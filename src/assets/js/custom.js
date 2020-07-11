$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};
//$(window).scroll(function () {    // this will work when your window scrolled.
//    var height = $(window).scrollTop();  //getting the scrolling height of window
//    if (height > 100) {
//        $("#header01").css({ "position": "fixed" });
//        $(".mainMenuOuter").addClass("fxMain_Hdr");
//        $(".innerMenuWrap .navbar-brand img").css({ "width": "88%" });
//    } else {
//        $("#header01").css({ "position": "absolute" });
//        $(".mainMenuOuter").removeClass("fxMain_Hdr");
//        $(".innerMenuWrap .navbar-brand img").css({ "width": "86%" });
//    }
//});
function AlertModel(title, message, buttonLabel, focusid) {
    bootbox.dialog({
        message: message,
        title: title + "!!!",
        buttons: {
            success: {
                label: buttonLabel,
                className: "btn-primary btn-alt",
                callback: function () {
                    setTimeout(function () {
                        $("#" + focusid).focus();
                    });

                }
            }
        }
    });
}

function AlertModelRedirect(title, message, buttonLabel, result) {
    bootbox.dialog({
        message: message,
        title: title + "!!!",
        buttons: {
            success: {
                label: buttonLabel,
                className: "btn-primary btn-alt",
                callback: function () {
                    window.location = result;
                }
            }
        }
    });
}

var Loader = {
    Show: function (message) {
        var wtop = $(window).scrollTop();
        var dtop = wtop + ($(window).height() / 2) - 30;
        $("body").append('<div id="LoadingDailog" tabindex="-1" class="loadingdialog" style="position:relative;top:' + dtop + 'px;"> ' +
            '<div style="background:white;position:fixed;z-index:1002;left:48%;top:46%;padding:20px;border-radius:10px;-webkit-border-radius:10px;-moz-border-radius:10px;">' +
            '<div class="csloader"><h1>' + message + '</h1><span></span><span></span><span></span></div></div ></div > ' +
            '<div id="OverlayDiv" class="ui-widget-overlay fade show"></div>');
    },
    Hide: function () {
        $("body").find("#LoadingDailog").remove();
        $("body").find("#OverlayDiv").remove();
    },
    ShowPanel: function (divselect) {
        var wtop = $(divselect).scrollTop();
        var dtop = $(divselect).position().top;
        var dtop1 = $(divselect).position().top / 2;
        var wdth = $(divselect).innerWidth();
        var left = $(divselect).position().left;
        $(divselect).append('<div id="OverlayDiv" class="ui-widget-overlay" style="position:absolute;z-index: 1001;top:' + dtop + 'px;left:' + left + 'px; width:' + wdth + 'px; height: ' + $(divselect).height() + 'px; "></div>' +
            '<div id="LoadingDailog" class="loadingdialog"> ' +
            '<div style="background:white;position:fixed;z-index:1002;left:48%;top:46%;padding:20px;border-radius:10px;-webkit-border-radius:10px;-moz-border-radius:10px;"> <img src="/../Content/assets/img/svg/loading-spin.svg" style="display:block;width:51px; height:51px;" /></div></div>');
    },
    HidePanel: function (divselect) {
        $(divselect).find("#LoadingDailog").remove();
        $(divselect).find("#OverlayDiv").remove();
    },
    ShowSpin: function (selector, sClass, Icon) {
        $(selector).find(".spinLoader").remove();
        var spin = '<span style="position:absolute;right:20px;top:50%;font-size:14px !important;" class="spinSpan ' + sClass + '"><i class="' + Icon + '"></i></span>';
        $(selector).append(spin);
    },
    HideSpin: function (selector) {
        $(selector).find(".spinSpan").remove();
    },
    ShowLoading: function (selector) {
        var spin = '<span style="position:absolute;right:20px;top:50%;font-size:14px !important;" class="spinLoader"><img src="/../Content/assets/img/svg/loading-spin.svg" style="display:block;width:20px; height:20px;" /></span>';
        $(selector).append(spin);
    },
    ShowLoadingParam: function (selector, top, right) {
        var spin = '<span style="position:absolute;right:' + right + 'px;top:' + top + '%;font-size:14px !important;" class="spinLoader"><img src="/../Content/assets/img/svg/loading-spin.svg" style="display:block;width:20px; height:20px;" /></span>';
        $(selector).append(spin);
    }
};

/// Check for String Empty or Null
function isPropertyDefined(str) {
    return typeof str !== 'undefined' && str !== false && str !== ""
}
function isNullOrWhiteSpace(str) {
    return str === null || str.match(/^ *$/) !== null
}


function searchToggle(obj, evt) {
    var container = $(obj).closest('.search-wrapper');
    if (!container.hasClass('active')) {
        container.addClass('active');
        evt.preventDefault();
    }
    else if (container.hasClass('active') && $(obj).closest('.input-holder').length == 0) {
        container.removeClass('active');
        // clear input
        container.find('.search-input').val('');
    }
}


//===============top menu dropdown START====================//
//$('#country').click(function () {
//    $(this).toggleClass('.testclass');
//    $('#country + ul.dropdown-topbar').toggle();
//});

//$('#tb_lang').click(function () {    
//    $('#tb_lang + ul.dropdown-topbar').toggle();
//    $(this).toggleStyle.css("color", "#0681e4");
//});

//$('#tb_crncy').click(function () {
//    //$(this).toggleClass('');
//    $('#tb_crncy + ul.dropdown-topbar').toggle();
//});


var nav = document.querySelector('.my-nav');
nav.addEventListener('toggle', function (event) {

    // Only run if the dropdown is open
    if (!event.target.open) return;

    // Get all other open dropdowns and close them
    var dropdowns = nav.querySelectorAll('.dropdown[open]');
    Array.prototype.forEach.call(dropdowns, function (dropdown) {
        if (dropdown === event.target) return;
        dropdown.removeAttribute('open');
    });
}, true);
//===============top menu dropdown END====================//
$(window).load(function () {
    $('#myload').css("display", "none");
    $('#L4').svg({ loadURL: 'Sample.svg' });
});