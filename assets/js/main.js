document.addEventListener("DOMContentLoaded", () => {

    // Immediately reveal hero
    const hero = document.querySelector(".hero");
    if (hero) {
        hero.style.opacity = "1";
        hero.style.transform = "translateY(0)";
    }

    // Scroll reveal for widgets
    const widgets = document.querySelectorAll(".widget");

    const reveal = () => {
        const triggerBottom = window.innerHeight * 0.85;

        widgets.forEach(widget => {
            const boxTop = widget.getBoundingClientRect().top;

            if (boxTop < triggerBottom) {
                widget.classList.add("visible");
            }
        });
    };

    window.addEventListener("scroll", reveal);
    reveal();
});
