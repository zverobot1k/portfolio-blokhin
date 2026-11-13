import type { ReactNode } from 'react'
import { useTheme } from '../context/ThemeContext'
import { MoonIcon, SunIcon } from './Icons'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="theme-toggle" role="group" aria-label="Цветовая тема">
      <button
        type="button"
        className={theme === 'dark' ? 'is-active' : ''}
        onClick={() => setTheme('dark')}
        aria-pressed={theme === 'dark'}
        title="Тёмная тема"
      >
        <MoonIcon />
        <span className="sr-only">Тёмная тема</span>
      </button>
      <button
        type="button"
        className={theme === 'light' ? 'is-active' : ''}
        onClick={() => setTheme('light')}
        aria-pressed={theme === 'light'}
        title="Светлая тема"
      >
        <SunIcon />
        <span className="sr-only">Светлая тема</span>
      </button>
    </div>
  )
}

type PromptProps = {
  path?: string
  sign?: string
  children?: ReactNode
  caret?: boolean
  className?: string
}

export function Prompt({ path = '~', sign = '%', children, caret, className = '' }: PromptProps) {
  return (
    <span className={`prompt ${className}`.trim()}>
      <span className="prompt__user">max@blokhin</span>
      <span className="prompt__sep">:</span>
      <span className="prompt__path">{path}</span>
      <span className="prompt__space"> </span>
      <span className="prompt__sign">{sign}</span>
      <span className="prompt__space"> </span>
      <span className="prompt__command">{children}</span>
      {caret ? <span className="caret" aria-hidden="true" /> : null}
    </span>
  )
}

type SectionHeaderProps = {
  index: string
  command: string
  title: string
  subtitle: string
}

export function SectionHeader({ index, command, title, subtitle }: SectionHeaderProps) {
  return (
    <header className="section-head">
      <div className="command-line">
        <Prompt>{command}</Prompt>
        <span className="command-line__index">[{index}]</span>
      </div>
      <div className="section-head__row">
        <h2 className="section-head__title">
          <span className="section-head__hash">#</span>
          {title}
        </h2>
        <p className="section-head__subtitle">{subtitle}</p>
      </div>
    </header>
  )
}
