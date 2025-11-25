import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef, useState, useEffect } from "react";
import useWallpaperStore from "#store/wallpaper"; // Import the new store

function ContextMenu() {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef(null);
  
  // Get the action from the store
  const { setNextWallpaper } = useWallpaperStore();

  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault();
      setPosition({ x: e.clientX, y: e.clientY });
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

  // ... existing GSAP code ...

  if (!visible) return null;

  return (
    <div
      ref={menuRef}
      className="fixed z-[9999] w-48 bg-white/80 backdrop-blur-xl border border-gray-200 rounded-lg shadow-xl py-1 text-sm text-gray-700 select-none"
      style={{ top: position.y, left: position.x }}
    >
      <MenuItem label="New Folder" />
      <div className="h-px bg-gray-300 my-1 mx-2" />
      <MenuItem label="Get Info" />
      
      {/* Connect the function here */}
      <MenuItem label="Change Wallpaper" onClick={setNextWallpaper} />
      
      <div className="h-px bg-gray-300 my-1 mx-2" />
      <MenuItem label="Refresh" onClick={() => window.location.reload()} />
    </div>
  );
}

const MenuItem = ({ label, onClick }) => (
  <div
    onClick={onClick}
    className="px-4 py-1 hover:bg-blue-500 hover:text-white cursor-pointer transition-colors"
  >
    {label}
  </div>
);

export default ContextMenu;