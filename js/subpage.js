window.addEventListener("load", function () {
    // 페이지 클릭했을 때 해당 섹션 나오게 하기
    const subpagemenu = document.querySelectorAll(".subpage-button-kind");
    const subsectionKind = document.querySelectorAll(".subpage-kind");
  
    // 로드시 활성화 되는 메뉴와 카드 - index[0]
    subpagemenu[0].classList.add("active");
    subsectionKind[0].classList.add("active");
  
    subpagemenu.forEach(function (menuItem, index) {
      menuItem.addEventListener("click", function () {
        // 클릭된 메뉴와 해당하는 카드를 비활성화
        subpagemenu.forEach(function (item) {
          item.classList.remove("active");
        });
        subsectionKind.forEach(function (kind) {
          kind.classList.remove("active");
        });
  
        // 클릭된 메뉴와 해당하는 카드를 활성화
        subpagemenu[index].classList.add("active");
        subsectionKind[index].classList.add("active");
  
        // 모든 아이템 표시
        currentPage = 1; // 페이지를 1로 초기화
        displayCatInfo(currentPage); // 항상 첫 페이지에서 모든 아이템 표시
      });
    });
  
    // 선물 버튼에 클릭 이벤트 리스너 추가
    const giftButtons = document.querySelectorAll(".gift-button");
    giftButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const type = button.textContent; // 클릭된 버튼의 텍스트 가져오기
        currentPage = 1; // 페이지를 1로 초기화
        displayCatInfo(currentPage, type); // 타입을 displayCatInfo에 전달
      });
    });
  
    const itemsPerPage = 10;
    let currentPage = 1;
    const catListDiv = document.getElementById("catlist");
    const veganListDiv = document.getElementById("veganlist");
    const paginationDiv = document.querySelector(".subpage-pagination");
    const urlParams = new URLSearchParams(window.location.search);
    const catId = urlParams.get("id");
  
    // 고양이 정보를 가져와서 화면에 출력하는 함수
    // 선물
    function displayCatInfo(page, type = null) {
      fetch("json.json")
        .then((response) => response.json())
        .then(function (data) {
          const filteredGifts = type
            ? data.gift.filter((gift) => gift.type === type) // 타입으로 필터링
            : data.gift; // 타입이 없으면 모든 아이템 표시
  
          // 페이지네이션 계산
          const totalItems = filteredGifts.length;
          const startIndex = (page - 1) * itemsPerPage;
          const endIndex = startIndex + itemsPerPage;
          const giftsOnPage = filteredGifts.slice(startIndex, endIndex);
  
          // 이전 아이템 제거
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
  
          pagination(totalItems);
        })
        .catch((error) => {
          console.error("데이터를 가져오는 중 에러가 발생했습니다:", error);
        });
    }
    // 비건
    function displayvegnnInfo(page) {
      console.log(page);
      fetch("json.json")
        .then((response) => response.json())
        .then(function (data) {
          // 페이지네이션 계산
          const vegantotalItems = data.vegan.length; // 비건 아이템의 총 수
          const startIndex = (page - 1) * itemsPerPage;
          const endIndex = startIndex + itemsPerPage;
          console.log(endIndex); // 3
          // 이전 아이템 제거
          const veganOnpage = data.vegan.slice(startIndex, endIndex);
          console.log(veganOnpage);
          veganOnpage.forEach((vegan) => {
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
          pagination(totalItems);
        })
        .catch((error) => {
          console.error("데이터를 가져오는 중 에러가 발생했습니다:", error);
        });
    }
  
    // 초기 호출: 모든 선물 표시
    displayCatInfo(currentPage);
    displayvegnnInfo(currentPage);
  
    // 페이지네이션 생성
    function pagination(totalItems) {
      paginationDiv.innerHTML = "";
      const totalPages = Math.ceil(totalItems / itemsPerPage);
  
      for (let i = 1; i <= totalPages; i++) {
        const pageLink = document.createElement("a");
        pageLink.className = "page-link";
        pageLink.href = `#`; // 기본 링크는 해시로 설정
        pageLink.textContent = i;
        pageLink.addEventListener("click", function (event) {
          event.preventDefault(); // 기본 링크 이동 방지
          currentPage = i; // 클릭된 페이지로 업데이트
          displayCatInfo(currentPage); // 해당 페이지의 고양이 정보 표시
          displayvegnnInfo(currentPage);
        });
        if (i === currentPage) {
          pageLink.classList.add("active-page");
        }
        paginationDiv.appendChild(pageLink);
      }
  
      // 이전 버튼
      const prevBtn = document.createElement("a");
      prevBtn.className = "page-link";
      prevBtn.textContent = "이전";
      if (currentPage > 1) {
        prevBtn.href = `#`; // 기본 링크는 해시로 설정
      } else {
        prevBtn.classList.add("disabled");
      }
      prevBtn.addEventListener("click", function (event) {
        event.preventDefault(); // 기본 링크 이동 방지
        if (currentPage > 1) {
          currentPage--; // 페이지 감소
          displayCatInfo(currentPage); // 해당 페이지의 고양이 정보 표시
          displayvegnnInfo(currentPage);
        }
      });
      paginationDiv.insertBefore(prevBtn, paginationDiv.firstChild);
  
      // 다음 버튼
      const nextBtn = document.createElement("a");
      nextBtn.className = "page-link";
      nextBtn.textContent = "다음";
      if (currentPage < totalPages) {
        nextBtn.href = `#`; // 기본 링크는 해시로 설정
      } else {
        nextBtn.classList.add("disabled");
      }
      nextBtn.addEventListener("click", function (event) {
        event.preventDefault(); // 기본 링크 이동 방지
        if (currentPage < totalPages) {
          currentPage++; // 페이지 증가
          displayCatInfo(currentPage); // 해당 페이지의 고양이 정보 표시
          displayvegnnInfo(currentPage);
        }
      });
  
      paginationDiv.appendChild(nextBtn);
    }
  
    // 페이지 로드시 고양이 정보 출력
    document.addEventListener("DOMContentLoaded", function () {
      const pageParm = urlParams.get("page");
      if (pageParm) {
        currentPage = parseInt(pageParm);
      }
  
      displayCatInfo(currentPage);
      displayvegnnInfo(currentPage);
    });
  });
  