document.addEventListener("DOMContentLoaded", () => {

    const sidebar = document.getElementById("sidebar");
    const collapseBtn = document.getElementById("collapseBtn");

    collapseBtn.onclick = () => {
        sidebar.classList.toggle("collapsed");
    };

    document.querySelectorAll(".nav-expand").forEach(btn => {
        btn.onclick = () => {
            btn.parentElement.classList.toggle("open");
        };
    });

    const themeToggle = document.getElementById("themeToggle");

    themeToggle.onclick = () => {
        const html = document.documentElement;
        const current = html.getAttribute("data-theme");

        html.setAttribute(
            "data-theme",
            current === "dark" ? "light" : "dark"
        );
    };

    const fileArea = document.getElementById("fileArea");
    const gridBtn = document.getElementById("gridView");
    const listBtn = document.getElementById("listView");

    gridBtn.onclick = () => {
        fileArea.classList.remove("list-view");
        fileArea.classList.add("grid-view");
        gridBtn.classList.add("active");
        listBtn.classList.remove("active");
    };

    listBtn.onclick = () => {
        fileArea.classList.remove("grid-view");
        fileArea.classList.add("list-view");
        listBtn.classList.add("active");
        gridBtn.classList.remove("active");
    };

});
