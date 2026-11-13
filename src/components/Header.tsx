import { Link } from 'react-router-dom'
import { sectionLinks } from '../data/profile'
import { useActiveSection, useMoscowClock, usePrefersReducedMotion } from '../hooks'
import { ThemeToggle } from './Ui'
import { TerminalIcon } from './Icons'

const sectionIds = sectionLinks.map((section) => section.id)

export function Header() {
  const active = useActiveSection(sectionIds)
  const clock = useMoscowClock()
  const reduced = usePrefersReducedMotion()

  function scrollToSection(id: string) {
    const element = document.getElementById(id)
    if (!element) return
    element.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })
  }

  function openDock() {
    window.dispatchEvent(new CustomEvent('portfolio:open-dock'))
  }

  return (
    <header className="chrome">
      <div className="chrome__top">
        <div className="traffic" aria-hidden="true">
          <span className="traffic__red" />
          <span className="traffic__yellow" />
          <span className="traffic__green" />
        </div>

        <button type="button" className="chrome__title" onClick={scrollToTop}>
          <TerminalIcon size={14} />
          <span className="chrome__title-user">max@blokhin</span>
          <span className="chrome__title-path">: ~/portfolio</span>
          <span className="chrome__title-shell">— zsh</span>
        </button>

        <div className="chrome__actions">
          <span className="chrome__clock" title="Москва, UTC+3">
            {clock} <span>MSK</span>
          </span>
          <button type="button" className="chrome__cmd" onClick={openDock}>
            <span className="chrome__cmd-sign">&gt;_</span>
            <span className="chrome__cmd-label">команды</span>
            <kbd>⌘K</kbd>
          </button>
          <Link to="/cv" className="btn btn--ghost btn--sm chrome__cv">
            резюме
          </Link>
          <ThemeToggle />
        </div>
      </div>

      <div className="chrome__bottom">
        <nav className="tabs" aria-label="Разделы портфолио">
          {sectionLinks.map((section) => (
            <button
              key={section.id}
              type="button"
              className={`tab ${active === section.id ? 'is-active' : ''}`}
              onClick={() => scrollToSection(section.id)}
              aria-current={active === section.id ? 'true' : undefined}
            >
              <span className="tab__index">{section.index}</span>
              <span className="tab__label">{section.label}</span>
            </button>
          ))}
        </nav>
        <span className="chrome__branch">
          <span className="chrome__branch-dot" aria-hidden="true" />
          main
        </span>
      </div>
    </header>
  )
}
