// components/Preloader.jsx
'use client'
import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const PreLoader = ({ onComplete }) => {
    const containerRef = useRef(null);
    const blackRef = useRef(null);
    const greenRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                if (onComplete) onComplete();
            }
        });

       tl.from(".reveal-text", {
            y: "100%",
            ease: "power4.out",
            duration: 1.2,
            stagger: 0.1
        })
        .to(".reveal-text", {
            y: "-100%",
            opacity: 0,
            ease: "power3.inOut",
            duration: 1,
            delay: 0.5 
        })
        .to(blackRef.current, {
            height: 0,
            duration: 1.2,
            ease: "expo.inOut"
        }, "-=0.4")
        .to(greenRef.current, {
            height: "100vh",
            duration: 1.2,
            ease: "expo.inOut"
        }, "<") 
        .to(containerRef.current, {
            y: "-100vh",
            duration: 1.2,
            ease: "expo.inOut"
        }, "-=0.6");

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className='fixed inset-0 h-screen w-screen z-999 overflow-hidden pointer-events-none'>
            <div ref={blackRef} className="absolute top-0 left-0 bg-black h-screen w-full text-primary flex flex-col items-center justify-center overflow-hidden z-20">
                <div className='absolute top-8 w-full px-6 md:px-16 flex justify-between items-center text-xs md:text-sm font-bold uppercase tracking-widest text-gray-500'>
                    <div className="overflow-hidden">
                        <span className="block reveal-text">Gaurav</span>
                    </div>
                    <div className="overflow-hidden">
                        <span className="block reveal-text">Portfolio &copy;2026</span>
                    </div>
                </div>
                <div className='flex overflow-y-hidden'>
                    <span className='block reveal-text text-[5vw] font-black uppercase tracking-tighter leading-none'>
                        Hello.
                    </span>
                </div>
            </div>
            <div ref={greenRef} className='bg-accent h-0 w-full absolute bottom-0 z-10'></div>
        </div>
    )
}

export default PreLoader;