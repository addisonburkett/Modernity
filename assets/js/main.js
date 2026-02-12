async function loadComponent(id, file) {
    const container = document.getElementById(id);
    if (container) {
        const html = await fetch(file).then(r => r.text());
        container.innerHTML = html;
    }
}

window.onload = async () => {
    const prefix = window.componentPathPrefix || "";
    const headerFile = window.headerFile || (prefix + "components/header.html");

    await loadComponent("header", headerFile);
    await loadComponent("footer", prefix + "components/footer.html");
    await loadComponent("transition", prefix + "components/transition.html");

    setTimeout(() => {
        const t = document.getElementById("transition");
        if (t) t.classList.add("fade-out");
    }, 50);
};