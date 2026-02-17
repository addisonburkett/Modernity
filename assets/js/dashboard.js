document.addEventListener("DOMContentLoaded", () => {

    const sidebar = document.getElementById("sidebar");
    const pinBtn = document.getElementById("pinSidebar");
    const menuBtn = document.getElementById("menuBtn");
    const menuDropdown = document.getElementById("menuDropdown");
    const themeToggle = document.getElementById("themeToggle");
    const gridBtn = document.getElementById("gridView");
    const listBtn = document.getElementById("listView");
    const fileArea = document.getElementById("fileArea");

    /* ======================
       Sidebar Pin Toggle
    ====================== */

    /* Restore pinned state */
    if (localStorage.getItem("sidebarPinned") === "true") {
        sidebar.classList.add("pinned");
        pinBtn.classList.add("active");
    }

    pinBtn.onclick = () => {
        sidebar.classList.toggle("pinned");
        pinBtn.classList.toggle("active");

        localStorage.setItem(
            "sidebarPinned",
            sidebar.classList.contains("pinned")
        );
    };



    /* ======================
       Menu Dropdown
    ====================== */

    menuBtn.onclick = (e) => {
        e.stopPropagation();
        menuDropdown.classList.toggle("open");
    };

    document.addEventListener("click", () => {
        menuDropdown.classList.remove("open");
    });

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
