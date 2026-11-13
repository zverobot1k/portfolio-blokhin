import { profile } from '../data/profile'
import { Reveal } from '../hooks'
import { SectionHeader } from './Ui'
import { SparkIcon } from './Icons'

export function About() {
  return (
    <section className="section" id="about">
      <Reveal>
        <SectionHeader
          index="01"
          command="cat about.md"
          title="about"
          subtitle="коротко о том, как я думаю о бэкенде"
        />
      </Reveal>

      <div className="about">
        <Reveal className="about__prose" delay={60}>
          <div className="about__comment">
            <span>#</span> README.md
            <span className="about__comment-meta">markdown · utf-8</span>
          </div>
          {profile.about.map((paragraph, index) => (
            <p key={index} className="about__paragraph">
              {paragraph}
            </p>
          ))}

          <div className="about__principles">
            {profile.principles.map((principle) => (
              <div className="principle" key={principle.index}>
                <span className="principle__index">{principle.index}</span>
                <div>
                  <strong>{principle.title}</strong>
                  <p>{principle.text}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="facts-wrap" delay={140}>
          <div className="facts">
            <div className="facts__bar">
              <span className="facts__file">
                <SparkIcon size={13} /> profile.yaml
              </span>
              <span className="facts__meta">yaml</span>
            </div>
            <dl className="facts__list">
              {profile.quickFacts.map(([key, value]) => (
                <div className="facts__row" key={key}>
                  <dt>{key}</dt>
                  <dd className={key === 'status' ? 'is-status' : ''}>
                    {key === 'status' ? <span className="live-dot" aria-hidden="true" /> : null}
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="facts__foot">
              <span className="facts__line">1</span>
              <span className="facts__comment"># Moscow · UTC+3 · {profile.educationShort}</span>
              <span className="facts__cursor" aria-hidden="true" />
            </div>
          </div>

          <div className="about__quote">
            <span className="about__quote-mark">“</span>
            <p>Хороший backend не заметен, пока всё работает. И понятен, когда что-то сломалось.</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
