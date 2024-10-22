window.addEventListener("load", function () {
  const subpagemenu = document.querySelectorAll(".subpage-button-kind");
  const subsectionKind = document.querySelectorAll(".subpage-kind");

  subpagemenu[0].classList.add("active");
  subsectionKind[0].classList.add("active");

  subpagemenu.forEach(function (menuItem, index) {
    menuItem.addEventListener("click", function () {
      subpagemenu.forEach(function (item) {
        item.classList.remove("active");
      });
      subsectionKind.forEach(function (kind) {
        kind.classList.remove("active");
      });

      subpagemenu[index].classList.add("active");
      subsectionKind[index].classList.add("active");

      currentPage = 1;
      displayCatInfo(currentPage, currentFilterType); // 선물 페이지 초기화
      displayVeganInfo(currentPage); // 비건 페이지 초기화
    });
  });

  let itemsPerPage = 6;
  let currentPage = 1;
  let currentFilterType = null; // 필터 타입을 저장하는 전역 변수
  const catListDiv = document.getElementById("catlist");
  const veganListDiv = document.getElementById("veganlist");
  const paginationDiv = document.getElementById("subpage-pagination");
  const veganpaginationDiv = document.getElementById("vegan-pagination");

  // 필터 버튼 클릭 이벤트
  const giftButtons = document.querySelectorAll(".gift-button");
  giftButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const type = button.textContent;
      currentFilterType = type; // 필터 타입 저장
      currentPage = 1;
      displayCatInfo(currentPage, currentFilterType);
    });
  });

  // 선물
  function displayCatInfo(page, type = null) {
    fetch("json.json")
      .then((response) => response.json())
      .then(function (data) {
        const filteredGifts = type ? data.gift.filter((gift) => gift.type === type) : data.gift;

        const totalItems = filteredGifts.length;
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const giftsOnPage = filteredGifts.slice(startIndex, endIndex);

        catListDiv.innerHTML = "";
        giftsOnPage.forEach((gift) => {
          const catCard = document.createElement("div");
          catCard.className = "gift-product";
          catCard.innerHTML = `
              <div class="productimg">
                <a href="#">
                  <img src="${gift.image}" alt="${gift.name}" class="productimg" />
                  <div class="product-icon">
                    <div class="heart-icon">
                      <img src="images/heart.png" alt="찜하기" />
                    </div>
                    <div class="cart-icon">
                      <img src="images/cart.png" alt="장바구니아이콘" />
                    </div>
                  </div>
                </a>
              </div>
              <div class="product-text">
                <h3>${gift.name}</h3>
                <p>${gift.info}</p>
                <p>${gift.price}</p>
              </div>
            `;
          catListDiv.appendChild(catCard);
          // 찜하기 아이콘 클릭 이벤트 리스너 추가
          const heartIcon = catCard.querySelector(".heart-icon img");
          heartIcon.addEventListener("click", function (event) {
            event.preventDefault(); // 링크 이동 방지
            if (heartIcon.src.includes("images/heart.png")) {
              heartIcon.src = "images/heart-2.png"; // 찜한 이미지로 변경
              alert("찜목록에 저장했습니다.");
            } else {
              heartIcon.src = "images/heart.png"; // 원래 이미지로 변경
              alert("찜목록에서 해제하였습니다.");
            }
          });

          // 장바구니 아이콘 클릭 이벤트 리스너 추가
          const cartIcon = catCard.querySelector(".cart-icon img");
          cartIcon.addEventListener("click", function (event) {
            event.preventDefault(); // 링크 이동 방지
            if (cartIcon.src.includes("images/cart.png")) {
              cartIcon.src = "images/cart-2.png"; // 장바구니 아이콘 변경
              alert("장바구니에 저장했습니다.");
            } else {
              cartIcon.src = "images/cart.png"; // 원래 아이콘으로 변경
              alert("장바구니에서 해제하였습니다.");
            }
          });
        });

        pagination(totalItems, type, "gift"); // 페이지네이션에 필터 타입 전달
      })
      .catch((error) => {
        console.error("데이터를 가져오는 중 에러가 발생했습니다:", error);
      });
  }

  // 비건 제품을 표시하는 함수
  function displayVeganInfo(page) {
    fetch("json.json")
      .then((response) => response.json())
      .then(function (data) {
        const veganItems = data.vegan;
        const totalItems = veganItems.length;
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const veganOnPage = veganItems.slice(startIndex, endIndex);

        veganListDiv.innerHTML = "";
        veganOnPage.forEach((vegan) => {
          const veganCard = document.createElement("div");
          veganCard.className = "vegan-product";
          veganCard.innerHTML = `
              <div class="productimg">
                <a href="#">
                  <img src="${vegan.image}" alt="${vegan.name}" class="productimg" />
                  <div class="product-icon">
                    <div class="heart-icon">
                      <img src="images/heart.png" alt="찜하기" />
                    </div>
                    <div class="cart-icon">
                      <img src="images/cart.png" alt="장바구니아이콘" />
                    </div>
                  </div>
                </a>
              </div>
              <div class="product-text">
                <h3>${vegan.name}</h3>
                <p>${vegan.info}</p>
                <p>${vegan.price}</p>
              </div>
            `;
          veganListDiv.appendChild(veganCard);
          // 찜하기 아이콘 클릭 이벤트 리스너 추가
          const heartIcon = veganCard.querySelector(".heart-icon img");
          heartIcon.addEventListener("click", function (event) {
            event.preventDefault(); // 링크 이동 방지
            if (heartIcon.src.includes("images/heart.png")) {
              heartIcon.src = "images/heart-2.png"; // 찜한 이미지로 변경
              alert("찜목록에 저장했습니다.");
            } else {
              heartIcon.src = "images/heart.png"; // 원래 이미지로 변경
              alert("찜목록에서 해제하였습니다.");
            }
          });

          // 장바구니 아이콘 클릭 이벤트 리스너 추가
          const cartIcon = veganCard.querySelector(".cart-icon img");
          cartIcon.addEventListener("click", function (event) {
            event.preventDefault(); // 링크 이동 방지
            if (cartIcon.src.includes("images/cart.png")) {
              cartIcon.src = "images/cart-2.png"; // 장바구니 아이콘 변경
              alert("장바구니에 저장했습니다.");
            } else {
              cartIcon.src = "images/cart.png"; // 원래 아이콘으로 변경
              alert("장바구니에서 해제하였습니다.");
            }
          });
        });

        pagination(totalItems, null, "vegan"); // 비건 페이지네이션
      })
      .catch((error) => {
        console.error("데이터를 가져오는 중 에러가 발생했습니다:", error);
      });
  }

  // 페이지네이션 생성 함수
  function pagination(totalItems, type, category) {
    const targetPaginationDiv = category === "gift" ? paginationDiv : veganpaginationDiv;
    targetPaginationDiv.innerHTML = "";
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    for (let i = 1; i <= totalPages; i++) {
      const pageLink = document.createElement("a");
      pageLink.className = "page-link";
      pageLink.href = `#`;
      pageLink.textContent = i;
      pageLink.addEventListener("click", function (event) {
        event.preventDefault();
        currentPage = i;
        if (category === "gift") {
          displayCatInfo(currentPage, type); // 선물 페이지
        } else {
          displayVeganInfo(currentPage); // 비건 페이지
        }
      });
      if (i === currentPage) {
        pageLink.classList.add("active-page");
      }
      targetPaginationDiv.appendChild(pageLink);
    }

    const prevBtn = document.createElement("a");
    prevBtn.className = "page-link";
    prevBtn.textContent = "이전";
    if (currentPage > 1) {
      prevBtn.href = `#`;
    } else {
      prevBtn.classList.add("disabled");
    }
    prevBtn.addEventListener("click", function (event) {
      event.preventDefault();
      if (currentPage > 1) {
        currentPage--;
        if (category === "gift") {
          displayCatInfo(currentPage, type); // 선물 페이지
        } else {
          displayVeganInfo(currentPage); // 비건 페이지
        }
      }
    });
    targetPaginationDiv.insertBefore(prevBtn, targetPaginationDiv.firstChild);

    const nextBtn = document.createElement("a");
    nextBtn.className = "page-link";
    nextBtn.textContent = "다음";
    if (currentPage < totalPages) {
      nextBtn.href = `#`;
    } else {
      nextBtn.classList.add("disabled");
    }
    nextBtn.addEventListener("click", function (event) {
      event.preventDefault();
      if (currentPage < totalPages) {
        currentPage++;
        if (category === "gift") {
          displayCatInfo(currentPage, type); // 선물 페이지
        } else {
          displayVeganInfo(currentPage); // 비건 페이지
        }
      }
    });
    targetPaginationDiv.appendChild(nextBtn);
  }

  displayCatInfo(currentPage);
  displayVeganInfo(currentPage);
});
