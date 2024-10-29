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
      displayCatInfo(currentPage, null); // 선물 페이지 초기화
      displayVeganInfo(currentPage); // 비건 페이지 초기화
      displayDessetInfo(currentPage, null); // 디저트 페이지 초기화
      displaymealInfo(currentPage, null); // 식사빵 페이지 초기화
      displaypetInfo(currentPage, null); // 펫 페이지 초기화
    });
  });
  let itemsPerPage = 6;
  let currentPage = 1;
  let currentFilterType = null; // 필터 타입을 저장하는 전역 변수
  const catListDiv = document.getElementById("catlist");
  const veganListDiv = document.getElementById("veganlist");
  const dessertListDiv = document.getElementById("dessertlist");
  const mealListDiv = document.getElementById("meallist");
  const petListDiv = document.getElementById("petlist");
  const paginationDiv = document.getElementById("subpage-pagination");
  const veganpaginationDiv = document.getElementById("vegan-pagination");
  const dessertpaginationDiv = document.getElementById("dessert-pagination");
  const mealpaginationDiv = document.getElementById("meal-pagination");
  const petpaginationDiv = document.getElementById("pet-pagination");

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
                <a href="${gift.link}">
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
                <a href="#">
                <h3>${gift.name}</h3>
                <p>${gift.info}</p>
                <p>${gift.price} WON</p>
                </a>
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
  //선물 필터링
  const giftButtons = document.querySelectorAll(".gift-button");
  giftButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const type = button.textContent;
      currentFilterType = type; // 필터 타입 저장
      currentPage = 1;
      displayCatInfo(currentPage, currentFilterType);
    });
  });

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
                <a href="#">
                <h3>${vegan.name}</h3>
                <p>${vegan.info}</p>
                <p>${vegan.price} WON</p>
                </a>
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
  // 디저트
  function displayDessetInfo(page, type = null) {
    fetch("json.json")
      .then((response) => response.json())
      .then(function (data) {
        // console.log(data);
        const filteredDessert = type ? data.dessert.filter((dessert) => dessert.type === type) : data.dessert;
        // console.log(filteredDessert);
        const totalItems = filteredDessert.length;
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const dessertOnPage = filteredDessert.slice(startIndex, endIndex);

        dessertListDiv.innerHTML = "";
        dessertOnPage.forEach((dessert) => {
          const dessertCard = document.createElement("div");
          dessertCard.className = "dessert-product";
          dessertCard.innerHTML = `
              <div class="productimg">
                <a href="#">
                  <img src="${dessert.image}" alt="${dessert.name}" class="productimg" />
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
               <a href="#">
                <h3>${dessert.name}</h3>
                <p>${dessert.info}</p>
                <p>${dessert.price} WON</p>
                </a>
              </div>
            `;
          dessertListDiv.appendChild(dessertCard);
          // 찜하기 아이콘 클릭 이벤트 리스너 추가
          const heartIcon = dessertCard.querySelector(".heart-icon img");
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
          const cartIcon = dessertCard.querySelector(".cart-icon img");
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
        pagination(totalItems, type, "dessert"); // 페이지네이션에 필터 타입 전달
      })
      .catch((error) => {
        console.error("데이터를 가져오는 중 에러가 발생했습니다:", error);
      });
  }
  // 디저트 필터링
  const dessetButtons = document.querySelectorAll(".desset-button");
  dessetButtons.forEach((button) => {
    console.log(button);

    button.addEventListener("click", function () {
      const type = button.textContent;
      currentFilterType = type; // 필터 타입 저장
      currentPage = 1;
      displayDessetInfo(currentPage, currentFilterType);
    });
  });
  // 식사빵
  function displaymealInfo(page, type = null) {
    fetch("json.json")
      .then((response) => response.json())
      .then(function (data) {
        // console.log(data);
        const filteredMeal = type ? data.meal.filter((meal) => meal.type === type) : data.meal;
        // console.log(filteredDessert);
        const totalItems = filteredMeal.length;
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const mealOnPage = filteredMeal.slice(startIndex, endIndex);

        mealListDiv.innerHTML = "";
        mealOnPage.forEach((meal) => {
          const mealCard = document.createElement("div");
          mealCard.className = "meal-product";
          mealCard.innerHTML = `
              <div class="productimg">
                <a href="#">
                  <img src="${meal.image}" alt="${meal.name}" class="productimg" />
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
              <a href="#">
                <h3>${meal.name}</h3>
                <p>${meal.info}</p>
                <p>${meal.price} WON</p>
               </a>
              </div>
            `;
          mealListDiv.appendChild(mealCard);
          // 찜하기 아이콘 클릭 이벤트 리스너 추가
          const heartIcon = mealCard.querySelector(".heart-icon img");
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
          const cartIcon = mealCard.querySelector(".cart-icon img");
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
        pagination(totalItems, type, "meal"); // 페이지네이션에 필터 타입 전달
      })
      .catch((error) => {
        console.error("데이터를 가져오는 중 에러가 발생했습니다:", error);
      });
  }
  // 식사빵 필터링
  const mealButtons = document.querySelectorAll(".meal-button");
  mealButtons.forEach((button) => {
    // console.log(button);
    button.addEventListener("click", function () {
      const type = button.textContent;
      currentFilterType = type; // 필터 타입 저장
      currentPage = 1;
      displaymealInfo(currentPage, currentFilterType);
    });
  });
  // 펫
  // 펫 제품을 표시하는 함수
  function displaypetInfo(page) {
    fetch("json.json")
      .then((response) => response.json())
      .then(function (data) {
        const petItems = data.pet;
        const totalItems = petItems.length;
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const petanOnPage = petItems.slice(startIndex, endIndex);

        petListDiv.innerHTML = "";
        petanOnPage.forEach((pet) => {
          const petCard = document.createElement("div");
          petCard.className = "pet-product";
          petCard.innerHTML = `
                <div class="productimg">
                  <a href="#">
                    <img src="${pet.image}" alt="${pet.name}" class="productimg" />
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
                   <a href="#">
                   <h3>${pet.name}</h3>
                  <p>${pet.info}</p>
                  <p>${pet.price} WON</p>
                 </a>
                </div>
              `;
          petListDiv.appendChild(petCard);
          // 찜하기 아이콘 클릭 이벤트 리스너 추가
          const heartIcon = petCard.querySelector(".heart-icon img");
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
          const cartIcon = petCard.querySelector(".cart-icon img");
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

        pagination(totalItems, null, "pet");
      })
      .catch((error) => {
        console.error("데이터를 가져오는 중 에러가 발생했습니다:", error);
      });
  }
  // 페이지네이션 생성 함수
  function pagination(totalItems, type, category) {
    const targetPaginationDiv = category === "gift" ? paginationDiv : category === "vegan" ? veganpaginationDiv : category === "dessert" ? dessertpaginationDiv : category === "meal" ? mealpaginationDiv : petpaginationDiv;
    targetPaginationDiv.innerHTML = "";
    const totalPages = Math.ceil(totalItems / itemsPerPage);
  
    // 한 번에 표시할 페이지 링크 개수 설정
    const maxPageLinks = 5;
    const currentPageGroup = Math.floor((currentPage - 1) / maxPageLinks);
    const startPage = currentPageGroup * maxPageLinks + 1;
    const endPage = Math.min(totalPages, startPage + maxPageLinks - 1);
  
    // 이전 버튼
    const prevBtn = document.createElement("a");
    prevBtn.className = "page-link";
    prevBtn.textContent = "이전";
    if (currentPageGroup > 0) { // 이전 그룹이 존재하는 경우만 활성화
      prevBtn.href = `#`;
    } else {
      prevBtn.classList.add("disabled");
    }
    prevBtn.addEventListener("click", function (event) {
      event.preventDefault();
      if (currentPageGroup > 0) {
        currentPage = startPage - maxPageLinks;
        pagination(totalItems, type, category);
  
        if (category === "gift") {
          displayCatInfo(currentPage, type);
        } else if (category == "vegan") {
          displayVeganInfo(currentPage);
        } else if (category === "dessert") {
          displayDessetInfo(currentPage, type);
        } else if (category === "meal") {
          displaymealInfo(currentPage, type);
        } else {
          displaypetInfo(currentPage, type);
        }
      }
    });
    targetPaginationDiv.appendChild(prevBtn);
  
    // startPage부터 endPage까지만 페이지 링크 생성
    for (let i = startPage; i <= endPage; i++) {
      const pageLink = document.createElement("a");
      pageLink.className = "page-link";
      pageLink.href = `#`;
      pageLink.textContent = i;
      pageLink.addEventListener("click", function (event) {
        event.preventDefault();
        currentPage = i;
        pagination(totalItems, type, category);
  
        if (category === "gift") {
          displayCatInfo(currentPage, type);
        } else if (category == "vegan") {
          displayVeganInfo(currentPage);
        } else if (category === "dessert") {
          displayDessetInfo(currentPage, type);
        } else if (category === "meal") {
          displaymealInfo(currentPage, type);
        } else {
          displaypetInfo(currentPage, type);
        }
      });
      if (i === currentPage) {
        pageLink.classList.add("active-page");
      }
      targetPaginationDiv.appendChild(pageLink);
    }
  
    // 다음 버튼
    const nextBtn = document.createElement("a");
    nextBtn.className = "page-link";
    nextBtn.textContent = "다음";
    if (endPage < totalPages) { // 다음 그룹이 존재하는 경우만 활성화
      nextBtn.href = `#`;
    } else {
      nextBtn.classList.add("disabled");
    }
    nextBtn.addEventListener("click", function (event) {
      event.preventDefault();
      if (endPage < totalPages) {
        currentPage = endPage + 1;
        pagination(totalItems, type, category);
  
        if (category === "gift") {
          displayCatInfo(currentPage, type);
        } else if (category == "vegan") {
          displayVeganInfo(currentPage);
        } else if (category === "dessert") {
          displayDessetInfo(currentPage, type);
        } else if (category === "meal") {
          displaymealInfo(currentPage, type);
        } else {
          displaypetInfo(currentPage, type);
        }
      }
    });
    targetPaginationDiv.appendChild(nextBtn);
  }
  
  
``
  displayCatInfo(currentPage);
  displayVeganInfo(currentPage);
  displayDessetInfo(currentPage); /*디저트 페이지*/
  displaymealInfo(currentPage);
  displaypetInfo(currentPage);
  displaypetInfo(currentPage, type);
  /*펫 페이지*/ window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const currentPage = urlParams.get("page"); // "vegan" 값을 받아옴
    if (currentPage) {
      displayVeganInfo(currentPage); // 해당 페이지를 표시
    }
  };

  // function displayVeganInfo(page) {
  //   if (page === "vegan") {
  //     // 비건 페이지를 표시하는 코드
  //     console.log("비건 페이지 활성화");
  //     document.getElementById("vegan-section").style.display = "block";
  //     // 다른 섹션들은 숨김
  //     document.getElementById("other-section").style.display = "none";
  //   }
  // }
  const subpageButton = document.querySelector(".subpage-button");
  let startX, scrollLeft;

  subpageButton.addEventListener("mousedown", (e) => {
    startX = e.pageX - subpageButton.offsetLeft;
    scrollLeft = subpageButton.scrollLeft;
    subpageButton.classList.add("active");
  });

  subpageButton.addEventListener("mouseleave", () => {
    subpageButton.classList.remove("active");
  });

  subpageButton.addEventListener("mouseup", () => {
    subpageButton.classList.remove("active");
  });

  subpageButton.addEventListener("mousemove", (e) => {
    if (!subpageButton.classList.contains("active")) return;
    e.preventDefault();
    const x = e.pageX - subpageButton.offsetLeft;
    const walk = (x - startX) * 3; // 슬라이더 속도 조절
    subpageButton.scrollLeft = scrollLeft - walk;
  });
});
