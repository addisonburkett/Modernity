document.addEventListener("DOMContentLoaded", () => {

    // Collapse Sidebar
    const collapseBtn = document.getElementById("collapseBtn");
    const sidebar = document.getElementById("sidebar");

    if (collapseBtn && sidebar) {
        collapseBtn.onclick = () => {
            sidebar.classList.toggle("collapsed");
        };
    }

    // Expandable Nav Groups
    document.querySelectorAll(".nav-expand").forEach(btn => {
        btn.onclick = () => {
            btn.parentElement.classList.toggle("open");
        };
    });

    // Theme Toggle
    const themeToggle = document.getElementById("themeToggle");

    if (themeToggle) {
        themeToggle.onclick = () => {
            const html = document.documentElement;
            const current = html.getAttribute("data-theme");

            html.setAttribute(
                "data-theme",
                current === "dark" ? "light" : "dark"
            );
        };
    }

    // View Toggle
    const fileArea = document.getElementById("fileArea");
    const gridBtn = document.getElementById("gridView");
    const listBtn = document.getElementById("listView");

    if (gridBtn && listBtn && fileArea) {

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
    }

});
