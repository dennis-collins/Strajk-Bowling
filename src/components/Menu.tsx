import React from "react";

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
  onGoToBooking: () => void;
  onGoToConfirmation: () => void;
}

const Menu: React.FC<MenuProps> = ({
  isOpen,
  onClose,
  onGoToBooking,
  onGoToConfirmation,
}) => {
  if (!isOpen) return null;

  return (
    <div className="menu-overlay" onClick={onClose}>
      <nav className="menu" onClick={(e) => e.stopPropagation()}>
        <button className="menu-item" onClick={onGoToBooking}>
          BOOKING
        </button>
        <button className="menu-item" onClick={onGoToConfirmation}>
          CONFIRMATION
        </button>
      </nav>
    </div>
  );
};

export default Menu;
