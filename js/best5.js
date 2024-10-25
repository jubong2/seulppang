window.addEventListener("load", function () {
  const sections = document.querySelectorAll(".best5-swiper > div");

  sections.forEach(function (section, index) {
    section.style.display = "none";
  });

  sections[0].style.display = "block";

  const firstSectionSwiper = sections[0].querySelector(".bestSwiper");
  const swiperInstance = new Swiper(firstSectionSwiper, {
    pagination: {
      el: ".swiper-pagination",
      dynamicBullets: true,
    },
    slidesPerView: 1.5,
    spaceBetween: 10,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    breakpoints: {
      1200: { slidesPerView: 2.5 },
      800: { slidesPerView: 2 },
      600: { slidesPerView: 2, spaceBetween: 20 },
    },
    on: {
      loop: true,
    },
  });

  document.querySelectorAll(".best5-button > a").forEach(function (button) {
    button.addEventListener("click", function (event) {
      event.preventDefault();

      sections.forEach(function (section) {
        section.style.display = "none";
      });

      const sectionClass = button.textContent.toLowerCase();
      document.querySelector("." + sectionClass).style.display = "block";

      document.querySelectorAll(".best5-button a").forEach(function (btn) {
        btn.classList.remove("active");
        btn.querySelector("h3").classList.remove("active");
      });

      button.classList.add("active");
      button.querySelector("h3").classList.add("active");

      const newSectionSwiper = document.querySelector("." + sectionClass + " .bestSwiper");
      if (newSectionSwiper.swiper) {
        newSectionSwiper.swiper.slideTo(0);
      } else {
        new Swiper(newSectionSwiper, {
          pagination: {
            el: ".swiper-pagination",
            dynamicBullets: true,
          },
          slidesPerView: 1,
          spaceBetween: 10,
          autoplay: {
            delay: 2500,
            disableOnInteraction: false,
          },
          breakpoints: {
            1200: { slidesPerView: 2.5 },
            800: { slidesPerView: 2 },
            600: { slidesPerView: 2, spaceBetween: 20 },
          },
          on: {
            loop: true,
          },
        });
      }
    });
  });

  // 기본 색상 변경 (Gift 섹션이 보일 때)
  document.querySelectorAll(".best5-button > a").forEach(function (btn) {
    if (btn.textContent.toLowerCase() === "gift") {
      btn.classList.add("active");
      btn.querySelector("h3").classList.add("active");
    }
  });

  const hearts = document.querySelectorAll(".heart-icon img");
  const carts = document.querySelectorAll(".cart-icon img");

  hearts.forEach(function (heart) {
    // 변수 이름 수정
    heart.addEventListener("click", function (event) {
      event.preventDefault();
      if (heart.src.includes("images/heart.png")) {
        heart.src = "images/heart-2.png";
        alert("찜목록에 저장했습니다.");
      } else {
        heart.src = "images/heart.png";
        alert("찜목록에서 해제하였습니다.");
      }
    });
  });

  carts.forEach(function (cart) {
    cart.addEventListener("click", function (event) {
      event.preventDefault();
      if (cart.src.includes("images/cart.png")) {
        cart.src = "images/cart-2.png";
        alert("장바구니에 저장했습니다.");
      } else {
        cart.src = "images/cart.png";
        alert("장바구니에서 해제하였습니다.");
      }
    });
  });
});
