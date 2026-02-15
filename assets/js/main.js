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