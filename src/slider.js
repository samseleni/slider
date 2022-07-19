//Слайдер для раздела completed

let images = [{
    src: './src/images/slider_img1.jpg',
    title: 'Rostov-on-Don, Admiral'
}, {
    src: './src/images/slider_img2.jpg',
    title: 'Sochi Thieves'
}, {
    src: './src/images/slider_img3.jpg',
    title: 'Rostov-on-Don Patriotic'
}];

function initSlider(options) {
    // Проверка на наличие изображений
    if (!images || !images.length) return;
    options = options || {
        titles: false,
        dots: true,
        autoplay: false
    };

    let sliderImages = document.querySelector('.slider__images');
    let sliderArrows = document.querySelector('.slider__arrows');
    let sliderDots = document.querySelector('.slider__dots');
    let sliderTitles = document.querySelector('.slider__titles');
    let click = false; // переменная для остановки автопроигрывания

    initImages();
    initArrows();

    //Запуск опциональных функций
    if (options.dots) {
        initDots();
    }
    if (options.titles) {
        initTitles();
    }
    if (options.autoplay) {
        initAutoplay();
    }

    function initImages() {
        images.forEach((image, index) => {
            let imageDiv = `<div class="image n${index} ${index === 0? "active" : ""}" style="background-image:url(${images[index].src});" data-index = '${index}'></div>`;
            sliderImages.innerHTML += imageDiv;
        })
    }

    function initArrows() {
        sliderArrows.querySelectorAll('.slider__arrow').forEach(arrow => {
            arrow.addEventListener('click', function() {
                let activeNumber = +sliderImages.querySelector('.active').dataset.index;
                let nextNumber;
                if (arrow.classList.contains('slider__arrows-left')) {
                    nextNumber = activeNumber === 0? images.length - 1 : activeNumber - 1;
                } else {
                    nextNumber = activeNumber === images.length - 1? 0 : activeNumber + 1;
                }
                moveSlider(nextNumber);
                if (options.autoplay) click = true;
            })
        })
    }

    function initDots() {
        images.forEach((image, index) => {
            let dot = `<div class="slider__dots-item n${index} ${index === 0? "active" : ""}" data-index="${index}"></div>`;
            sliderDots.innerHTML += dot;
        })
        sliderDots.querySelectorAll('.slider__dots-item').forEach(dot => {
            dot.addEventListener('click', function() {
                moveSlider(this.dataset.index);
                if (options.autoplay) click = true;
            })
        })
    }

    function initTitles() {
        images.forEach((image, index) => {
            let titleLink = `<div class="slider__titles-item title n${index} ${index === 0? "active" : ""}" data-index="${index}">${images[index].title}</div>`;
            sliderTitles.innerHTML += titleLink;
        })
        sliderTitles.querySelectorAll('.slider__titles-item').forEach(titleLink => {
            titleLink.addEventListener('click', function() {
                moveSlider(this.dataset.index);
                if (options.autoplay) click = true;
            })
        })
    }

    function initAutoplay() {
        let intervalId = setInterval(() => {
            let activeNumber = +sliderImages.querySelector('.active').dataset.index;
            let nextNumber = activeNumber === images.length - 1? 0 : activeNumber + 1;
            if (click) {
                clearInterval(intervalId);
                return;
            }
            moveSlider(nextNumber);
        }, options.autoplayInterval);
    }

    function moveSlider(num) {
        sliderImages.querySelector('.active').classList.remove('active');
        sliderImages.querySelector('.n' + num).classList.add('active');
        if (options.dots) {
            sliderDots.querySelector('.active').classList.remove('active');
            sliderDots.querySelector('.n' + num).classList.add('active');
        }
        if (options.titles) {
            sliderTitles.querySelector('.active').classList.remove('active');
            sliderTitles.querySelector('.n' + num).classList.add('active');
        }
    }
}

// Выбранные опции
let sliderOptions = {
    titles: true,
    dots: true,
    autoplay: true,
    autoplayInterval: 5000
};

document.addEventListener('DOMContentLoaded', function() {
    initSlider(sliderOptions);
})