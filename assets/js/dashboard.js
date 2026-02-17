document.addEventListener("DOMContentLoaded", () => {

    const sidebar = document.getElementById("sidebar");
    const pinBtn = document.getElementById("pinSidebar");
    const menuBtn = document.getElementById("menuBtn");
    const menuDropdown = document.getElementById("menuDropdown");
    const themeToggle = document.getElementById("themeToggle");
    const gridBtn = document.getElementById("gridView");
    const listBtn = document.getElementById("listView");
    const fileArea = document.getElementById("fileArea");
    const logoutBtn = document.getElementById("logoutBtn");

    /* Restore pinned state */
    if (localStorage.getItem("sidebarPinned") === "true") {
        sidebar.classList.add("pinned");
        pinBtn.classList.add("active");
    }

    /* Sidebar Pin Toggle */
    pinBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        sidebar.classList.toggle("pinned");
        pinBtn.classList.toggle("active");

        localStorage.setItem(
            "sidebarPinned",
            sidebar.classList.contains("pinned")
        );
    });

    /* Menu Dropdown */
    menuBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const open = menuDropdown.classList.toggle("open");
        menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
        menuDropdown.setAttribute("aria-hidden", open ? "false" : "true");
    });

    document.addEventListener("click", () => {
        menuDropdown.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
        menuDropdown.setAttribute("aria-hidden", "true");
    });

    /* Expandable Library */
    document.querySelectorAll(".nav-expand").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            btn.parentElement.classList.toggle("open");
        });
    });

    /* Theme Toggle */
    themeToggle.addEventListener("click", () => {
        const html = document.documentElement;
        const current = html.getAttribute("data-theme");
        html.setAttribute(
            "data-theme",
            current === "dark" ? "light" : "dark"
        );
    });

    /* Grid / List Toggle */
    gridBtn.addEventListener("click", () => {
        fileArea.classList.remove("list-view");
        fileArea.classList.add("grid-view");
        gridBtn.classList.add("active");
        listBtn.classList.remove("active");
        gridBtn.setAttribute("aria-pressed", "true");
        listBtn.setAttribute("aria-pressed", "false");
    });

    listBtn.addEventListener("click", () => {
        fileArea.classList.remove("grid-view");
        fileArea.classList.add("list-view");
        listBtn.classList.add("active");
        gridBtn.classList.remove("active");
        listBtn.setAttribute("aria-pressed", "true");
        gridBtn.setAttribute("aria-pressed", "false");
    });

    /* Logout (placeholder) */
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            console.log("Logout clicked");
        });
    }

});
