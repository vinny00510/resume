/* ==========================================
   VINICIUS ALVAREZ CURRÍCULO
   APP.JS
========================================== */

document.addEventListener("DOMC*ntentLoaded", () => {

    inicial*zarPlanetas();
    animarCards();
*   animarSections();
    criarNebulosaDinamica();

});

/* ==========================================
   PLANETAS
========================================== */

function inicializarPlanetas() {

    const planetas = document.querySelectorAll(".planet");

    planetas.forEach(planeta => {

        planeta.addEventListener("click", () => {

            const destino =
                planeta.getAttribute("data-target");

            if (!destino) return;

            const secao =
                document.getElementById(destino);

            if (!secao) return;

            secao.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });

}

/* ==========================================
   CARDS
========================================== */

function animarCards() {

    const cards =
        document.querySelectorAll(".card");

    cards.forEach(card => {

        card.addEventListener("mouseenter", () => {

            card.style.transform =
                "translateY(-8px)";

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform =
                "translateY(0px)";

        });

    });

}

/* ==========================================
   INTERSECTION OBSERVER
========================================== */

function animarSections() {

    const sections =
        document.querySelectorAll(".content-section");

    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.style.opacity = "1";

                        entry.target.style.transform =
                            "translateY(0px)";

                    }

                });

            },
            {
                threshold: 0.15
            }
        );

    sections.forEach(section => {

        section.style.opacity = "0";

        section.style.transform =
            "translateY(60px)";

        section.style.transition =
            "all .8s ease";

        observer.observe(section);

    });

}

/* ==========================================
   NEBULOSA DINAMICA
========================================== */

function criarNebulosaDinamica() {

    document.addEventListener("mousemove", (e) => {

        document.body.style.setProperty(
            "--mouse-x",
            e.clientX + "px"
        );

        document.body.style.setProperty(
            "--mouse-y",
            e.clientY + "px"
        );

    });

}

/* ==========================================
   HEADER EFFECT
========================================== */

window.addEventListener("scroll", () => {

    const hero =
        document.querySelector(".hero");

    if (!hero) return;

    const valor =
        window.scrollY * 0.3;

    hero.style.backgroundPositionY =
        `${valor}px`;

});

/* ==========================================
   PARALLAX STARS
========================================== */

window.addEventListener("scroll", () => {

    const stars =
        document.getElementById("stars");

    if (!stars) return;

    stars.style.transform =
        `translateY(${window.scrollY * 0.15}px)`;

});

/* ==========================================
   LOADER
========================================== */

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});

/* ==========================================
   CONSOLE
========================================== */

console.log(`
======================================
VINICIUS ALVAREZ CURRICULO
SPACE EDITION
======================================
`);
