import { dockApps, locations, socials } from "#constants";
import useLocationStore from "#store/location";
import useWindowStore from "#store/window";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { AppWindow, ExternalLink, Folder, Search } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

function Spotlight() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  
  const { openWindow } = useWindowStore();
  const { setActiveLocation } = useLocationStore();

  // 1. Flatten all searchable items into a single list
  const allItems = [
    ...dockApps.filter(app => app.canOpen).map(app => ({ ...app, type: "app", label: "Application" })),
    ...(locations.work?.children || []).map(proj => ({ ...proj, type: "project", label: "Project" })),
    ...socials.map(social => ({ ...social, name: social.text, type: "link", label: "Social" }))
  ];

  // 2. Filter items based on search query
  const filteredItems = allItems.filter(item => 
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  // 3. Handle Keyboard Shortcut (Cmd+K or Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // 4. Handle Input Focus when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  // 5. GSAP Animation for Open/Close
  useGSAP(() => {
    if (isOpen) {
      gsap.fromTo(containerRef.current, 
        { y: 20, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.2, ease: "power2.out" }
      );
    }
  }, [isOpen]);

  // 6. Handle Item Selection
  const handleSelect = (item) => {
    setIsOpen(false);
    if (item.type === "app") {
      openWindow(item.id);
    } else if (item.type === "project") {
      setActiveLocation(item);
      openWindow("finder");
    } else if (item.type === "link") {
      window.open(item.link, "_blank");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-[20vh] bg-black/20 backdrop-blur-sm" onClick={() => setIsOpen(false)}>
      <div 
        ref={containerRef}
        className="w-full max-w-xl bg-white/80 dark:bg-[#1e1e1e]/90 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Bar */}
        <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-200 dark:border-gray-700">
          <Search className="w-6 h-6 text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Spotlight Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-xl outline-none text-gray-800 dark:text-white placeholder:text-gray-400 font-light"
          />
          <span className="text-xs text-gray-400 border border-gray-300 dark:border-gray-600 px-2 py-0.5 rounded">ESC</span>
        </div>

        {/* Results List */}
        {filteredItems.length > 0 ? (
          <ul className="max-h-[400px] overflow-y-auto py-2">
            {filteredItems.map((item, index) => (
              <li 
                key={`${item.type}-${item.id || index}`}
                onClick={() => handleSelect(item)}
                className="flex items-center gap-3 px-4 py-3 hover:bg-blue-500 hover:text-white cursor-pointer group transition-colors"
              >
                {/* Icon Logic */}
                <div className="w-8 h-8 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-500 group-hover:bg-white/20 group-hover:text-white">
                  {item.type === "app" && <img src={`/images/${item.icon}`} alt={item.name} className="w-5 h-5" />}
                  {item.type === "project" && <Folder className="w-5 h-5" />}
                  {item.type === "link" && <ExternalLink className="w-5 h-5" />}
                </div>

                {/* Text */}
                <div className="flex-1">
                  <p className="text-base font-medium text-gray-800 dark:text-gray-200 group-hover:text-white">{item.name}</p>
                  <p className="text-xs text-gray-400 group-hover:text-blue-100">{item.label}</p>
                </div>

                {/* Action Hint */}
                <span className="text-xs text-gray-400 opacity-0 group-hover:opacity-100 group-hover:text-white transition-opacity">Enter to open</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-8 text-center text-gray-400 text-sm">
            No results found for "{query}"
          </div>
        )}
      </div>
    </div>
  );
}

export default Spotlight;