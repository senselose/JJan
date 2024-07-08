import React, { useState, useEffect, useRef } from 'react';
import './Header.css';
import $ from 'jquery';
import { useNavigate } from 'react-router-dom';
import DetailList from './DetailList';

const Header = () => {
  const [userInput, setUserInput] = useState('');
  const [trendingList, setTrendingList] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [showPopularSearch, setShowPopularSearch] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  useEffect(() => {
    setTrendingList(['위스키1', '위스키2', '위스키3', '위스키4', '위스키5']);
    setRecommendations(['맥주1', '맥주2', '맥주3', '맥주4', '맥주5']);

    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowPopularSearch(false);
        setIsSearchActive(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

  const handleInputClick = () => {
    setShowPopularSearch(true);
    setIsSearchActive(true);
  };

  const handleItemClick = (keyword) => {
    navigate(`/search/${keyword}`);
  };

  const handleUserInputChange = (event) => {
    const value = event.target.value;
    setUserInput(value);
    setShowPopularSearch(value === '');
  };

  const handleSearchClick = () => {
    console.log('검색: ', userInput);
    navigate(`/search/${userInput}`);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearchClick();
    }
  };

  const handleCancelClick = () => {
    setIsSearchActive(false);
    setShowPopularSearch(false);
    setUserInput('');
  };

  return (
    <div id="header">
      <li className="logo">
        <a href="index.html"><img src={"images/logo.png"}/></a>
      </li>
      <ul id="gnb">
        <li className="dept1">
          <a href="#">가나다</a>
          <ul className="inner_menu">
            <li className="dept2"><a href="#">메뉴1</a></li>
            <li className="dept2"><a href="#">메뉴1</a></li>
            <li className="dept2"><a href="#">메뉴1</a></li>
            <li className="dept2"><a href="#">메뉴1</a></li>
          </ul>
        </li>
        <li className="dept1">
          <a href="#">가나다</a>
          <ul className="inner_menu">
            <li className="dept2"><a href="#">메뉴2</a></li>
            <li className="dept2"><a href="#">메뉴2</a></li>
            <li className="dept2"><a href="#">메뉴2</a></li>
            <li className="dept2"><a href="#">메뉴2</a></li>
          </ul>
        </li>
        <li className="dept1">
          <a href="#">가나다</a>
          <ul className="inner_menu">
            <li className="dept2"><a href="#">메뉴3</a></li>
            <li className="dept2"><a href="#">메뉴3</a></li>
            <li className="dept2"><a href="#">메뉴3</a></li>
          </ul>
        </li>
        <li className="dept1">
          <a href="#">가나다</a>
          <ul className="inner_menu">
            <li className="dept2"><a href="#">메뉴4</a></li>
            <li className="dept2"><a href="#">메뉴4</a></li>
            <li className="dept2"><a href="#">메뉴4</a></li>
          </ul>
        </li>
        <li className="dept1">
          <a href="#">가나다</a>
          <ul className="inner_menu">
            <li className="dept2"><a href="#">메뉴5</a></li>
            <li className="dept2"><a href="#">메뉴5</a></li>
          </ul>
        </li>
      </ul>

      <li className="logo2">
      </li>

      <div className={`search-container ${isSearchActive ? 'active' : ''}`} ref={searchRef}>
        <div className="search-input">
          <input
            type="text"
            value={userInput}
            onChange={handleUserInputChange}
            onClick={handleInputClick}
            onKeyPress={handleKeyPress}
            placeholder="검색어를 입력하세요"
          />
          <button onClick={handleSearchClick}>검색</button>
        </div>

        {showPopularSearch && (
          <div className="search-results">
            <div className="detail-list-container">
              <DetailList
                list={trendingList}
                onItemClick={handleItemClick}
                title="인기 검색어"
              />
              <DetailList
                list={recommendations}
                onItemClick={handleItemClick}
                title="추천 검색어"
              />
            </div>
          </div>
        )}
      </div>
      {isSearchActive && (
        <>
          <div className="overlay active" onClick={handleCancelClick}></div>
          <button className="cancel-button" onClick={handleCancelClick}>취소</button>
        </>
      )}
      <div className="hd_bg"></div>
    </div>
  );
}

export default Header;