import { useEffect, useState } from "react";

const FloatingNotification = ({
  message,
  type,
  onClose,
}: {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!message) return;

    // trigger animasi masuk
    setVisible(true);

    const timer = setTimeout(() => {
      // trigger animasi keluar
      setVisible(false);

      // tunggu animasi selesai baru close
      setTimeout(() => {
        onClose();
      }, 300);
    }, 3000);

    return () => clearTimeout(timer);
  }, [message, onClose]);

  return (
    <div
      style={{
        position: "fixed",
        top: 30,
        left: "50%",
        transform: visible
          ? "translate(-50%, 0)"
          : "translate(-50%, -20px)",
        opacity: visible ? 1 : 0,
        transition: "all 0.3s ease",
        zIndex: 9999,
        background: type === "success" ? "#4caf50" : "#f44336",
        color: "#fff",
        padding: "12px 32px",
        fontWeight: 600,
        boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
        minWidth: 250,
        fontSize: 12,
        textAlign: "center",
        pointerEvents: "none",
      }}
    >
      {message}
    </div>
  );
};

export default FloatingNotification;