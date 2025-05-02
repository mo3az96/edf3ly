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

  // Fixed Header
  const header = $("#header");
  if (header.length) {
    const stickyOffset = header.offset().top;
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
});
