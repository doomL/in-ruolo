(function ($) {
    var list = [];

    /* function to be executed when product is selected for comparision*/

    $(document).on('click', '.addToCompare', function () {
        $(".comparePanle").show();
        //$(this).toggleClass("rotateBtn");
        //$(this).parents(".selectProduct").toggleClass("selected");
        var productID = $(this).parents('.selectProduct').attr('data-title');

        var inArray = $.inArray(productID, list);
        if (inArray < 0) {
            if (list.length > 1) {
                $("#WarningModal").show();
                $("#warningModalClose").click(function () {
                    $("#WarningModal").hide();
                });
                //$(this).toggleClass("rotateBtn");
                //$(this).parents(".selectProduct").toggleClass("selected");
                return;
            }

            if (list.length < 3) {
                list.push(productID);
                
                var displayTitle = $(this).parents('.selectProduct').attr('data-id');

                var image = "https://www.freeiconspng.com/uploads/list-icons-free-icons-in-devine--icon-search-engine--5.p/ng"

                $(".comparePan").append('<div id="' + productID + '" class="relPos titleMargin w3-margin-bottom   w3-col l3 m4 s4"><div class="w3-white titleMargin"><a class="selectedItemCloseBtn w3-closebtn cursor">&times</a><img src="https://www.freeiconspng.com/uploads/list-icons-free-icons-in-devine--icon-search-engine--5.png" alt="image" style="height:100px;"/><p id="' + productID + '" class="titleMargin1">' + displayTitle + '</p></div></div>');
            }
        } else {
            list.splice($.inArray(productID, list), 1);
            var prod = productID.replace(" ", "");
            $('#' + prod).remove();
            hideComparePanel();

        }
        if (list.length > 1) {

            $(".cmprBtn").addClass("active");
            $(".cmprBtn").removeAttr('disabled');
        } else {
            $(".cmprBtn").removeClass("active");
            $(".cmprBtn").attr('disabled', '');
        }

    });
    /*function to be executed when compare button is clicked*/
    $(document).on('click', '.cmprBtn', function () {
        if ($(".cmprBtn").hasClass("active")) {
            /* this is to print the  features list statically*/
            $(".contentPop").append('<div class="w3-col s3 m3 l3 compareItemParent relPos">' + '<ul class="product" style="background:aliceblue">' + '<li>Proposta</li>'  + '<li>Costo</li>' + '<li>N° CFU</li>' + '<li>Punti</li>' + '<li class="cpu">Ssd</li>'/* + '<li>Battery</li></ul>'*/ + '</div>');

            for (var i = 0; i < list.length; i++) {
                /* this is to add the items to popup which are selected for comparision */
                product = $('.selectProduct[data-title="' + list[i] + '"]');
                var image = $('[data-title=' + list[i] + ']').find(".productImg").attr('src');
                var title = $('[data-title=' + list[i] + ']').attr('data-id');
                /*appending to div*/
                $(".contentPop").append('<div class="w3-col s3 m3 l3 compareItemParent relPos">' + '<ul class="product">' + '<li>'+title+'</li>' /*+ '<li>' + title + '</li>'*/ + '<li>' + $(product).data('costo') + ' €</li>' + '<li>' + $(product).data('cfu') + '<li>' + $(product).data('punti') + '</li>' + '<li class="cpu">' + $(product).data('ssd') + '</ul>' + '</div>');
            }
        }
        $(".modPos").show();
    });

    /* function to close the comparision popup */
    $(document).on('click', '.closeBtn', function () {
        $(".contentPop").empty();
        $(".comparePan").empty();
        $(".comparePanle").hide();
        $(".modPos").hide();
        $(".selectProduct").removeClass("selected");
        $(".cmprBtn").attr('disabled', '');
        list.length = 0;
        $(".rotateBtn").toggleClass("rotateBtn");
    });

    /*function to remove item from preview panel*/
    $(document).on('click', '.selectedItemCloseBtn', function () {

        var test = $(this).siblings("p").attr('id');
        $('[data-title=' + test + ']').find(".addToCompare").click();
        hideComparePanel();
    });

    function hideComparePanel() {
        if (!list.length) {
            $(".comparePan").empty();
            $(".comparePanle").hide();
        }
    }
})(jQuery);
