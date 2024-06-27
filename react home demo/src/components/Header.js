// src/components/Header.js
import React, { useEffect } from 'react';
import './Header.css';
import $ from 'jquery';

const Header = () => {
  useEffect(() => {
    const gnb = $('#gnb');
    const hdBg = $('.hd_bg');

    gnb.mouseenter(() => {
      $('.inner_menu').fadeIn(1000);
      const menuHeight = $('#header').outerHeight();
      const inmeHeight = $('.inner_menu').outerHeight();
      hdBg.css({
        top: `${menuHeight}px`,
        height: `${inmeHeight}px`,
      });

      hdBg.addClass('active').animate({
        top: '50%',
      }, 300);
    });

    gnb.mouseleave(() => {
      $('.inner_menu').hide();
      hdBg.css('height', '0');
      hdBg.removeClass('active');
    });

    $('.dept1').mouseenter(function () {
      $(this).children().addClass('active');
      $(this).siblings().children().removeClass('active');
    });

    $('.dept1').mouseleave(function () {
      $(this).children().removeClass('active');
    });
  }, []);

  return (
    <div id="header">
      <ul id="gnb">
      <li class="dept1">
				<a href="#">가나다</a>
				<ul class="inner_menu">
					<li class="dept2">
						<a href="#">메뉴1</a>
					</li>
					<li class="dept2">
						<a href="#">메뉴1</a>
					</li>
					<li class="dept2">
						<a href="#">메뉴1</a>
					</li>
					<li class="dept2">
						<a href="#">메뉴1</a>
					</li>
				</ul>
			</li>
			<li class="dept1">
				<a href="#">가나다</a>
				<ul class="inner_menu">
					<li class="dept2">
						<a href="#">메뉴2</a>
					</li>
					<li class="dept2">
						<a href="#">메뉴2</a>
					</li>
					<li class="dept2">
						<a href="#">메뉴2</a>
					</li>
					<li class="dept2">
						<a href="#">메뉴2</a>
					</li>
				</ul>
			</li>
			<li class="dept1">
				<a href="#">가나다</a>
				<ul class="inner_menu">
					<li class="dept2">
						<a href="#">메뉴3</a>
					</li>
					<li class="dept2">
						<a href="#">메뉴3</a>
					</li>
					<li class="dept2">
						<a href="#">메뉴3</a>
					</li>
				</ul>
			</li>
			<li class="dept1">
				<a href="#">가나다</a>
				<ul class="inner_menu">
					<li class="dept2">
						<a href="#">메뉴4</a>
					</li>
					<li class="dept2">
						<a href="#">메뉴4</a>
					</li>
					<li class="dept2">
						<a href="#">메뉴4</a>
					</li>
				</ul>
			</li>
			<li class="dept1">
				<a href="#">가나다</a>
				<ul class="inner_menu">
					<li class="dept2">
						<a href="#">메뉴5</a>
					</li>
					<li class="dept2">
						<a href="#">메뉴5</a>
					</li>
				</ul>
			</li>
      </ul>
      <div className="hd_bg"></div>
    </div>
  );
}

export default Header;
