// DOM 로드 후, data-include 속성 가진 요소들에 fetch로 파일 불러와 삽입
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-include]").forEach((el) => {
    fetch(el.getAttribute("data-include"))
      .then((res) => (res.ok ? res.text() : Promise.reject(res.status)))
      .then((html) => (el.innerHTML = html))
      .catch((err) => console.error("Include error:", err));
  });
});

const newsSwiper = new Swiper(".news-swiper", {
  slidesPerView: 4,
  spaceBetween: 10,
  loop: true,
  pagination: {
    el: ".news-swiper .swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".news-swiper .swiper-button-next",
    prevEl: ".news-swiper .swiper-button-prev",
  },
  breakpoints: {
    0: { slidesPerView: 2 },
    600: { slidesPerView: 3 },
    1024: { slidesPerView: 4 },
  },
});


 const videoSwiper = new Swiper(".video-swiper", {
    slidesPerView: 4,
    spaceBetween: 20,
    loop: true,
    pagination: {
      el: ".video-swiper .swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".video-swiper .swiper-button-next",
      prevEl: ".video-swiper .swiper-button-prev",
    },
    breakpoints: {
      0:   { slidesPerView: 1 },
      600: { slidesPerView: 2 },
      900: { slidesPerView: 3 },
      1200:{ slidesPerView: 4 },
    },
  });