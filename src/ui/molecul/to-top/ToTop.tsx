import ActionButton from "../../atom/action-button/ActionButton";
import "./style.css";

export default function ToTop() {
  const toTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <div className='to-top'>
      <ActionButton actionWithPayload={toTop}>up</ActionButton>
    </div>
  );
}
