document.addEventListener("DOMContentLoaded", () => {

    const sidebar = document.getElementById("sidebar");
    const pinBtn = document.getElementById("pinSidebar");
    const menuBtn = document.getElementById("menuBtn");
    const themeToggle = document.getElementById("themeToggle");
    const fileArea = document.getElementById("fileArea");
    const viewToggle = document.getElementById("viewToggle");
    const viewIcon = document.getElementById("viewIcon");
    const viewTooltip = document.getElementById("viewTooltip");

    /* ======================
       Sidebar Pin Toggle
    ====================== */
    if (localStorage.getItem("sidebarPinned") === "true") {
        sidebar.classList.add("pinned");
        pinBtn.classList.add("active");
    }

    pinBtn.onclick = () => {
        sidebar.classList.toggle("pinned");
        pinBtn.classList.toggle("active");
        localStorage.setItem("sidebarPinned", sidebar.classList.contains("pinned"));
    };

    /* ======================
       Menu Dropdown
    ====================== */
    const menuDropdown = document.getElementById("menuDropdown");
    if (menuDropdown) {
        menuBtn.onclick = (e) => {
            e.stopPropagation();
            menuDropdown.classList.toggle("open");
        };
        document.addEventListener("click", () => menuDropdown.classList.remove("open"));
    }

    /* ======================
       Expandable Library
    ====================== */
    document.querySelectorAll(".nav-expand").forEach(btn => {
        btn.onclick = () => btn.parentElement.classList.toggle("open");
    });

    /* ======================
       Theme Toggle
    ====================== */
    themeToggle.onclick = () => {
        const html = document.documentElement;
        const current = html.getAttribute("data-theme");
        html.setAttribute("data-theme", current === "dark" ? "light" : "dark");
    };

    /* ======================
       Grid/List Toggle
    ====================== */
    let isGrid = true;
    viewToggle.onclick = () => {
        isGrid = !isGrid;
        if (isGrid) {
            fileArea.classList.remove("list-view");
            fileArea.classList.add("grid-view");
            viewIcon.src = "assets/svg/grid.svg";
            viewTooltip.textContent = "Grid view";
        } else {
            fileArea.classList.remove("grid-view");
            fileArea.classList.add("list-view");
            viewIcon.src = "assets/svg/list.svg";
            viewTooltip.textContent = "List view";
        }
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
            if (left < 8) left = 8;
            if (left + tooltipRect.width > window.innerWidth - 8) left = window.innerWidth - tooltipRect.width - 8;
            if (top < 8) top = rect.bottom + 8;
            tooltip.style.top = `${top}px`;
            tooltip.style.left = `${left}px`;
        });

        wrapper.addEventListener("mouseleave", () => {
            tooltip.classList.remove("show");
        });
    });

    /* ======================
       FIREBASE UPLOAD + GALLERY
    ====================== */

    import("https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js").then(authModule => {
        import("https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js").then(storageModule => {

            const { getAuth } = authModule;
            const { getStorage, ref, uploadBytesResumable, getDownloadURL, listAll } = storageModule;

            const auth = getAuth();
            const storage = getStorage();

            const uploadBtn = document.getElementById("uploadBtn");
            const fileInput = document.getElementById("fileInput");

            uploadBtn.onclick = () => fileInput.click();

            fileInput.onchange = async (e) => {
                const files = e.target.files;
                const user = auth.currentUser;
                if (!user) return;

                for (const file of files) {
                    const storageRef = ref(storage, `users/${user.uid}/uploads/${file.name}`);
                    const task = uploadBytesResumable(storageRef, file);

                    task.on("state_changed", null, console.error, async () => {
                        await loadFiles();
                    });
                }
            };

            async function loadFiles() {
                const user = auth.currentUser;
                if (!user) return;

                const folder = ref(storage, `users/${user.uid}/uploads/`);
                const result = await listAll(folder);

                fileArea.innerHTML = "";

                for (const item of result.items) {
                    const url = await getDownloadURL(item);
                    const div = document.createElement("div");
                    div.className = "file-card";
                    div.innerHTML = `<img src="${url}" class="file-thumb">`;
                    fileArea.appendChild(div);
                }
            }

            auth.onAuthStateChanged(user => {
                if (user) loadFiles();
            });

        });
    });

});
