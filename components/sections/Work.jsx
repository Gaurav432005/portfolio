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

        const projects = gsap.utils.toArray('.project-row');

        projects.forEach((proj) => {
            const imgWrapper = proj.querySelector('.img-reveal');
            const img = proj.querySelector('.parallax-img');
            const texts = proj.querySelectorAll('.reveal-text');
            const border = proj.querySelector('.reveal-border');

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: proj,
                    start: 'top 75%',
                    toggleActions: 'play none none reverse',
                }
            });

            tl.fromTo(imgWrapper,
                { clipPath: 'inset(0% 0% 100% 0%)' },
                { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'power4.inOut' }
            )
                .from(texts, {
                    y: 30,
                    opacity: 0,
                    stagger: 0.1,
                    duration: 0.8,
                    ease: 'power3.out'
                }, "-=0.6")

                .from(border, {
                    scaleX: 0,
                    transformOrigin: 'left',
                    duration: 0.8,
                    ease: 'power3.out'
                }, "-=0.8");

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

    const projects = [
        {
            id: '01',
            title: 'Coming Soon',
            role: 'New Project',
            year: '2026',
            desc: 'An exciting project is currently in development. Stay tuned for the official launch.',
            img: 'https://images.unsplash.com/photo-1496262967815-132206202600'
        },
        {
            id: '02',
            title: 'Coming Soon',
            role: 'New Project',
            year: '2026',
            desc: 'Something innovative is on the way. More details will be revealed soon.',
            img: 'https://images.unsplash.com/photo-1496262967815-132206202600'
        },
        {
            id: '03',
            title: 'Coming Soon',
            role: 'New Project',
            year: '2026',
            desc: 'A new experience is being crafted with care. Check back soon for updates.',
            img: 'https://images.unsplash.com/photo-1496262967815-132206202600'
        },
    ];

    return (
        <div id="work" ref={containerRef} className='w-full pb-32 bg-[#0a0a0a]'>

            <div className='px-12 pt-32 pb-16 grid md:grid-cols-9 grid-cols-1'>
                <div className='col-span-1 md:col-span-5 flex flex-col justify-end'>
                    <span className='text-xl text-accent font-semibold mb-4'>[selected works]</span>
                    <h2 className='text-[7vw] md:text-[6vw] font-space leading-[0.85] font-black uppercase tracking-tighter text-gray-200'>
                        Projects
                    </h2>
                </div>
            </div>

            <div className='px-12 flex flex-col gap-32 md:gap-40 mt-12'>
                {projects.map((project) => (
                    <div key={project.id} className='project-row grid md:grid-cols-9 grid-cols-1 gap-8 md:gap-16 items-center group cursor-pointer'>

                        <div className='col-span-1 md:col-span-6 relative h-[60vh] md:h-[80vh] w-full overflow-hidden bg-[#0a0a0a] img-reveal'>
                            <Image
                                src={project.img}
                                className='parallax-img object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out'
                                fill
                                alt={project.title}
                            />
                            <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center z-10'>
                                <span className='text-primary font-space uppercase tracking-widest text-lg flex items-center gap-2 border border-white/30 px-6 py-3 rounded-full backdrop-blur-sm'>
                                    View Live <FiArrowUpRight />
                                </span>
                            </div>
                        </div>
                        <div className='col-span-1 md:col-span-3 flex flex-col justify-between h-full py-4 md:py-12'>

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

                            <div className='mt-auto w-full'>
                                <div className='reveal-border h-px w-full bg-gray-600 mb-6'></div>

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