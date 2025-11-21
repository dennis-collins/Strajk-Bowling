import React from "react";

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="header">
      <button className="navicon-button" onClick={onMenuClick}>
        <span className="navicon-line" />
        <span className="navicon-line" />
        <span className="navicon-line" />
      </button>
    </header>
  );
};

export default Header;
