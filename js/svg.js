function toSvg() {
  document.querySelectorAll('img.svg').forEach((img) => {
    const imgID = img.id;
    const imgClass = img.className;
    const imgURL = img.src;

    fetch(imgURL)
      .then((response) => {
        if (!response.ok) throw new Error(`Failed to load ${imgURL}`);
        return response.text();
      })
      .then((text) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, "image/svg+xml");
        const svg = doc.querySelector("svg");

        if (!svg) throw new Error(`No <svg> tag found in ${imgURL}`);

        // Clean up existing attributes to avoid duplication
        svg.removeAttribute("xmlns:a");

        // Copy ID and class
        if (imgID) svg.setAttribute("id", imgID);
        svg.setAttribute("class", `${imgClass} replaced-svg`.trim());

        // Ensure viewBox exists
        if (!svg.hasAttribute("viewBox") && svg.hasAttribute("width") && svg.hasAttribute("height")) {
          const width = svg.getAttribute("width");
          const height = svg.getAttribute("height");
          svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
        }

        // Copy other potential useful attributes
        svg.setAttribute("role", "img");

        // Replace the image with the SVG
        img.replaceWith(svg);
      })
      .catch((error) => {
        console.warn("SVG inline replacement error:", error);
      });
  });
}

toSvg();
