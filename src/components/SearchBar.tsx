import { useEffect, useState } from "react";
import { Form, Spinner } from "react-bootstrap";

type SearchBarProps = {
  onSearch: (keyword: string) => Promise<void> | void;
  onReset?: () => void; // 🔥 untuk reset data awal
  placeholder?: string;
  initialValue?: string;
  style?: React.CSSProperties;
  controlStyle?: React.CSSProperties;
  debounceMs?: number;
};

const SearchBar = ({
  onSearch,
  onReset,
  placeholder = "Cari...",
  initialValue = "",
  style,
  controlStyle,
  debounceMs = 500,
}: SearchBarProps) => {
  const [keyword, setKeyword] = useState(initialValue);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handler = setTimeout(async () => {
      const trimmed = keyword.trim();

      try {
        setLoading(true);

        if (!trimmed) {
          await onReset?.();
        } else {
          await onSearch(trimmed);
        }
      } finally {
        setLoading(false);
      }
    }, debounceMs);

    return () => clearTimeout(handler);
  }, [keyword]);

  return (
    <div style={{ display: "flex", alignItems: "center", height: "inherit", ...style }}>
      <Form.Control
        type="text"
        style={{
          borderRadius: 0,
          paddingRight: 10,
          outline: "none",
          boxShadow: "none",
          ...controlStyle,
        }}
        value={keyword}
        placeholder={placeholder}
        onChange={(e) => setKeyword(e.target.value)}
        onFocus={e => {
          e.target.style.outline = "none";
          e.target.style.boxShadow = "none";
        }}
      />
        <Spinner
          className="bg-white"
          size="sm"
          variant="primary"
          animation="border"
          style={{
            margin: 10,
            visibility: loading ? "visible" : "hidden",
            borderWidth: "2px",
          }}
        />
    </div>
  );
};

export default SearchBar;