import { useEffect } from 'react'
import { Header } from '../components/Header'
import { Hero } from '../components/Hero'
import { About } from '../components/About'
import { Skills } from '../components/Skills'
import { Projects } from '../components/Projects'
import { Education } from '../components/Education'
import { Contact } from '../components/Contact'
import { Footer } from '../components/Footer'
import { CommandDock } from '../components/CommandDock'

export function Home() {
  useEffect(() => {
    document.title = 'Максим Блохин — Backend Developer'
  }, [])

  return (
    <div className="page">
      <div className="shell">
        <Header />
        <main id="main" tabIndex={-1}>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Education />
          <Contact />
        </main>
        <Footer />
      </div>
      <CommandDock />
    </div>
  )
}
