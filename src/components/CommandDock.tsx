import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { profile, projects, skillGroups } from '../data/profile'
import { useTheme } from '../context/ThemeContext'
import { Prompt } from './Ui'
import { TerminalIcon } from './Icons'

type OutputKind = 'cmd' | 'out' | 'ok' | 'err' | 'hint'

type OutputLine = {
  id: number
  kind: OutputKind
  text: string
}

const commands = [
  'help',
  'about',
  'projects',
  'stack',
  'education',
  'contact',
  'cv',
  'github',
  'telegram',
  'email',
  'phone',
  'theme',
  'neofetch',
  'date',
  'pwd',
  'history',
  'clear',
] as const

const quickCommands = ['help', 'projects', 'stack', 'theme', 'cv']

const helpText = `доступные команды:
  about       перейти к разделу «обо мне»
  stack       стек и инструменты
  projects    пет-проекты
  education   образование
  contact     контакты
  cv          открыть страницу резюме
  github      открыть GitHub
  telegram    открыть Telegram
  email       скопировать e-mail
  phone       скопировать телефон
  theme       dark | light | toggle
  neofetch    краткая сводка о системе
  clear       очистить вывод
  help        эта справка`

function scrollToSection(id: string) {
  const element = document.getElementById(id)
  if (!element) return
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  element.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
}

async function copyText(value: string) {
  try {
    await navigator.clipboard.writeText(value)
  } catch {
    const textarea = document.createElement('textarea')
    textarea.value = value
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    textarea.remove()
  }
}

function closestCommand(input: string) {
  let best = ''
  let bestDistance = Number.POSITIVE_INFINITY
  for (const command of commands) {
    const distance = levenshtein(input, command)
    if (distance < bestDistance) {
      bestDistance = distance
      best = command
    }
  }
  return bestDistance <= 3 ? best : ''
}

function levenshtein(a: string, b: string) {
  const rows = Array.from({ length: a.length + 1 }, (_, i) => [i])
  for (let j = 1; j <= b.length; j += 1) rows[0][j] = j
  for (let i = 1; i <= a.length; i += 1) {
    for (let j = 1; j <= b.length; j += 1) {
      rows[i][j] = Math.min(
        rows[i - 1][j] + 1,
        rows[i][j - 1] + 1,
        rows[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      )
    }
  }
  return rows[a.length][b.length]
}

export function CommandDock() {
  const [expanded, setExpanded] = useState(true)
  const [focused, setFocused] = useState(false)
  const [value, setValue] = useState('')
  const [output, setOutput] = useState<OutputLine[]>([])
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)
  const idRef = useRef(0)
  const navigate = useNavigate()
  const { theme, setTheme, toggleTheme } = useTheme()

  const suggestions =
    value.trim().length > 0
      ? commands.filter((command) => command.startsWith(value.trim().toLowerCase())).slice(0, 6)
      : []

  useEffect(() => {
    if (output.length === 0) return
    const node = outputRef.current
    if (node) node.scrollTop = node.scrollHeight
  }, [output])

  useEffect(() => {
    function onOpen() {
      setExpanded(true)
      requestAnimationFrame(() => inputRef.current?.focus())
    }
    function onKeyDown(event: globalThis.KeyboardEvent) {
      const target = event.target as HTMLElement | null
      const isTyping =
        target?.tagName === 'INPUT' ||
        target?.tagName === 'TEXTAREA' ||
        target?.isContentEditable

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setExpanded(true)
        requestAnimationFrame(() => inputRef.current?.focus())
        return
      }

      if (event.key === '/' && !isTyping) {
        event.preventDefault()
        setExpanded(true)
        requestAnimationFrame(() => inputRef.current?.focus())
      }

      if (event.key === 'Escape' && !isTyping) {
        setOutput([])
      }
    }

    window.addEventListener('portfolio:open-dock', onOpen)
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('portfolio:open-dock', onOpen)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  function push(lines: Omit<OutputLine, 'id'>[]) {
    if (lines.length === 0) return
    const next = lines.map((line) => ({ ...line, id: (idRef.current += 1) }))
    setOutput((current) => [...current, ...next].slice(-40))
  }

  function execute(raw: string) {
    const trimmed = raw.trim()
    if (!trimmed) return

    const [commandRaw, ...args] = trimmed.split(/\s+/)
    const command = commandRaw.toLowerCase()
    const arg = args.join(' ')

    setHistory((current) => [...current, trimmed])
    setHistoryIndex(-1)
    push([{ kind: 'cmd', text: trimmed }])

    switch (command) {
      case 'help':
        push([{ kind: 'out', text: helpText }])
        break
      case 'about':
      case 'whoami':
        scrollToSection('about')
        push([{ kind: 'ok', text: '→ ~/about' }])
        break
      case 'stack':
      case 'skills':
        scrollToSection('stack')
        push([{ kind: 'ok', text: '→ ~/stack' }])
        break
      case 'projects':
        scrollToSection('projects')
        push([{ kind: 'ok', text: `→ ~/projects · ${projects.length} директории` }])
        break
      case 'education':
      case 'edu':
        scrollToSection('education')
        push([{ kind: 'ok', text: '→ ~/education' }])
        break
      case 'contact':
        scrollToSection('contact')
        push([{ kind: 'ok', text: '→ ~/contact' }])
        break
      case 'ls':
        push([
          {
            kind: 'out',
            text: projects.map((project) => `drwxr-xr-x  ${project.id}/`).join('\n'),
          },
        ])
        break
      case 'cat': {
        const file = arg.replace(/^\.\//, '')
        const sectionMap: Record<string, string> = {
          'about.md': 'about',
          'stack.md': 'stack',
          'projects.md': 'projects',
          'education.md': 'education',
          'contact.md': 'contact',
        }
        if (file === 'cv.pdf') {
          navigate('/cv')
          push([{ kind: 'ok', text: 'opening /cv …' }])
        } else if (sectionMap[file]) {
          scrollToSection(sectionMap[file])
          push([{ kind: 'ok', text: `→ cat ${file}` }])
        } else {
          push([{ kind: 'err', text: `cat: ${arg || '?'}: no such file` }])
        }
        break
      }
      case 'cv':
      case 'resume':
        navigate('/cv')
        push([{ kind: 'ok', text: 'opening /cv …' }])
        break
      case 'github':
        window.open(profile.githubUrl, '_blank', 'noopener,noreferrer')
        push([{ kind: 'ok', text: '→ github.com/' + profile.github }])
        break
      case 'telegram':
      case 'tg':
        window.open(profile.telegramUrl, '_blank', 'noopener,noreferrer')
        push([{ kind: 'ok', text: '→ t.me/wearclouds' }])
        break
      case 'email':
      case 'mail':
        void copyText(profile.email)
        push([{ kind: 'ok', text: `${profile.email} → clipboard` }])
        break
      case 'phone':
        void copyText(profile.phoneRaw)
        push([{ kind: 'ok', text: `${profile.phone} → clipboard` }])
        break
      case 'theme': {
        const next = arg.toLowerCase()
        if (next === 'light' || next === 'dark') {
          setTheme(next)
          push([{ kind: 'ok', text: `theme → ${next}` }])
        } else if (next === 'toggle' || next === '') {
          toggleTheme()
          push([{ kind: 'ok', text: `theme → ${theme === 'dark' ? 'light' : 'dark'}` }])
        } else {
          push([{ kind: 'err', text: `theme: unknown mode '${arg}'. try light | dark | toggle` }])
        }
        break
      }
      case 'neofetch':
        push([
          {
            kind: 'out',
            text: `  ╭─────────────────╮   max@blokhin
  │   >_ terminal   │   ─────────────────────────
  ╰─────────────────╯   role:    backend developer
                        stack:   Go · Python · SQL
                        cache:   Redis + singleflight
                        status:  open to work
                        modules: ${skillGroups.length} stack groups`,
          },
        ])
        break
      case 'date':
        push([
          {
            kind: 'out',
            text: new Intl.DateTimeFormat('ru-RU', {
              dateStyle: 'full',
              timeStyle: 'medium',
              timeZone: 'Europe/Moscow',
            }).format(new Date()),
          },
        ])
        break
      case 'pwd':
        push([{ kind: 'out', text: '/Users/max/portfolio' }])
        break
      case 'history':
        push([
          {
            kind: 'out',
            text: [...history, trimmed]
              .map((item, i) => `${i + 1}  ${item}`)
              .join('\n'),
          },
        ])
        break
      case 'clear':
        setOutput([])
        break
      case 'echo':
        push([{ kind: 'out', text: arg }])
        break
      case 'sudo':
        push([{ kind: 'err', text: 'sudo: permission denied. nice try 😄' }])
        break
      case 'rm':
        push([{ kind: 'err', text: 'rm: this portfolio is read-only' }])
        break
      case 'exit':
      case 'logout':
        push([
          { kind: 'hint', text: 'logout — but you can stay. try `help` or open the CV.' },
        ])
        break
      default: {
        const suggestion = closestCommand(command)
        push([
          {
            kind: 'err',
            text: `command not found: ${command}${suggestion ? ` · maybe you meant \`${suggestion}\`?` : ' · try `help`'}`,
          },
        ])
      }
    }
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    execute(value)
    setValue('')
  }

  function onKeyNavigation(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Escape') {
      setOutput([])
      setFocused(false)
      event.currentTarget.blur()
      return
    }

    if (event.key === 'Tab') {
      event.preventDefault()
      if (suggestions[0]) setValue(`${suggestions[0]} `)
      return
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      if (history.length === 0) return
      const nextIndex = Math.min(historyIndex + 1, history.length - 1)
      setHistoryIndex(nextIndex)
      setValue(history[history.length - 1 - nextIndex] ?? '')
      return
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      if (historyIndex <= 0) {
        setHistoryIndex(-1)
        setValue('')
        return
      }
      const nextIndex = historyIndex - 1
      setHistoryIndex(nextIndex)
      setValue(history[history.length - 1 - nextIndex] ?? '')
    }
  }

  function openDock() {
    setExpanded(true)
    requestAnimationFrame(() => inputRef.current?.focus())
  }

  if (!expanded) {
    return (
      <button type="button" className="dock-launcher" onClick={openDock} title="Открыть терминал">
        <TerminalIcon size={17} />
        <span>&gt;_</span>
        <kbd>⌘K</kbd>
      </button>
    )
  }

  return (
    <div className={`dock ${focused ? 'is-focused' : ''}`}>
      <div className="dock__panel">
        {output.length > 0 ? (
          <div className="dock__output-wrap">
            <div className="dock__output-head">
              <span>
                <span className="dock__output-dot" /> stdout
              </span>
              <button type="button" onClick={() => setOutput([])} aria-label="Очистить вывод">
                clear
              </button>
            </div>
            <div className="dock__output" ref={outputRef} aria-live="polite">
              {output.map((line) => (
                <div className={`dock__line dock__line--${line.kind}`} key={line.id}>
                  {line.kind === 'cmd' ? (
                    <>
                      <span className="dock__line-prompt">$</span> {line.text}
                    </>
                  ) : (
                    line.text
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {!output.length && suggestions.length > 0 ? (
          <div className="dock__suggest">
            {suggestions.map((suggestion, index) => (
              <button
                type="button"
                key={suggestion}
                className={index === 0 ? 'is-first' : ''}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => {
                  setValue(`${suggestion} `)
                  inputRef.current?.focus()
                }}
              >
                {suggestion}
                {index === 0 ? <kbd>tab</kbd> : null}
              </button>
            ))}
          </div>
        ) : null}

        {!output.length && suggestions.length === 0 && focused ? (
          <div className="dock__quick">
            <span className="dock__quick-label">попробуйте:</span>
            {quickCommands.map((command) => (
              <button
                type="button"
                key={command}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => {
                  execute(command)
                  inputRef.current?.focus()
                }}
              >
                {command}
              </button>
            ))}
          </div>
        ) : null}

        <form className="dock__form" onSubmit={onSubmit}>
          <button
            type="button"
            className="dock__collapse"
            onClick={() => {
              setExpanded(false)
              setFocused(false)
            }}
            aria-label="Свернуть терминал"
            title="Свернуть"
          >
            <TerminalIcon size={16} />
          </button>

          <Prompt path="~" sign="$" />

          <input
            ref={inputRef}
            className="dock__input"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onKeyDown={onKeyNavigation}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 120)}
            placeholder="введите команду…"
            aria-label="Командная строка портфолио"
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
          />

          {value ? (
            <button type="submit" className="dock__run">
              run <span>↵</span>
            </button>
          ) : (
            <span className="dock__hint">
              <kbd>/</kbd> фокус
            </span>
          )}
        </form>

        <div className="dock__hintbar" aria-hidden="true">
          <span>
            <kbd>Tab</kbd> автодополнение
          </span>
          <span>
            <kbd>↑</kbd>
            <kbd>↓</kbd> история
          </span>
          <span>
            <kbd>Esc</kbd> очистить
          </span>
          <span className="dock__hintbar-right">max@blokhin — zsh 5.9</span>
        </div>
      </div>
    </div>
  )
}
