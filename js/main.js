$(window).on("load", function () {
  setTimeout(() => {
    $(".loading").removeClass("loading");
    $("body").removeClass("overflow");
  }, 500);
});

$(document).ready(function () {
  // Dark mode toggle
  const modeToggle = $("#modeSwitch");
  const savedMode = localStorage.getItem("mode");

  if (savedMode === "dark") {
    $("body").addClass("dark");
    modeToggle.prop("checked", true);
  }

  modeToggle.on("change", function () {
    if ($(this).is(":checked")) {
      $("body").addClass("dark");
      localStorage.setItem("mode", "dark");
    } else {
      $("body").removeClass("dark");
      localStorage.setItem("mode", "light");
    }
  });

  // Menu
  $(".menu-button").click(function () {
    $(".side-nav").addClass("active");
    $("body").addClass("overflow");
    $(".nav-overlay").fadeIn();
  });
  $(".menu-close,.nav-overlay").click(function () {
    $(".side-nav").removeClass("active");
    $("body").removeClass("overflow");
    $(".nav-overlay").fadeOut();
  });

  // Fixed Header
  const header = $("#header");
  if (header.length) {
    const stickyOffset = 50;
    const toggleFixed = function () {
      if ($(window).scrollTop() > stickyOffset) {
        header.addClass("fixed");
      } else {
        header.removeClass("fixed");
      }
    };

    toggleFixed();
    $(window).on("scroll", toggleFixed);
  }

  // Password toggle
  $(".toggle-password").on("click", function () {
    const input = $(this).prev("input");
    if (input.attr("type") === "password") {
      input.attr("type", "text");
      $(this).addClass("active");
    } else {
      input.attr("type", "password");
      $(this).removeClass("active");
    }
  });

  // Date Picker active class
  $('.date-content input[type="date"]').on("change", function () {
    const container = $(this).closest(".date-content");
    if ($(this).val()) {
      container.addClass("active");
    } else {
      container.removeClass("active");
    }
  });

  // DataTable initialization
  if ($(".data-table").length) {
    $(".data-table").DataTable({
      dom: '<"table-responsive"rt><"bottom"lpi><"clear">',
      // pageLength: 1,
      responsive: true,
      pagingType: "simple_numbers",
      language: {
        url: document.dir === "rtl" ? "./js/ar.json" : "",
        lengthMenu:
          document.dir === "rtl"
            ? "<label>نتائج فى كل صفحة</label> _MENU_"
            : "<label>Results per page</label> _MENU_",

        info:
          document.dir === "rtl"
            ? "عرض _START_ إلى _END_ من _TOTAL_ نتيجه"
            : "Showing _START_ to _END_ of (_TOTAL_)",

        paginate: {
          previous:
            document.dir === "rtl"
              ? '<i class="far fa-chevron-right"></i>'
              : '<i class="far fa-chevron-left"></i>',
          next:
            document.dir === "rtl"
              ? '<i class="far fa-chevron-left"></i>'
              : '<i class="far fa-chevron-right"></i>',
          first:
            document.dir === "rtl"
              ? '<i class="far fa-chevron-double-right"></i>'
              : '<i class="far fa-chevron-double-left"></i>',
          last:
            document.dir === "rtl"
              ? '<i class="far fa-chevron-double-left"></i>'
              : '<i class="far fa-chevron-double-right"></i>',
        },
      },
    });
  }

  // Slider
  var storeSwiper = new Swiper(".products-slider .swiper", {
    loop: true,
    breakpoints: {
      0: {
        slidesPerView: 2,
        spaceBetween: 5,
      },
      767: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
      1199: {
        slidesPerView: 3,
        spaceBetween: 15,
      },
    },
    navigation: {
      nextEl: ".products-slider .swiper-btn-next",
      prevEl: ".products-slider .swiper-btn-prev",
    },
    pagination: {
      el: ".products-slider .swiper-pagination",
      clickable: true,
    },
  });

  // Select2 Currencies
  function formatState(state) {
    if (!state.id) {
      return state.text;
    }

    const flagUrl = state.element?.dataset?.flag?.toLowerCase();

    const $state = $(`
      <span class="state-img">
        <img src="${flagUrl}" class="img-contain" />
      </span>
      <span class="state-text">${state.text}</span>
  `);

    return $state;
  }

  $(".currency-select").select2({
    templateResult: formatState,
    templateSelection: formatState,
    minimumResultsForSearch: Infinity,
    dropdownCssClass: "currencies-list",
  });

  // Select2 Payment
  function formatPayment(payment) {
    if (!payment.id) {
      return payment.text;
    }

    const flagUrl = payment.element?.dataset?.flag?.toLowerCase();
    const note = payment.element?.dataset?.note;

    const $payment = $(`
    <div class="payment-content">
      <span class="payment-img">
        <img src="${flagUrl}" class="img-contain" />
      </span>
      <div class="payment-text">
        <span class="payment-title">${payment.text}</span>
        <span class="payment-note">${note}</span>
      </div>
    </div>
  `);

    return $payment;
  }
  function formatPaymentList(payment) {
    if (!payment.id) {
      return payment.text;
    }

    const flagUrl = payment.element?.dataset?.flag?.toLowerCase();

    const $payment = $(`
      <span class="payment-img">
        <img src="${flagUrl}" class="img-contain" />
      </span>
      <span class="payment-text">${payment.text}</span>
  `);

    return $payment;
  }

  $(".payment-select .form-control").select2({
    templateResult: formatPaymentList,
    templateSelection: formatPayment,
    minimumResultsForSearch: Infinity,
    dropdownCssClass: "payment-list",
  });
});
