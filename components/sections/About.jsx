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

        gsap.to('.marquee-part', {
            xPercent: -100,
            repeat: -1,
            duration: 5,
            ease: "linear",
        }).totalProgress(0.5);

        const headingSplit = new SplitText('.about-heading', { type: "words, chars" });
        const paraSplit = new SplitText('.about-para', { type: "lines" });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container.current,
                start: 'top 70%',
            },
        });

            tl.to(headingSplit.words, {
                color: "#111111",
                stagger: 0.05,
                duration: 0.8,
                ease: 'power3.out',
               
            }, "-=1")

            .from(paraSplit.lines, {
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power3.out'
            }, "-=0.4")

            .from('.stat-card', {
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power3.out'
            }, "-=0.6");

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
        { label: 'DESIGN THINKER' },
        { label: 'PROBLEM SOLVER' },
        { label: 'DETAIL OBSESSED' },
        { label: 'LIFELONG LEARNER' },
    ]

    return (

        <div id="about" ref={container} className='min-h-screen relative flex flex-col justify-center overflow-hidden pb-24'>
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

            <div className='w-full px-12 grid md:grid-cols-9 grid-cols-1 gap-8 relative z-10'>

                <div className='col-span-1 md:col-span-5 flex flex-col justify-center'>
                    <div className='flex items-center gap-4 mb-8'>
                        <span className='text-xl text-accent font-semibold'>[about me]</span>
                    </div>

                    <h2 className='about-heading text-[10vw] md:text-[3vw] font-space leading-[0.9] font-black uppercase tracking-tighter text-gray-300'>
                        I DON'T JUST BUILD WEBSITES. <br />
                        I CRAFT DIGITAL EXPERIENCES.
                    </h2>

                    <div className='mt-4 flex justify-start'>
                        <p className='about-para text-base md:text-lg max-w-xl text-gray-600  pl-6 leading-relaxed'>
                            I love transforming ideas into interfaces that are fast, intuitive, and visually refined. Every project helps me grow as both a designer and a developer.       </p>
                    </div>
                </div>

                <div className="col-span-1 hidden md:block"></div>

                <div className='col-span-1 md:col-span-3 flex flex-col justify-end mt-16 md:mt-0'>
                    <div className='grid grid-cols-2 gap-x-8 gap-y-12'>
                        {stats.map((stat, index) => (
                            <div key={index} className='stat-card group flex flex-col border-t border-gray-300 pt-4 hover:border-accent transition-colors duration-500'>
                                <div className='flex items-baseline'>
                                    <span className=' text-2xl md:text-4xl font-space font-black tracking-tighter text-[#111111] group-hover:text-accent transition-colors duration-500'>
                                        {stat.label}
                                    </span>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default About