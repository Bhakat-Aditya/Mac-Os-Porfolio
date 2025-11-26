import React, { useState } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import clsx from "clsx";

import useWallpaperStore from "#store/wallpaper";
import useThemeStore from "#store/theme";

import {
  Dock,
  Home,
  Navbar,
  Welcome,
  Boot,
  ContextMenu,
  Spotlight,
  Login,
} from "#components";
import {
  Safari,
  Terminal,
  Resume,
  Finder,
  Text,
  Image,
  Contact,
  Photos,
} from "#windows";

gsap.registerPlugin(Draggable);

function App() {
  
  const [isBooting, setIsBooting] = useState(true);
  const [isLocked, setIsLocked] = useState(true);

  const { wallpapers, activeIndex } = useWallpaperStore();
  const { isDark } = useThemeStore();

  
  if (isBooting) {
    return <Boot onComplete={() => setIsBooting(false)} />;
  }

  if (isLocked) {
    return <Login onUnlock={() => setIsLocked(false)} />;
  }

  
  return (
    <div
      className={clsx(
        "w-screen h-screen overflow-hidden relative",
        isDark && "dark"
      )}
    >
      {/* --- WALLPAPER LAYERS (The Fix) --- */}
      <div className="absolute inset-0 w-full h-full z-0">
        {wallpapers.map((bg, index) => (
          <div
            key={index}
            className={clsx(
              "absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out",
              index === activeIndex ? "opacity-100" : "opacity-0"
            )}
            style={{ backgroundImage: `url(${bg})` }}
          />
        ))}
      </div>

      {/* --- DESKTOP CONTENT (z-index 10 ensures it sits ABOVE wallpapers) --- */}
      <div className="animate-fade-in w-full h-full relative z-10 text-gray-900 dark:text-gray-100">
        <Navbar />
        <Welcome />

        <Home />
        <Dock />
        <ContextMenu />
        <Spotlight />

        {/* Windows */}
        <Terminal />
        <Safari />
        <Resume />
        <Finder />
        <Text />
        <Image />
        <Contact />
        <Photos />
      </div>
    </div>
  );
}

export default App;
