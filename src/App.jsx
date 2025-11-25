import React, { useState } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import clsx from "clsx";

import useWallpaperStore from "#store/wallpaper"; 
import useThemeStore from "#store/theme"; // Import Theme Store

import { Dock, Home, Navbar, Welcome, Boot, ContextMenu } from "#components";
import { Safari, Terminal, Resume, Finder, Text, Image, Contact, Photos } from "#windows";

gsap.registerPlugin(Draggable);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { wallpapers, activeIndex } = useWallpaperStore();
  const { isDark } = useThemeStore(); // Use Theme Store
  const currentWallpaper = wallpapers[activeIndex];

  return (
    <div 
      // Apply 'dark' class if isDark is true
      className={clsx(
        "w-screen h-screen overflow-hidden bg-center bg-cover no-repeat transition-all duration-700 ease-in-out",
        isDark && "dark"
      )}
      style={{ backgroundImage: `url(${currentWallpaper})` }}
    >
      {isLoading ? (
        <Boot onComplete={() => setIsLoading(false)} />
      ) : (
        <div className="animate-fade-in w-full h-full relative text-gray-900 dark:text-gray-100">
          <Navbar />
          <Welcome />
          
          <Home />
          <Dock />
          <ContextMenu />

          <Terminal />
          <Safari />
          <Resume />
          <Finder />
          <Text />
          <Image />
          <Contact />
          <Photos />
        </div>
      )}
    </div>
  );
}

export default App;