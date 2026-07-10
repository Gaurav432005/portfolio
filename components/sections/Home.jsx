"use client"
import Image from 'next/image'
import React, { useRef, useEffect } from 'react'
import { FaArrowDown } from 'react-icons/fa'
import { FaLocationDot } from 'react-icons/fa6'
import { GoDotFill } from 'react-icons/go'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { SplitText } from 'gsap/all'

const Home = ({ isPreloaded }) => {
    const container = useRef();
    const tl = useRef();

    useGSAP(() => {
        gsap.registerPlugin(SplitText);
        
        const introSplit = new SplitText('.intro-text', { type: 'lines' });

        tl.current = gsap.timeline({ paused: true });

        // 1. Badge Fade in
        tl.current.from('.hello-badge', {
            y: 20,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        })
        // 2. Hero Text
        .from(['.hero-txt1', '.hero-txt2'], {
            y: '100%',
            duration: 1.2,
            stagger: 0.1,
            ease: "power4.out"
        }, "-=0.8")
        // 3. Intro lines fade up
        .from(introSplit.lines, {
            y: 20,
            opacity: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: "power3.out"
        }, "-=0.6")
        // 4. Image Shutter Reveal
        .from(".img-wrapper", {
            clipPath: "inset(0% 0% 100% 0%)",
            duration: 1.5,
            ease: "power4.inOut"
        }, "-=1.2")
        // 5. Image Scale Down
        .from(".hero-img", {
            scale: 1.2,
            duration: 1.5,
            ease: "power4.inOut"
        }, "-=1.5")
        // 6. Bottom Line Reveal
        .from('.bottom-section', {
            scaleX: 0,
            transformOrigin: "left",
            duration: 1,
            ease: "power4.inOut"
        }, "-=1")
        // 7. Footer Items Stagger
        .from('.footer-item', {
            y: 15,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out'
        }, "-=0.8");

        return () => {
            introSplit.revert();
        };

    }, { scope: container })

    useEffect(() => {
        if (isPreloaded && tl.current) {
            tl.current.play();
        }
    }, [isPreloaded]);

    return (
        // Mobile par px-6 aur Desktop par px-12 (taaki choti screen par zyada space na waste ho)
        <div ref={container} className="min-h-screen px-6 md:px-12 flex items-end pb-8 md:pb-12 bg-[#f5f5f5] pt-24 md:pt-0">
            <div className="w-full grid md:grid-cols-9 grid-cols-1">

                <div className="hero col-span-1 md:col-span-5 flex flex-col justify-end">
                    <span className='hello-badge text-lg md:text-xl text-accent pl-2 md:pl-4 font-semibold mb-2'>
                        [hello, i am]
                    </span>
                    
                    <div className="parent overflow-hidden">
                        {/* Mobile par 15vw, Desktop par 10vw taaki text bada aur punchy lage */}
                        <h1 className="hero-txt1 text-[16vw] md:text-[10vw] font-space leading-[0.85] md:leading-[0.8] font-black uppercase tracking-tighter text-[#111111]">
                            designer+
                        </h1>
                    </div>
                    <div className="parent overflow-hidden">
                        <h1 className="hero-txt2 text-[16vw] md:text-[10vw] font-space leading-[0.85] md:leading-[0.8] font-black uppercase tracking-tighter text-[#111111]">
                            developer
                        </h1>
                    </div>

                    {/* Mobile me text left-align aur Desktop me right-align */}
                    <div className="intro mt-6 md:mt-8 flex justify-start md:justify-end">
                        <p className='intro-text text-[15px] md:text-[16px] max-w-md text-left md:text-right text-gray-600 leading-relaxed'>
                            Crafting innovative digital experiences, brand identities and art direction that drive results, spark connection and inspire loyalty through creative vision and strategic insight.
                        </p>
                    </div>

                    {/* Mobile me flex-col (items upar-neeche) aur Desktop me flex-row */}
                    <div className="bottom-section bottom border-t border-gray-300 mt-8 pt-5 flex flex-col md:flex-row justify-between text-gray-500 gap-4 md:gap-0 items-start md:items-center">
                        <div className="footer-item">
                            <span className='tracking-tighter text-xs md:text-sm flex items-center gap-2 font-semibold'>
                                <FaArrowDown className='text-accent' /> SCROLL TO DISCOVER
                            </span>
                        </div>
                        <div className="footer-item">
                            <span className='tracking-tighter text-xs md:text-sm flex items-center gap-2 font-semibold uppercase'>
                                <FaLocationDot className='text-accent'/> BASED IN HARYANA
                            </span>
                        </div>
                        <div className="footer-item">
                            <span className='tracking-tighter text-xs md:text-sm flex items-center gap-2 font-semibold'>
                                <GoDotFill className='text-accent' /> AVAILABLE
                            </span>
                        </div>
                    </div>
                </div>

                <div className="col-span-1 hidden md:block"></div>

                {/* Image Section */}
                {/* Mobile me image choti (50vh) aur gap maintain kiya hai */}
                <div className="image w-full col-span-1 md:col-span-3 relative h-[50vh] md:h-[75vh] mt-12 md:mt-0">
                    <div className="img-wrapper w-full h-full relative overflow-hidden bg-gray-200">
                        <Image 
                            src={'/bw3.png'} 
                            fill 
                            alt='Hero Image' 
                            className='hero-img object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-out cursor-pointer' 
                            priority 
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home