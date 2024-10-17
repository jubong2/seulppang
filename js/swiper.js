window.addEventListener("load", function () {
  // 티겟 스와이퍼
  var targetSwiper = new Swiper(".targetSwiper", {
    slidesPerView: 3.5,
    spaceBetween: 30,
    autoplay: {
      delay: 2500,
    },
    on: {
      loop: true, // 루프 활성화
    },
  });
  var targetSwiper = new Swiper(".petSwiper", {
    slidesPerView: 3.5,
    spaceBetween: 30,
    autoplay: {
      delay: 2500,
    },
    on: {
      loop: true, // 루프 활성화
    },
  });
});
