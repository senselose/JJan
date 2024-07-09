// Sidrbar.js
import Category from "./whiskey_type/whiskey_type";
import Price from "./whiskey_alcohol/whiskey_alcohol";
import Colors from "./whiskey_origin/whiskey_origin";
import "./Sidebar.css";

const Sidebar = ({ handleChange }) => {
  return (
    <>
      <section className="sidebar">
        <div className="logo-container">
          <h1>logo</h1>
        </div>
        <Category handleChange={handleChange} />
        <Price handleChange={handleChange} />
        <Colors handleChange={handleChange} />
      </section>
    </>
  );
};

export default Sidebar;
