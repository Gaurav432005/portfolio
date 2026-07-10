"use client"
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { FiDownload, FiMenu, FiX } from "react-icons/fi";

// ScrollTrigger ko register karna zaroori hai
gsap.registerPlugin(ScrollTrigger);

const NavItem = ({ href, children, onClick }) => (
  <Link
    href={href}
    onClick={onClick}
    className="text-3xl md:text-xl tracking-[-0.1rem] uppercase font-semibold transition-all duration-300 relative group text-[#111111]"
  >
    {children}
    <span className="block w-0 h-px bg-[#111111] rounded absolute bottom-0 left-0 group-hover:w-full transition-all duration-500"></span>
  </Link>
);

const ResumeButton = ({ fileUrl }) => (
  <a
    href={fileUrl}
    download="Gaurav_Resume.pdf"
    className="text-3xl md:text-xl tracking-[-0.1rem] uppercase font-semibold relative group block overflow-hidden min-w-[85px] text-center text-[#111111]"
  >
    <span className="block transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
      Resume
    </span>
    
    <span className="absolute top-0 left-0 w-full h-full flex items-center justify-center transition-transform duration-300 ease-in-out translate-y-full group-hover:translate-y-0">
      <FiDownload className="text-3xl md:text-2xl" />
    </span>
    
    <span className="block w-0 h-px bg-[#111111] rounded absolute bottom-0 left-0 group-hover:w-full transition-all duration-500 delay-100"></span>
  </a>
);

const Nav = ({ isPreloaded }) => {
  const headerRef = useRef(null);
  const navTl = useRef();
  const menuTl = useRef();
  const [isOpen, setIsOpen] = useState(false);
  
  // Mobile menu open hai ya nahi, ise GSAP ke andar track karne ke liye ref banaya hai
  const isOpenRef = useRef(isOpen);

  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  useGSAP(() => {
    // 1. Initial Nav Load Animation
    navTl.current = gsap.timeline({ paused: true });
    
    navTl.current.from(".nav-bar", {
      y: -100,
      duration: 1.5,
      opacity: 0,
      ease: 'power4.inOut',
    });

    // 2. Mobile Menu Reveal Animation (Clip-Path Shutter)
    menuTl.current = gsap.timeline({ paused: true });
    
    menuTl.current.to(".mobile-overlay", {
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 0.8,
      ease: "power4.inOut",
    })
    .from(".mobile-item", {
      y: 40,
      opacity: 0,
      stagger: 0.1,
      duration: 0.6,
      ease: "power3.out"
    }, "-=0.4");

    // 3. Smart Navbar (Hide on Scroll Down, Show on Scroll Up)
    ScrollTrigger.create({
      start: "top -80", // Jab 80px scroll ho jaye tab ye logic start hoga
      onUpdate: (self) => {
        // Agar mobile menu khula hai, toh Nav ko hide mat karo
        if (isOpenRef.current) return;

        if (self.direction === 1) {
          // self.direction 1 matlab user NEECHE scroll kar raha hai -> Hide
          gsap.to(headerRef.current, { yPercent: -100, duration: 0.4, ease: "power3.out", overwrite: "auto" });
        } else {
          // self.direction -1 matlab user UPAR scroll kar raha hai -> Show
          gsap.to(headerRef.current, { yPercent: 0, duration: 0.4, ease: "power3.out", overwrite: "auto" });
        }
      }
    });

  }, { scope: headerRef });

  // Play Initial Animation
  useEffect(() => {
    if (isPreloaded && navTl.current) {
        navTl.current.play();
    }
  }, [isPreloaded]);

  // Toggle Mobile Menu Animation
  useEffect(() => {
    if (isOpen) {
        document.body.style.overflow = 'hidden';
        menuTl.current.play();
    } else {
        document.body.style.overflow = 'unset';
        menuTl.current.reverse();
    }
  }, [isOpen]);

  return (
    <header ref={headerRef} className="fixed top-0 left-0 w-full z-50">
      
      {/* Top Navbar */}
      <nav className="nav-bar relative w-full flex justify-between items-center py-6 px-6 md:px-12 bg-[#f5f5f5]/80 backdrop-blur-md z-50">
        
        {/* Logo */}
        <div className="z-50">
            <NavItem href="/" onClick={() => setIsOpen(false)}>Gaurav</NavItem>
        </div>
        
        {/* Desktop Links */}
        <div className="hidden md:flex gap-4 items-center">
          <NavItem href="/">Work</NavItem>
          <span className="text-gray-400">/</span>
          <NavItem href="/">About</NavItem>
          <span className="text-gray-400">/</span>
          <NavItem href="/">Contact</NavItem>
        </div>
        
        {/* Desktop Resume Button */}
        <div className="hidden md:block">
            <ResumeButton fileUrl="/resume.pdf" />
        </div>

        {/* Mobile Hamburger Button */}
        <button 
            className="md:hidden z-50 text-3xl text-[#111111] transition-transform duration-300 hover:scale-110"
            onClick={() => setIsOpen(!isOpen)}
        >
            {isOpen ? <FiX /> : <FiMenu />}
        </button>

      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className="mobile-overlay absolute top-0 left-0 w-full h-screen bg-[#f5f5f5] flex flex-col justify-center items-center gap-10 md:hidden z-40" 
        style={{ clipPath: "inset(0% 0% 100% 0%)" }}
      >
        <div className="mobile-item">
            <NavItem href="/" onClick={() => setIsOpen(false)}>Work</NavItem>
        </div>
        <div className="mobile-item">
            <NavItem href="/" onClick={() => setIsOpen(false)}>About</NavItem>
        </div>
        <div className="mobile-item">
            <NavItem href="/" onClick={() => setIsOpen(false)}>Contact</NavItem>
        </div>
        <div className="mobile-item mt-8">
            <ResumeButton fileUrl="/resume.pdf" />
        </div>
      </div>

    </header>
  );
};

export default Nav;