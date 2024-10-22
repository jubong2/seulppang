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
                <p>${gift.price} WON</p>
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
                <h3>${vegan.name}</h3>
                <p>${vegan.info}</p>
                <p>${vegan.price} WON</p>
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
                <h3>${dessert.name}</h3>
                <p>${dessert.info}</p>
                <p>${dessert.price} WON</p>
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
                <h3>${meal.name}</h3>
                <p>${meal.info}</p>
                <p>${meal.price} WON</p>
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
  // 비건
  // 비건 제품을 표시하는 함수
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
                  <h3>${pet.name}</h3>
                  <p>${pet.info}</p>
                  <p>${pet.price} WON</p>
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
    const targetPaginationDiv = category === "gift" ? paginationDiv : category === "vegan" ? veganpaginationDiv : category === "dessert" ? dessertpaginationDiv : category === "meal" ? mealpaginationDiv : petpaginationDiv; // 디저트 페이지네이션 추가
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
        } else if (category == "vegan") {
          displayVeganInfo(currentPage); // 비건 페이지
        } else if (category == "dessert") {
          displayDessetInfo(currentPage, type); // 디저트 페이지
        } else if (category == "meal") {
          displaymealInfo(currentPage, type); /*식사 페이지*/
        } else {
          displaypetInfo(currentPage, type);
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
          displayDessetInfo(currentPage, type); /*디저트 페이지*/
          displaymealInfo(currentPage, type); /*식사 페이지*/
          displaypetInfo(currentPage, type); /*펫 페이지*/
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
          displayDessetInfo(currentPage, type); /*디저트 페이지*/
          displaymealInfo(currentPage, type); /*식사 페이지*/
          displaypetInfo(currentPage, type); /*펫 페이지*/
        }
      }
    });
    targetPaginationDiv.appendChild(nextBtn);
  }

  displayCatInfo(currentPage);
  displayVeganInfo(currentPage);
  displayDessetInfo(currentPage); /*디저트 페이지*/
  displaymealInfo(currentPage);
  displaypetInfo(currentPage);
  displaypetInfo(currentPage, type); /*펫 페이지*/
});
