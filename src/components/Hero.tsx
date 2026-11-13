import { Link } from 'react-router-dom'
import { marqueeItems, profile } from '../data/profile'
import { useTypewriter } from '../hooks'
import { Prompt } from './Ui'
import { ArrowRightIcon, ArrowUpRightIcon, GitHubIcon, MapPinIcon } from './Icons'

function CodeCard() {
  return (
    <aside className="codecard" aria-label="Профиль в виде Go-структуры">
      <div className="codecard__bar">
        <span className="codecard__file">
          <span className="codecard__file-dot" />
          developer.go
        </span>
        <span className="codecard__meta">go 1.23</span>
      </div>
      <pre className="codecard__code">
        <code>
          <span className="code__line">
            <span className="tok-kw">package</span> <span className="tok-ns">main</span>
          </span>
          <span className="code__line"> </span>
          <span className="code__line">
            <span className="tok-kw">type</span> <span className="tok-name">Developer</span>{' '}
            <span className="tok-punc">{'{'}</span>
          </span>
          <span className="code__line">
            {'  '}
            <span className="tok-prop">Name</span>
            {'     '}
            <span className="tok-kw">string</span>
            {'   '}
            <span className="tok-com">// Максим Блохин</span>
          </span>
          <span className="code__line">
            {'  '}
            <span className="tok-prop">Role</span>
            {'     '}
            <span className="tok-kw">string</span>
            {'   '}
            <span className="tok-com">// Backend Developer</span>
          </span>
          <span className="code__line">
            {'  '}
            <span className="tok-prop">Location</span>
            {' '}
            <span className="tok-kw">string</span>
            {'   '}
            <span className="tok-com">// Москва, Россия</span>
          </span>
          <span className="code__line">
            {'  '}
            <span className="tok-prop">Stack</span>
            {'    '}
            <span className="tok-kw">[]string</span>
            {' '}
            <span className="tok-com">// Go, Python, PostgreSQL</span>
          </span>
          <span className="code__line">
            {'  '}
            <span className="tok-prop">Status</span>
            {'   '}
            <span className="tok-kw">string</span>
            {'   '}
            <span className="tok-com">// open to work</span>
          </span>
          <span className="code__line">
            <span className="tok-punc">{'}'}</span>
          </span>
          <span className="code__line"> </span>
          <span className="code__line">
            <span className="tok-kw">func</span>{' '}
            <span className="tok-punc">(</span>
            <span className="tok-var">d</span> <span className="tok-name">Developer</span>
            <span className="tok-punc">)</span> <span className="tok-fn">Hello</span>
            <span className="tok-punc">()</span> <span className="tok-kw">string</span>{' '}
            <span className="tok-punc">{'{'}</span>
          </span>
          <span className="code__line">
            {'  '}
            <span className="tok-kw">return</span>{' '}
            <span className="tok-str">"let's build something reliable"</span>
          </span>
          <span className="code__line">
            <span className="tok-punc">{'}'}</span>
          </span>
        </code>
      </pre>
      <div className="codecard__foot">
        <span className="codecard__lang">
          <span className="lang-dot" /> Go
        </span>
        <span>UTF-8</span>
        <span>LF</span>
        <span className="codecard__ln">Ln 13, Col 2</span>
      </div>
    </aside>
  )
}

function Marquee() {
  const items = [...marqueeItems, ...marqueeItems]
  return (
    <div className="marquee" aria-label="Технологии">
      <div className="marquee__track">
        {items.map((item, index) => (
          <span className="marquee__item" key={`${item}-${index}`} aria-hidden={index >= marqueeItems.length}>
            {item}
            <span className="marquee__sep">◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export function Hero() {
  const { value: typed, done } = useTypewriter('whoami', 85, 300)

  function scrollToProjects() {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document
      .getElementById('projects')
      ?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
  }

  return (
    <section className="hero" id="top" aria-label="Обо мне">
      <div className={`hero__inner ${done ? 'is-ready' : ''}`}>
        <div className="hero__main">
          <div className="hero__cmd">
            <Prompt caret={!done}>{typed || '\u200b'}</Prompt>
          </div>

          <div className="hero__intro">
            <p className="hero__eyebrow">
              <span className="live-dot" aria-hidden="true" />
              backend developer
              <span className="hero__eyebrow-sep">/</span>
              moscow
            </p>

            <h1 className="hero__name">
              Максим <span>Блохин</span>
            </h1>

            <p className="hero__role">
              <span className="hero__role-mark">//</span> Go · Python · PostgreSQL · Redis
            </p>

            <p className="hero__lead">{profile.summary}</p>

            <div className="hero__actions">
              <button type="button" className="btn btn--primary" onClick={scrollToProjects}>
                <span className="btn__prompt">&gt;</span> смотреть проекты
                <ArrowRightIcon />
              </button>
              <Link to="/cv" className="btn btn--outline">
                резюме
                <ArrowUpRightIcon />
              </Link>
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn--icon"
                aria-label="GitHub"
                title="GitHub"
              >
                <GitHubIcon size={19} />
              </a>
            </div>

            <ul className="hero__meta">
              <li>
                <MapPinIcon />
                {profile.location}
              </li>
              <li>
                <span className="live-dot" aria-hidden="true" />
                open to work
              </li>
              <li>
                <span className="hero__meta-key">edu</span>
                {profile.educationShort}
              </li>
            </ul>
          </div>
        </div>

        <div className="hero__aside">
          <div className="hero__aside-glow" aria-hidden="true" />
          <CodeCard />
          <div className="hero__aside-note">
            <span className="hero__aside-note-sign">↳</span>
            <span>
              <span className="hero__aside-note-key">tip:</span> внизу есть настоящая
              командная строка
            </span>
          </div>
        </div>
      </div>

      <Marquee />
    </section>
  )
}
