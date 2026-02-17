document.addEventListener("DOMContentLoaded", () => {

    const logoutBtn = document.getElementById("logoutBtn");
    const fileArea = document.getElementById("fileArea");
    const breadcrumbs = document.querySelector(".breadcrumbs");

    let currentFolder = "Home";

    /* ======================
       AUTH PROTECTION
    ====================== */

    auth.onAuthStateChanged(user => {
        if (!user) {
            window.location.href = "login.html";
        } else {
            console.log("Logged in as:", user.email);
            loadFiles(currentFolder);
        }
    });

    /* ======================
       LOGOUT
    ====================== */

    logoutBtn.addEventListener("click", () => {
        auth.signOut().then(() => {
            window.location.href = "login.html";
        });
    });

    /* ======================
       LOAD FILES FROM FIRESTORE
    ====================== */

    async function loadFiles(folder) {

        fileArea.innerHTML = "Loading...";

        try {

            const snapshot = await db.collection("files")
                .where("folder", "==", folder)
                .get();

            const files = snapshot.docs.map(doc => doc.data());

            renderFiles(files);

        } catch (error) {
            console.error(error);
            fileArea.innerHTML = "<p style='color:red'>Could not load files.</p>";
        }
    }

    function renderFiles(files) {

        fileArea.innerHTML = "";

        if (files.length === 0) {
            fileArea.innerHTML = "<p>No files yet.</p>";
            return;
        }

        files.forEach(file => {

            const item = document.createElement("div");
            item.classList.add("file-item");

            const icon = document.createElement("img");
            icon.src = "assets/svg/file.svg";
            icon.classList.add("icon");

            const name = document.createElement("span");
            name.textContent = file.name;

            item.appendChild(icon);
            item.appendChild(name);

            fileArea.appendChild(item);
        });
    }

});
