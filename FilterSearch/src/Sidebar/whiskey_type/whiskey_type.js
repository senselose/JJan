import "./whiskey_type.css";
import Input from "../../components/Input";

function whiskey_type({ handleChange }) {
  return (
    <div>
      <h2 className="sidebar-title">종류</h2>

      <div>
        <label className="sidebar-label-container">
          <input onChange={handleChange} type="radio" value="" name="test" />
          <span className="checkmark"></span>All
        </label>
        <Input
          handleChange={handleChange}
          value="블랜디드 몰트 위스키"
          title="블랜디드 몰트 위스키"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="블랜디드 스카치 위스키"
          title="블랜디드 스카치 위스키"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="블랜디드 아이리쉬 위스키"
          title="블랜디드 아이리쉬 위스키"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="블렌디드 그레인 위스키"
          title="블렌디드 그레인 위스키"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="싱글 그레인 위스키"
          title="싱글 그레인 위스키"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="싱글 몰트 위스키"
          title="싱글 몰트 위스키"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="라이 위스키"
          title="라이 위스키"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="버번 위스키"
          title="버번 위스키"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="테네시 위스키"
          title="테네시 위스키"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="보드카"
          title="보드카"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="데낄라"
          title="데낄라"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="리큐르"
          title="리큐르"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="꼬냑"
          title="꼬냑"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="진"
          title="진"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="럼"
          title="럼"
          name="test"
        />
      </div>
    </div>
  );
}

export default whiskey_type;
