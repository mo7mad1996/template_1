const parent = document.querySelector(".parts");
const children = parent.querySelectorAll(".grid-item");

document.querySelectorAll("[data-filter]").forEach((el) => {
  el.addEventListener("click", (e) => {
    $(el).siblings(".active").removeClass("active");
    $(el).addClass("active");
    e.preventDefault();
  });

  el.addEventListener("click", (e) => {
    const max_size = getComputedStyle(parent);
    const chid_size = getComputedStyle(children[0]);

    const row_items_count =
      +max_size.width.replace("px", "") / +chid_size.width.replace("px", "");

    const filter = el.getAttribute("data-filter");
    const element_height = +getComputedStyle(children[0]).height.replace(
      "px",
      ""
    );
    const element_width = +getComputedStyle(children[0]).width.replace(
      "px",
      ""
    );

    let ready_to_show = [];
    let will_hide = [];

    children.forEach((child) => {
      if (child.classList.contains(filter.substring(1))) {
        ready_to_show.push(child);
      } else {
        will_hide.push(child);
      }
    });

    if (filter == "*") {
      ready_to_show = children;
      will_hide = [];
    }

    children.forEach((h) => {
      h.style.position = "absolute";
    });

    will_hide.forEach((h) => {
      h.style.transform = "scale(0, 0)";
    });
    ready_to_show.forEach((h, n) => {
      h.style.transform = "scale(1, 1)";
      h.style.left = element_width * (n % row_items_count) + "px";
      h.style.right = "auto";
      h.style.bottom = "auto";
      h.style.top = Math.floor(n / row_items_count) * element_height + "px";
    });

    // set the parent height
    parent.style.height =
      Math.ceil(ready_to_show.length / row_items_count) * element_height + "px";
  });
});
