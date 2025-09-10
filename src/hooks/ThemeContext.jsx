import { createContext, useContext, useState } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import GlobalStyle from "../styles.jsx";
import { light, dark } from "../theme.jsx";

const ThemeContext = createContext(); ///Cria o contexto. O valor padrão é opcional.

export function ThemeProvider({ children }) {
  // Cria o provedor de tema. Ele gerencia o estado do tema e fornece funções para alternar temas.
  const [themeName, setThemeName] = useState("light"); // Estado para armazenar o nome do tema atual.
  const theme = themeName === "light" ? light : dark; // A condição diz que se o nome do tema for "light", use o tema claro; caso contrário, use o tema escuro.

  // Função para alternar entre temas claro e escuro.

  const toggleTheme = () => {
    setThemeName((prev) => (prev === "light" ? "dark" : "light")); // Se o tema atual for "light", mude para "dark"; caso contrário, mude para "light".
  };

  return (
    <ThemeContext.Provider value={{ themeName, setThemeName, toggleTheme }}>
      {/* Fornece o contexto do tema para os componentes filhos. */}
      <StyledThemeProvider theme={theme}>
        {/* Fornece o tema atual para styled-components. vai buscar em theme.jsx */}
        <GlobalStyle />
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
