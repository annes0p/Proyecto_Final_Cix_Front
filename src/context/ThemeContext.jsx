import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();


export const themes = {
  oscuro: {
    fondo: '#1a1d24',
    tarjeta: '#222733',
    borde: '#2d3548',
    texto: '#cbd5e1',
    textoFuerte: '#fff',
    textoSuave: '#94a3b8',
    inputFondo: '#1a1d24',
  },
  claro: {
    fondo: '#f1f5f9',
    tarjeta: '#ffffff',
    borde: '#e2e8f0',
    texto: '#334155',
    textoFuerte: '#0f172a',
    textoSuave: '#64748b',
    inputFondo: '#f8fafc',
  }
};

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState(() => {
    return localStorage.getItem('cixoil_theme_mode') || 'sistema';
  });

  const [currentColors, setCurrentColors] = useState(themes.oscuro);

  useEffect(() => {
    localStorage.setItem('cixoil_theme_mode', mode);
    
    const aplicarColores = () => {
      if (mode === 'oscuro') {
        setCurrentColors(themes.oscuro);
      } else if (mode === 'claro') {
        setCurrentColors(themes.claro);
      } else {
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        setCurrentColors(mq.matches ? themes.oscuro : themes.claro);
      }
    };

    aplicarColores();

    if (mode === 'sistema') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      const listener = (e) => setCurrentColors(e.matches ? themes.oscuro : themes.claro);
      mq.addEventListener('change', listener);
      return () => mq.removeEventListener('change', listener);
    }
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, setMode, colors: currentColors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);