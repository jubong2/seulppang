$(document).ready(function () {
    console.log("현재 쿠키 상태:", document.cookie); // 쿠키 상태 확인 (디버깅용)
  
    // 쿠키 확인 및 팝업 표시
    if (getCookie('hidePopup') !== 'true') {
      $('#popupOverlay').fadeIn(); // 쿠키가 없으면 팝업 표시
    }
  
    // X 버튼 클릭 시 동작
    $('#closePopup').click(function () {
      if ($('#dontShowCheckbox').is(':checked')) { // 체크박스가 선택된 경우
        setCookie('hidePopup', 'true', 5); // 5분 동안 쿠키 설정
      }
      $('#popupOverlay').fadeOut(); // 팝업 닫기
    });
  
    // 쿠키 설정 함수
    function setCookie(name, value, minutes) {
      var date = new Date();
      date.setTime(date.getTime() + (minutes * 60 * 1000)); // 분 단위 만료 시간 설정
      document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/;SameSite=Lax';
    }
  
    // 쿠키 가져오기 함수
    function getCookie(name) {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
          return cookie.substring((name + '=').length);
        }
      }
      return null;
    }
  });
  