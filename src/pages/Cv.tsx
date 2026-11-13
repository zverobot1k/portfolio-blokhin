import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { education, profile, projects, skillGroups } from '../data/profile'
import { Reveal } from '../hooks'
import { ThemeToggle } from '../components/Ui'
import {
  ArrowLeftIcon,
  ArrowUpRightIcon,
  DownloadIcon,
  GitHubIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  PrinterIcon,
  TelegramIcon,
} from '../components/Icons'

const pdfUrl = `${import.meta.env.BASE_URL}Blokhin-CV.pdf`

export function Cv() {
  useEffect(() => {
    document.title = 'Резюме — Максим Блохин, Backend Developer'
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="page cv-page">
      <header className="cv-top">
        <Link to="/" className="cv-back">
          <ArrowLeftIcon />
          <span className="cv-back__cmd">cd ~/portfolio</span>
        </Link>

        <div className="cv-top__actions">
          <button type="button" className="btn btn--ghost btn--sm" onClick={() => window.print()}>
            <PrinterIcon size={15} />
            <span className="cv-action-label">печать</span>
          </button>
          <a
            className="btn btn--primary btn--sm"
            href={pdfUrl}
            download="Blokhin-CV.pdf"
          >
            <DownloadIcon size={15} />
            <span>PDF</span>
          </a>
          <ThemeToggle />
        </div>
      </header>

      <main id="main" className="cv" tabIndex={-1}>
        <Reveal>
          <article className="cv__sheet">
            <div className="cv__promptbar">
              <span className="cv__prompt">
                <span className="prompt__user">max@blokhin</span>
                <span className="prompt__sep">:</span>
                <span className="prompt__path">~/cv</span>
                <span className="prompt__sign">$</span>
                <span className="cv__prompt-cmd">cat Blokhin-CV.md</span>
              </span>
              <span className="cv__badge">
                <span className="live-dot" aria-hidden="true" />
                актуально на 2026
              </span>
            </div>

            <div className="cv__head">
              <div>
                <h1 className="cv__name">
                  {profile.lastName} {profile.firstName}
                </h1>
                <p className="cv__role">{profile.role}</p>
                <p className="cv__summary">{profile.summary}</p>
              </div>

              <ul className="cv__contacts">
                <li>
                  <MapPinIcon size={14} />
                  {profile.location}
                </li>
                <li>
                  <MailIcon size={14} />
                  <a href={`mailto:${profile.email}`}>{profile.email}</a>
                </li>
                <li>
                  <PhoneIcon size={14} />
                  <a href={`tel:${profile.phoneRaw}`}>{profile.phone}</a>
                </li>
                <li>
                  <GitHubIcon size={14} />
                  <a href={profile.githubUrl} target="_blank" rel="noreferrer">
                    github.com/{profile.github}
                  </a>
                </li>
                <li>
                  <TelegramIcon size={14} />
                  <a href={profile.telegramUrl} target="_blank" rel="noreferrer">
                    t.me/{profile.telegram.replace('@', '')}
                  </a>
                </li>
              </ul>
            </div>

            <section className="cv-section">
              <h2 className="cv-section__title">
                <span>##</span> технологии
              </h2>
              <div className="cv-skills">
                {skillGroups.map((group) => (
                  <div className="cv-skill" key={group.id}>
                    <span className="cv-skill__cat">{group.title}</span>
                    <span className="cv-skill__items">{group.items.join(', ')}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="cv-section">
              <h2 className="cv-section__title">
                <span>##</span> образование
              </h2>
              <div className="cv-timeline">
                {education.map((entry) => (
                  <article className="cv-entry" key={entry.school}>
                    <div className="cv-entry__head">
                      <h3>{entry.school}</h3>
                      <span className="cv-entry__period">{entry.period}</span>
                    </div>
                    <p className="cv-entry__degree">{entry.degree}</p>
                    {entry.bullets.length > 0 ? (
                      <ul className="cv-entry__list">
                        {entry.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    ) : null}
                  </article>
                ))}
              </div>
            </section>

            <section className="cv-section">
              <h2 className="cv-section__title">
                <span>##</span> пет-проекты
              </h2>
              <div className="cv-projects">
                {projects.map((project) => (
                  <article className="cv-project" key={project.id}>
                    <div className="cv-project__head">
                      <h3>{project.name}</h3>
                      <span className="cv-project__kind">{project.kind}</span>
                    </div>
                    <p className="cv-project__summary">{project.summary}</p>
                    <ul className="cv-entry__list">
                      {project.highlights.map((highlight) => (
                        <li key={highlight}>{highlight}</li>
                      ))}
                    </ul>
                    <p className="cv-project__stack">
                      <span>stack:</span> {project.stack.join(' · ')}
                    </p>
                  </article>
                ))}
              </div>
            </section>

            <div className="cv__end">
              <span className="cv__end-prompt">$</span>
              <span>EOF · спасибо, что дочитали</span>
              <span className="caret" aria-hidden="true" />
            </div>
          </article>
        </Reveal>

        <div className="cv__cta">
          <div>
            <p className="cv__cta-title">Удобнее в PDF?</p>
            <p className="cv__cta-text">Скачайте резюме или напишите напрямую.</p>
          </div>
          <div className="cv__cta-actions">
            <a className="btn btn--primary" href={pdfUrl} download="Blokhin-CV.pdf">
              <DownloadIcon />
              скачать PDF
            </a>
            <a className="btn btn--outline" href={`mailto:${profile.email}`}>
              написать
              <ArrowUpRightIcon />
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}
