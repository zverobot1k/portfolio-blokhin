import { useEffect } from 'react'
import { HashRouter, Route, Routes, useLocation } from 'react-router-dom'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import { Home } from './pages/Home'
import { Cv } from './pages/Cv'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function KeyboardShortcuts() {
  const { toggleTheme } = useTheme()

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.metaKey || event.ctrlKey || event.altKey) return
      if (event.key.toLowerCase() !== 't') return

      const target = event.target as HTMLElement | null
      const isTyping =
        target?.tagName === 'INPUT' ||
        target?.tagName === 'TEXTAREA' ||
        target?.isContentEditable
      if (isTyping) return

      toggleTheme()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [toggleTheme])

  return null
}

function NotFound() {
  return (
    <div className="notfound">
      <p className="notfound__code">404</p>
      <p className="notfound__text">
        <span className="prompt__user">max@blokhin</span>
        <span className="prompt__sep">:</span>
        <span className="prompt__path">~</span>
        <span className="prompt__sign">$</span> cd /this-page
      </p>
      <p className="notfound__msg">cd: no such file or directory</p>
      <a className="btn btn--primary" href="#/">
        cd ~/portfolio
      </a>
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <HashRouter>
        <ScrollToTop />
        <KeyboardShortcuts />
        <button
          type="button"
          className="skip-link"
          onClick={() => document.getElementById('main')?.focus()}
        >
          к основному содержимому
        </button>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cv" element={<Cv />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </ThemeProvider>
  )
}
