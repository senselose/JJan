$(document).ready(function() {
    $.ajax({
        url: 'header.html', // 로드할 외부 파일 경로
        dataType: 'html',
        success: function(response) {
            $('#header').html(response); // #header 요소에 로드한 내용 삽입
            // 추가적으로 필요한 스크립트 초기화 등의 작업 수행
        }
    });
});




