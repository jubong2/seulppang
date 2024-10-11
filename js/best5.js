window.addEventListener("load", function () {
  // 베스트 5 스와이퍼 초기화
  var swiper = new Swiper(".bestSwiper", {
    slidesPerView: 2.5,
    spaceBetween: 30,
  });

  // 버튼 클릭 시 해당 섹션만 표시하는 로직
  document.querySelectorAll(".best5-button > a").forEach(function (button) {
    button.addEventListener("click", function (event) {
      event.preventDefault(); // 링크 이동 방지

      // 모든 섹션을 숨김
      document
        .querySelectorAll(".best5-swiper > div")
        .forEach(function (section) {
          section.style.display = "none";
        });

      // 클릭한 버튼의 텍스트에 해당하는 섹션만 보임
      const sectionClass = button.textContent.toLowerCase();
      document.querySelector("." + sectionClass).style.display = "block";

      // 모든 버튼의 스타일 초기화
      document.querySelectorAll(".best5-button a").forEach(function (btn) {
        btn.classList.remove("active"); // active 클래스 제거
      });

      // 클릭한 버튼의 스타일 변경
      button.classList.add("active");
    });
  });

  // 페이지가 로드되면 기본적으로 첫 번째 섹션만 보이도록 설정
  document.querySelectorAll(".best5-swiper > div").forEach(function (section) {
    section.style.display = "none";
  });
  document.querySelector(".party").style.display = "block"; // 기본적으로 party 섹션 표시

  // 기본 색상 변경 (Party 섹션이 보일 때)
  document.querySelectorAll(".best5-button > a").forEach(function (btn) {
    if (btn.textContent.toLowerCase() === "party") {
      btn.classList.add("active"); // 기본적으로 active 클래스 추가
    }
  });

  // 찜하기
  const heart = document.querySelector(".heart-icon > img"); // 이미지 태그 선택
  const cart = document.querySelector(".cart-icon > img"); // 이미지 태그 선택

  heart.addEventListener("click", function (event) {
    event.preventDefault(); // 링크 이동 방지
    // 현재 이미지 소스를 확인하여 상태를 결정
    if (heart.src.includes("images/heart.png")) {
      heart.src = "images/heart-red.png"; // 찜한 이미지로 변경
      alert("찜목록에 저장했습니다.");
    } else {
      heart.src = "images/heart.png"; // 원래 이미지로 변경
      alert("찜목록에서 해제하였습니다.");
    }
  });

  cart.addEventListener("click", function (event) {
    event.preventDefault(); // 링크 이동 방지
    // 현재 이미지 소스를 확인하여 상태를 결정
    if (cart.src.includes("images/cart.png")) {
      cart.src = "images/cart-red.png"; // 찜한 이미지로 변경
      alert("장바구니에 저장했습니다.");
    } else {
      cart.src = "images/cart.png"; // 원래 이미지로 변경
      alert("장바구니에서 해제하였습니다.");
    }
  });
});
