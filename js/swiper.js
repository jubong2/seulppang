window.addEventListener("load", function () {
  // 티겟 스와이퍼
  var targetSwiper = new Swiper(".targetSwiper", {
    slidesPerView: 1.5,
    spaceBetween: 10,
    autoplay: {
      delay: 2500,
    },
    on: {
      loop: true, // 루프 활성화
    },
    breakpoints: { 1200: { slidesPerView: 3.5 }, 700: { slidesPerView: 3 } },
  });
  var petgetSwiper = new Swiper(".petSwiper", {
    slidesPerView: 1.5,
    spaceBetween: 10,
    autoplay: {
      delay: 2500,
    },
    on: {
      loop: true, // 루프 활성화
    },
    breakpoints: { 1200: { slidesPerView: 3.5 }, 700: { slidesPerView: 3 } },
  });
});
