'use client'
import React, { useState } from 'react'
import PreLoader from '@/components/animations/PreLoader'
import About from '@/components/sections/About'
import Contact from '@/components/sections/Contact'
import Home from '@/components/sections/Home'
import Skills from '@/components/sections/Skills'
import Work from '@/components/sections/Work'
import Nav from '@/components/layout/Nav'

const Page = () => {
  const [isPreloaded, setIsPreloaded] = useState(false);

  return (
    <>
      <PreLoader onComplete={() => setIsPreloaded(true)} />
      <Nav isPreloaded={isPreloaded} />
      <Home isPreloaded={isPreloaded} />
      <About />
      <Work />
      <Skills />
      <Contact />
    </>
  )
}

export default Page