//whiskey_alcohol.js
import Input from "../../components/Input";
import "./whiskey_alcohol.css";

const Price = ({ handleChange }) => {
  return (
    <>
      <div className="ml">
        <h2 className="sidebar-title price-title">도수</h2>

        <label className="sidebar-label-container">
          <input onChange={handleChange} type="radio" value="" name="test2" />
          <span className="checkmark"></span>All
        </label>

        <Input
          handleChange={handleChange}
          value="E"
          title="60% 이상"
          name="test2"
        />

        <Input
          handleChange={handleChange}
          value="D"
          title="50% ~ 60%"
          name="test2"
        />

        <Input
          handleChange={handleChange}
          value="C"
          title="40% - 50%"
          name="test2"
        />

        <Input
          handleChange={handleChange}
          value="B"
          title="30% - 40%"
          name="test2"
        />

        <Input
          handleChange={handleChange}
          value="A"
          title="30% 미만"
          name="test2"
        />
      </div>
    </>
  );
};

export default Price;
