document.addEventListener("DOMContentLoaded", () => {

    gsap.registerPlugin(ScrollTrigger);


    /* =========================
       LOADER
    ========================= */

    const loaderTimeline = gsap.timeline();

    loaderTimeline
        .from(".loader-content > span", {
            opacity: 0,
            y: 10,
            duration: .5
        })

        .from(".loader-content h1", {
            opacity: 0,
            y: 25,
            duration: .7
        })

        .to(".loader-line div", {
            width: "100%",
            duration: .9,
            ease: "power2.inOut"
        })

        .to(".loader", {
            yPercent: -100,
            duration: .9,
            delay: .15,
            ease: "power4.inOut"
        })

        .set(".loader", {
            display: "none"
        })

        .add(startHero);


    /* =========================
       HERO INTRO
    ========================= */

    function startHero() {

        const tl = gsap.timeline();

        tl.from(".header", {
            opacity: 0,
            y: -30,
            duration: .7
        })

        .from(".eyebrow", {
            opacity: 0,
            x: -30,
            duration: .5
        }, "-=.3")

        .from(".hero h1", {
            opacity: 0,
            x: -70,
            duration: .9,
            ease: "power4.out"
        }, "-=.2")

        .from(".hero-content > p", {
            opacity: 0,
            y: 25,
            duration: .6
        }, "-=.4")

        .from(".hero-buttons", {
            opacity: 0,
            y: 20,
            duration: .5
        }, "-=.3")

        .from(".hero-info > div", {
            opacity: 0,
            y: 15,
            stagger: .1
        }, "-=.2")

        .from(".hero-image-wrap", {
            opacity: 0,
            x: 100,
            rotateY: -12,
            scale: .9,
            duration: 1.2,
            ease: "power4.out"
        }, "-=1")

        .from(".floating-tag", {
            opacity: 0,
            scale: .8,
            stagger: .15
        }, "-=.4");

    }


    /* =========================
       CUSTOM CURSOR
    ========================= */

    const dot = document.querySelector(".cursor-dot");
    const ring = document.querySelector(".cursor-ring");

    let mouseX = 0;
    let mouseY = 0;

    let ringX = 0;
    let ringY = 0;

    if (dot && ring && window.innerWidth > 700) {

        window.addEventListener("mousemove", e => {

            mouseX = e.clientX;
            mouseY = e.clientY;

            gsap.set(dot, {
                x: mouseX,
                y: mouseY
            });

        });


        function cursorAnimation() {

            ringX += (mouseX - ringX) * .14;
            ringY += (mouseY - ringY) * .14;

            gsap.set(ring, {
                x: ringX,
                y: ringY
            });

            requestAnimationFrame(cursorAnimation);

        }

        cursorAnimation();


        document
            .querySelectorAll("a, button, .product, .portfolio-item")
            .forEach(element => {

                element.addEventListener("mouseenter", () => {

                    gsap.to(ring, {
                        width: 60,
                        height: 60,
                        duration: .25
                    });

                });

                element.addEventListener("mouseleave", () => {

                    gsap.to(ring, {
                        width: 38,
                        height: 38,
                        duration: .25
                    });

                });

            });

    }


    /* =========================
       HERO 3D PHOTO
    ========================= */

    const scene = document.querySelector("#cakeScene");
    const cake = document.querySelector("#heroCake");

    if (scene && cake && window.innerWidth > 700) {

        scene.addEventListener("mousemove", e => {

            const rect = scene.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const rotateY =
                ((x / rect.width) - .5) * 15;

            const rotateX =
                (.5 - (y / rect.height)) * 12;

            gsap.to(cake, {
                rotateX,
                rotateY,
                x: rotateY * 1.2,
                y: rotateX * -1,
                duration: .4,
                ease: "power2.out",
                transformPerspective: 1000
            });

        });


        scene.addEventListener("mouseleave", () => {

            gsap.to(cake, {
                rotateX: 0,
                rotateY: 0,
                x: 0,
                y: 0,
                duration: .8,
                ease: "elastic.out(1,.5)"
            });

        });

    }


    /* =========================
       HERO RINGS
    ========================= */

    if (window.innerWidth > 700) {

        window.addEventListener("mousemove", e => {

            const x =
                e.clientX / window.innerWidth - .5;

            const y =
                e.clientY / window.innerHeight - .5;

            gsap.to(".ring-one", {
                x: x * 30,
                y: y * 30,
                duration: 1
            });

            gsap.to(".ring-two", {
                x: x * -40,
                y: y * -40,
                duration: 1.4
            });

        });

    }


    /* =========================
       SWIPER
    ========================= */

    const flavorSwiper = new Swiper(".flavorSwiper", {

        effect: "coverflow",

        centeredSlides: true,

        slidesPerView: "auto",

        grabCursor: true,

        loop: true,

        initialSlide: 2,

        speed: 800,

        coverflowEffect: {
            rotate: 15,
            stretch: 0,
            depth: 180,
            modifier: 1.1,
            slideShadows: false
        },

        navigation: {
            nextEl: ".swiper-next",
            prevEl: ".swiper-prev"
        },

        pagination: {
            el: ".swiper-pagination",
            clickable: true
        },

        on: {

            init() {
                updateFlavor(this);
            },

            slideChangeTransitionEnd() {
                updateFlavor(this);
            }

        }

    });


    function updateFlavor(swiper) {

        const slide =
            swiper.slides[swiper.activeIndex];

        if (!slide) return;

        const name =
            slide.dataset.name || "Авторский торт";

        const price =
            slide.dataset.price || "1800";

        const nameElement =
            document.querySelector("#selectedFlavor");

        const priceElement =
            document.querySelector("#flavorPrice");

        if (nameElement) {

            nameElement.textContent = name;

        }

        if (priceElement) {

            priceElement.textContent =
                Number(price).toLocaleString("ru-RU");

        }

    }


    /* =========================
       FILTERS
    ========================= */

    const filterButtons =
        document.querySelectorAll(".filter");

    const products =
        document.querySelectorAll(".product");


    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            filterButtons.forEach(btn =>
                btn.classList.remove("active")
            );

            button.classList.add("active");

            const filter =
                button.dataset.filter;


            products.forEach(product => {

                const categories =
                    product.dataset.category.split(" ");

                const show =
                    filter === "all" ||
                    categories.includes(filter);


                if (show) {

                    product.classList.remove("hidden");

                    gsap.fromTo(
                        product,
                        {
                            opacity: 0,
                            scale: .94,
                            y: 20
                        },
                        {
                            opacity: 1,
                            scale: 1,
                            y: 0,
                            duration: .4
                        }
                    );

                } else {

                    product.classList.add("hidden");

                }

            });

        });

    });


    /* =========================
       PRODUCT TILT
    ========================= */

    if (window.innerWidth > 700) {

        document
            .querySelectorAll(".tilt")
            .forEach(card => {

                card.addEventListener("mousemove", e => {

                    const rect =
                        card.getBoundingClientRect();

                    const x =
                        e.clientX - rect.left;

                    const y =
                        e.clientY - rect.top;

                    const rotateY =
                        ((x / rect.width) - .5) * 9;

                    const rotateX =
                        (.5 - y / rect.height) * 9;

                    gsap.to(card, {
                        rotateX,
                        rotateY,
                        scale: 1.015,
                        duration: .2,
                        transformPerspective: 900
                    });

                });


                card.addEventListener("mouseleave", () => {

                    gsap.to(card, {
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1,
                        duration: .5
                    });

                });

            });

    }


    /* =========================
       QUIZ
    ========================= */

    let step = 1;

    const answers = {};

    const steps =
        document.querySelectorAll(".quiz-step");

    const quizResult =
        document.querySelector("#quizResult");

    const quizNumber =
        document.querySelector("#quizNumber");

    const quizBar =
        document.querySelector("#quizBar");


    document
        .querySelectorAll(".quiz-options button")
        .forEach(button => {

            button.addEventListener("click", () => {

                answers[step] =
                    button.dataset.answer;

                if (step < 3) {

                    changeStep(step + 1);

                } else {

                    showResult();

                }

            });

        });


    function changeStep(newStep) {

        const oldElement =
            document.querySelector(
                `.quiz-step[data-step="${step}"]`
            );

        const newElement =
            document.querySelector(
                `.quiz-step[data-step="${newStep}"]`
            );


        gsap.to(oldElement, {

            opacity: 0,
            x: -30,
            duration: .3,

            onComplete() {

                oldElement.classList.remove("active");

                newElement.classList.add("active");

                gsap.fromTo(
                    newElement,
                    {
                        opacity: 0,
                        x: 30
                    },
                    {
                        opacity: 1,
                        x: 0,
                        duration: .4
                    }
                );

            }

        });


        step = newStep;

        quizNumber.textContent =
            `0${step}`;

        gsap.to(quizBar, {
            width: `${step / 3 * 100}%`,
            duration: .4
        });

    }


    const recommendations = {

        chocolate: {
            title: "Дубайский шоколад",
            text: "Насыщенный шоколадный вкус для тех, кому хочется чего-то особенного.",
            price: "от 1 200 ₽",
            image: "assets/Дубайскийшоколад.jpg"
        },

        berry: {
            title: "Меренговый рулет",
            text: "Воздушная меренга и свежий ягодный акцент.",
            price: "1 500 ₽",
            image: "assets/МеренговыйРулет.jpg"
        },

        honey: {
            title: "Медовик",
            text: "Тонкие медовые коржи и нежный сливочный крем.",
            price: "1 500 ₽ / кг",
            image: "assets/Бентомедовик1кг.jpg"
        },

        cream: {
            title: "Авторский торт",
            text: "Нежный сливочный вкус и индивидуальное оформление.",
            price: "по запросу",
            image: "assets/Портфолио4.jpg"
        }

    };


    function showResult() {

        const current =
            document.querySelector(".quiz-step.active");

        const result =
            recommendations[answers[1]]
            || recommendations.chocolate;


        gsap.to(current, {

            opacity: 0,
            y: -20,
            duration: .3,

            onComplete() {

                current.classList.remove("active");

                document.querySelector(
                    "#resultTitle"
                ).textContent = result.title;

                document.querySelector(
                    "#resultText"
                ).textContent = result.text;

                document.querySelector(
                    "#resultPrice"
                ).textContent = result.price;

                document.querySelector(
                    "#resultImage"
                ).src = result.image;


                quizResult.style.display =
                    "block";


                gsap.fromTo(
                    quizResult,
                    {
                        opacity: 0,
                        scale: .9,
                        y: 25
                    },
                    {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        duration: .6,
                        ease: "back.out(1.4)"
                    }
                );

            }

        });

    }


    /* RESTART QUIZ */

    document
        .querySelector("#restartQuiz")
        ?.addEventListener("click", () => {

            quizResult.style.display =
                "none";

            step = 1;

            steps.forEach(element => {

                element.classList.remove("active");

                gsap.set(element, {
                    opacity: 1,
                    x: 0,
                    y: 0
                });

            });

            document
                .querySelector(
                    '.quiz-step[data-step="1"]'
                )
                .classList.add("active");

            quizNumber.textContent = "01";

            gsap.set(quizBar, {
                width: "33%"
            });

        });


    /* =========================
       PORTFOLIO SCROLL
    ========================= */

    gsap.utils
        .toArray(".portfolio-item")
        .forEach((item, index) => {

            gsap.from(item, {

                scrollTrigger: {
                    trigger: item,
                    start: "top 90%"
                },

                opacity: 0,

                y: 80,

                scale: .96,

                duration: .8,

                delay: (index % 3) * .08,

                ease: "power3.out"

            });

        });


    /* =========================
       PRODUCT SCROLL
    ========================= */

    gsap.utils
        .toArray(".product")
        .forEach((product, index) => {

            gsap.from(product, {

                scrollTrigger: {
                    trigger: product,
                    start: "top 90%"
                },

                opacity: 0,

                y: 60,

                duration: .7,

                delay: (index % 3) * .07

            });

        });


    /* =========================
       TITLES
    ========================= */

    gsap.utils
        .toArray(".section-title")
        .forEach(title => {

            gsap.from(title, {

                scrollTrigger: {
                    trigger: title,
                    start: "top 85%"
                },

                opacity: 0,
                y: 60,
                duration: .9

            });

        });


    /* =========================
       ABOUT
    ========================= */

    gsap.from(".about-images", {

        scrollTrigger: {
            trigger: ".about",
            start: "top 75%"
        },

        opacity: 0,
        x: -70,
        duration: 1

    });


    gsap.from(".about-content", {

        scrollTrigger: {
            trigger: ".about",
            start: "top 75%"
        },

        opacity: 0,
        x: 70,
        duration: 1

    });


    /* =========================
       ORDER
    ========================= */

    gsap.to(".order-word", {

        scrollTrigger: {
            trigger: ".order",
            start: "top bottom",
            end: "bottom top",
            scrub: 1
        },

        xPercent: -8

    });


    /* =========================
       HEADER SCROLL
    ========================= */

    const header =
        document.querySelector(".header");


    window.addEventListener("scroll", () => {

        if (window.scrollY > 70) {

            header.style.position = "fixed";

            header.style.background =
                "rgba(5,11,27,.9)";

            header.style.backdropFilter =
                "blur(15px)";

            header.style.padding =
                "15px 0";

        } else {

            header.style.position =
                "absolute";

            header.style.background =
                "transparent";

            header.style.backdropFilter =
                "none";

            header.style.padding =
                "25px 0";

        }

    });


    /* =========================
       MAGNETIC BUTTONS
    ========================= */

    if (window.innerWidth > 700) {

        document
            .querySelectorAll(".magnetic")
            .forEach(button => {

                button.addEventListener(
                    "mousemove",
                    e => {

                        const rect =
                            button.getBoundingClientRect();

                        const x =
                            e.clientX
                            - rect.left
                            - rect.width / 2;

                        const y =
                            e.clientY
                            - rect.top
                            - rect.height / 2;

                        gsap.to(button, {
                            x: x * .15,
                            y: y * .15,
                            duration: .25
                        });

                    }
                );


                button.addEventListener(
                    "mouseleave",
                    () => {

                        gsap.to(button, {
                            x: 0,
                            y: 0,
                            duration: .5,
                            ease: "elastic.out(1,.5)"
                        });

                    }
                );

            });

    }


    /* =========================
       MOBILE MENU
    ========================= */

    const menuButton =
        document.querySelector("#menuButton");

    const nav =
        document.querySelector(".nav");


    menuButton?.addEventListener("click", () => {

        const open =
            nav.classList.toggle("open");


        if (open) {

            Object.assign(nav.style, {

                display: "flex",

                position: "fixed",

                inset: "0",

                background: "#071027",

                flexDirection: "column",

                justifyContent: "center",

                alignItems: "center",

                gap: "30px",

                zIndex: "999"

            });


            gsap.from(".nav a", {
                opacity: 0,
                y: 25,
                stagger: .08
            });

        } else {

            nav.removeAttribute("style");

        }

    });


    document
        .querySelectorAll(".nav a")
        .forEach(link => {

            link.addEventListener("click", () => {

                nav.classList.remove("open");

                if (window.innerWidth <= 1000) {
                    nav.removeAttribute("style");
                }

            });

        });


    /* =========================
       TELEGRAM
    ========================= */

    const telegramButton =
        document.querySelector("#telegramButton");


    telegramButton?.addEventListener(
        "click",
        e => {

            e.preventDefault();

            /*
             ВПИШИ СЮДА USERNAME
             БЕЗ @
            */

            const username =
                "YOUR_TELEGRAM_USERNAME";

            const text =
                "Здравствуйте! Хочу заказать десерт в Veronica's Patisserie.";

            window.open(
                `https://t.me/${username}?text=${encodeURIComponent(text)}`,
                "_blank"
            );

        }
    );

});
