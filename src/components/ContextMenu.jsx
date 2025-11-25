import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef, useState, useEffect } from "react";
import useWallpaperStore from "#store/wallpaper"; 

function ContextMenu() {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef(null);
  
  // Get the action from the store to cycle wallpapers
  const { setNextWallpaper } = useWallpaperStore();

  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault();
      // Basic boundary detection to keep menu on screen
      const x = e.clientX > window.innerWidth - 200 ? e.clientX - 200 : e.clientX;
      const y = e.clientY > window.innerHeight - 300 ? e.clientY - 200 : e.clientY;
      
      setPosition({ x, y });
      setVisible(true);
    };

    const handleClick = () => setVisible(false);

    window.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  useGSAP(() => {
    if (visible) {
      gsap.fromTo(
        menuRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.1, ease: "power2.out" }
      );
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      ref={menuRef}
      className="fixed z-[9999] w-52 bg-white/80 dark:bg-[#1e1e1e]/90 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl py-1.5 text-sm text-gray-700 dark:text-gray-200 select-none"
      style={{ top: position.y, left: position.x }}
    >
      <MenuItem label="New Folder" onClick={() => alert("Folder creation is disabled.")} />
      
      <div className="h-px bg-gray-300 dark:bg-gray-700 my-1 mx-2" />
      
      <MenuItem label="Get Info" onClick={() => alert("Aditya's Portfolio\nVersion 1.0\nBuilt with React + Vite")} />
      
      <MenuItem label="Change Wallpaper" onClick={setNextWallpaper} />
      
      <div className="h-px bg-gray-300 dark:bg-gray-700 my-1 mx-2" />
      
      <MenuItem label="Refresh" onClick={() => window.location.reload()} />
    </div>
  );
}

const MenuItem = ({ label, onClick }) => (
  <div
    onClick={onClick}
    className="px-4 py-1.5 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-600 cursor-default transition-colors"
  >
    {label}
  </div>
);

export default ContextMenu;