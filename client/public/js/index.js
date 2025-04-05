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

// Initialize Lenis
const lenis = new Lenis();

// Use requestAnimationFrame to continuously update the scroll
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

let time = 0;

function removePreloader () {
    time = time + 1 * .005;
    
    if (time >= 1.6) {
        styleElement(preloader, "zIndex", -1);
        styleElement(preloader, "opacity", 0);

        styleElement(main, "zIndex", 1);
    }

    window.requestAnimationFrame(removePreloader);
}

function styleElement(el, style, value) {
    return el.style[style] = value;
}

function init () {
    function navTitle() {

        const title = "The_Bishop";
        const titleAnchor = nav_children[0].querySelector("a");
        const toggle = nav_children[1].querySelector("ion-icon");


        let titleText = title.split("");
        let titleTextReveal;

        styleElement(titleAnchor, "display", "flex");
        styleElement(toggle, "top", 0)
        
        titleText.map((i) => {
            let span = document.createElement("span");
            let letters = span.innerHTML += i;
            log (letters)

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

    navTitle();
    hero();
    navMenu();
}


removePreloader();
init();