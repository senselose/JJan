$(document).ready(function() {
    var gnb = $('#gnb');
    var hdBg = $('.hd_bg');

     // 마우스 over 시
    gnb.mouseenter(function() {
        $('.inner_menu').fadeIn(1000); // 1.0초 동안 부드럽게 나타나기
        var menuHeight = $('#header').outerHeight();
        var inmeHeight = $('.inner_menu').outerHeight();
        hdBg.css({
            'top': menuHeight + 'px',
            'height': inmeHeight + 'px'
        });

        hdBg.addClass('active').animate({
            'top': '50%' // 애니메이션 완료 후 화면 중앙으로 이동
        }, 300); // 0.3초 동안 애니메이션

    });

    // 마우스 leave 시
    gnb.mouseleave(function() {
        $('.inner_menu').hide();
        hdBg.css('height', '0');
        hdBg.removeClass('active'); // .hd_bg의 active 클래스 제거
    });

    // dept2 hover 시 dept1 active
    $('.dept1').mouseenter(function() {
        $(this).children().addClass('active');
        $(this).siblings().children().removeClass('active');
    });

    $('.dept1').mouseleave(function() {
        $(this).children().removeClass('active');
    });
});
