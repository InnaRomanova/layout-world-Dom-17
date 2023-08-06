"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener("click", openModal);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

const btnScroll = document.querySelector(".btn--scroll-to");
const section1 = document.getElementById("section--1");
/*
function scrollSection() {
  btnScroll.addEventListener("click", function () {
    //немного устаревший метод скролла
    // window.scrollTo({
    //   left: section1.getBoundingClientRect().left + window.pageXOffset,
    //   top: section1.getBoundingClientRect().top + window.pageYOffset,
    //   //страница плавно перенаправляется на следующий нижний блок
    //   behavior: "smooth",
    // });

    //современный метод, то же самое, что выше
    section1.scrollIntoView({ behavior: "smooth" });
  });
}

scrollSection();

console.log(btnScroll.getBoundingClientRect());
console.log(section1.getBoundingClientRect());*/

//////////////////////////////////////////////////////
const h1 = document.querySelector("h1");

//функция всплытия окна при наведении на h1-заголовок
function alertH1() {
  alert("Hello");
}

h1.addEventListener("mouseenter", alertH1);

function timeout() {
  setTimeout(() => {
    //позволяет повторно не всплывать окну, 2000 это через 2 секунды
    h1.removeEventListener("mouseenter", alertH1);
  }, 2000);
}

timeout();

//////////////////////////////////////////////////////////
//генерация рандомого изменения цвета

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomStyle() {
  return `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
}

//console.log(randomStyle(0, 255));

//получим элементы, на которое применим изменение цвета по классу
const nav = document.querySelector(".nav");
const navLink = document.querySelector(".nav__links");
const link = document.querySelector(".nav__link");

function clickColor() {
  nav.addEventListener("click", function (e) {
    this.style.backgroundColor = randomStyle();
    // e.stopPropagation();
    // console.log(e.target);
    // console.log(e.currentTarget === this);
  });
  navLink.addEventListener("click", function (e) {
    this.style.backgroundColor = randomStyle();
    // e.stopPropagation();
  });
  link.addEventListener("click", function (e) {
    this.style.backgroundColor = randomStyle();
    //не позволяет сквозь остальные теги пропускать клик и остальные стили менять
    //работает только на свое элементе
    //но этот метод лучше не использовать
    //при большой вложенности он может сломать всплытие события
    e.stopPropagation();
  });
}

clickColor();

/////////////////////////////////////////////////////
//делегирование событий
//это не делегирование событий, но используется, когда нужно поставить
//несколько обработчиков событий
// function clickLinkAll() {
//   const navLinkAll = document
//     .querySelectorAll(".nav__link")
//     .forEach(function (e) {
//       e.addEventListener("click", function (e) {
//         e.preventDefault();
//         const id = this.getAttribute("href");
//         console.log(id);
//         document.querySelector(id).scrollIntoView({ behavior: "smooth" });
//       });
//     });
// }

// clickLinkAll();

//делегирование событий используется, когда событие нужно поставить на множество элементов
const elementContain = document
  .querySelector(".nav__links")
  .addEventListener("click", function (e) {
    e.preventDefault();
    console.log(e.target);
    if (e.target.classList.contains("nav__link")) {
      const id = e.target.getAttribute("href");
      document.querySelector(id).scrollIntoView({ behavior: "smooth" });
    }
  });

/////////////////////////////////////////////////////////////
//работа табов

const tabContainer = document.querySelector(".operations__tab-container");
const tabContent = document.querySelectorAll(".operations__content");
const tabAll = document.querySelectorAll(".operations__tab");

function handleClickContainer() {
  tabContainer.addEventListener("click", function (e) {
    e.preventDefault();
    const clicked = e.target.closest(".operations__tab");
    if (!clicked) return;

    //убирает активный таб и меняет на другой
    tabAll.forEach((tab) => tab.classList.remove("operations__tab--active"));
    clicked.classList.add("operations__tab--active");
    tabContent.forEach((content) =>
      content.classList.remove("operations__content--active")
    );

    //подставляет нужный контент в соответствии с табом
    document
      .querySelector(`.operations__content--${clicked.dataset.tab}`)
      .classList.add("operations__content--active");
  });
}

handleClickContainer();

/////////////////////////////////////////////////////////////
//наведение

function mouseHover(e, opacity) {
  // console.log(this);
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const subLinks = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("nav__logo");

    subLinks.forEach((el) => {
      if (el != link) {
        el.style.opacity = this;
      }
    });
    // logo.style.opacity = opacity;
  }
}

function mouseover() {
  nav.addEventListener("mouseover", mouseHover.bind(0.5));
}

function mouseout() {
  nav.addEventListener("mouseout", mouseHover.bind(1));
}

mouseover();
mouseout();

/////////////////////////////////////////////////////////////////
//появление меню после прокрутки
//старый способ реализации, которая сильно нагружает систему, так делать не рекомендуется
/*const coord = section1.getBoundingClientRect();
console.log(coord);

console.log(window);

window.addEventListener("scroll", function () {
  console.log(this.window.scrollY);
  if (window.scrollY > coord.top) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
});
*/

function callBack(enrties, observe) {
  // console.log(enrties[0]);
  if (!enrties[0].isIntersecting) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
    observe.unobserve(enrties[0].target);
  }
}

const options = {
  threshold: 0,
  rootMargin: "-90px",
};

const observer = new IntersectionObserver(callBack, options);
observer.observe(document.querySelector(".header"));

/////////////////////////////////////////////////////////////////////////
//всплытие секций 10.9 Intersection на секциях
const allSection = document.querySelectorAll(".section");

function revealSection(enrties, observe) {
  // console.log(enrties[0]);
  if (enrties[0].isIntersecting) {
    enrties[0].target.classList.remove("section--hidden");
    //unobserve позволяет не отслеживать событие при обратной переметнке вверх страницы
    observe.unobserve(enrties[0].target);
  }
}

const sectionObserver = new IntersectionObserver(revealSection, {
  threshold: 0.15,
});

allSection.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

////////////////////////////////////////////////////////////////////////////////////
//ленивая загрузка изображений. 10.10 Применение Intersection на изображениях
//эффект блюр
const images = document.querySelectorAll("img[data-src]");
console.log(images);

function loadImg(enrties, observe) {
  console.log(enrties);
  if (!enrties[0].isIntersecting) return;
  enrties[0].target.src = enrties[0].target.dataset.src;
  //отменить блюр
  enrties[0].target.addEventListener("load", function () {
    enrties[0].target.classList.remove("lazy-img");
  });
  observe.unobserve(enrties[0].target);
}

const imgObserver = new IntersectionObserver(loadImg, { threshold: 0.15 });

images.forEach(function (img) {
  imgObserver.observe(img);
});

/////////////////////////////////////////////////////////////
//Слайдер
const sliders = document.querySelectorAll(".slide");
const slider = document.querySelector(".slider");
const btnRight = document.querySelector(".slider__btn--right");
const btnLeft = document.querySelector(".slider__btn--left");
const dotsContainer = document.querySelector(".dots");

let currentSlide = 0;
const maxSlides = sliders.length;

//в начале нужны были, чтобы видеть.
// slider.style.scale = 0.5;
// slider.style.overflow = "visible";
function createDots() {
  sliders.forEach(function (_, i) {
    dotsContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
}

createDots();

function goToSlide(slide) {
  //перебор слайдеров для точек снизу
  sliders.forEach(function (s, i) {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
}

goToSlide(0);

//функция соответствия точек слайдера на свой слайдер
function activeDots(slide) {
  document.querySelectorAll(`.dots__dot`).forEach(function (dot) {
    //убираем класс с ненужной точки, чтобы не выделялась, если нажата не она
    dot.classList.remove("dots__dot--active");
  });
  //добавление класса на точку при нажатии на соотвествующий слайдер
  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add("dots__dot--active");
}

activeDots(0);

function nextSlide() {
  if (currentSlide === maxSlides - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  goToSlide(currentSlide);
  activeDots(currentSlide);
}

function prefSlide() {
  if (currentSlide === 0) {
    currentSlide = maxSlides - 1;
  } else {
    currentSlide--;
  }
  goToSlide(currentSlide);
  activeDots(currentSlide);
}

btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prefSlide);

////////////////////////////////////////////////////////
//точки по слайдерами
function clickKeyDown() {
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") {
      prefSlide();
    }
    if (e.key === "ArrowRight") {
      nextSlide();
    }
  });
}

clickKeyDown();

function clickDots() {
  dotsContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains(`dots__dot`)) {
      // console.log("DOT");
      const slide = e.target.dataset.slide;
      goToSlide(slide);
      activeDots(slide);
    }
  });
}

clickDots();
