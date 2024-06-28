import React, { useState, useEffect, useRef } from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DetailList from './DetailList';

const Header = () => {
  const [userInput, setUserInput] = useState('');
  const [trendingList, setTrendingList] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [recentKeywords, setRecentKeywords] = useState([]);
  const [showPopularSearch, setShowPopularSearch] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  useEffect(() => {
    setTrendingList(['위스키1', '위스키2', '위스키3', '위스키4', '위스키5']);
    setRecommendations(['맥주1', '맥주2', '맥주3', '맥주4', '맥주5']);
    fetchRecentKeywords();

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

  const fetchRecentKeywords = async () => {
    try {
      const response = await axios.get('/api/search/recent');
      setRecentKeywords(response.data);
    } catch (error) {
      console.error('Failed to fetch recent keywords:', error);
    }
  };

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

  const handleSearchClick = async () => {
    try {
      await axios.post('/api/search', null, { params: { keyword: userInput } });
      fetchRecentKeywords(); // 검색어 저장 후 최근 검색어 목록 갱신
      navigate(`/search/${userInput}`);
      setShowPopularSearch(false);
      setIsSearchActive(false);
      setUserInput('');
    } catch (error) {
      console.error('Failed to save keyword:', error);
    }
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
            <div className="recent-keywords">
              <h3>최근 검색어</h3>
              <ul>
                {recentKeywords.map((item) => (
                  <li key={item.id} onClick={() => handleItemClick(item.keyword)}>
                    {item.keyword}
                  </li>
                ))}
              </ul>
            </div>
            <div className="keyword-lists">
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
};

export default Header;
