document.addEventListener("DOMContentLoaded", () => {
  const modeToggle = document.getElementById("modeSwitch");
  const savedMode = localStorage.getItem("mode");

  // Apply saved mode
  if (savedMode === "dark") {
    document.body.classList.add("dark");
    modeToggle.checked = true;
  }

  // Toggle mode on change
  modeToggle.addEventListener("change", () => {
    if (modeToggle.checked) {
      document.body.classList.add("dark");
      localStorage.setItem("mode", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("mode", "light");
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".toggle-password").forEach((button) => {
    button.addEventListener("click", function () {
      const input = this.previousElementSibling;

      if (input.type === "password") {
        input.type = "text";
        this.classList.add("active");
      } else {
        input.type = "password";
        this.classList.remove("active");
      }
    });
  });
});
