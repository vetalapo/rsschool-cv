"use strict";

let slideIndex = 0;

function activateSliderDash(index) {
    const sliderDashElements = [...document.getElementById("slide-indicators").children];

    sliderDashElements.forEach( elem => {
        elem.classList.remove("slider-dash-dark");
        elem.classList.add("slider-dash");
    });

    sliderDashElements[index].classList.remove("slider-dash");
    sliderDashElements[index].classList.add("slider-dash-dark");
}

function slideRight() {
    slideIndex++;

    if (slideIndex > 2) {
        slideIndex = 2;
    }

    activateSliderDash(slideIndex);

    document.getElementById("slides").scrollLeft += 1000;
};

function slideLeft() {
    slideIndex--;

    if (slideIndex < 0) {
        slideIndex = 0;
    }

    activateSliderDash(slideIndex);

    document.getElementById("slides").scrollLeft -= 1000;
};

// On Load
(() => {
    // Self evaluation
    console.info("Coffee House, Week I\n\nSelf assessment:\n\t1. Checking validation of pages: +16\n\t2. The layout matches the design +42\n\t3. CSS Requirements +10\n\t4. Interactivity +32\n\n\tTotal: 100");
})();
