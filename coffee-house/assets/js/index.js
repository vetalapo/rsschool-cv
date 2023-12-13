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
})();
