"use client"; 
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';
import gsap from 'gsap';
import Image from 'next/image';
import React, { useRef } from 'react';

const Skills = () => {
    // Tumhari images ka array
    const images = [
        '/images/image1.jpeg',
        '/images/image2.jpeg',
        '/images/image3.jpeg',
        '/images/image4.jpeg',
        '/images/image5.jpeg',
        '/images/image6.jpeg',
        '/images/image7.jpeg',
        '/images/image8.jpeg',
    ];
  
    const sectionRef = useRef(null);
    const containersRef = useRef([]);

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);
        
        gsap.from('.skill-item', {
            y: 60,
            opacity: 0,
            duration: 1,
            stagger: 0.05,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 75%',
            }
        });

        let lastStep = -1;
        gsap.to({}, {
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
                end: "bottom 20%",
                onUpdate: (self) => {
                    const speedMultiplier = 3; 
                    const step = Math.floor(self.progress * images.length * speedMultiplier);
                    if (step === lastStep) return;
                    lastStep = step;

                    containersRef.current.forEach((container, containerIndex) => {
                        if (!container) return;
                        const targetImageIndex = (containerIndex + step) % images.length;
                        const layers = container.querySelectorAll('.image-layer');
                        layers.forEach((layer, i) => {
                            layer.style.opacity = i === targetImageIndex ? 1 : 0;
                        });
                    });
                }
            }
        });
    }, { scope: sectionRef });

    const renderStackedImages = (initialIndex) => {
        return images.map((src, i) => (
            <div key={i} className={`absolute inset-0 transition-none image-layer ${i === initialIndex ? 'opacity-100' : 'opacity-0'}`}>
                <Image 
                    src={src} 
                    fill 
                    alt={`Skill ${i + 1}`} 
                    className="object-cover transition-all duration-300" 
                    sizes="(max-width: 768px) 100vw, 33vw" 
                    priority 
                />
            </div>
        ));
    };

    const textClass = "skill-item uppercase font-space ml-5 font-black tracking-tighter text-[8vw] md:text-[5.5vw] text-[#111111] leading-[0.85] md:leading-[0.9] hover:text-accent transition-colors duration-300 cursor-pointer";
    
    const pillContainerClass = "skill-item relative overflow-hidden bg-gray-200  mx-2 md:mx-4 shrink-0 translate-y-[-0.1em]"; 
    const pillSizeClass = "w-[22vw] h-[9vw] md:w-[15vw] md:h-[6vw] lg:w-[12vw] lg:h-[5vw]";

    return (
        <section id="skills" ref={sectionRef} className='relative z-10 min-h-screen px-6 md:px-12 py-24 md:py-32 overflow-hidden' aria-label="Technical Skills">

            <div className="mb-12 md:mb-16 flex flex-col justify-end">
                <span className='text-lg md:text-xl text-accent font-semibold mb-2'>
                    [tech stack]
                </span>
            </div>

            <div className="w-full flex flex-wrap items-center content-start gap-y-2 md:gap-y-4">
                <span className={textClass}>Web Design & Dev • </span>
                <div ref={el => containersRef.current[0] = el} className={`${pillContainerClass} ${pillSizeClass}`}>
                    {renderStackedImages(0)}
                </div>
                <span className={textClass}>React •</span>
                <span className={textClass}>Next.js •</span>
                <div ref={el => containersRef.current[1] = el} className={`${pillContainerClass} ${pillSizeClass}`}>
                    {renderStackedImages(1)}
                </div>
                <span className={textClass}>SEO •</span>
                <span className={textClass}> 3D (Three.js) •</span>
                <div ref={el => containersRef.current[2] = el} className={`${pillContainerClass} ${pillSizeClass}`}>
                    {renderStackedImages(2)}
                </div>
                <span className={textClass}>Gsap •</span>
                <span className={textClass}>UI/UX •</span>
                <div ref={el => containersRef.current[3] = el} className={`${pillContainerClass} ${pillSizeClass}`}>
                    {renderStackedImages(3)}
                </div>
                <span className={textClass}>Node.js •</span>
                <div ref={el => containersRef.current[4] = el} className={`${pillContainerClass} ${pillSizeClass}`}>
                    {renderStackedImages(4)}
                </div>
                <span className={textClass}>Express.js •</span>
                <span className={textClass}>MONGOdb •</span>
                <div ref={el => containersRef.current[5] = el} className={`${pillContainerClass} ${pillSizeClass}`}>
                    {renderStackedImages(5)}
                </div>
                <span className={textClass}>Firebase •</span>
                <div ref={el => containersRef.current[6] = el} className={`${pillContainerClass} ${pillSizeClass}`}>
                    {renderStackedImages(6)}
                </div>
                <span className={textClass}>Tailwind</span>
                <div ref={el => containersRef.current[7] = el} className={`${pillContainerClass} ${pillSizeClass}`}>
                    {renderStackedImages(7)}
                </div>
            </div>
        </section>
    )
}

export default Skills;