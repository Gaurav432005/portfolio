"use client"
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef, useEffect, useState } from "react";
import { FiDownload, FiMenu, FiX } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const NavItem = ({ href, children, onClick, isActive }) => (
  <a
    href={href}
    onClick={onClick}
    className={`text-3xl md:text-xl tracking-[-0.1rem] uppercase font-semibold transition-all duration-300 relative group text-[#111111]`}
  >
    {children}
    <span className={`block h-px bg-secondary rounded absolute bottom-0 left-0 transition-all duration-500 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
  </a>
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
  const [activeId, setActiveId] = useState('');
  
  const isOpenRef = useRef(isOpen);

  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  useEffect(() => {
    const ids = ['work', 'about', 'contact', 'skills', 'home'];
    const observerOptions = { root: null, rootMargin: '0px 0px -60% 0px', threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    }, observerOptions);

    ids.forEach((id) => {
      const el = document.getElementById(id) || document.querySelector(`[data-section="${id}"]`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useGSAP(() => {
    navTl.current = gsap.timeline({ paused: true });
    
    navTl.current.from(".nav-bar", {
      y: -100,
      duration: 1.5,
      opacity: 0,
      ease: 'power4.inOut',
    });

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

    ScrollTrigger.create({
      start: "top -80",
      onUpdate: (self) => {
        if (isOpenRef.current) return;

        if (self.direction === 1) {
          gsap.to(headerRef.current, { yPercent: -100, duration: 0.4, ease: "power3.out", overwrite: "auto" });
        } else {
          gsap.to(headerRef.current, { yPercent: 0, duration: 0.4, ease: "power3.out", overwrite: "auto" });
        }
      }
    });

  }, { scope: headerRef });

  useEffect(() => {
    if (isPreloaded && navTl.current) {
        navTl.current.play();
    }
  }, [isPreloaded]);

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
      
      <nav className="nav-bar relative w-full flex justify-between items-center py-6 px-6 md:px-12 bg-[#f5f5f5]/80 backdrop-blur-md z-50">
        
        <div className="z-50">
          <NavItem href="#home" onClick={(e) => { e.preventDefault(); const el = document.getElementById('home') || document.body; el && el.scrollIntoView({ behavior: 'smooth' }); setIsOpen(false); }} isActive={activeId === 'home'}>Gaurav</NavItem>
        </div>
        
        <div className="hidden md:flex gap-2 items-center">
          <NavItem href="#work" onClick={(e) => { e.preventDefault(); const el = document.getElementById('work') || document.querySelector('[data-section="work"]'); el && el.scrollIntoView({ behavior: 'smooth' }); setIsOpen(false); }} isActive={activeId === 'work'}>Work</NavItem>
          <span className="text-gray-400">/</span>
          <NavItem href="#about" onClick={(e) => { e.preventDefault(); const el = document.getElementById('about') || document.querySelector('[data-section="about"]'); el && el.scrollIntoView({ behavior: 'smooth' }); setIsOpen(false); }} isActive={activeId === 'about'}>About</NavItem>
          <span className="text-gray-400">/</span>
          <NavItem href="#contact" onClick={(e) => { e.preventDefault(); const el = document.getElementById('contact') || document.querySelector('[data-section="contact"]'); el && el.scrollIntoView({ behavior: 'smooth' }); setIsOpen(false); }} isActive={activeId === 'contact'}>Contact</NavItem>
        </div>
        
        <div className="hidden md:block">
            <ResumeButton fileUrl="/resume.pdf" />
        </div>

        <button 
            className="md:hidden z-50 text-3xl text-[#111111] transition-transform duration-300 hover:scale-110"
            onClick={() => setIsOpen(!isOpen)}
        >
            {isOpen ? <FiX /> : <FiMenu />}
        </button>

      </nav>

      <div 
        className="mobile-overlay absolute top-0 left-0 w-full h-screen bg-[#f5f5f5] flex flex-col justify-center items-center gap-10 md:hidden z-40" 
        style={{ clipPath: "inset(0% 0% 100% 0%)" }}
      >
        <div className="mobile-item">
            <NavItem href="#work" onClick={(e) => { e.preventDefault(); const el = document.getElementById('work') || document.querySelector('[data-section="work"]'); el && el.scrollIntoView({ behavior: 'smooth' }); setIsOpen(false); }} isActive={activeId === 'work'}>Work</NavItem>
        </div>
        <div className="mobile-item">
            <NavItem href="#about" onClick={(e) => { e.preventDefault(); const el = document.getElementById('about') || document.querySelector('[data-section="about"]'); el && el.scrollIntoView({ behavior: 'smooth' }); setIsOpen(false); }} isActive={activeId === 'about'}>About</NavItem>
        </div>
        <div className="mobile-item">
            <NavItem href="#contact" onClick={(e) => { e.preventDefault(); const el = document.getElementById('contact') || document.querySelector('[data-section="contact"]'); el && el.scrollIntoView({ behavior: 'smooth' }); setIsOpen(false); }} isActive={activeId === 'contact'}>Contact</NavItem>
        </div>
        <div className="mobile-item mt-8">
            <ResumeButton fileUrl="/resume.pdf" />
        </div>
      </div>

    </header>
  );
};

export default Nav;