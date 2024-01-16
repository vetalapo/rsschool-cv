"use strict";

// Globals
let slideIndex = 0;
let slideSize = 0;

// Timer
let carouselInterval = null;
let carouselFrame = null;
let carouselCurrentPercentage = 0;

function RecurringTimer(callback, delay) {
    var timerId, start, remaining = delay;
    let active = true;

    this.pause = function() {
        active = false;
        window.clearTimeout(timerId);
        remaining -= new Date() - start;
    };

    var resume = function() {
        active = true;
        start = new Date();
        timerId = window.setTimeout(function() {
            remaining = delay;
            resume();
            callback();
        }, remaining);
    };
    
    this.resume = resume;
    this.resume();

    this.isActive = function() {
        return active;
    };
}


function startCarouselAutoSlide() {
    carouselCurrentPercentage = 0;
    setSliderDashProgress(0);

    if (!carouselInterval) {
        carouselInterval = new RecurringTimer(() => {
            slideRight();
            carouselCurrentPercentage = 0;
        }, 7000);
    }

    if (!carouselFrame) {
        carouselFrame = setInterval(() => {
            if (carouselInterval.isActive()) {
                carouselCurrentPercentage++;
                setSliderDashProgress(carouselCurrentPercentage);
            }
        }, 70);
    }
}

function stopCarouselAutoSlide() {
    clearInterval(carouselFrame);
    carouselFrame = null;
    setSliderDashProgress(0);

    carouselInterval.pause();
    carouselInterval = null;
}

function pauseCarouselAutoSlide() {
    if (!carouselInterval) {
        return;
    }

    carouselInterval.pause();
}

function resumeCarouselAutoSlide() {
    if (!carouselInterval) {
        return;
    }

    carouselInterval.resume();
}

function carouselInitMouseOver() {
    const carouselContainer = document.querySelector(".slideshow-container");

    carouselContainer.addEventListener("mouseenter", pauseCarouselAutoSlide);
    carouselContainer.addEventListener("mouseleave", resumeCarouselAutoSlide);

    carouselContainer.addEventListener("touchstart", pauseCarouselAutoSlide);
    carouselContainer.addEventListener("touchend", resumeCarouselAutoSlide);
}

function initCarousel() {
    // Before doing anything else, set slide size
    updateSlideSize();

    const carouselContainer = document.querySelector("#slides");
    const carouselSlides = document.querySelectorAll(".slide");

    // Cloning first and last slide for smooth transition between first and last slide
    carouselContainer.insertAdjacentHTML("afterbegin", carouselSlides[carouselSlides.length - 1].outerHTML);
    carouselContainer.insertAdjacentHTML("beforeend", carouselSlides[0].outerHTML);

    // Setting up default timeout
    startCarouselAutoSlide();
    carouselInitMouseOver();
}

function updateSlideSize() {
    slideSize = document.querySelectorAll(".slide")[0].clientWidth;
}

function activateSliderDash(index) {
    const sliderDashElements = [...document.getElementById("slide-indicators").children];

    sliderDashElements.forEach(elem => {
        elem.classList.remove("active");
    });

    sliderDashElements[index].classList.add("active");
}

function setSliderDashProgress(percentage) {
    if (percentage < 1) {
        percentage = 1;
    } else if (percentage > 100) {
        percentage = 100;
    }

    document.querySelector(".slider-dash.active").style.setProperty("--slider-dash-percent", `${percentage}%`);
}

function slideRight() {
    stopCarouselAutoSlide();

    slideIndex++;

    if (slideIndex > 2) {
        slideIndex = 0;
    }

    activateSliderDash(slideIndex);

    document.getElementById("slides").scrollLeft += slideSize;

    // Scroll instantly from copy to the original slide
    if (slideIndex === 0) {
        setTimeout(() => {
            const carouselContainer = document.querySelector("#slides");
            carouselContainer.style.scrollBehavior = "auto";
            setTimeout(() => document.getElementById("slides").scrollLeft -= 3 * slideSize, 5);
            setTimeout(() => carouselContainer.style.scrollBehavior = "smooth", 5);
        }, 800);
    }

    setTimeout(() => {
        startCarouselAutoSlide();
    }, 1500);
};

function slideLeft() {
    stopCarouselAutoSlide();

    slideIndex--;

    if (slideIndex < 0) {
        slideIndex = 2;
    }

    activateSliderDash(slideIndex);

    document.getElementById("slides").scrollLeft -= slideSize;

    // Scroll instantly from copy to the original slide
    if (slideIndex === 2) {
        setTimeout(() => {
            const carouselContainer = document.querySelector("#slides");
            carouselContainer.style.scrollBehavior = "auto";
            setTimeout(() => document.getElementById("slides").scrollLeft += 3 * slideSize, 5);
            setTimeout(() => carouselContainer.style.scrollBehavior = "smooth", 5);
        }, 800);
    }

    setTimeout(() => {
        startCarouselAutoSlide();
    }, 1500);
};

function setBannerVideoSize() {
    const screenWidth = screen.width;
    const bannerVideo = document.getElementById("banner-video");

    if (bannerVideo) {
        if (screenWidth > 768) {
            bannerVideo.src = "assets/video/coffee-pour-1080p.mp4";
        } else if (screenWidth <= 768 && screenWidth > 380) {
            bannerVideo.src = "assets/video/coffee-pour-720p.mp4";
        } else if (screenWidth <= 380) {
            bannerVideo.src = "assets/video/coffee-pour-360p.mp4";
        }

        bannerVideo.load();
    }
}

// On Load
(() => {
    setBannerVideoSize();
    initCarousel();
})();

// On Window resize
onresize = () => {
    setBannerVideoSize();
    updateSlideSize();
}
