window.addEventListener("load" , function(){
     // 예시 공지사항 데이터
     const notices = [
        { id: 1, name:"lsg0905", title: "소베 소금빵 맛있게 먹는 방법 공유합니다 !", date: "2024-10-01" },
        { id: 2, name:"fod333", title: "빵 단체 주문할 때 참고하면 좋은 빵집 리스트", date: "2024-09-30" },
        { id: 3, name:"djfh678", title: "두유라떼랑 궁합 좋은 빵 소개해 드릴게용", date: "2024-09-29" },
        { id: 4, name:"yup3859", title: "치아바타 샌드위치 레시피(맛은 보장 드립니다.)", date: "2024-09-28" },
        { id: 5, name:"dkfk344", title: "저희 집 멍뭉이가 잘 먹는 반려동물 빵 몇가지 추천드려여", date: "2024-09-27" },
        { id: 6, name:"ddang999", title: "아기들에게 안심하고 먹이는 유기농 빵 소개시켜드려요 !!", date: "2024-09-26" },
        { id: 7, name:"solmom234", title: "빵 냉동고에 보관할 때 주의해야되는 사항들", date: "2024-09-25" },
        { id: 8, name:"ddang3840", title: "냉동된 빵들 맛있게 해동시키는 꿀팁", date: "2024-09-24" },
        { id: 9, name:"flog8670", title: "손님에게 대접하기 좋은 디저트들 추천", date: "2024-09-23" },
        { id: 10, name:"pahe393", title: "집들이 선물로 가져갔을 때 반응 좋았던 빵들 몇개 추천해 봅니다 ~", date: "2024-09-22" },
        { id: 11, name:"sumsim980", title: "공지사항 11", date: "2024-09-21" },
        { id: 12, name:"mole333", title: "공지사항 12", date: "2024-09-20" },
        { id: 13, name:"lsg0905", title: "공지사항 1", date: "2024-10-01" },
        { id: 14, name:"fod333", title: "공지사항 2", date: "2024-09-30" },
        { id: 15, name:"djfh678", title: "공지사항 3", date: "2024-09-29" },
        { id: 16, name:"yup3859", title: "공지사항 4", date: "2024-09-28" },
        { id: 17, name:"dkfk344", title: "공지사항 5", date: "2024-09-27" },
        { id: 18, name:"ddang999", title: "공지사항 6", date: "2024-09-26" },
        { id: 19, name:"solmom234", title: "공지사항 7", date: "2024-09-25" },
        { id: 20, name:"ddang3840", title: "공지사항 8", date: "2024-09-24" },
        { id: 21, name:"flog8670", title: "공지사항 9", date: "2024-09-23" },
        { id: 22, name:"pahe393", title: "공지사항 10", date: "2024-09-22" },
        { id: 23, name:"sumsim980", title: "공지사항 11", date: "2024-09-21" },
        { id: 24, name:"mole333", title: "공지사항 12", date: "2024-09-20" },
      ];
      //   페이지당 표시할 항목수
      const itemsPerPage = 10;
      let currentPage = 1;
      const totalPages = Math.ceil(notices.length / itemsPerPage);
      //   console.log(totalPages); // 3
      // 공지사항 목록을 출력하는 함수
      function displayNotices(notices, page, itemsPerpage) {
        // console.log(notices);
        // console.log(page);
        // console.log(itemsPerPage);
        const noticeList = document.getElementById("noticeList");
        const start = (page - 1) * itemsPerpage;
        // console.log(start);
        const pageNotices = notices.slice(start, start + itemsPerpage);
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
      //   페이지네이션 벼튼을 출력하는 함수
      function displayPagination(totalPg, currentPg) {
        // console.log(totalPg);
        // console.log(currentPg);
        const paginationUL = document.getElementById("pagination");
        paginationUL.innerHTML = ""; // 기존 페이지네이션 초기화
        // 이전 버튼
        const prevBtn = document.createElement("p");
        prevBtn.textContent = "이전";
        prevBtn.addEventListener("click", () => {
          if (currentPage > 1) {
            currentPage--;
            displayNotices(notices, currentPage, itemsPerPage);
            audatPaginationUI();
          }
        });
        paginationUL.appendChild(prevBtn);
        //  페이지 번호 버튼 생성
        for (let i = 1; i <= totalPg; i++) {
          const li = document.createElement("li");
          li.textContent = i;

          li.addEventListener("click", () => {
            currentPage = i;
            // console.log(currentPg);
            li.classList.add(i === currentPage ? "active" : "");
            displayNotices(notices, currentPage, itemsPerPage);
            audatPaginationUI();
          });
          paginationUL.appendChild(li);
        }
        // 다음 페이지 버튼
        const nextBtn = document.createElement("p");
        nextBtn.textContent = "다음";
        nextBtn.addEventListener("click", () => {
          if (currentPage < totalPg) {
            currentPage++;
            displayNotices(notices, currentPage, itemsPerPage);
            audatPaginationUI();
          }
        });
        paginationUL.appendChild(nextBtn);
      }
      //   페이지네이션 ui 업데이트
      function audatPaginationUI() {
        const paginationItems = document.querySelectorAll("#pagination li, #pagination p");
        paginationItems.forEach((item, index) => {
          //   console.log(item);
          if (index === currentPage) {
            item.classList.add("active");
          } else {
            item.classList.remove("active");
          }
        });
      }
      // 공지사항 목록 화면에 호출
      displayNotices(notices, currentPage, itemsPerPage);
      displayPagination(totalPages, currentPage);
      
})