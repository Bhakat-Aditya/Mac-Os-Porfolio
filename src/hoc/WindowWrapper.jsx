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
    // Store original state (position & size) before maximizing
    const historyRef = useRef({ x: 0, y: 0, width: 0, height: 0 });

    // 1. Handle Open/Close Animation
    useGSAP(() => {
      const el = ref.current;
      if (!el || !isOpen) return;

      // FIX: Ensure window is reset to default state when opening
      // This fixes the issue where closing a maximized window and reopening it keeps it huge
      if (!isMaximized) {
        gsap.set(el, { clearProps: "width,height,top,left,x,y,borderRadius" });
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

      const [instance] = Draggable.create(el, {
        onPress: () => focusWindow(windowKey),
        allowEventDefault: true,
        // Only allow dragging if not maximized
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
        // RECORD current state
        const rect = el.getBoundingClientRect();
        const currentX = gsap.getProperty(el, "x");
        const currentY = gsap.getProperty(el, "y");
        
        historyRef.current = { 
            x: currentX, 
            y: currentY, 
            width: rect.width, 
            height: rect.height 
        };

        draggableRef.current?.disable();

        // Calculate offset to move visual position to (0,0)
        // The element is currently at rect.left, rect.top
        // We want to move it by -rect.left, -rect.top relative to its CURRENT transform
        // Formula: NewX = CurrentX - VisualLeftOffset
        const xOffset = currentX - rect.left;
        const yOffset = currentY - rect.top;

        gsap.to(el, {
          x: xOffset,
          y: yOffset,
          width: "100vw",
          height: "100vh",
          borderRadius: 0,
          duration: 0.4,
          ease: "power3.inOut",
        });
      } else {
        draggableRef.current?.enable();

        // RESTORE to previous state
        gsap.to(el, {
          x: historyRef.current.x,
          y: historyRef.current.y,
          width: historyRef.current.width, // Animate back to original px width
          height: historyRef.current.height,
          borderRadius: "0.75rem",
          duration: 0.4,
          ease: "power3.inOut",
          // IMPORTANT: Once animation is done, remove inline styles so CSS classes take over (responsiveness)
          onComplete: () => {
             gsap.set(el, { clearProps: "width,height" });
          }
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