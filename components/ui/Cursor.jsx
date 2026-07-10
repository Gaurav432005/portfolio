"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Cursor() {
  const cursor = useRef(null);

  useEffect(() => {
    const cursorEl = cursor.current;

    // Smooth movement
    const xTo = gsap.quickTo(cursorEl, "x", {
      duration: 0.5,
      ease: "power3.out",
    });

    const yTo = gsap.quickTo(cursorEl, "y", {
      duration: 0.5,
      ease: "power3.out",
    });

    const moveCursor = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);


    // Hover animation
    const growCursor = () => {
      gsap.to(cursorEl, {
        scale: 3,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const shrinkCursor = () => {
      gsap.to(cursorEl, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    };


    const hoverElements = document.querySelectorAll(
      "a, button, .cursor-hover"
    );

    hoverElements.forEach((el) => {
      el.addEventListener("mouseenter", growCursor);
      el.addEventListener("mouseleave", shrinkCursor);
    });


    return () => {
      window.removeEventListener("mousemove", moveCursor);

      hoverElements.forEach((el) => {
        el.removeEventListener("mouseenter", growCursor);
        el.removeEventListener("mouseleave", shrinkCursor);
      });
    };
  }, []);


  return (
<div
  ref={cursor}
  className="
    fixed
    top-0
    left-0
    w-5
    h-5
    bg-primary
    mix-blend-difference
    rounded-full
    pointer-events-none
    z-[9999]
    -translate-x-1/2
    -translate-y-1/2
  "
/>
  );
}