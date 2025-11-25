import { navIcons, navLinks } from "#constants";
import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import useWindowStore from "#store/window";
import useThemeStore from "#store/theme"; // Import Theme Store
import { Moon, Sun } from "lucide-react";

function Navbar() {
  const { openWindow } = useWindowStore();
  const { isDark, toggleTheme } = useThemeStore(); // Destructure
  const [time, setTime] = useState(dayjs());

  useEffect(() => {
    const interval = setInterval(() => setTime(dayjs()), 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="dark:bg-black/40 dark:text-white transition-colors">
      <div>
        <img src="/images/logo.svg" alt="logo" />
        <p className="font-bold">Aditya's Portfolio</p>

        <ul>
          {navLinks.map(({ id, name, type }) => (
            <li key={id} onClick={() => openWindow(type)}>
              <p>{name}</p>
            </li>
          ))}
        </ul>
      </div>
      <div>
        {/* Toggle Button */}
        <button 
            onClick={toggleTheme} 
            className="p-1 rounded-md hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
            title="Toggle Dark Mode"
        >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <ul>
          {navIcons.map(({ id, img }) => (
            <li key={id}>
              <img src={img} className="icon-hover dark:invert" alt={`icon-${id}`} />
            </li>
          ))}
        </ul>
        <time>{time.format("ddd D MMM h:mm A")}</time>
      </div>
    </nav>
  );
}

export default Navbar;