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

    // Restore pinned state
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

    /* ======================
       Smart Tooltips
    ====================== */

    document.querySelectorAll(".tooltip").forEach(wrapper => {
        const tooltip = wrapper.querySelector(".tooltiptext");
        const trigger = wrapper.querySelector("button");

        if (!tooltip || !trigger) return;

        wrapper.addEventListener("mouseenter", () => {
            tooltip.classList.add("show");

            const rect = trigger.getBoundingClientRect();
            const tooltipRect = tooltip.getBoundingClientRect();

            let top = rect.top - tooltipRect.height - 8;
            let left = rect.left + rect.width / 2 - tooltipRect.width / 2;

            // Prevent left overflow
            if (left < 8) left = 8;

            // Prevent right overflow
            if (left + tooltipRect.width > window.innerWidth - 8) {
                left = window.innerWidth - tooltipRect.width - 8;
            }

            // If not enough space above, show below
            if (top < 8) {
                top = rect.bottom + 8;
            }

            tooltip.style.top = `${top}px`;
            tooltip.style.left = `${left}px`;
        });

        wrapper.addEventListener("mouseleave", () => {
            tooltip.classList.remove("show");
        });
    });

});
