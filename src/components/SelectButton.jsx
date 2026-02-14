import { memo, useState } from "react";

const SelectButton = ({ children, selected, onClick }) => {
  const baseStyle = {
    border: "1px solid gold",
    borderRadius: 5,
    padding: "10px 20px",
    cursor: "pointer",
    fontWeight: selected ? 700 : 500,
    backgroundColor: selected ? "gold" : "transparent",
    color: selected ? "black" : "inherit",
    width: "22%",
    textAlign: "center",
  };

  const hoverStyle = {
    backgroundColor: "gold",
    color: "black",
  };

  const [hover, setHover] = useState(false);

  return (
    <span
      onClick={onClick}
      style={{ ...baseStyle, ...(hover ? hoverStyle : {}) }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {children}
    </span>
  );
};

export default memo(SelectButton);
