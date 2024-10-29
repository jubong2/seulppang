window.addEventListener("load", function () {
  const qna = [
    { id: 1, name: "lsg0905", title: "케이크 주문하면 초는 몇개가 오나요?", date: "2024-10-01" },
    { id: 2, name: "fod333", title: "배송은 아이스박스랑 함께 오는건가요", date: "2024-09-30" },
    { id: 3, name: "djfh678", title: "케이크 해동할 때 냉장해동도 괜찮나여", date: "2024-09-29" },
    { id: 4, name: "yup3859", title: "오늘 오후 1시쯤 주문했는데 내일 아침에 받을 수 있을까요?", date: "2024-09-28" },
    { id: 5, name: "dkfk344", title: "재입고 언제 풀리나요ㅠㅠ", date: "2024-09-27" },
    { id: 6, name: "ddang999", title: "상자 사이즈 크기 자세히 알 수 있을까요?", date: "2024-09-26" },
    { id: 7, name: "solmom234", title: "케이크가 녹아서 왔어요", date: "2024-09-25" },
    { id: 8, name: "ddang3840", title: "배송 관련 문의", date: "2024-09-24" },
    { id: 9, name: "flog8670", title: "케이크 상자 자세한 이미지가 궁금해요 !!", date: "2024-09-23" },
    { id: 10, name: "pahe393", title: "케이크는 냉동상태로 배송 오는건가요??", date: "2024-09-22" },
    { id: 11, name: "sumsim980", title: "다른 상품이 왔어요", date: "2024-09-21" },
    { id: 12, name: "mole333", title: "케이크가 찌그러져 왔어요", date: "2024-09-20" },
    { id: 13, name: "lsg0905", title: "버터크림 케이크 맞을까요 ?", date: "2024-10-01" },
    { id: 14, name: "lsg0905", title: "케이크 주문하면 초는 몇개가 오나요?", date: "2024-10-01" },
    { id: 15, name: "fod333", title: "배송은 아이스박스랑 함께 오는건가요", date: "2024-09-30" },
    { id: 16, name: "djfh678", title: "케이크 해동할 때 냉장해동도 괜찮나여", date: "2024-09-29" },
    { id: 17, name: "yup3859", title: "오늘 오후 1시쯤 주문했는데 내일 아침에 받을 수 있을까요?", date: "2024-09-28" },
    { id: 18, name: "dkfk344", title: "재입고 언제 풀리나요ㅠㅠ", date: "2024-09-27" },
    { id: 19, name: "ddang999", title: "상자 사이즈 크기 자세히 알 수 있을까요?", date: "2024-09-26" },
    { id: 20, name: "solmom234", title: "케이크가 녹아서 왔어요", date: "2024-09-25" },
  ];

  const itemsPerPage = 10;
  let currentPage = 1;
  const totalPages = Math.ceil(qna.length / itemsPerPage);

  function displayNotices(qna, page, itemsPerPage) {
    const noticeList = document.getElementById("qna-noticeList");
    const start = (page - 1) * itemsPerPage;
    const pageNotices = qna.slice(start, start + itemsPerPage);

    noticeList.innerHTML = pageNotices
      .map(
        (item, index) => `
          <tr>
            <td></td>
            <td>${item.title}</td>
            <td>${item.name}</td>
            <td>${item.date}</td>
          </tr>
        `
      )
      .join("");
  }

  function displayPagination(totalPg, currentPage) {
    const paginationUL = document.getElementById("qna-pagination");
    paginationUL.innerHTML = ""; // 기존 페이지네이션 초기화

    // 이전 버튼 생성
    const prevBtn = document.createElement("p");
    prevBtn.textContent = "이전";
    prevBtn.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        displayNotices(qna, currentPage, itemsPerPage);
        displayPagination(totalPg, currentPage); // UI 업데이트
      }
    });
    paginationUL.appendChild(prevBtn);

    // 페이지 번호 버튼 생성
    for (let i = 1; i <= totalPg; i++) {
      const li = document.createElement("li");
      li.textContent = i;

      // 페이지 번호 클릭 시 해당 페이지로 이동
      li.addEventListener("click", () => {
        currentPage = i;
        displayNotices(qna, currentPage, itemsPerPage);
        displayPagination(totalPg, currentPage); // UI 업데이트
      });

      // 현재 페이지에 active 클래스 추가
      if (i === currentPage) {
        li.classList.add("active");
      }

      paginationUL.appendChild(li);
    }

    // 다음 버튼 생성
    const nextBtn = document.createElement("p");
    nextBtn.textContent = "다음";
    nextBtn.addEventListener("click", () => {
      if (currentPage < totalPg) {
        currentPage++;
        displayNotices(qna, currentPage, itemsPerPage);
        displayPagination(totalPg, currentPage); // UI 업데이트
      }
    });
    paginationUL.appendChild(nextBtn);
  }

  // 초기 표시
  displayNotices(qna, currentPage, itemsPerPage);
  displayPagination(totalPages, currentPage);
  // =======================================================================
  const $sizeSelect = $("#size");
  const $selectedOptionDiv = $("#selected-option");
  const $productNameEl = $("#selected-product-name");
  const $productPriceEl = $("#selected-product-price");
  const $quantityInput = $("#quantity");
  const $totalPriceEl = $("#total-price");
  const $closeBtn = $(".close-btn");
  const $decreaseBtn = $("#decrease-btn");
  const $increaseBtn = $("#increase-btn");

  // 옵션 변경 시 선택된 옵션 표시
  function updateSelectedOption() {
    const $selectedOption = $sizeSelect.find("option:selected");
    const productName = $selectedOption.data("name");
    const productPrice = parseInt($selectedOption.data("price"));

    $productNameEl.text(`- 옵션 : ${productName}`);
    $productPriceEl.text(`- 가격 : ${productPrice.toLocaleString()}원`);

    // 초기 수량과 총 가격 설정
    $quantityInput.val(1);
    updateTotalPrice();

    // 옵션 박스 표시
    $selectedOptionDiv.show();
  }

  // 총 가격 업데이트
  function updateTotalPrice() {
    const $selectedOption = $sizeSelect.find("option:selected");
    const productPrice = parseInt($selectedOption.data("price"));
    const quantity = parseInt($quantityInput.val()) || 1;
    const totalPrice = productPrice * quantity;

    $totalPriceEl.text(`총 가격: ${totalPrice.toLocaleString()}원`);
  }

  // 초기 로드 시 첫 번째 옵션 자동 선택
  updateSelectedOption();

  // 옵션 변경 이벤트
  $sizeSelect.on("change", updateSelectedOption);

  // 수량 감소 버튼 클릭
  $decreaseBtn.on("click", function () {
    let quantity = parseInt($quantityInput.val());
    if (quantity > 1) {
      $quantityInput.val(quantity - 1);
      updateTotalPrice();
    }
  });

  // 수량 증가 버튼 클릭
  $increaseBtn.on("click", function () {
    let quantity = parseInt($quantityInput.val());
    $quantityInput.val(quantity + 1);
    updateTotalPrice();
  });

  // 닫기 버튼 클릭 시 옵션 박스 숨기기
  $closeBtn.on("click", function () {
    $selectedOptionDiv.hide();
  });
  // =================================================================
  $(".category-btn > li > a").click(function (event) {
    event.preventDefault();

    $("html,body").animate({ scrollTop: $(this.hash).offset().top }, 500);
  });
});
