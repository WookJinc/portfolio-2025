$(window).on('load', function () {
    gsap.registerPlugin(ScrollTrigger);

    /* 텍스트 스플릿 */
    let splitedText = new SplitType("[data-split='true']", {
        types: "chars",
    })

     // 호버 애니메이션 
     $(".hover-wrap").each(function () {
        let $this = $(this);
        let upCharTextMotion = gsap.timeline({
            paused: true
        });

        upCharTextMotion
            .to($this.find('.line1 .char'), {
                yPercent: -100,
                opacity: 1,
                duration: 0.25
            })
            .to($this.find('.line2 .char'), {
                yPercent: -100,
                opacity: 1,
                duration: 0.25
            });

        $this.hover(
            function () {
                upCharTextMotion.restart();
            },
            function () {
                upCharTextMotion.reverse();
            }
        );
    })

    /* 스크롤 이벤트 */
    document.querySelectorAll('.menu-list .menu-item a[href^="."]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
    
            const targetSelector = link.getAttribute('href');
            const target = document.querySelector(targetSelector);
    
            if (target) {
                gsap.to(window, {
                    scrollTo: {
                        y: target,
                    },
                    ease: "power2.out"
                });
            }
        });
    });

    const scrollDown = document.querySelector('.sc-intro .scroll a[href^="."]');
    scrollDown.addEventListener('click', (e) => {
        e.preventDefault();
    
        const targetSelector = e.currentTarget.getAttribute('href'); // 수정됨
        const target = document.querySelector(targetSelector);
    
        if (target) {
            gsap.to(window, {
                scrollTo: {
                    y: target,
                },
                duration: 1, // 추가: 스크롤 지속 시간
                ease: "power2.out"
            });
        }
    });


    $(window).on("scroll", function () {
        currentScroll = $(window).scrollTop();
        totalHeight = $(document).height() - $(window).height();
        percentScroll = (currentScroll / totalHeight) * 100;

        $(".percent-num").text(Math.round(percentScroll) + "%");
    })

    /* 헤더 & 메뉴 요소 애니메이션 */
    $("#header .menu-area span").click(function () {
        $(".menu").addClass("on");
        $(".menu-blend").css({
            display: "block",
            height: 0
        });
        $(".menu").css("background", "transparent");
        $(".menu .menu-list, .menu .btn-close").css("opacity", "0");

        openMenuMotion.restart();
    });

    $(".menu .btn-close").click(closeMenu);
    $(".menu .menu-item a").click(function () {
        setTimeout(closeMenu, 500);
    });

    function closeMenu() {
        $(".menu").css("background", "transparent");
        $(".menu .menu-list, .menu .btn-close").css("opacity", "0");
        $(".menu-blend").css("display", "block");

        closeMenuMotion.restart();
    }

    openMenuMotion = gsap.timeline({
        paused: true
    });
    openMenuMotion
        .fromTo(".menu .menu-blend", {
            height: 0
        }, {
            height: "100%",
            duration: 0.75,
            stagger: 0.2,
            ease: "power2.inOut",
            onComplete: () => {
                $(".menu .menu-blend").css("display", "none");
                $(".menu").css("background", "#1e1e20");
                $(".menu .menu-list, .menu .btn-close").css("opacity", "1");
            }
        });

    closeMenuMotion = gsap.timeline({
        paused: true
    });
    closeMenuMotion
        .fromTo(".menu .menu-blend", {
            height: "100%",
        }, {
            height: 0,
            duration: 0.75,
            stagger: 0.2,
            ease: "power2.inOut",
            onComplete: () => {
                $(".menu").removeClass("on");
                $(".menu .menu-blend").css("display", "none");
            }
        })

    /* preloader 애니메이션 */
    preloadMotion = gsap.timeline({});
    preloadMotion
        .to(".preloader .preloader-blend", {
            height: 0,
            duration: 0.75,
            stagger: 0.2,
            ease: "power2.inOut",
            onComplete: () => {
                $(".preloader").css("display", "none");
                introMotion.play();
            }
        })

    introMotion = gsap.timeline({
        paused: true
    })
    introMotion
        .fromTo(".sc-intro .title .char", {
            yPercent: 100,
            opacity: 0
        }, {
            yPercent: 0,
            opacity: 1,
            stagger: 0.1,
            ease: "power2.out"
        })
        .fromTo(".sc-intro .sub-title, .sc-intro .desc, #header", {
            opacity: 0
        }, {
            opacity: 1,
            duration: 1.5,
            ease: "power2.out"
        })
        .fromTo(".sc-intro .img-wrapper", {
            scale: 1.25,
        }, {
            scrollTrigger: {
                trigger: ".sc-about",
                start: "1.5% 100%",
                end: "100% 10%",
                scrub: true,
                // markers: true,
            },
            scale: 1,
            yPercent: 50,
        })

    horizontalLines = document.querySelectorAll(".sc-about .horizontal-line")
    horizontalLines.forEach((line) => {
        gsap.fromTo(line, {
            width: "0%"
        }, {
            scrollTrigger: {
                trigger: ".sc-about",
                start: "0% 50%",
                end: "100% 100%",
                scrub: false,
                stagger: 1,
                // markers: true,
            },
            width: "90%",
            duration: 1.5,
        })
    })

    verticalLines = document.querySelectorAll(".sc-about .vertical-line")
    verticalLines.forEach((line) => {
        gsap.fromTo(line, {
            height: "0%"
        }, {
            scrollTrigger: {
                trigger: ".sc-about",
                start: "0% 50%",
                end: "100% 100%",
                scrub: false,
                stagger: 1,
                // markers: true,
            },
            height: "90%",
            duration: 1.5,
            stagger: 0.5,
        })
    })

    workMotion = gsap.timeline({})
    workMotion
        .fromTo(".sc-work .title-area", {
            xPercent: 10
        }, {
            scrollTrigger: {
                trigger: ".sc-about",
                start: "0% 50%",
                end: "100% 10%",
                scrub: true,
                // markers: true,
            },
            xPercent: -15
        })
        .to(".sc-work .work-list .work-item:last-of-type", {
            scrollTrigger: {
                trigger: ".sc-previous",
                start: "5% 100%",
                end: "100% 10%",
                scrub: true,
                // markers: true,
            },
            yPercent: 100,
        })

    workItem = document.querySelectorAll(".sc-work .work-list .bg")
    workItem.forEach((element) => {
        gsap.fromTo(element, {
            yPercent: -10,
            scale: 1.25
        }, {
            scrollTrigger: {
                trigger: element,
                start: "0% 50%",
                end: "100% 10%",
                scrub: true,
                // markers: true,
            },
            yPercent: 10,
            scale: 1,
        })
    })

    gsap.fromTo(".sc-previous .horizontal-line", {
        width: "0%"
    }, {
        scrollTrigger: {
            trigger: ".sc-previous",
            start: "0% 50%",
            end: "100% 100%",
            scrub: false,
            stagger: 1,
            // markers: true,
        },
        width: "90%",
        duration: 1.5,
    })

    
    previousItem = document.querySelectorAll(".sc-previous .previous-list .bg")
    previousItem.forEach((element) => {
        gsap.fromTo(element, {
            yPercent: -10,
            scale: 1.15
        }, {
            scrollTrigger: {
                trigger: element,
                start: "0% 50%",
                end: "100% 10%",
                scrub: true,
                // markers: true,
            },
            yPercent: 10,
            scale: 1,
        })
    })
})