setDataToLocalStorage();
foodShowcase();

function getDataFromJson(){
    $.getJSON('assets/js/data/restaurantfood.json', function (result){
        console.log(result);
        let listHtml = [];
        result.menu.forEach(element => {
            let data = `<div>${element.name}</div>`;
            listHtml.push(data);
        });
        $('menu-dish').append(listHtml);
        console.log('heree');
        console.log(listHtml);
    });
}


function setDataToLocalStorage() {
    const isDataAvailable = localStorage.getItem("restaurantfood");
    if (isDataAvailable) {
        return;
    }
    $.getJSON("assets/data/restaurantfood.json", 
        function (data) {
            localStorage.setItem("restaurantfood", JSON.stringify(data));
        }
    );
}

function getDataFromLocalStorage() {
    return JSON.parse(localStorage.restaurantfood).menu;
}

function foodShowcase() {
    $("#menu-dish").empty();
    const foods = getDataFromLocalStorage();
    $.each(foods, function (index, food) { 
        $("#menu-dish").append(`
            <div class="col-lg-4 col-sm-6 dish-box-wp ${food.waktuMakan}" data-cat= ${food.waktuMakan}">
                <div class="dish-box teks-tengah">
                    <div class="dist-img">
                        <img src="assets/${food.img}" alt="">
                    </div>
                    <div class="dish-rating">
                        ${food.rating}
                        <i class="uil uil-star"></i>
                    </div>
                    <div class="dish-judul">
                        <h3 class="h3-judul">${food.name}</h3>
                        <p>${food.kalori} Kalori</p>
                    </div>
                    <div class="dish-info">
                        <ul>
                            <li>
                                <p>Type</p>
                                <b>${food.type}</b>
                            </li>
                            <li>
                                <p>orang</p>
                                <b>${food.Orang}</b>
                            </li>
                        </ul>
                    </div>
                    <div class="dist-bottom-row">
                        <ul>
                            <li>
                                <b>Rp. ${food.price}</b>
                            </li>
                            <li>
                                <button class="dish-add-btn">
                                    <i class="uil uil-plus"></i>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        `);
    });
}

$(document).ready(function ($) {
    "use strict";
    getDataFromJson();

    var book_table = new Swiper(".book-table-img-slider", {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        speed: 2000,
        effect: "coverflow",
        coverflowEffect: {
            rotate: 3,
            stretch: 2,
            depth: 100,
            modifier: 5,
            slideShadows: false,
        },
        loopAdditionSlides: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });

    var team_slider = new Swiper(".team-slider", {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        speed: 2000,

        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            0: {
                slidesPerView: 1.2,
            },
            768: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
            },
            1200: {
                slidesPerView: 3,
            },
        },
    });

    jQuery(".filters").on("click", function () {
        jQuery("#menu-dish").removeClass("bydefault_show");
    });
    $(function () {
        var filterList = {
            init: function () {
                $("#menu-dish").mixItUp({
                    selectors: {
                        target: ".dish-box-wp",
                        filter: ".filter",
                    },
                    animation: {
                        effects: "fade",
                        easing: "ease-in-out",
                    },
                    load: {
                        filter: ".all, .breakfast, .lunch, .dinner",
                    },
                });
            },
        };
        filterList.init();
    });

    jQuery(".menu-toggle").click(function () {
        jQuery(".main-navigation").toggleClass("toggled");
    });

    jQuery(".header-menu ul li a").click(function () {
        jQuery(".main-navigation").removeClass("toggled");
    });

    gsap.registerPlugin(ScrollTrigger);

    var elementFirst = document.querySelector('.site-header');
    ScrollTrigger.create({
        trigger: "body",
        start: "30px top",
        end: "bottom bottom",

        onEnter: () => myFunction(),
        onLeaveBack: () => myFunction(),
    });

    function myFunction() {
        elementFirst.classList.toggle('sticky_head');
    }

    var scene = $(".js-parallax-scene").get(0);
    var parallaxInstance = new Parallax(scene);


});


jQuery(window).on('load', function () {
    $('body').removeClass('body-fixed');

    //activating tab of filter
    let targets = document.querySelectorAll(".filter");
    let activeTab = 0;
    let old = 0;
    let dur = 0.4;
    let animation;

    for (let i = 0; i < targets.length; i++) {
        targets[i].index = i;
        targets[i].addEventListener("click", moveBar);
    }

    // initial position on first === All 
    gsap.set(".filter-active", {
        x: targets[0].offsetLeft,
        width: targets[0].offsetWidth
    });

    function moveBar() {
        if (this.index != activeTab) {
            if (animation && animation.isActive()) {
                animation.progress(1);
            }
            animation = gsap.timeline({
                defaults: {
                    duration: 0.4
                }
            });
            old = activeTab;
            activeTab = this.index;
            animation.to(".filter-active", {
                x: targets[activeTab].offsetLeft,
                width: targets[activeTab].offsetWidth
            });

            animation.to(targets[old], {
                color: "#0d0d25",
                ease: "none"
            }, 0);
            animation.to(targets[activeTab], {
                color: "#fff",
                ease: "none"
            }, 0);

        }

    }
});