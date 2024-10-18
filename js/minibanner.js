$(document).ready(function () {
  function checkScroll() {
      $('.miniBn-left, .miniBn-rigth').each(function () {
          let elementTop = $(this).offset().top;
          let windowBottom = $(window).scrollTop() + $(window).height();

          // 요소가 뷰포트에 들어오면 'show' 클래스 추가
          if (elementTop < windowBottom - 100) {
              $(this).addClass('show'); // 'show' 클래스 추가
          } else {
              $(this).removeClass('show'); // 'show' 클래스 제거
          }
      });
  }

  // 페이지 로딩 시 및 스크롤 시 애니메이션 적용
  $(window).on('scroll', checkScroll);
  checkScroll(); // 로딩 시 한 번 실행
});