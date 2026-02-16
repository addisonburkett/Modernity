document.addEventListener("DOMContentLoaded", () => {

    const sidebar = document.getElementById("sidebar");
    const collapseBtn = document.getElementById("collapseBtn");
    const themeToggle = document.getElementById("themeToggle");
    const gridBtn = document.getElementById("gridView");
    const listBtn = document.getElementById("listView");
    const fileArea = document.getElementById("fileArea");

    /* ======================
       Sidebar Pin Toggle
    ====================== */

    collapseBtn.onclick = () => {
        sidebar.classList.toggle("pinned");
    };

    /* ======================
       Expandable Library
    ====================== */

    document.querySelectorAll(".nav-expand").forEach(btn => {
        btn.onclick = () => {
            btn.parentElement.classList.toggle("open");
        };
    });

    /* ======================
       Theme Toggle
    ====================== */

    themeToggle.onclick = () => {
        const html = document.documentElement;
        const current = html.getAttribute("data-theme");
        html.setAttribute(
            "data-theme",
            current === "dark" ? "light" : "dark"
        );
    };

    /* ======================
       Grid / List Toggle
    ====================== */

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
