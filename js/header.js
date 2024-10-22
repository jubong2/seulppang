window.addEventListener("load", function () {
  AOS.init();

  const cateItems = document.querySelectorAll(".bakery-cate li");
  const bakeryInnerLists = document.querySelectorAll(".bakery-inner ul");
  const bakerySubmenu = document.querySelector(".bakery-submenu");

  cateItems.forEach((item, index) => {
    item.addEventListener("mouseenter", () => {
      // 모든 리스트 숨기기
      bakeryInnerLists.forEach((list) => list.classList.remove("active"));

      // 인덱스가 0, 2, 3인 경우에만 서브메뉴 활성화
      if (index === 0 || index === 2 || index === 3) {
        bakerySubmenu.classList.add("active"); // 서브메뉴 활성화
        bakeryInnerLists[index].classList.add("active"); // 해당 서브메뉴 활성화
        bakeryInnerList.classList.add("active");
      } else {
        bakerySubmenu.classList.remove("active"); // 서브메뉴 비활성화
      }
    });

    // 카테고리에서 마우스가 벗어날 때
    item.addEventListener("mouseleave", () => {
      setTimeout(() => {
        const isMouseOverSubmenu = bakerySubmenu.matches(":hover");
        if (!isMouseOverSubmenu) {
          bakeryInnerLists.forEach((list) => list.classList.remove("active"));
          bakerySubmenu.classList.remove("active"); // 서브메뉴 비활성화
        }
      }, 100); // 짧은 지연 후 확인
    });
  });

  // bakery-cate에서 마우스가 벗어났을 때
  document.querySelector(".bakery-cate").addEventListener("mouseleave", () => {
    setTimeout(() => {
      const isMouseOverSubmenu = bakerySubmenu.matches(":hover");
      if (!isMouseOverSubmenu) {
        bakeryInnerLists.forEach((list) => list.classList.remove("active"));
        bakerySubmenu.classList.remove("active"); // 서브메뉴 비활성화
      }
    }, 100); // 짧은 지연 후 확인
  });

  // 서브메뉴에서 마우스가 벗어났을 때
  bakerySubmenu.addEventListener("mouseleave", () => {
    bakeryInnerLists.forEach((list) => list.classList.remove("active"));
    bakerySubmenu.classList.remove("active"); // 서브메뉴 비활성화
  });
  // search
  const search = document.querySelector(".search");
  const searchBtn = document.querySelector(".search-button");

  searchBtn.addEventListener("click", function () {
    search.classList.toggle("active"); // active 클래스 토글
  });
  // 모바일---------------------------------------------------
  const hambergerBar = document.querySelector(".header-mb-bar");
  const mbMenu = document.querySelector(".mb-header-warp");

  hambergerBar.addEventListener("click", function () {
    mbMenu.classList.add("active");
  });
  const headerMbBar = document.querySelector(".header-mb-bar");
  const mbHeaderWarp = document.querySelector(".mb-header-warp");
  const closed = document.querySelector(".closed");

  headerMbBar.addEventListener("click", function () {
    mbHeaderWarp.classList.add("active");
  });
  closed.addEventListener("click", function () {
    mbHeaderWarp.classList.remove("active");
  });
  window.addEventListener("resize", function () {
    if (window.innerWidth > 678) {
      // 678px 이상이면 메뉴 강제 닫기
      mbHeaderWarp.classList.remove("active");
    }
  });
});
