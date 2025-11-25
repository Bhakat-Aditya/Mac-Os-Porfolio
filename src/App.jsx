import React, { useState } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

// Import Boot from your components index
import { Dock, Home, Navbar, Welcome, Boot } from "#components";
import { Safari, Terminal, Resume, Finder, Text, Image, Contact, Photos } from "#windows";

gsap.registerPlugin(Draggable);

function App() {
  // State to track if the boot sequence is active
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading ? (
        // Show Boot Screen -> passes false to state when animation ends
        <Boot onComplete={() => setIsLoading(false)} />
      ) : (
        // Show Desktop Interface
        <div className="animate-fade-in"> {/* Optional: Add a fade-in class if you want */}
          <Navbar />
          <Welcome />
          <Dock />

          <Terminal />
          <Safari />
          <Resume />
          <Finder />
          <Text />
          <Image />
          <Contact />
          <Photos />
          <Home />
        </div>
      )}
    </>
  );
}

export default App;