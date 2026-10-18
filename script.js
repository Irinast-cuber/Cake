/* =========================================================
   VERONICA'S PATISSERIE
   Interactions & Animations
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    gsap.registerPlugin(ScrollTrigger);


    /* =====================================================
       1. PAGE LOADER
    ===================================================== */

    const loader = document.querySelector("#loader");
    const loaderLine = document.querySelector(".loader__line span");
    const loaderLogo = document.querySelector(".loader__logo");
    const loaderEyebrow = document.querySelector(".loader__eyebrow");

    const loaderTimeline = gsap.timeline();

    loaderTimeline
        .from(loaderEyebrow, {
            opacity: 0,
            y: 15,
            duration: 0.6
        })

        .from(loaderLogo, {
            opacity: 0,
            y: 25,
            duration: 0.8,
            ease: "power3.out"
        }, "-=0.3")

        .to(loaderLine, {
            width: "100%",
            duration: 1,
            ease: "power2.inOut"
        })

        .to(loader, {
            yPercent: -100,
            duration: 1,
            ease: "power4.inOut",
            delay: 0.2
        })

        .set(loader, {
            display: "none"
        })

        .add(() => {
            startHeroAnimation();
        });


    /* =====================================================
       2. HERO INTRO
    ===================================================== */

    function startHeroAnimation() {

        const tl = gsap.timeline();

        tl.from(".header", {
            opacity: 0,
            y: -25,
            duration: 0.8,
            ease: "power3.out"
        })

        .from(".hero__eyebrow", {
            opacity: 0,
            x: -30,
            duration: 0.6
        }, "-=0.4")

        .from(".hero__title-line", {
            opacity: 0,
            x: -80,
            stagger: 0.12,
            duration: 0.9,
            ease: "power4.out"
        }, "-=0.3")

        .from(".hero__description", {
            opacity: 0,
            y: 30,
            duration: 0.7
        }, "-=0.5")

        .from(".hero__actions", {
            opacity: 0,
            y: 25,
            duration: 0.6
        }, "-=0.4")

        .from(".hero-stat", {
            opacity: 0,
            y: 20,
            stagger: 0.1,
            duration: 0.5
        }, "-=0.3")

        .from(".hero__visual", {
            opacity: 0,
            x: 120,
            scale: 0.85,
            duration: 1.4,
            ease: "power4.out"
        }, "-=1.2")

        .from(".floating-label", {
            opacity: 0,
            scale: 0.8,
            stagger: 0.15,
            duration: 0.5
        }, "-=0.5");

    }


    /* =====================================================
       3. CUSTOM CURSOR
    ===================================================== */

    const cursorDot = document.querySelector(".cursor__dot");
    const cursorRing = document.querySelector(".cursor__ring");

    if (cursorDot && cursorRing) {

        let mouseX = 0;
        let mouseY = 0;

        let ringX = 0;
        let ringY = 0;

        window.addEventListener("mousemove", (e) => {

            mouseX = e.clientX;
            mouseY = e.clientY;

            gsap.set(cursorDot, {
                x: mouseX,
                y: mouseY
            });

        });


        function animateCursor() {

            ringX += (mouseX - ringX) * 0.14;
            ringY += (mouseY - ringY) * 0.14;

            gsap.set(cursorRing, {
                x: ringX,
                y: ringY
            });

            requestAnimationFrame(animateCursor);
        }

        animateCursor();


        const interactiveElements = document.querySelectorAll(
            "a, button, .product-card, .flavor-card"
        );

        interactiveElements.forEach(element => {

            element.addEventListener("mouseenter", () => {

                gsap.to(cursorRing, {
                    width: 58,
                    height: 58,
                    backgroundColor: "rgba(224,197,143,.10)",
                    duration: 0.25
                });

            });


            element.addEventListener("mouseleave", () => {

                gsap.to(cursorRing, {
                    width: 38,
                    height: 38,
                    backgroundColor: "rgba(224,197,143,0)",
                    duration: 0.25
                });

            });

        });

    }


    /* =====================================================
       4. HERO CAKE 3D PARALLAX
    ===================================================== */

    const cakeScene = document.querySelector("#cakeScene");
    const heroCake = document.querySelector("#heroCake");

    if (cakeScene && heroCake) {

        cakeScene.addEventListener("mousemove", (event) => {

            const rect = cakeScene.getBoundingClientRect();

            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateY = ((x - centerX) / centerX) * 10;
            const rotateX = ((centerY - y) / centerY) * 8;

            gsap.to(heroCake, {
                rotateX: rotateX,
                rotateY: rotateY,
                x: rotateY * 2,
                y: rotateX * -1,
                duration: 0.5,
                ease: "power2.out",
                transformPerspective: 1000
            });

        });


        cakeScene.addEventListener("mouseleave", () => {

            gsap.to(heroCake, {
                rotateX: 0,
                rotateY: 0,
                x: 0,
                y: 0,
                duration: 0.8,
                ease: "elastic.out(1, .5)"
            });

        });

    }


    /* =====================================================
       5. HERO DECOR PARALLAX
    ===================================================== */

    if (window.innerWidth > 800) {

        window.addEventListener("mousemove", (event) => {

            const moveX =
                (event.clientX / window.innerWidth - 0.5);

            const moveY =
                (event.clientY / window.innerHeight - 0.5);


            gsap.to(".hero__gold-ring--one", {
                x: moveX * 25,
                y: moveY * 25,
                duration: 1.2
            });


            gsap.to(".hero__gold-ring--two", {
                x: moveX * -35,
                y: moveY * -35,
                duration: 1.5
            });


            gsap.to(".floating-label--top", {
                x: moveX * 35,
                y: moveY * 20,
                duration: 1
            });


            gsap.to(".floating-label--bottom", {
                x: moveX * -25,
                y: moveY * -15,
                duration: 1
            });

        });

    }


    /* =====================================================
       6. SWIPER 3D COVERFLOW
    ===================================================== */

    const flavorSwiper = new Swiper(".flavor-swiper", {

        effect: "coverflow",

        centeredSlides: true,

        grabCursor: true,

        loop: true,

        slidesPerView: "auto",

        initialSlide: 2,

        speed: 800,


        coverflowEffect: {

            rotate: 12,

            stretch: 0,

            depth: 180,

            modifier: 1.2,

            slideShadows: false

        },


        pagination: {

            el: ".swiper-pagination",

            clickable: true

        },


        navigation: {

            nextEl: ".flavor-next",

            prevEl: ".flavor-prev"

        },


        keyboard: {

            enabled: true

        },


        on: {

            init: function () {

                updateFlavor(this);

            },

            slideChangeTransitionEnd: function () {

                updateFlavor(this);

            }

        }

    });


    /* =====================================================
       7. UPDATE FLAVOR PRICE
    ===================================================== */

    function updateFlavor(swiper) {

        const activeSlide = swiper.slides[swiper.activeIndex];

        if (!activeSlide) return;

        const flavor =
            activeSlide.dataset.flavor || "Авторский торт";

        const price =
            activeSlide.dataset.price || "2200";


        const flavorName =
            document.querySelector("#selectedFlavor");

        const flavorPrice =
            document.querySelector("#flavorPrice");


        if (flavorName) {

            gsap.to(flavorName, {

                opacity: 0,
                y: 8,

                duration: 0.2,

                onComplete: () => {

                    flavorName.textContent = flavor;

                    gsap.to(flavorName, {
                        opacity: 1,
                        y: 0,
                        duration: 0.3
                    });

                }

            });

        }


        if (flavorPrice) {

            const formattedPrice =
                Number(price).toLocaleString("ru-RU");

            gsap.to(flavorPrice, {

                opacity: 0,

                duration: 0.2,

                onComplete: () => {

                    flavorPrice.textContent = formattedPrice;

                    gsap.to(flavorPrice, {
                        opacity: 1,
                        duration: 0.3
                    });

                }

            });

        }

    }


    /* =====================================================
       8. CLICK SLIDE -> CENTER
    ===================================================== */

    document
        .querySelectorAll(".flavor-card")
        .forEach(slide => {

            slide.addEventListener("click", () => {

                flavorSwiper.slideToLoop(
                    Number(slide.getAttribute("data-swiper-slide-index"))
                );

            });

        });


    /* =====================================================
       9. QUIZ
    ===================================================== */

    const quizSteps =
        document.querySelectorAll(".quiz-step");

    const quizResult =
        document.querySelector("#quizResult");

    const progressBar =
        document.querySelector("#quizProgressBar");

    const currentNumber =
        document.querySelector("#quizCurrent");

    const restartQuiz =
        document.querySelector("#restartQuiz");


    let currentStep = 1;

    let answers = {

        flavor: null,
        type: null,
        occasion: null

    };


    document
        .querySelectorAll(".quiz-option")
        .forEach(option => {

            option.addEventListener("click", () => {

                const answer = option.dataset.answer;

                if (currentStep === 1) {

                    answers.flavor = answer;

                }

                if (currentStep === 2) {

                    answers.type = answer;

                }

                if (currentStep === 3) {

                    answers.occasion = answer;

                }


                if (currentStep < 3) {

                    changeQuizStep(
                        currentStep,
                        currentStep + 1
                    );

                    currentStep++;

                } else {

                    showQuizResult();

                }

            });

        });


    function changeQuizStep(from, to) {

        const oldStep =
            document.querySelector(
                `.quiz-step[data-step="${from}"]`
            );

        const newStep =
            document.querySelector(
                `.quiz-step[data-step="${to}"]`
            );


        gsap.to(oldStep, {

            opacity: 0,
            x: -35,

            duration: 0.35,

            onComplete: () => {

                oldStep.classList.remove("active");

                newStep.classList.add("active");


                gsap.fromTo(
                    newStep,

                    {
                        opacity: 0,
                        x: 35
                    },

                    {
                        opacity: 1,
                        x: 0,

                        duration: 0.45,

                        ease: "power3.out"
                    }
                );

            }

        });


        if (progressBar) {

            gsap.to(progressBar, {

                width: `${(to / 3) * 100}%`,

                duration: 0.5,

                ease: "power2.out"

            });

        }


        if (currentNumber) {

            currentNumber.textContent =
                `0${to}`;

        }

    }


    /* =====================================================
       10. QUIZ RESULT LOGIC
    ===================================================== */

    const quizProducts = {

        chocolate: {

            title: "Дубайский шоколад",

            description:
                "Насыщенный шоколадный вкус и премиальная текстура.",

            price:
                "от 1 200 ₽",

            image:
                "assets/dubai-chocolate.jpg"

        },


        berry: {

            title:
                "Меренговый рулет с малиной",

            description:
                "Воздушная меренга, нежный крем и яркая малина.",

            price:
                "1 500 ₽",

            image:
                "assets/meringue-roll.jpg"

        },


        honey: {

            title:
                "Торт «Медовик»",

            description:
                "Тонкие медовые коржи и нежный сливочный крем.",

            price:
                "1 500 ₽ / кг",

            image:
                "assets/medovik.jpg"

        },


        cream: {

            title:
                "Праздничный ассорти-бокс",

            description:
                "Нежное сочетание нескольких фирменных десертов.",

            price:
                "1 900 ₽",

            image:
                "assets/new-year-box.jpg"

        }

    };


    function showQuizResult() {

        const activeStep =
            document.querySelector(
                ".quiz-step.active"
            );


        const result =
            quizProducts[answers.flavor]
            || quizProducts.chocolate;


        gsap.to(activeStep, {

            opacity: 0,
            y: -20,

            duration: 0.35,

            onComplete: () => {

                activeStep.classList.remove("active");


                document.querySelector(
                    "#quizResultTitle"
                ).textContent = result.title;


                document.querySelector(
                    "#quizResultDescription"
                ).textContent = result.description;


                document.querySelector(
                    "#quizResultPrice"
                ).textContent = result.price;


                document.querySelector(
                    "#quizResultImage"
                ).src = result.image;


                quizResult.style.display = "block";


                gsap.fromTo(

                    quizResult,

                    {
                        opacity: 0,
                        scale: 0.92,
                        y: 30
                    },

                    {
                        opacity: 1,
                        scale: 1,
                        y: 0,

                        duration: 0.7,

                        ease: "back.out(1.4)"
                    }

                );

            }

        });


        if (progressBar) {

            gsap.to(progressBar, {
                width: "100%",
                duration: 0.4
            });

        }

    }


    /* =====================================================
       11. RESTART QUIZ
    ===================================================== */

    if (restartQuiz) {

        restartQuiz.addEventListener("click", () => {

            gsap.to(quizResult, {

                opacity: 0,

                duration: 0.3,

                onComplete: () => {

                    quizResult.style.display = "none";

                    currentStep = 1;


                    answers = {

                        flavor: null,
                        type: null,
                        occasion: null

                    };


                    quizSteps.forEach(step => {

                        step.classList.remove("active");

                        gsap.set(step, {
                            opacity: 1,
                            x: 0,
                            y: 0
                        });

                    });


                    const firstStep =
                        document.querySelector(
                            '.quiz-step[data-step="1"]'
                        );

                    firstStep.classList.add("active");


                    if (progressBar) {

                        gsap.set(progressBar, {
                            width: "33%"
                        });

                    }


                    if (currentNumber) {

                        currentNumber.textContent = "01";

                    }


                    gsap.fromTo(

                        firstStep,

                        {
                            opacity: 0,
                            x: 30
                        },

                        {
                            opacity: 1,
                            x: 0,

                            duration: 0.5
                        }

                    );

                }

            });

        });

    }


    /* =====================================================
       12. CATALOG FILTER
    ===================================================== */

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    const products =
        document.querySelectorAll(".product-card");


    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            const filter =
                button.dataset.filter;


            filterButtons.forEach(btn => {

                btn.classList.remove("active");

            });


            button.classList.add("active");


            products.forEach(product => {

                const categories =
                    product.dataset.category
                        .split(" ");


                const shouldShow =
                    filter === "all"
                    || categories.includes(filter);


                if (shouldShow) {

                    product.classList.remove(
                        "is-hidden"
                    );


                    gsap.fromTo(

                        product,

                        {
                            opacity: 0,
                            scale: 0.94,
                            y: 20
                        },

                        {
                            opacity: 1,
                            scale: 1,
                            y: 0,

                            duration: 0.45,

                            ease: "power3.out"
                        }

                    );

                } else {

                    gsap.to(product, {

                        opacity: 0,
                        scale: 0.94,

                        duration: 0.2,

                        onComplete: () => {

                            product.classList.add(
                                "is-hidden"
                            );

                        }

                    });

                }

            });

        });

    });


    /* =====================================================
       13. PRODUCT CARD TILT
    ===================================================== */

    const tiltCards =
        document.querySelectorAll(".tilt-card");


    if (window.innerWidth > 800) {

        tiltCards.forEach(card => {

            card.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        card.getBoundingClientRect();


                    const x =
                        event.clientX - rect.left;

                    const y =
                        event.clientY - rect.top;


                    const centerX =
                        rect.width / 2;

                    const centerY =
                        rect.height / 2;


                    const rotateY =
                        ((x - centerX) / centerX) * 5;

                    const rotateX =
                        ((centerY - y) / centerY) * 5;


                    gsap.to(card, {

                        rotateX: rotateX,

                        rotateY: rotateY,

                        scale: 1.015,

                        duration: 0.25,

                        ease: "power2.out",

                        transformPerspective: 900

                    });

                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    gsap.to(card, {

                        rotateX: 0,

                        rotateY: 0,

                        scale: 1,

                        duration: 0.55,

                        ease: "power3.out"

                    });

                }
            );

        });

    }


    /* =====================================================
       14. SECTION SCROLL ANIMATIONS
    ===================================================== */

    gsap.utils
        .toArray(".section-heading")
        .forEach(heading => {

            gsap.from(heading, {

                scrollTrigger: {

                    trigger: heading,

                    start: "top 85%"

                },

                opacity: 0,

                y: 70,

                duration: 1,

                ease: "power3.out"

            });

        });


    /* PRODUCT REVEAL */

    gsap.utils
        .toArray(".product-card")
        .forEach((card, index) => {

            gsap.from(card, {

                scrollTrigger: {

                    trigger: card,

                    start: "top 92%"

                },

                opacity: 0,

                y: 70,

                duration: 0.8,

                delay:
                    (index % 3) * 0.08,

                ease: "power3.out"

            });

        });


    /* ABOUT IMAGE */

    gsap.from(".about__visual", {

        scrollTrigger: {

            trigger: ".about",

            start: "top 75%"

        },

        opacity: 0,

        x: -80,

        duration: 1.2,

        ease: "power3.out"

    });


    /* ABOUT TEXT */

    gsap.from(".about__content", {

        scrollTrigger: {

            trigger: ".about",

            start: "top 75%"

        },

        opacity: 0,

        x: 80,

        duration: 1.2,

        ease: "power3.out"

    });


    /* =====================================================
       15. ORDER SECTION PARALLAX TEXT
    ===================================================== */

    gsap.to(".order__background-text", {

        scrollTrigger: {

            trigger: ".order",

            start: "top bottom",

            end: "bottom top",

            scrub: 1

        },

        xPercent: -8

    });


    gsap.from(".order__inner", {

        scrollTrigger: {

            trigger: ".order",

            start: "top 70%"

        },

        opacity: 0,

        y: 70,

        duration: 1,

        ease: "power3.out"

    });


    /* =====================================================
       16. MAGNETIC BUTTONS
    ===================================================== */

    if (window.innerWidth > 800) {

        const magneticButtons =
            document.querySelectorAll(".magnetic");


        magneticButtons.forEach(button => {

            button.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        button.getBoundingClientRect();


                    const x =
                        event.clientX
                        - rect.left
                        - rect.width / 2;


                    const y =
                        event.clientY
                        - rect.top
                        - rect.height / 2;


                    gsap.to(button, {

                        x: x * 0.18,

                        y: y * 0.18,

                        duration: 0.3,

                        ease: "power2.out"

                    });

                }
            );


            button.addEventListener(
                "mouseleave",
                () => {

                    gsap.to(button, {

                        x: 0,

                        y: 0,

                        duration: 0.6,

                        ease:
                            "elastic.out(1, .4)"

                    });

                }
            );

        });

    }


    /* =====================================================
       17. SMOOTH ANCHOR SCROLL
    ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(anchor => {

            anchor.addEventListener(
                "click",
                function(event) {

                    const href =
                        this.getAttribute("href");


                    if (
                        !href
                        || href === "#"
                    ) {

                        return;

                    }


                    const target =
                        document.querySelector(href);


                    if (!target) {

                        return;

                    }


                    event.preventDefault();


                    target.scrollIntoView({

                        behavior: "smooth",

                        block: "start"

                    });

                }
            );

        });


    /* =====================================================
       18. HEADER ON SCROLL
    ===================================================== */

    const header =
        document.querySelector(".header");


    window.addEventListener("scroll", () => {

        if (!header) return;


        if (window.scrollY > 80) {

            header.style.position = "fixed";

            header.style.background =
                "rgba(7, 16, 39, .88)";

            header.style.backdropFilter =
                "blur(18px)";

            header.style.padding =
                "17px 0";

            header.style.borderBottom =
                "1px solid rgba(224,197,143,.12)";

        } else {

            header.style.position =
                "absolute";

            header.style.background =
                "transparent";

            header.style.backdropFilter =
                "none";

            header.style.padding =
                "28px 0";

            header.style.borderBottom =
                "none";

        }

    });


    /* =====================================================
       19. MOBILE MENU
    ===================================================== */

    const menuToggle =
        document.querySelector(".menu-toggle");

    const nav =
        document.querySelector(".nav");


    if (menuToggle && nav) {

        menuToggle.addEventListener("click", () => {

            nav.classList.toggle("mobile-open");


            if (
                nav.classList.contains(
                    "mobile-open"
                )
            ) {

                Object.assign(
                    nav.style,
                    {

                        display: "flex",

                        position: "fixed",

                        inset: "0",

                        flexDirection:
                            "column",

                        justifyContent:
                            "center",

                        alignItems:
                            "center",

                        gap: "30px",

                        background:
                            "#071027",

                        fontSize:
                            "18px",

                        zIndex:
                            "999"

                    }
                );


                gsap.from(".nav__link", {

                    opacity: 0,

                    y: 25,

                    stagger: 0.08,

                    duration: 0.5

                });

            } else {

                nav.removeAttribute("style");

            }

        });


        document
            .querySelectorAll(".nav__link")
            .forEach(link => {

                link.addEventListener(
                    "click",
                    () => {

                        if (
                            nav.classList.contains(
                                "mobile-open"
                            )
                        ) {

                            nav.classList.remove(
                                "mobile-open"
                            );

                            nav.removeAttribute(
                                "style"
                            );

                        }

                    }
                );

            });

    }


    /* =====================================================
       20. TELEGRAM ORDER
    ===================================================== */

    const telegramOrder =
        document.querySelector("#telegramOrder");


    if (telegramOrder) {

        telegramOrder.addEventListener(
            "click",
            event => {

                event.preventDefault();


                const selectedFlavor =
                    document.querySelector(
                        "#selectedFlavor"
                    )?.textContent;


                const price =
                    document.querySelector(
                        "#flavorPrice"
                    )?.textContent;


                const message =
                    `Здравствуйте! Хочу заказать десерт Veronica's Patisserie.

Выбранный вкус: ${selectedFlavor}
Цена: от ${price} ₽`;


                /*
                    СЮДА ПОТОМ ВСТАВИМ
                    РЕАЛЬНЫЙ TELEGRAM USERNAME
                */

                const telegramUsername =
                    "YOUR_USERNAME";


                const telegramURL =
                    `https://t.me/${telegramUsername}?text=${encodeURIComponent(message)}`;


                window.open(
                    telegramURL,
                    "_blank"
                );

            }
        );

    }


});
