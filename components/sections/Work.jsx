"use client"
import { useGSAP } from '@gsap/react'
import Image from 'next/image'
import React, { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { GoDotFill } from 'react-icons/go'
import { FiArrowUpRight } from 'react-icons/fi'

const Work = () => {
    const containerRef = useRef(null)

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger)
        
        // Har project row ko alag se animate karenge
        const projects = gsap.utils.toArray('.project-row');
        
        projects.forEach((proj) => {
            const imgWrapper = proj.querySelector('.img-reveal');
            const img = proj.querySelector('.parallax-img');
            const texts = proj.querySelectorAll('.reveal-text');
            const border = proj.querySelector('.reveal-border');

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: proj,
                    start: 'top 75%', // Jab row screen ke 75% hisse me aaye
                    toggleActions: 'play none none reverse', // Upar jane pe reverse hogi
                }
            });

            // 1. Image container reveal (shutter effect)
            tl.fromTo(imgWrapper, 
                { clipPath: 'inset(0% 0% 100% 0%)' }, 
                { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'power4.inOut' }
            )
            // 2. Text elements fade and slide up
            .from(texts, {
                y: 30,
                opacity: 0,
                stagger: 0.1,
                duration: 0.8,
                ease: 'power3.out'
            }, "-=0.6")
            // 3. Border line animate
            .from(border, {
                scaleX: 0,
                transformOrigin: 'left',
                duration: 0.8,
                ease: 'power3.out'
            }, "-=0.8");

            // 4. Parallax effect for the image inside the container
            gsap.fromTo(img, 
                { y: '-10%' }, 
                { 
                    y: '10%', 
                    ease: 'none',
                    scrollTrigger: {
                        trigger: proj,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true,
                    }
                }
            );
        })
    }, { scope: containerRef })

    // Expanded data structure with more Awwwards-style details
    const projects = [
        { 
            id: '01', 
            title: 'Alpha Core', 
            role: 'Art Direction & Dev', 
            year: '2023',
            desc: 'A complete digital transformation focusing on brutalist typography and seamless WebGL interactions to redefine the brand identity.',
            img: '/works/1.png' 
        },
        { 
            id: '02', 
            title: 'Nova Studio', 
            role: 'UI/UX Design', 
            year: '2024',
            desc: 'An immersive portfolio experience built for a creative agency, blending minimalist aesthetics with high-performance animations.',
            img: '/works/2.png' 
        },
        { 
            id: '03', 
            title: 'Nexus Pay', 
            role: 'Full Stack Product', 
            year: '2024',
            desc: 'A fintech dashboard rethinking how users interact with their financial data through dark-mode optimized components and real-time graphs.',
            img: '/works/3.png' 
        },
    ]

    return (
        <div ref={containerRef} className='w-full pb-32 bg-[#0a0a0a]'> {/* Assuming a very dark background */}
            
            {/* Header Section */}
            <div className='px-12 pt-32 pb-16 grid md:grid-cols-9 grid-cols-1'>
                <div className='col-span-1 md:col-span-5 flex flex-col justify-end'>
                    <span className='text-xl text-accent pl-4 font-semibold mb-4'>[selected works]</span>
                    <h2 className='text-[7vw] md:text-[6vw] font-space leading-[0.85] font-black uppercase tracking-tighter text-gray-200'>
                        Featured <br /> Projects
                    </h2>
                </div>
            </div>

            {/* Projects List */}
            <div className='px-12 flex flex-col gap-32 md:gap-40 mt-12'>
                {projects.map((project) => (
                    <div key={project.id} className='project-row grid md:grid-cols-9 grid-cols-1 gap-8 md:gap-16 items-center group cursor-pointer'>
                        
                        {/* Left Side: Large Mockup Image (Takes 6 columns) */}
                        <div className='col-span-1 md:col-span-6 relative h-[60vh] md:h-[80vh] w-full overflow-hidden bg-[#1e1e1e] img-reveal'>
                            <Image 
                                src={project.img} 
                                // Scale up slightly so parallax has room to move
                                className='parallax-img object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out' 
                                fill 
                                alt={project.title}
                            />
                            {/* Hover Overlay Text (Optional premium touch) */}
                            <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center z-10'>
                                <span className='text-white font-space uppercase tracking-widest text-lg flex items-center gap-2 border border-white/30 px-6 py-3 rounded-full backdrop-blur-sm'>
                                    View Live <FiArrowUpRight />
                                </span>
                            </div>
                        </div>

                        {/* Right Side: Project Details (Takes 3 columns) */}
                        <div className='col-span-1 md:col-span-3 flex flex-col justify-between h-full py-4 md:py-12'>
                            
                            {/* Top Details */}
                            <div>
                                <span className='reveal-text text-accent font-space font-bold text-xl mb-4 block'>
                                    {project.id} / 03
                                </span>
                                <h3 className='reveal-text text-[4vw] md:text-[3vw] font-space font-black uppercase tracking-tighter text-gray-200 leading-[0.9] mb-6'>
                                    {project.title}
                                </h3>
                                <p className='reveal-text text-gray-500 text-base md:text-lg leading-relaxed mb-8'>
                                    {project.desc}
                                </p>
                            </div>

                            {/* Bottom Metadata (Brutalist style) */}
                            <div className='mt-auto w-full'>
                                <div className='reveal-border h-[1px] w-full bg-gray-600 mb-6'></div>
                                
                                <div className='reveal-text flex flex-col gap-4'>
                                    <div className='flex justify-between items-center text-sm font-semibold tracking-widest uppercase text-gray-400'>
                                        <span className='flex items-center gap-2'>
                                            <GoDotFill className='text-accent text-[10px]' /> Role
                                        </span>
                                        <span className='text-gray-200'>{project.role}</span>
                                    </div>
                                    
                                    <div className='flex justify-between items-center text-sm font-semibold tracking-widest uppercase text-gray-400'>
                                        <span className='flex items-center gap-2'>
                                            <GoDotFill className='text-accent text-[10px]' /> Year
                                        </span>
                                        <span className='text-gray-200'>{project.year}</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
            
        </div>
    )
}

export default Work