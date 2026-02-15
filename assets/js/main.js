/* Modernity — Hybrid React-Style Layout
   Smooth fade-in transition
*/

window.addEventListener("load", () => {
    document.body.classList.add("loaded");
});

function createFolderFromSidebar() {
    const name = document.getElementById("sidebarNewFolderName").value.trim();
    if (name) {
        DataLayer.createFolder(currentPath, name);
        document.getElementById("sidebarNewFolderName").value = "";
        render();
    }
}

function toggleSidebarFolderForm() {
    const form = document.getElementById("sidebarFolderForm");
    form.style.display = form.style.display === "flex" ? "none" : "flex";
}

function cancelSidebarFolder() {
    const form = document.getElementById("sidebarFolderForm");
    document.getElementById("sidebarNewFolderName").value = "";
    form.style.display = "none";
}

function createFolderFromSidebar() {
    const name = document.getElementById("sidebarNewFolderName").value.trim();
    if (name) {
        DataLayer.createFolder(currentPath, name);
        document.getElementById("sidebarNewFolderName").value = "";
        document.getElementById("sidebarFolderForm").style.display = "none";
        render();
    }
}