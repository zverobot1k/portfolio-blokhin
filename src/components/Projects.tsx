import { useId, useState } from 'react'
import { projects, type Project } from '../data/profile'
import { Reveal } from '../hooks'
import { SectionHeader } from './Ui'
import { ChevronDownIcon } from './Icons'

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [open, setOpen] = useState(index === 0)
  const detailsId = useId()

  return (
    <article className={`project project--${project.accent}`}>
      <div className="project__bar">
        <span className="project__dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="project__file">
          ~/projects/<span className="project__file-name">{project.id}</span>/README.md
        </span>
        <span className="project__year">{project.year}</span>
      </div>

      <div className="project__body">
        <div className="project__top">
          <div className="project__heading">
            <span className="project__index">{String(index + 1).padStart(2, '0')}</span>
            <div>
              <h3 className="project__name">{project.name}</h3>
              <span className="project__kind">{project.kind}</span>
            </div>
          </div>

          <div className="project__metrics">
            {project.metrics.map((metric) => (
              <div className="metric" key={metric.label}>
                <strong className="metric__value">{metric.value}</strong>
                <span className="metric__label">{metric.label}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="project__summary">{project.summary}</p>

        <ul className="project__stack" aria-label="Стек проекта">
          {project.stack.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <button
          type="button"
          className={`project__toggle ${open ? 'is-open' : ''}`}
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls={detailsId}
        >
          <span className="project__toggle-prompt">$</span>
          <span>{open ? 'свернуть README.md' : 'cat README.md'}</span>
          <ChevronDownIcon size={15} className="project__toggle-icon" />
        </button>

        <div id={detailsId} className={`project__details ${open ? 'is-open' : ''}`}>
          <div className="project__details-inner">
            <div className="project__comment">
              <span>//</span> что сделано
            </div>
            <ul className="project__highlights">
              {project.highlights.map((highlight) => (
                <li key={highlight}>
                  <span className="project__plus" aria-hidden="true">
                    +
                  </span>
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  )
}

export function Projects() {
  return (
    <section className="section" id="projects">
      <Reveal>
        <SectionHeader
          index="03"
          command="ls -la ~/projects"
          title="projects"
          subtitle="пет-проекты: от идеи до работающего сервиса"
        />
      </Reveal>

      <Reveal className="skills__meta" delay={40}>
        <span className="skills__meta-path">~/projects</span>
        <span className="skills__meta-info">3 директории · 3 README.md</span>
      </Reveal>

      <div className="projects">
        {projects.map((project, index) => (
          <Reveal key={project.id} delay={index * 60}>
            <ProjectCard project={project} index={index} />
          </Reveal>
        ))}
      </div>

      <Reveal className="projects__more" delay={100}>
        <span>// больше экспериментов и коммитов —</span>
        <a href="https://github.com/zverobot1k" target="_blank" rel="noreferrer">
          github.com/zverobot1k
        </a>
      </Reveal>
    </section>
  )
}
