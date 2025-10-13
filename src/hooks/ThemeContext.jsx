import { createContext, useContext, useEffect, useState } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import GlobalStyle from "../styles.jsx";
import { light, dark } from "../theme.jsx";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [themeName, setThemeName] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  const theme = themeName === "dark" ? dark : light;

  // Atualiza o localStorage sempre que o tema muda
  useEffect(() => {
    localStorage.setItem("theme", themeName);
  }, [themeName]);

  // Define as variáveis CSS globais (para SCSS ou CSS comum)
  useEffect(() => {
    document.body.style.setProperty("--body-color", theme.body);
    document.body.style.setProperty("--text-color", theme.text);

    // opcional: se quiser mais variáveis
    // if (theme.primary) document.body.style.setProperty("--primary-color", theme.primary);
    // if (theme.accent) document.body.style.setProperty("--accent-color", theme.accent);
  }, [theme]);

  // Função para alternar entre os temas
  const toggleTheme = () => {
    setThemeName((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ themeName, setThemeName, toggleTheme }}>
      <StyledThemeProvider theme={theme}>
        <GlobalStyle />
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
