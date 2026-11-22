// =============================================
// ADLIN PORTFOLIO — 3D PROJECT COVERFLOW
// =============================================

document.addEventListener("DOMContentLoaded", () => {

    const carousel = document.getElementById("projectCoverflow");
    const cards = document.querySelectorAll(".project-file");

    const prevButton = document.getElementById("prevProject");
    const nextButton = document.getElementById("nextProject");

    const projectNumber = document.getElementById("projectNumber");
    const projectTitle = document.getElementById("projectTitle");
    const projectDescription = document.getElementById("projectDescription");

    const projectLive = document.getElementById("projectLive");
    const projectGithub = document.getElementById("projectGithub");

    if (!carousel || !cards.length) {
        return;
    }

    const projects = [
        {
            title: "KerisKit",
            description:
                "An interactive web platform designed to introduce " +
                "the traditional Malay keris through digital learning experiences.",

            live: "https://keriskit-platform.onrender.com/",
            github: "https://github.com/Edwolfhard/keriskit-platform"
        },
        {
            title: "NDPP",
            description:
                "A Natural Language Processing platform for preprocessing " +
                "and normalizing informal Malay–English social media text.",

            live: null,
            github: "https://github.com/Edwolfhard/ndpp-platform"
        }
    ];

    let activeIndex = 0;

    let startX = 0;
    let isDragging = false;

    // =============================================
    // UPDATE CAROUSEL
    // =============================================

    function updateCarousel() {

        cards.forEach((card, index) => {

            card.classList.remove(
                "is-active",
                "is-left",
                "is-right",
                "is-hidden"
            );

            const total = cards.length;

            const forwardDistance =
                (index - activeIndex + total) % total;

            const backwardDistance =
                (activeIndex - index + total) % total;

            if (index === activeIndex) {

                card.classList.add("is-active");

            } else if (forwardDistance <= backwardDistance) {

                card.classList.add("is-right");

            } else {

                card.classList.add("is-left");

            }

        });

        updateProjectDetails();
    }

    // =============================================
    // UPDATE PROJECT INFORMATION
    // =============================================

    function updateProjectDetails() {

        const project = projects[activeIndex];

        projectNumber.textContent =
            `PROJECT ${String(activeIndex + 1).padStart(2, "0")} / ` +
            `${String(projects.length).padStart(2, "0")}`;

        projectTitle.textContent = project.title;

        projectDescription.textContent = project.description;

        projectGithub.href = project.github;

        if (project.live) {

            projectLive.href = project.live;
            projectLive.style.display = "inline-flex";

        } else {

            projectLive.removeAttribute("href");
            projectLive.style.display = "none";

        }
    }

    // =============================================
    // NAVIGATION
    // =============================================

    function nextProject() {

        activeIndex = (activeIndex + 1) % cards.length;

        updateCarousel();
    }

    function previousProject() {

        activeIndex =
            (activeIndex - 1 + cards.length) % cards.length;

        updateCarousel();
    }

    nextButton.addEventListener("click", nextProject);

    prevButton.addEventListener("click", previousProject);

    // =============================================
    // CLICK A PROJECT CARD
    // =============================================

    cards.forEach((card, index) => {

        card.addEventListener("click", () => {

            if (index !== activeIndex) {

                activeIndex = index;

                updateCarousel();
            }

        });

    });

    // =============================================
    // MOUSE / TOUCH SWIPE
    // =============================================

    carousel.addEventListener("pointerdown", (event) => {

        if (event.pointerType === "mouse" && event.button !== 0) {
            return;
        }

        startX = event.clientX;

        isDragging = true;

        carousel.setPointerCapture(event.pointerId);
    });

    carousel.addEventListener("pointerup", (event) => {

        if (!isDragging) {
            return;
        }

        const endX = event.clientX;

        const difference = endX - startX;

        isDragging = false;

        if (Math.abs(difference) > 50) {

            if (difference < 0) {

                nextProject();

            } else {

                previousProject();

            }

        }
    });

    carousel.addEventListener("pointercancel", () => {
        isDragging = false;
    });

    // =============================================
    // KEYBOARD NAVIGATION
    // =============================================

    document.addEventListener("keydown", (event) => {

        const projectsSection =
            document.getElementById("projects");

        const rect = projectsSection.getBoundingClientRect();

        const isVisible =
            rect.top < window.innerHeight &&
            rect.bottom > 0;

        if (!isVisible) {
            return;
        }

        const focusedElement = document.activeElement;

        if (
            focusedElement &&
            (
                focusedElement.tagName === "INPUT" ||
                focusedElement.tagName === "TEXTAREA" ||
                focusedElement.isContentEditable
            )
        ) {
            return;
        }

        if (event.key === "ArrowRight") {

            nextProject();

        } else if (event.key === "ArrowLeft") {

            previousProject();

        }

    });

    // =============================================
    // INITIALIZE
    // =============================================

    updateCarousel();

});