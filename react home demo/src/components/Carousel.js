// src/components/Carousel.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Carousel.css';

const Carousel = () => {
    return (
      <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
        <ol className="carousel-indicators">
          <li data-target="#carouselExampleControls" data-slide-to="0" className="active"></li>
          <li data-target="#carouselExampleControls" data-slide-to="1"></li>
          <li data-target="#carouselExampleControls" data-slide-to="2"></li>
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="images/wlop1.jpg" className="d-block w-100" alt="Slide 1" />
          </div>
          <div className="carousel-item">
            <img src="images/wlop2.jpg" className="d-block w-100" alt="Slide 2" />
          </div>
          <div className="carousel-item">
            <img src="images/wlop3.jpg" className="d-block w-100" alt="Slide 3" />
          </div>
        </div>
        <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
          <span className="carousel-control-prev-icon"></span>
          <span className="sr-only"></span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
          <span className="carousel-control-next-icon"></span>
          <span className="sr-only"></span>
        </a>
      </div>
    );
  }

export default Carousel;