"use client"
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger, SplitText } from 'gsap/all'
import React, { useRef } from 'react'
import { GoDotFill } from 'react-icons/go'
import { BsStars } from 'react-icons/bs'

const About = () => {
    const container = useRef();
    const marqueeRef = useRef();

    useGSAP(() => {
        gsap.registerPlugin(SplitText, ScrollTrigger);

        // 1. Infinite Marquee Animation
        gsap.to('.marquee-part', {
            xPercent: -100,
            repeat: -1,
            duration: 5,
            ease: "linear",
        }).totalProgress(0.5); 

        // 2. Heading SplitText Setup
        const headingSplit = new SplitText('.about-heading', { type: "words, chars" });
        const paraSplit = new SplitText('.about-para', { type: "lines" });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container.current,
                start: 'top 70%', 
            },
        });

        // Massive Background Text Fade (Light mode stroke)
        tl.to('.bg-text', {
            opacity: 0.05, // Halka dark stroke visible hoga
            duration: 1.5,
            ease: 'power2.out'
        })
        // Heading words popping in (Dark color me fill hoga)
        .to(headingSplit.words, {
            color: "#111111", // Deep dark color for light theme
            stagger: 0.05,
            duration: 0.8,
            ease: 'power3.out'
        }, "-=1")
        // Paragraph lines reveal
        .from(paraSplit.lines, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out'
        }, "-=0.4")
        // Stats Cards Fade Up
        .from('.stat-card', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out'
        }, "-=0.6");

        // 3. Stats Number Counter
        const numbers = gsap.utils.toArray('.stat-num');
        numbers.forEach((num) => {
            gsap.from(num, {
                textContent: "0",
                duration: 2.5,
                ease: "power3.out",
                snap: { textContent: 1 },
                scrollTrigger: {
                    trigger: container.current,
                    start: 'top 60%',
                }
            });
        });

        // 4. Spinning Star Icon
        gsap.to('.spin-star', {
            rotate: 360,
            repeat: -1,
            duration: 8,
            ease: "linear"
        });

        return () => {
            headingSplit.revert();
            paraSplit.revert();
        };
    }, { scope: container })

    const stats = [
        { label: 'DIGITAL PRODUCTS', num: 40, suffix: '+' },
        { label: 'IN THE TRENCHES', num: 3, suffix: '+ YRS' },
        { label: 'GIT PUSHES', num: 2000, suffix: '+' },
        { label: 'PIXELS PERFECTED', num: 1, suffix: 'M+' },
    ]

    return (
        // Light background base (#f5f5f5 ya pure white replace kar sakte ho)
        <div ref={container} className='min-h-screen relative bg-[#f5f5f5] flex flex-col justify-center overflow-hidden pb-24'>

            {/* Marquee Ticker - Light borders and accent bg */}
            <div className='w-full border-y border-gray-300 py-4 mb-20 overflow-hidden flex bg-accent/10'>
                <div ref={marqueeRef} className='flex whitespace-nowrap items-center'>
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className='marquee-part flex items-center gap-8 px-4 text-accent text-sm md:text-base font-space font-bold tracking-widest uppercase'>
                            <span>Creative Developer</span>
                            <BsStars className='text-xl' />
                            <span>UI/UX Designer</span>
                            <BsStars className='text-xl' />
                            <span>Problem Solver</span>
                            <BsStars className='text-xl' />
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Content Grid */}
            <div className='w-full px-12 grid md:grid-cols-9 grid-cols-1 gap-8 relative z-10'>
                
                {/* Left Side: Text */}
                <div className='col-span-1 md:col-span-5 flex flex-col justify-center'>
                    <div className='flex items-center gap-4 mb-8'>
                        <span className='text-xl text-accent font-semibold'>[about me]</span>
                    </div>
                    
                    {/* Initially light gray (gray-300), GSAP animates it to solid dark (#111111) */}
                    <h2 className='about-heading text-[5vw] md:text-[3.5vw] font-space leading-[0.9] font-black uppercase tracking-tighter text-gray-300'>
                        Passionate about crafting digital experiences that are functional & beautiful.
                    </h2>
                    
                    <div className='mt-10 flex justify-start'>
                        {/* Paragraph dark gray for readability */}
                        <p className='about-para text-base md:text-lg max-w-xl text-gray-600 border-l-2 border-accent pl-6 leading-relaxed'>
                            I blend clean UI, thoughtful UX, and modern web technologies to build fast, interactive, and memorable products. Every project is an opportunity to solve problems through creativity and code.
                        </p>
                    </div>
                </div>

                <div className="col-span-1 hidden md:block"></div>

                {/* Right Side: Stats */}
                <div className='col-span-1 md:col-span-3 flex flex-col justify-end mt-16 md:mt-0'>
                    <div className='grid grid-cols-2 gap-x-8 gap-y-12'>
                        {stats.map((stat, index) => (
                            // Borders changed to gray-300 for light mode
                            <div key={index} className='stat-card group flex flex-col border-t border-gray-300 pt-4 hover:border-accent transition-colors duration-500'>
                                <div className='flex items-baseline'>
                                    {/* Numbers in deep dark color */}
                                    <span className='stat-num text-4xl md:text-5xl font-space font-black tracking-tighter text-[#111111] group-hover:text-accent transition-colors duration-500'>
                                        {stat.num}
                                    </span>
                                    <span className='text-4xl md:text-5xl font-space font-black tracking-tighter text-[#111111] group-hover:text-accent transition-colors duration-500'>
                                        {stat.suffix}
                                    </span>
                                </div>
                                <span className='text-xs md:text-sm text-gray-500 tracking-tighter font-semibold mt-3 flex items-center gap-2'>
                                    <GoDotFill className='text-accent text-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-300' /> 
                                    {stat.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default About