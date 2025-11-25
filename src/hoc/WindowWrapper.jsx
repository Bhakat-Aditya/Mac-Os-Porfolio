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

      if (!isMaximized) {
        gsap.set(el, { clearProps: "all" });
      }

      // FIX: Changed 'block' to 'flex' to preserve layout
      el.style.display = "flex"; 
      
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
        const rect = el.getBoundingClientRect();
        historyRef.current = {
          left: rect.left,
          top: rect.top,
          width: rect.width,
          height: rect.height,
        };

        draggableRef.current?.disable();

        gsap.set(el, {
          position: "fixed",
          left: rect.left,
          top: rect.top,
          width: rect.width,
          height: rect.height,
          margin: 0,
          x: 0,
          y: 0,
          transform: "none",
        });

        gsap.to(el, {
          left: 0,
          top: 0,
          width: "100vw",
          height: "100vh",
          maxWidth: "none",
          maxHeight: "none",
          borderRadius: 0,
          duration: 0.4,
          ease: "power3.inOut",
        });
      } else {
        draggableRef.current?.enable();

        gsap.to(el, {
          left: historyRef.current.left,
          top: historyRef.current.top,
          width: historyRef.current.width,
          height: historyRef.current.height,
          borderRadius: "0.75rem",
          duration: 0.4,
          ease: "power3.inOut",
          onComplete: () => {
            gsap.set(el, { clearProps: "all" });
            // FIX: Ensure display stays as 'flex' after animation resets
            el.style.display = "flex"; 
          },
        });
      }
    }, [isMaximized]);

    useLayoutEffect(() => {
      const el = ref.current;
      if (!el) return;
      // FIX: Use 'flex' here as well
      el.style.display = isOpen ? "flex" : "none"; 
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