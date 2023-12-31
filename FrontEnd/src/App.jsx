import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Subtitle from "./components/Subtitle";
import Dubbing from "./components/Dubbing";
import Footer from "./components/Footer";
import { ThemeProvider } from "./contexts/theme";

const App = () => {
  const [themeMode, setThemeMode] = useState(() => {
    return localStorage.getItem("themeMode") || "light";
  });

  const darkTheme = () => {
    setThemeMode("dark");
  };

  const lightTheme = () => {
    setThemeMode("light");
  };

  useEffect(() => {
    document.querySelector("html").classList.remove("dark", "light");
    document.querySelector("html").classList.add(themeMode);

    localStorage.setItem("themeMode", themeMode);
  }, [themeMode]);

  return (
    <>
      <Router>
        <ThemeProvider
          value={{ themeMode, darkTheme, lightTheme }}
        >
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dubbing" element={<Dubbing />} />
            <Route path="/subtitle" element={<Subtitle />} />
          </Routes>
          <Footer />
        </ThemeProvider>
      </Router>
    </>
  );
};

export default App;
