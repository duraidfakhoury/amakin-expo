import './toggleSlider.css';

const ToggleSlider = ({ onToggle, checked }) => {
  return (
    <label className="toggle-slider">
      <input type="checkbox" onChange={onToggle} checked={checked} />
      <span className="slider round"></span>
    </label>
  );
};

export default ToggleSlider;
