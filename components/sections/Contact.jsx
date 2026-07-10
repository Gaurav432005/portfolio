"use client"
import React, { useRef } from 'react'
import Link from 'next/link'
import { FiArrowUpRight } from 'react-icons/fi'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

const Contact = () => {
  const containerRef = useRef(null)
  const socials = [
    { name: 'Instagram', href: 'https://instagram.com/' },
    { name: 'Twitter', href: 'https://twitter.com/' },
    { name: 'LinkedIn', href: 'https://linkedin.com/' },
    { name: 'GitHub', href: 'https://github.com/' },
  ]

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      }
    })

    tl.from(".lets-talk-text", {
      y: "110%",
      duration: 1.2,
      ease: "power4.out",
      stagger: 0.1,
    })
    
    .from(".top-reveal", {
      y: 30,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power3.out",
    }, "-=1")

    .from(".social-link", {
      y: 20,
      opacity: 0,
      duration: 0.8,
      stagger: 0.05,
      ease: "power3.out",
    }, "-=0.8")

    .from(".footer-reveal", {
      y: 20,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power3.out",
    }, "-=0.8")

  }, { scope: containerRef })

  return (
    <section 
      ref={containerRef}
      // Reverted to Dark Theme: bg-[#0a0a0a] and text-[#f1f1f1]
      className="min-h-[100svh] bg-[#0a0a0a] text-[#f1f1f1] px-6 md:px-12 pt-32 pb-8 flex flex-col justify-between overflow-hidden relative z-10"
    >
      
      {/* Top Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 md:gap-0">
        
        {/* Email Block */}
        <div className="flex flex-col gap-2 w-full">
          <span className="top-reveal text-xs md:text-sm text-accent font-semibold uppercase tracking-widest">
            [ Got something in mind? ]
          </span>

          <Link
            href="mailto:gauravxgrewal@gmail.com"
            // Mobile ke liye fluid typography (text-[6vw]) maintain ki hai
            className="top-reveal text-[6vw] sm:text-2xl md:text-4xl font-space font-bold tracking-tighter transition-colors group flex items-center gap-1 hover:text-accent w-fit"
          >
            gauravxgrewal@gmail.com
             <FiArrowUpRight
               className="opacity-0 -translate-y-2 translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 text-accent hidden sm:block"
               size={24}
             />
          </Link>
        </div>

        {/* Socials Block */}
        <div className="grid grid-cols-2 md:flex md:gap-10 gap-x-8 gap-y-6 w-full md:w-auto">
          {socials.map((social) => (
            <Link
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link group flex items-center gap-1 text-sm md:text-base font-space font-bold uppercase tracking-widest hover:text-accent transition-colors duration-300"
            >
              <span>{social.name}</span>
              <FiArrowUpRight
                className="opacity-0 -translate-y-1 translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 text-accent hidden sm:block"
                size={16}
              />
            </Link>
          ))}
        </div>
      </div>

      {/* Massive "LET'S TALK" Header */}
      {/* Dark theme border applied (border-white/10) */}
      <div className="w-full text-center border-b border-white/10 pb-8 mt-20 md:mt-auto mb-8">
        <h1 className="text-[22vw] md:text-[14vw] font-space font-black tracking-tighter leading-[0.8] uppercase flex flex-col md:flex-row justify-center items-center md:gap-[3vw]">
          <span className="overflow-hidden inline-block pb-2 pr-4">
            <span className="inline-block lets-talk-text">LET&apos;S</span>
          </span>
          <span className="overflow-hidden inline-block pb-2">
            <span className="inline-block lets-talk-text text-accent">TALK</span>
          </span>
        </h1>
      </div>

      {/* Bottom Footer Details */}
      <div className="flex flex-col md:flex-row justify-between items-center text-[10px] md:text-xs text-gray-500 font-semibold uppercase tracking-widest gap-6 md:gap-0">
        <span className="footer-reveal text-center">© 2026 Gaurav Portfolio</span>
        
        <span className="footer-reveal flex items-center gap-2">
           <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
           Local Time: Haryana, India
        </span>
        
        <span className="footer-reveal text-center">Made with Next.js & GSAP</span>
      </div>
    </section>
  )
}

export default Contact