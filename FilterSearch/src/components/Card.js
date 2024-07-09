// Card.js
import React from "react";
import "./Card.css"; // CSS 파일 불러오기

const Card = ({ img, title }) => {

  return (
      <section className="card">
        <img src={img} alt={title} className="card-img" />
        <div className="card-details">
          <h3 className="card-title">{title}</h3>
        </div>
      </section>
  );
};

export default Card;
