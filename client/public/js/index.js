"use strict";

const { assert, error, log } = console;

const preloader = document.querySelector(".preloader");
const main = document.querySelector("main");
const nav = document.querySelector("nav");
const nav_children = nav.children;
const nav_menu = document.querySelector(".nav-menu");
const nav_menu_list = document.querySelector(".nav-menu-list");
const navToggle = document.querySelector(".nav-toggle");
const heroTitle = document.querySelector(".hero-title");

const heroTitleSpan = heroTitle.querySelectorAll(".hero-title-span");
const heroImg = [...document.querySelectorAll(".hero > img")];

const navMenuList = document.querySelectorAll(".nav-menu > .nav-menu-content > .nav-menu-list > ul > li > a");
const closeMenu = document.querySelector(".close-menu > ion-icon");

const bannerEle = document.querySelector(".banner");

const quote = document.querySelector(".quote");
const quoteHeader = document.querySelector(".quote-header");

const portrait = document.querySelector(".portrait");
const portraitImg = portrait.getElementsByClassName("portrait-bg-img")[0];
const portraitImage = portraitImg.getElementsByTagName("img")[0];

// Initialize Lenis
const lenis = new Lenis();

// Use requestAnimationFrame to continuously update the scroll
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

lenis.stop();

let time = 0;

function removePreloader () {
    time = time + 1 * .005;
    
    if (time >= .5) {
        styleElement(preloader, "zIndex", -1);
        styleElement(preloader, "opacity", 0);

        styleElement(main, "zIndex", 1);
        lenis.start();
    }

    window.requestAnimationFrame(removePreloader);
}

function styleElement(el, style, value) {
    return el.style[style] = value;
}

function lerp (start, end, t) {
    return start + (end - start) * t;
}
function init () {
    function navTitle() {

        const title = "Bishop";
        const titleAnchor = nav_children[0].querySelector("a");
        const toggle = nav_children[1].querySelector("ion-icon");


        let titleText = title.split("");
        let titleTextReveal;

        styleElement(titleAnchor, "display", "flex");
        styleElement(toggle, "top", 0)
        
        titleText.map((i) => {
            let span = document.createElement("span");
            let letters = span.innerHTML += i;

            // let /letters = span.innerHTML;
            
            titleAnchor.innerHTML += `<h1>${letters}</h1>`;

            titleTextReveal = [...titleAnchor.querySelectorAll("h1")];
        })


        titleTextReveal.forEach((i, idx) => {
            setTimeout(() => {
                styleElement(i, 'top', 0);
            }, idx * 10);
        })
    }

    function hero() {
       heroTitleSpan.forEach((i, idx) => {
        let content = i.getElementsByTagName("span")[0];

        setTimeout(() => {
            styleElement(content, "top", 0)
        }, idx * 10);
       });

       heroImg.forEach((i, idx) => {
        setTimeout(() => {
            if (idx == 0) {
                styleElement(i, "left", 0)
            }

            styleElement(i, "right", 0);
        }, idx * 10);
       })
    }

    function navMenu() {
        navToggle.addEventListener("click", (e) => {
            styleElement(nav_menu, "zIndex", "5");
            styleElement(nav_menu_list, "clipPath", "circle(100%)");
            styleElement(closeMenu, "top", 0);

            let navMenuTag = [...navMenuList];
            navMenuTag.forEach((i, idx) => {
                setTimeout(() => {
                    styleElement(i, "top", 0)
                }, idx * 20)
            });
        })


        closeMenu.addEventListener("click", (e) => {

            let navMenuTag = [...navMenuList];

            styleElement(closeMenu, "top", "20rem")
            navMenuTag.forEach((i, idx) => {
                setTimeout(() => {
                    styleElement(i, "top", "20rem")
                }, idx * 20)
            });


            styleElement(nav_menu_list, "clipPath", "circle(0%)");

            setTimeout(() => {
                styleElement(nav_menu, "zIndex", "-1");
            }, 1000)

        })
    }

    function addElement (parent,el, value, len, target) {
       let { children } = document.querySelector(parent);
       if (children.length <= 0) {
        // manually add element in html document.
        return null;
       }
       let parentEle = children[0].parentElement;

       let newElement;
       for (let i = 0; i < len; ++i) {
            newElement = document.createElement(el);
            newElement.textContent = value;
       }

       document.querySelector(target).append(newElement);
    }

    function banner () {
        let scrollX, scrollY;

        scrollX = 0;
        scrollY = window.pageYOffset;

        let screenSizeX = window.innerWidth;
        // screenSizeX = screenSizeX > 500 ? addElement(".banner", "h1", "JESUS IS KING",5, ".banner-slider") : null;

        // log (banner.offsetTop)

        let bannerPercent =  (scrollY - (bannerEle.offsetTop - window.innerHeight)) / bannerEle.offsetHeight * 100;
        // log (bannerPercent);

        scrollX = lerp(scrollX, window.innerWidth,bannerPercent / 100);
        screenSizeX = screenSizeX > 500 ? scrollX = (-scrollX * .01) : scrollX = (-scrollX * .1);

        styleElement(bannerEle.getElementsByClassName("banner-slider")[0], "transform", `translate3d(${scrollX}vw, 0, 0)`);

        requestAnimationFrame(banner);

    }
    
    function blurEle () {
        let y = window.pageYOffset;

        let quoteHeaderBottom = quote.offsetTop + quote.offsetHeight;

        let deltaQuoteHeader = (y / quoteHeaderBottom) * 2.4;

        deltaQuoteHeader = deltaQuoteHeader < 0 ? 0 : deltaQuoteHeader > 1 ? 1 : deltaQuoteHeader;

        let deltaQuoteHeaderScale = ((y - (quote.offsetTop - window.innerHeight)) / quote.offsetHeight);

        quoteHeader.style.filter = `blur(${lerp(6, 0, deltaQuoteHeaderScale)}px)`;
        // quoteHeader.style.filter =  `blur(${lerp(15, 0, deltaQuoteHeaderScale)}px)`


        requestAnimationFrame(blurEle)


    }
 
    function stickyEle () {
        let y = window.pageYOffset || window.scrollY;
        let offset = quote.offsetTop;

        let delta = (y - offset) + 100;
        delta = delta <= 0 ? 0 : delta;

        quoteHeader.style.transform = `translate3d(-50%, ${delta}px, 0)`;

        function imageTransition () {
            var img_one, img_two, img_three;
            
            let img_parent = document.querySelector(".q-images").children;

            img_one = img_parent[0];
            img_two = img_parent[1];
            img_three = img_parent[2];

            let imageParentEle = document.querySelector(".q-images");
            imageParentEle = imageParentEle.offsetTop + imageParentEle.offsetHeight;

            let deltaImageY = imageParentEle - y;


            img_one.style.transform = `translate3d(0, ${lerp(0,deltaImageY, .3)}px, 0)`;

            img_two.style.transform = `translate3d(0, ${lerp(0,deltaImageY, 1.6) }px, 0)`;

            img_three.style.transform = `translate3d(0, ${lerp(0,deltaImageY, .1) }px, 0)`;




            // log (quote.className)
        }

        function portraitSection() {

            let percent =  (y - (portrait.offsetTop - window.innerHeight)) / portrait.offsetHeight;

            portraitImage.style.transform = `rotate(${lerp(-30, 0, percent)}deg)`;
            portraitImage.style.clipPath = `inset(${lerp(30, 0, percent)}% ${lerp(30, 0, percent)}%)`;

            
        }

        portraitSection();
        imageTransition();

        requestAnimationFrame(stickyEle);
    }

    navTitle();
    hero();
    navMenu();
    banner();
    blurEle();
    stickyEle();
}


removePreloader();
init();