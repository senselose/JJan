import React, { useState, useEffect } from "react";
import Navigation from "./Navigation/Nav";
import Products from "./Products/Products";
import Recommended from "./Recommended/Recommended";
import Sidebar from "./Sidebar/Sidebar";
import Card from "./components/Card";
import "./index.css";
import images from "./utils/loadImages";

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/custom");
        const data = await response.json();
        console.log(data); // 데이터 확인을 위해 로그 추가
        setProducts(data);
        setFilteredItems(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (event) => {
    const queryValue = event.target.value;
    setQuery(queryValue);
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(queryValue.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
  };

  function filteredData(products, selected, query) {
    let filteredProducts = products;

    if (query) {
      filteredProducts = filteredItems;
    }

    if (selected) {
      filteredProducts = filteredProducts.filter(
        ({ whiskey_type, company, whiskey_origin, whiskey_alcohol_type, whiskey_name  }) =>
          whiskey_type === selected ||
          whiskey_origin === selected ||
          company === selected ||
          whiskey_alcohol_type === selected ||
          whiskey_name  === selected
      );
    }

    return filteredProducts.map(
      ({ whiskey_img, whiskey_name }) => (
        <Card
          key={Math.random()}
          img={images[whiskey_img]}  // 이미지 경로 설정
          title={whiskey_name}
        />
      )
    );
  }

  const result = filteredData(products, selectedCategory, query);

  return (
    <>
      <Sidebar handleChange={handleChange} />
      <Navigation query={query} handleInputChange={handleInputChange} />
      <Recommended handleClick={handleClick} />
      <Products result={result} />
    </>
  );
}

export default App;
