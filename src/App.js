import React, { useState, useEffect } from "react";
import TodoList from "./TodoList";
import "./styles.css";

const App = () => {
  const [language, setLanguage] = useState("fa");
  const [theme, setTheme] = useState("light");
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [music, setMusic] = useState(null);

  const backgrounds = [
    "/assets/images/bg1.jpg",
    "/assets/images/bg2.jpg",
    "/assets/images/bg3.jpg",
    "/assets/images/bg4.jpg",
    "/assets/images/bg5.jpg",
    "/assets/images/bg6.jpg",
  ];

  const musicList = [
    { name: "آرامش ۱", url: "/assets/music/calm1.mp3" },
    { name: "آرامش ۲", url: "/assets/music/calm2.mp3" },
    { name: "آرامش ۳", url: "/assets/music/calm3.mp3" },
    { name: "آرامش ۴", url: "/assets/music/calm4.mp3" },
    { name: "آرامش ۵", url: "/assets/music/calm5.mp3" },
    { name: "آرامش ۶", url: "/assets/music/calm6.mp3" },
    { name: "آرامش ۷", url: "/assets/music/calm7.mp3" },
    { name: "آرامش ۸", url: "/assets/music/calm8.mp3" },
    { name: "آرامش ۹", url: "/assets/music/calm9.mp3" },
    { name: "آرامش ۱۰", url: "/assets/music/calm10.mp3" },
  ];

  const texts = {
    fa: {
      title: "لیست وظایف استاد",
      add: "اضافه کردن",
      placeholder: "وظیفه جدید...",
      langButton: "تغییر به انگلیسی",
      themeLabel: "تم:",
      musicLabel: "موسیقی بی‌کلام:",
      calendarLabel: "تقویم",
      progressLabel: "پیشرفت امروز",
    },
    en: {
      title: "Professor Todo List",
      add: "Add Task",
      placeholder: "New task...",
      langButton: "Switch to Persian",
      themeLabel: "Theme:",
      musicLabel: "Background Music:",
      calendarLabel: "Calendar",
      progressLabel: "Today’s Progress",
    },
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundIndex((prev) => (prev + 1) % backgrounds.length);
    }, 5 * 60 * 1000); // ۵ دقیقه
    return () => clearInterval(interval);
  }, [backgrounds.length]);

  const toggleLanguage = () => setLanguage(language === "fa" ? "en" : "fa");
  const changeTheme = (e) => setTheme(e.target.value);
  const changeMusic = (e) => setMusic(e.target.value);

  return (
    <div
      className={`container-fluid p-4 theme-${theme}`}
      style={{
        backgroundImage: `url(${backgrounds[backgroundIndex]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        fontFamily:
          language === "fa" ? "'Vazir', sans-serif" : "'Roboto', sans-serif",
      }}
      dir={language === "fa" ? "rtl" : "ltr"}
    >
      <div className="row">
        {/* نوار پیشرفت و تقویم در سمت چپ */}
        <div
          className="col-md-2 position-fixed top-0 start-0 p-3"
          style={{ zIndex: 1000 }}
        >
          <button
            className="btn btn-outline-primary w-100 mb-3"
            onClick={toggleLanguage}
          >
            {texts[language].langButton}
          </button>
          <div className="card p-2 shadow-sm mb-3">
            <h6>{texts[language].progressLabel}</h6>
            <TodoList
              language={language}
              texts={texts}
              selectedDate={selectedDate}
              showProgress
            />
          </div>
          {/* تقویم زیر نوار پیشرفت */}
          <div className="card p-3 shadow-sm position-fixed bottom-0 start-0 p-3">
            <h5 className="text-center">{texts[language].calendarLabel}</h5>
            <input
              type="date"
              className="form-control"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
        </div>

        {/* بخش اصلی */}
        <div className="col-md-8 offset-md-2">
          <h1 className="text-center mb-4">{texts[language].title}</h1>

          {language === "en" && (
            <div className="row mb-4">
              <div className="col-md-6">
                <label className="form-label">
                  {texts[language].themeLabel}
                </label>
                <select
                  className="form-select"
                  value={theme}
                  onChange={changeTheme}
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="calm">Calm</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">
                  {texts[language].musicLabel}
                </label>
                <select
                  className="form-select"
                  value={music || ""}
                  onChange={changeMusic}
                >
                  <option value="">No Music</option>
                  {musicList.map((track, index) => (
                    <option key={index} value={track.url}>
                      {language === "fa" ? track.name : `Calm ${index + 1}`}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          <TodoList
            language={language}
            texts={texts}
            selectedDate={selectedDate}
          />
          {music && <audio src={music} autoPlay loop />}
        </div>
      </div>
    </div>
  );
};

export default App;
