import React, { useState } from "react";
import style from "./style/style.css";
import { Link } from 'react-router-dom';

const Category = () => {
  const menuLst = ["menu1", "menu2", "menu3", "menu4", "menu5"];
  const [hide, setHide] = useState({
    menu1: false,
    menu2: false,
    menu3: false,
    menu4: false,
    menu5: false,
  });
  const mouseEvent = (menuName, bool) => {
    const change = { ...hide };
    change[menuName] = bool;
    setHide(change);
  };
  return (
    <div className="nav">
      {/* 헤더 */}
      <header className="header">
        <div className="auth-links">
          <Link to="#">회원가입</Link> | <Link to="#">로그인</Link>
        </div>
      </header>
      {/* 네비게이션 바 */}
      <ul className="navContainer">
        {menuLst.map((v, idx) => (
          <li
            className={hide[v] ? "active" : "none"}
            onMouseEnter={() => mouseEvent(v, true)}
            onMouseLeave={() => mouseEvent(v, false)}
          >
            <p>{`메뉴${idx + 1}`}</p>
          </li>
        ))}
      </ul>
      <div className="detailMenu">
        {menuLst.map((v, idx) => (
          <ul
            onMouseEnter={() => mouseEvent(v, true)}
            onMouseLeave={() => mouseEvent(v, false)}
          >
            <li>{`메뉴${idx + 1}-${1}`}</li>
            <li>{`메뉴${idx + 1}-${2}`}</li>
            <li>{`메뉴${idx + 1}-${3}`}</li>
            <li>{`메뉴${idx + 1}-${4}`}</li>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default Category;