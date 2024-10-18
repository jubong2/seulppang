window.addEventListener("load", function () {
  $(".wonder").css({
    "background-color": "#ffb16c", 
  });

  // 버튼 클릭 시 이벤트 처리
  $(".tip").click(function () {
    // 모든 버튼을 원래 색상으로 초기화
    $(".wonder").css({
      "background-color": "",
      color: "",})
    });
  //  팁 게시판 데이터
  const tip = [
    { id: 1, name: "lsg0905", title: "소베 소금빵 맛있게 먹는 방법 공유합니다 !", date: "2024-10-01" },
    { id: 2, name: "fod333", title: "빵 단체 주문할 때 참고하면 좋은 빵집 리스트", date: "2024-09-30" },
    { id: 3, name: "djfh678", title: "두유라떼랑 궁합 좋은 빵 소개해 드릴게용", date: "2024-09-29" },
    { id: 4, name: "yup3859", title: "치아바타 샌드위치 레시피(맛은 보장 드립니다.)", date: "2024-09-28" },
    { id: 5, name: "dkfk344", title: "저희 집 멍뭉이가 잘 먹는 반려동물 빵 몇가지 추천드려여", date: "2024-09-27" },
    { id: 6, name: "ddang999", title: "아기들에게 안심하고 먹이는 유기농 빵 소개시켜드려요 !!", date: "2024-09-26" },
    { id: 7, name: "solmom234", title: "빵 냉동고에 보관할 때 주의해야되는 사항들", date: "2024-09-25" },
    { id: 8, name: "ddang3840", title: "냉동된 빵들 맛있게 해동시키는 꿀팁", date: "2024-09-24" },
    { id: 9, name: "flog8670", title: "손님에게 대접하기 좋은 디저트들 추천", date: "2024-09-23" },
    { id: 10, name: "pahe393", title: "집들이 선물로 가져갔을 때 반응 좋았던 빵들 몇개 추천해 봅니다 ~", date: "2024-09-22" },
    { id: 11, name: "sumsim980", title: "얼린 쿠키슈 맛있게 먹는 팁 알려드립니다 !", date: "2024-09-21" },
    { id: 12, name: "mole333", title: "빵 소분할 때 유용했던 도구들 소개해 드려용", date: "2024-09-20" },
    { id: 13, name: "lsg0905", title: "공지사항 1", date: "2024-10-01" },
    { id: 14, name: "fod333", title: "공지사항 2", date: "2024-09-30" },
    { id: 15, name: "djfh678", title: "공지사항 3", date: "2024-09-29" },
    { id: 16, name: "yup3859", title: "공지사항 4", date: "2024-09-28" },
    { id: 17, name: "dkfk344", title: "공지사항 5", date: "2024-09-27" },
    { id: 18, name: "ddang999", title: "공지사항 6", date: "2024-09-26" },
    { id: 19, name: "solmom234", title: "공지사항 7", date: "2024-09-25" },
    { id: 20, name: "ddang3840", title: "공지사항 8", date: "2024-09-24" },
    { id: 21, name: "flog8670", title: "공지사항 9", date: "2024-09-23" },
    { id: 22, name: "pahe393", title: "공지사항 10", date: "2024-09-22" },
    { id: 23, name: "sumsim980", title: "공지사항 11", date: "2024-09-21" },
    { id: 24, name: "mole333", title: "공지사항 12", date: "2024-09-20" },
    { id: 25, name: "djfh678", title: "공지사항 3", date: "2024-09-29" },
    { id: 26, name: "yup3859", title: "공지사항 4", date: "2024-09-28" },
    { id: 27, name: "dkfk344", title: "공지사항 5", date: "2024-09-27" },
    { id: 28, name: "ddang999", title: "공지사항 6", date: "2024-09-26" },
    { id: 29, name: "solmom234", title: "공지사항 7", date: "2024-09-25" },
    { id: 30, name: "ddang3840", title: "공지사항 8", date: "2024-09-24" },
    { id: 31, name: "flog8670", title: "공지사항 9", date: "2024-09-23" },
    { id: 32, name: "pahe393", title: "공지사항 10", date: "2024-09-22" },
    { id: 33, name: "sumsim980", title: "공지사항 11", date: "2024-09-21" },
    { id: 34, name: "mole333", title: "공지사항 12", date: "2024-09-20" },
  ];
  //   페이지당 표시할 항목수
  const itemsPerPage = 12;
  let currentPage = 1;
  const totalPages = Math.ceil(tip.length / itemsPerPage);
  //   console.log(totalPages); // 3
  // 공지사항 목록을 출력하는 함수
  function displayNotices(tip, page, itemsPerpage) {
    // console.log(notices);
    // console.log(page);
    // console.log(itemsPerPage);
    const noticeList = document.getElementById("noticeList");
    const start = (page - 1) * itemsPerpage;
    // console.log(start);
    const pageNotices = tip.slice(start, start + itemsPerpage);
    // console.log(pageNotices);
    noticeList.innerHTML = pageNotices
      .map(
        (item, index) =>
          //   console.log(item);
          `
        <tr>
            <td> ${start + index + 1} </td>
            <td> ${item.name} </td>
            <td> ${item.title} </td>
            <td> ${item.date} </td>
        </tr>

        `
      )
      .join("");
  }
  // 탭 버튼 클릭 시 1번 페이지로 이동하는 함수
  function handleTabClick() {
    currentPage = 1; // 탭을 클릭하면 1번 페이지로 이동
    displayNotices(tip, currentPage, itemsPerPage); // 1번 페이지의 공지사항을 표시
    displayPagination(totalPages, currentPage); // 페이지네이션을 업데이트
  }

  // 탭 버튼에 클릭 이벤트 리스너 추가
  const tabButton = document.getElementById("tabButton"); // 탭 버튼의 ID를 tabButton으로 가정
  tabButton.addEventListener("click", handleTabClick);
  // 페이지네이션 버튼을 출력하는 함수
  function displayPagination(totalPg, currentPage) {
    const paginationUL = document.getElementById("pagination");
    paginationUL.innerHTML = ""; // 기존 페이지네이션 초기화

    // 이전 버튼 생성
    const prevBtn = document.createElement("p");
    prevBtn.textContent = "이전";
    prevBtn.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        displayNotices(tip, currentPage, itemsPerPage);
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
        displayNotices(tip, currentPage, itemsPerPage);
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
        displayNotices(tip, currentPage, itemsPerPage);
        displayPagination(totalPg, currentPage); // UI 업데이트
      }
    });
    paginationUL.appendChild(nextBtn);
  }

  // 공지사항 목록 화면에 호출
  displayNotices(tip, currentPage, itemsPerPage);
  displayPagination(totalPages, currentPage);

  // ============================================================================
  //  궁금해요 게시판 데이터
  const wonder = [
    { id: 1, name: "lsg0905", title: "초코코팅된 빵들 코팅 안녹게 해동하는 방법있을까요..", date: "2024-10-01" },
    { id: 2, name: "fod333", title: "오래된 빵 활용할 수 있는 방법 없을까옹", date: "2024-09-30" },
    { id: 3, name: "djfh678", title: "빵 냉동보관 기간 어느정도가 적당한가요 ?", date: "2024-09-29" },
    { id: 4, name: "yup3859", title: "주말에 부산 놀러가는데 부산 케이크 맛집 있을까요 ?", date: "2024-09-28" },
    { id: 5, name: "dkfk344", title: "요즘 글루텐프리 제품들 많이 보이는데 글루텐프리가 몸에 좋은건가요", date: "2024-09-27" },
    { id: 6, name: "ddang999", title: "냉동실에 5개월동안 있었던 빵.. 먹어도 될까요....?", date: "2024-09-26" },
    { id: 7, name: "solmom234", title: "원래 제빵류의 빵은 냉장보관하면 푸석해지나요?ㅠㅠ", date: "2024-09-25" },
    { id: 8, name: "ddang3840", title: "다들 하루에 빵 몇개씩 드시나요,, 일단 전 3개 이상...", date: "2024-09-24" },
    { id: 9, name: "flog8670", title: "뺑오스위스랑 뻉오쇼콜라 차이가 뭐에여??", date: "2024-09-23" },
    { id: 10, name: "pahe393", title: "파운드 맛집 대구에도 있나요 ?? 있다면 추천 부탁드려용", date: "2024-09-22" },
    { id: 11, name: "sumsim980", title: "이번에 희와제과 팝업하던데 쑥 배이스 빵들 맛있나요?", date: "2024-09-21" },
    { id: 12, name: "mole333", title: "팝업 관련 질문 ! 크리미 아이스박스 포장으로 택배 보내주시나요?", date: "2024-09-20" },
    { id: 13, name: "lsg0905", title: "공지사항 1", date: "2024-10-01" },
    { id: 14, name: "fod333", title: "공지사항 2", date: "2024-09-30" },
    { id: 15, name: "djfh678", title: "공지사항 3", date: "2024-09-29" },
    { id: 16, name: "yup3859", title: "공지사항 4", date: "2024-09-28" },
    { id: 17, name: "dkfk344", title: "공지사항 5", date: "2024-09-27" },
    { id: 18, name: "ddang999", title: "공지사항 6", date: "2024-09-26" },
    { id: 19, name: "solmom234", title: "공지사항 7", date: "2024-09-25" },
    { id: 20, name: "ddang3840", title: "공지사항 8", date: "2024-09-24" },
    { id: 21, name: "flog8670", title: "공지사항 9", date: "2024-09-23" },
    { id: 22, name: "pahe393", title: "공지사항 10", date: "2024-09-22" },
    { id: 23, name: "sumsim980", title: "공지사항 11", date: "2024-09-21" },
    { id: 24, name: "mole333", title: "공지사항 12", date: "2024-09-20" },
    { id: 25, name: "djfh678", title: "공지사항 3", date: "2024-09-29" },
    { id: 26, name: "yup3859", title: "공지사항 4", date: "2024-09-28" },
    { id: 27, name: "dkfk344", title: "공지사항 5", date: "2024-09-27" },
    { id: 28, name: "ddang999", title: "공지사항 6", date: "2024-09-26" },
    { id: 29, name: "solmom234", title: "공지사항 7", date: "2024-09-25" },
    { id: 30, name: "ddang3840", title: "공지사항 8", date: "2024-09-24" },
    { id: 31, name: "flog8670", title: "공지사항 9", date: "2024-09-23" },
    { id: 32, name: "pahe393", title: "공지사항 10", date: "2024-09-22" },
    { id: 33, name: "sumsim980", title: "공지사항 11", date: "2024-09-21" },
    { id: 34, name: "mole333", title: "공지사항 12", date: "2024-09-20" },
  ];
  //   페이지당 표시할 항목수
  const itemsPerPage2 = 12;
  let currentPage2 = 1;
  const totalPages2 = Math.ceil(wonder.length / itemsPerPage2);
  //   console.log(totalPages); // 3
  // 공지사항 목록을 출력하는 함수
  function displayNotices2(wonder, page2, itemsPerpage2) {
    // console.log(notices);
    // console.log(page);
    // console.log(itemsPerPage);
    const noticeList2 = document.getElementById("noticeList2");
    const start2 = (page2 - 1) * itemsPerpage2;
    // console.log(start);
    const pageNotices2 = wonder.slice(start2, start2 + itemsPerpage2);
    // console.log(pageNotices);
    noticeList2.innerHTML = pageNotices2
      .map(
        (item, index) =>
          //   console.log(item);
          `
      <tr>
          <td> ${start2 + index + 1} </td>
          <td> ${item.name} </td>
          <td> ${item.title} </td>
          <td> ${item.date} </td>
      </tr>

      `
      )
      .join("");
  }
  // 탭 버튼 클릭 시 1번 페이지로 이동하는 함수
  function handleTabClick() {
    currentPage = 1; // 탭을 클릭하면 1번 페이지로 이동
    displayNotices2(wonder, currentPage2, itemsPerPage2);
    displayPagination2(totalPages2, currentPage2);
  }

  // 탭 버튼에 클릭 이벤트 리스너 추가
  const tabButton2 = document.getElementById("tabButton2"); // 탭 버튼의 ID를 tabButton으로 가정
  tabButton2.addEventListener("click", handleTabClick);
  // 페이지네이션 버튼을 출력하는 함수
  function displayPagination2(totalPg, currentPage2) {
    const paginationUL = document.getElementById("pagination2");
    paginationUL.innerHTML = ""; // 기존 페이지네이션 초기화

    // 이전 버튼
    const prevBtn = document.createElement("p");
    prevBtn.textContent = "이전";
    prevBtn.addEventListener("click", () => {
      if (currentPage2 > 1) {
        currentPage2--;
        displayNotices2(wonder, currentPage2, itemsPerPage2);
        displayPagination2(totalPg, currentPage2); // UI 업데이트
      }
    });
    paginationUL.appendChild(prevBtn);

    // 페이지 번호 버튼 생성
    for (let i = 1; i <= totalPg; i++) {
      const li = document.createElement("li");
      li.textContent = i;

      // 클릭 시 해당 페이지로 이동
      li.addEventListener("click", () => {
        currentPage2 = i;
        displayNotices2(wonder, currentPage2, itemsPerPage2);
        displayPagination2(totalPg, currentPage2); // UI 업데이트
      });

      // 현재 페이지에 active 클래스 추가
      if (i === currentPage2) {
        li.classList.add("active");
      }

      paginationUL.appendChild(li);
    }

    // 다음 페이지 버튼
    const nextBtn = document.createElement("p");
    nextBtn.textContent = "다음";
    nextBtn.addEventListener("click", () => {
      if (currentPage2 < totalPg) {
        currentPage2++;
        displayNotices2(wonder, currentPage2, itemsPerPage2);
        displayPagination2(totalPg, currentPage2); // UI 업데이트
      }
    });
    paginationUL.appendChild(nextBtn);
  }

  // 페이지네이션 UI 업데이트 함수는 더 이상 필요하지 않습니다.
  // displayPagination2 내에서 바로 active 클래스를 업데이트하도록 처리했습니다.

  // 공지사항 목록을 화면에 호출
  displayNotices2(wonder, currentPage2, itemsPerPage2);
  displayPagination2(totalPages2, currentPage2);

  // ==========================================================
});

$(document).ready(function () {
  // tip 클릭 시
  $(".tip").click(function () {
    // tip-container를 보이게 하고 wonder-container는 숨기기
    $(".tip-container").show();
    $(".wonder-container").hide();

    // 활성화 스타일 추가
    $(this).addClass("active");
    $(".wonder").removeClass("active");
  });

  // wonder 클릭 시
  $(".wonder").click(function () {
    // wonder-container를 보이게 하고 tip-container는 숨기기
    $(".wonder-container").show();
    $(".tip-container").hide();

    // 활성화 스타일 추가
    $(this).addClass("active");
    $(".tip").removeClass("active");
  });

  // 기본적으로 tip-container 보이게
  $(".tip-container").show();
});
