import React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function Boot({ onComplete }) {
  useGSAP(() => {
    // 1. Timeline for the boot sequence
    const tl = gsap.timeline({
      onComplete: () => {
        // 2. Fade out the black screen when done
        gsap.to("#boot-screen", {
          opacity: 0,
          duration: 0.5,
          onComplete: onComplete, // Tell App.jsx we are done
        });
      },
    });

    // 3. Animate the white progress bar filling up
    tl.to(".progress-bar", {
      width: "200px",
      duration: 2.5,
      ease: "power1.inOut",
    });
  }, []);

  return (
    <div
      id="boot-screen"
      className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center select-none"
    >
      {/* Your Custom Logo */}
      <img 
        src="/macbook.png" 
        alt="MacBook Logo" 
        className="w-24 h-24 mb-10 object-contain" 
      />

      {/* Progress Bar Container (Dark Gray) */}
      <div className="w-[200px] h-1.5 bg-gray-800 rounded-full overflow-hidden">
        {/* Progress Bar Fill (White) */}
        <div className="progress-bar h-full w-0 bg-white rounded-full" />
      </div>
    </div>
  );
}

export default Boot;