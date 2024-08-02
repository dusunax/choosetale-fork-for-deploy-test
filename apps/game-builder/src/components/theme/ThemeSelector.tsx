"use client";
import { useEffect } from "react";
import { isThemeType, useThemeStore } from "@/store/useTheme";

export function ThemeSelector() {
  const { theme, setTheme } = useThemeStore();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTheme = event.target.value;
    if (isThemeType(selectedTheme)) setTheme(selectedTheme);
  };

  useEffect(() => {
    let linkElement: HTMLLinkElement | null = null;

    const loadTheme = () => {
      if (linkElement && document.head.contains(linkElement)) {
        document.head.removeChild(linkElement);
      }

      linkElement = document.createElement("link");
      linkElement.rel = "stylesheet";

      switch (theme) {
        case "windows-98":
          linkElement.href = "https://unpkg.com/98.css";
          break;
        case "old-game":
          linkElement.href =
            "https://cdnjs.cloudflare.com/ajax/libs/nes.css/2.3.0/css/nes.min.css";
          break;
        default:
          linkElement = null;
          break;
      }

      if (linkElement) {
        document.head.appendChild(linkElement);
      }
    };

    loadTheme();

    return () => {
      if (linkElement && document.head.contains(linkElement)) {
        document.head.removeChild(linkElement);
      }
    };
  }, [theme]);

  return (
    <div className="text-xs flex items-center">
      <select
        id="theme"
        className="outline-none text-right"
        value={theme}
        onChange={handleChange}
      >
        <option value="default">simple</option>
        <option value="old-game">old game</option>
        <option value="windows-98">windows 98</option>
      </select>
    </div>
  );
}
