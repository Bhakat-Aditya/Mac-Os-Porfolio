import useWindowStore from "#store/window";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import React, { useLayoutEffect, useRef } from "react";

function WindowWrapper(Component, windowKey) {
  const Wrapped = (props) => {
    const { focusWindow, windows } = useWindowStore();
    const { isOpen, zIndex, isMaximized } = windows[windowKey];
    const ref = useRef(null);
    const draggableRef = useRef(null);
    const historyRef = useRef({ left: 0, top: 0, width: 0, height: 0 });

    // 1. Handle Open/Close Animation
    useGSAP(() => {
      const el = ref.current;
      if (!el || !isOpen) return;

      // Reset any leftover styles from previous states
      if (!isMaximized) {
        gsap.set(el, { clearProps: "all" });
      }

      el.style.display = "block";
      gsap.fromTo(
        el,
        { scale: 0.8, opacity: 0, y: 40 },
        { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }
      );
    }, [isOpen]);

    // 2. Initialize Draggable
    useGSAP(() => {
      const el = ref.current;
      if (!el) return;

      const header = el.querySelector("#window-header");

      const [instance] = Draggable.create(el, {
        trigger: header,
        onPress: () => focusWindow(windowKey),
        allowEventDefault: true,
        dragClickables: !isMaximized,
      });
      draggableRef.current = instance;

      return () => instance.kill();
    }, []);

    // 3. Handle Maximize & Restore Animation
    useGSAP(() => {
      const el = ref.current;
      if (!el || !isOpen) return;

      if (isMaximized) {
        // 1. CAPTURE CURRENT STATE
        const rect = el.getBoundingClientRect();
        historyRef.current = {
          left: rect.left,
          top: rect.top,
          width: rect.width,
          height: rect.height,
        };

        draggableRef.current?.disable();

        // 2. LOCK POSITION IN PIXELS (Neutralize CSS classes like -translate-y-1/2)
        // We set the element to fixed position at its current visual location
        gsap.set(el, {
          position: "fixed",
          left: rect.left,
          top: rect.top,
          width: rect.width,
          height: rect.height,
          margin: 0,
          x: 0,
          y: 0,
          transform: "none", // Removes CSS transforms to prevent conflicts
        });

        // 3. ANIMATE TO FULL SCREEN
        gsap.to(el, {
          left: 0,
          top: 0,
          width: "100vw",
          height: "100vh",
          maxWidth: "none", // OVERRIDE Tailwind max-w-2xl/3xl
          maxHeight: "none",
          borderRadius: 0,
          duration: 0.4,
          ease: "power3.inOut",
        });
      } else {
        draggableRef.current?.enable();

        // 4. ANIMATE BACK TO SAVED PIXEL STATE
        gsap.to(el, {
          left: historyRef.current.left,
          top: historyRef.current.top,
          width: historyRef.current.width,
          height: historyRef.current.height,
          borderRadius: "0.75rem", // rounded-xl
          duration: 0.4,
          ease: "power3.inOut",
          // 5. RESET TO CSS CLASSES
          onComplete: () => {
            // Clear all inline styles so Tailwind classes (like left-1/2) take over again
            gsap.set(el, { clearProps: "all" });
            // Ensure display block is kept (gsap clearProps might remove display if it was inline)
            el.style.display = "block";
          },
        });
      }
    }, [isMaximized]);

    useLayoutEffect(() => {
      const el = ref.current;
      if (!el) return;
      el.style.display = isOpen ? "block" : "none";
    }, [isOpen]);

    return (
      <section id={windowKey} ref={ref} style={{ zIndex }} className="absolute">
        <Component {...props} />
      </section>
    );
  };

  Wrapped.displayName = `WindowWrapper(${
    Component.displayName || Component.name || "Component"
  })`;
  return Wrapped;
}

export default WindowWrapper;