import React from "react";
import { Dropdown } from "react-bootstrap";

// ==============================
// Types
// ==============================
export type ActionItem = {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
  visible?: boolean; // static condition
  condition?: () => boolean; // dynamic condition
};

type ActionDropdownProps = {
  actions: ActionItem[];
  label?: React.ReactNode; // custom toggle
};

// ==============================
// Custom Toggle (TS Safe)
// ==============================
const CustomToggle = React.forwardRef<
  HTMLSpanElement,
  {
    children: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLSpanElement>;
  }
>(({ children, onClick }, ref) => (
  <span
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick?.(e);
    }}
    style={{
      cursor: "pointer",
      padding: "6px 10px",
      display: "inline-flex",
      alignItems: "center",
      fontSize: 12,
      borderRadius: 0,
    }}
  >
    {children}
  </span>
));

CustomToggle.displayName = "CustomToggle";

// ==============================
// Component
// ==============================
const ActionDropdown: React.FC<ActionDropdownProps> = ({
  actions,
  label = "Action",
}) => {
  const filteredActions = actions.filter((action) => {
    if (action.visible === false) return false;
    if (action.condition && !action.condition()) return false;
    return true;
  });

  if (filteredActions.length === 0) return null;

  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle}>{label}</Dropdown.Toggle>

      <Dropdown.Menu
        align="end"
        style={{
          borderRadius: 0,
          minWidth: 120,
          padding: "4px 0",
        }}
      >
        {filteredActions.map((action, index) => (
          <Dropdown.Item
            key={index}
            onClick={action.onClick}
            disabled={action.disabled}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: 12,
              padding: "4px 12px",
            }}
          >
            {action.icon}
            {action.label}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ActionDropdown;