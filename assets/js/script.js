// Config
host = "pusatdata.tk";
$btnAdd = $("button#add");
page = "#pemesanan";
title = "PESAN MAKANAN";

// Header Setup Equal Height
// config layout header
$("#bar").after("<div class='overlay'></div>");

var templateMenu = $("#templateMenu").html();
var templateOptionMakan = $("#datalist-option-makan").html();
var listPesanan = $("#list-pesanan").html();

function getSize() {
    $header1 = $("#daftar-pesanan").find("header");
    console.log($header1.innerHeight());
}

var meta = [
    '<meta name="description" content="lorem ipsum dolor sit amet">',
    '<meta name="keyword" content="a,b,c,d,ef,g">',
    '<meta name="author" content="Deni Pratama">',
    '<meta name="image" content="aa.jpg">'
];

metaTag(meta);

function metaTag() {
    $title = $("head title");

    for (var i = 0; i <= meta.length; i++) {
        $title.before(meta[i]);
    }
}

var headerEqual = function() {
    $header1 = $("#daftar-pesanan").find("header");
    $header2 = $("#pemesanan").find("header");
    $header3 = $("#menu").find("header");


    var hh1 = $header1.innerHeight();
    var hh2 = $header2.innerHeight();
    var hh3 = $header3.innerHeight();

    if (hh1 > hh2 && hh1 > hh3) {
        $header2.innerHeight(hh1);
        $header3.innerHeight(hh1);
        console.log("h1 large");
    } else if (hh2 > hh1 && hh2 > hh3) {
        $header1.innerHeight(hh2);
        $header3.innerHeight(hh2);
        console.log("h2 large");
    } else if (hh3 > hh1 && hh3 > hh2) {
        $header1.innerHeight(hh3);
        $header2.innerHeight(hh3);
        console.log("h3 large");
    }

};

headerEqual();
// Closing Header Setup Equal Height
// ******************************************************************

// ===================================================================
// ROUTING MENU
// ===================================================================
// Routing Menu Url
var route = function(page) {
    if (page == "#pemesanan") {
        $("body").scrollTop(0);
        $("#pemesanan").addClass("show");
        $("#menu").removeClass("show");
        $("#daftar-pesanan").removeClass("show");
        $("nav#bar h2.title").html(title);
    } else if (page == "#menu") {
        $("#pemesanan").removeClass("show");
        $("#menu").addClass("show");
        $("#daftar-pesanan").removeClass("show");
        $("nav#bar h2.title").html("MENU MAKANAN");
    } else if (page == "#daftar-pesanan") {
        $("#pemesanan").removeClass("show");
        $("#menu").removeClass("show");
        $("#daftar-pesanan").addClass("show");
        $("nav#bar h2.title").html("ANTRIAN MAKANAN");
    }
};
// Closing Routing Menu Url
route(page);
// ******************************************************************

// ===================================================================
// MENU UX SLIDE/SIDE TOGGLE
// ===================================================================
// Toggle Side Menu
$("#btn-menu").click(function() {
    $("div.overlay").toggleClass("open");
    $("#slide").toggleClass("open");
    $("nav").toggleClass("open");
    $("body").css({
        "overflow": "hidden"
    });
});
// Closing Toggle Side Menu

// Toggle Side Menu Close
$("#btn-menu-close").click(function() {
    $("div.overlay").toggleClass("open");
    $("#slide").toggleClass("open");
    $("body").css({
        "overflow": "scroll"
    });
});
// Toggle Side Menu Close

// Overlay Menu
$("div.overlay").click(function() {
    $("div.overlay").toggleClass("open");
    $("#slide").toggleClass("open");
    $("body").css({
        "overflow": "scroll"
    });
});
// Closing Overlay Menu

// Menu Anchor Hyperlink Click
$("#slide ul li a").click(function(event) {

    $("body").css({
        "overflow": "scroll"
    });

    $("div.overlay").removeClass("open");
    $("#slide").removeClass("open");

    var page = this.hash;
    route(page);
});
// Closing Menu Anchor Hyperlink Click
// ******************************************************************


// ===================================================================
// MUSTACHE TEMPLATE ENGINE
// ===================================================================
// Mustache Add Template
var add = function(data) {
    $("#list-pesanan-menunggu").prepend(Mustache.render(listPesanan, data));
};
// Closing Mustache Add Template
// *******************************************************************




// AJAX GET MENU
$.ajax({
    url: "assets/json/menu.json",
    type: "GET",
    beforeSend: function() {
        $("#list-makanan").append("<div class='loading'><p>Loading...</p></div>");
        $("#list-minuman").append("<div class='loading'><p>Loading...</p></div>");
    },
    success: function($data) {
        $("#list-makanan div.loading").remove();
        $("#list-minuman div.loading").remove();

        var makanan = $data.menu.makanan;
        var minuman = $data.menu.minuman;

        $.each(makanan, function(i, makan) {
            $("#list-makanan").append(Mustache.render(templateMenu, makan));
            $("datalist#makanan").append(Mustache.render(templateOptionMakan, makan));
        });

        $.each(minuman, function(i, minum) {
            $("#list-minuman").append(Mustache.render(templateMenu, minum));
            $("datalist#makanan").append(Mustache.render(templateOptionMakan, minum));
        });
    }
});
// Closing AJAX GET MENU




// GET AJAX REQUEST
$.ajax({
    url: 'http://' + host + '/api/pesan',
    type: 'GET',
    beforeSend: function() {
        $("#list-pesanan-menunggu").prepend("<div class='loading'><p>Loading...</p></div>");
    },
    success: function($data) {
        $.each($data, function(i, list) {
            $(".loading").remove();
            add(list);
        });
    }
});
// Closing GET AJAX

// POST REQUEST AJAX
var Post = function($data) {
    $.ajax({
        url: 'http://' + host + '/api/pesan',
        type: 'POST',
        data: JSON.stringify($data),
        beforeSend: function() {
            $("#list-pesanan-menunggu").prepend("<div class='loading'><p>Loading...</p></div>");
            NProgress.start();
        },
        success: function(data) {
            NProgress.done();
            add(data[0]);
            $("div.loading").remove();
            $("#pemesanan").removeClass("show");
            $("#daftar-pesanan").addClass("show");
        }
    }); // ajax post
};
// Closing POST REQUEST AJAX

// Button Add Click binding AJAX POST^ REQUEST
function getFormInput() {
    var PesanObj = {};
    if ($("#input-makanan").val() === "" && $("#input-nama").val() === "") {
        alert("Harap Masukan Keseluruhan Formulir!");
    } else if ($("#input-makanan").val() === "") {
        alert("Masukan Makanan!");
    } else if ($("#input-nama").val() === "") {
        alert("Masukan Nama!");
    } else {
        PesanObj = {
            pesanan: $("#input-makanan").val(),
            nama_pemesan: $("#input-nama").val()
        };
        Post(PesanObj);
    }

    $("#input-makanan").val("");
    $("#input-nama").val("");
}

$btnAdd.click(function() {
    getFormInput();
});

// Closing Button Add Click binding AJAX POST^ REQUEST

// Button UPDATE AJAX REQUEST
$("#list-pesanan-menunggu").delegate(".btn-save", "click", function() {
    $li = $(this).closest("li");
    var c = confirm("Apakah anda yakin untuk mengubah?");
    if (c === true) {

        var dataid = $li.attr("data-id");
        var updateObj = {
            pesanan: $li.find("input.nama-makanan").val(),
            nama_pemesan: $li.find("input.nama-pemesan").val()
        };

        $.ajax({
            url: "http://" + host + "/api/pesan/" + dataid,
            type: "PUT",
            data: JSON.stringify(updateObj),
            beforeSend: function() {
                NProgress.start();
            },
            success: function() {
                NProgress.done();
                $li.find("span.nama-makanan").html(updateObj.pesanan);
                $li.find("span.nama-pemesan").html(updateObj.nama_pemesan);
            }
        }); // AJAX PUT/UPDATE
    } // if
    else {
        alert("Membatalkan Perubahan");
    }

    $li.removeClass("edit");

});
// Closing UPDATE AJAX REQUEST

// Button DELETE AJAX REQUEST
$("#list-pesanan-menunggu").delegate(".btn-delete", "click", function() {
    $li = $(this).closest("li");

    $dataid = $li.attr("data-id");

    var c = confirm("Yakin Ingin Menghapus?");

    if (c === true) {
        $.ajax({
            url: "http://" + host + "/api/pesan/" + $dataid,
            type: "DELETE",
            success: function() {
                $li.fadeOut(300, function() {
                    $li.remove();
                });
            }
        }); // ajax
    } else {
        alert("Penghapusan dibatalkan!");
    }
});
// Closing DELETE AJAX REQUEST




// Button Edit
$("#list-pesanan-menunggu").delegate(".btn-edit", "click", function() {
    $li = $(this).closest("li");
    $li.addClass("edit");
    $li.find("input.nama-makanan").val($li.find("span.nama-makanan").html());
    $li.find("input.nama-pemesan").val($li.find("span.nama-pemesan").html());
});
// Closing Button Edit

// Button Cancel
$("#list-pesanan-menunggu").delegate(".btn-cancel", "click", function() {
    $li = $(this).closest("li");
    $li.removeClass("edit");
});
// Closing Button Cancel

// Add list makanan to form
$("#list-makanan").add("#list-minuman").delegate(".btn-add-menu", "click", function() {

    var val = $(this).attr("data-value");
    var c = confirm("Yakin Ingin Ingin Menambahkan \"" + val + "\" ke Form Pemesanan?");
    if (c === true) {
        $(this).html("<i class='icon ion-checkmark-round'></i>");
        $("#input-makanan").val(val);
        alert("Sudah ditambahkan ke Form Pemesanan");
        $("#pemesanan").addClass("show");
        $("#menu").removeClass("show");
        $("#daftar-pesanan").removeClass("show");
        $("#input-makanan").focus();
    }
    $(this).html("<i class='icon ion-ios-plus-empty'></i>");
});
// Closing Add list makanan to form

// Button Hireme Go to http://mbahgoez.github.io
$("#hireme").on("click", function() {
    window.open("http://mbahgoez.github.io");
});
// Closing Button Hireme Go to http://mbahgoez.github.io


function enterPressTambah(event) {
    if (event.which == 13) {
        getFormInput();
    }
}
