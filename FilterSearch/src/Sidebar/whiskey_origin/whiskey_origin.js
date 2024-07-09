//whiskey_origin.js
import "./whiskey_origin.css";
import Input from "../../components/Input";

const Colors = ({ handleChange }) => {
  return (
    <>
      <div>
        <h2 className="sidebar-title color-title">원산지</h2>

        <label className="sidebar-label-container">
          <input onChange={handleChange} type="radio" value="" name="test1" />
          <span className="checkmark"></span>
          All
        </label>

        <Input
          handleChange={handleChange}
          value="네덜란드"
          title="네덜란드"
          name="test1"
        />

        <Input
          handleChange={handleChange}
          value="독일"
          title="독일"
          name="test1"
        />

        <Input
          handleChange={handleChange}
          value="멕시코"
          title="멕시코"
          name="test1"
        />

        <Input
          handleChange={handleChange}
          value="미국"
          title="미국"
          name="test1"
        />

        <Input
          handleChange={handleChange}
          value="스웨덴"
          title="스웨덴"
          name="test1"
        />
        <Input
          handleChange={handleChange}
          value="스코틀랜드"
          title="스코틀랜드"
          name="test1"
        />
        <Input
          handleChange={handleChange}
          value="스페인"
          title="스페인"
          name="test1"
        />
        <Input
          handleChange={handleChange}
          value="아일랜드"
          title="아일랜드"
          name="test1"
        />
        <Input
          handleChange={handleChange}
          value="영국 런던"
          title="영국 런던"
          name="test1"
        />
        <Input
          handleChange={handleChange}
          value="이탈리아"
          title="이탈리아"
          name="test1"
        />
        <Input
          handleChange={handleChange}
          value="일본"
          title="일본"
          name="test1"
        />
        <Input
          handleChange={handleChange}
          value="프랑스"
          title="프랑스"
          name="test1"
        />
      </div>
    </>
  );
};

export default Colors;
